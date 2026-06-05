import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { Language } from "../types";

interface AudioPlayerProps {
  lang: Language;
}

export function AudioPlayer({ lang }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30); // scale 0 - 100
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Web Audio elements
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const lfoRef = useRef<any | null>(null);
  const animationFrameId = useRef<number | null>(null);
  
  // For visualizer bars
  const [visualizerState, setVisualizerState] = useState<number[]>([12, 24, 18, 30, 20, 15, 28, 12]);

  // Keep visualizer moving when playing
  useEffect(() => {
    if (isPlaying) {
      let phase = 0;
      const updateVisualizer = () => {
        phase += 0.05;
        setVisualizerState(prev => 
          prev.map((_, i) => {
            const baseValue = 10 + (Math.sin(phase + i * 0.8) * 8);
            const noise = Math.random() * 4;
            const volFactor = volume / 100;
            return Math.max(4, Math.round((baseValue + noise) * (0.4 + 0.6 * volFactor)));
          })
        );
        animationFrameId.current = requestAnimationFrame(updateVisualizer);
      };
      animationFrameId.current = requestAnimationFrame(updateVisualizer);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setVisualizerState([4, 4, 4, 4, 4, 4, 4, 4]);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, volume]);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      // Create Web Audio Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume / 100 * 0.08, ctx.currentTime); // keep it soft
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Soothing low pass filter to keep it warm and plush
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);
      filter.connect(masterGain);

      // Pad sound oscillator 1: Deep drone base note (A2 = 110Hz or A1 = 55Hz )
      const oscDrone = ctx.createOscillator();
      oscDrone.type = "sine";
      oscDrone.frequency.setValueAtTime(110, ctx.currentTime);
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.7, ctx.currentTime);
      oscDrone.connect(droneGain);
      droneGain.connect(filter);
      oscDrone.start();
      oscillatorsRef.current.push(oscDrone);

      // Pad sound oscillator 2: Perfect Fifth (E3 = 164.81Hz)
      const oscFifth = ctx.createOscillator();
      oscFifth.type = "sine";
      oscFifth.frequency.setValueAtTime(164.81, ctx.currentTime);
      const fifthGain = ctx.createGain();
      fifthGain.gain.setValueAtTime(0.4, ctx.currentTime);
      oscFifth.connect(fifthGain);
      fifthGain.connect(filter);
      oscFifth.start();
      oscillatorsRef.current.push(oscFifth);

      // Pad sound oscillator 3: Major Third (C#3 = 138.59Hz) but soft
      const oscThird = ctx.createOscillator();
      oscThird.type = "sine";
      oscThird.frequency.setValueAtTime(138.59, ctx.currentTime);
      const thirdGain = ctx.createGain();
      thirdGain.gain.setValueAtTime(0.25, ctx.currentTime);
      oscThird.connect(thirdGain);
      thirdGain.connect(filter);
      oscThird.start();
      oscillatorsRef.current.push(oscThird);

      // Soft sweeping high tone (A3 = 220Hz or A4 = 440Hz) drifting like wind
      const oscSweep = ctx.createOscillator();
      oscSweep.type = "sine";
      oscSweep.frequency.setValueAtTime(440, ctx.currentTime);
      
      const sweepGain = ctx.createGain();
      sweepGain.gain.setValueAtTime(0.01, ctx.currentTime);
      oscSweep.connect(sweepGain);
      sweepGain.connect(filter);
      oscSweep.start();
      oscillatorsRef.current.push(oscSweep);

      // Slowly modulate filter frequency for that breathing "Framer/Figma ambient sound"
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow 12-second wave
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(100, ctx.currentTime); // modulate up/down by 100hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

    } catch (e) {
      console.warn("Web Audio API is not supported in this browser tab context.", e);
    }
  };

  const handleTogglePlay = () => {
    initAudio();

    if (!audioCtxRef.current) return;

    if (isPlaying) {
      // Suspend
      audioCtxRef.current.suspend().then(() => {
        setIsPlaying(false);
      });
    } else {
      // Resume
      audioCtxRef.current.resume().then(() => {
        setIsPlaying(true);
      });
    }
  };

  // Update volume in real-time
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      // very soft gain curves
      masterGainRef.current.gain.linearRampToValueAtTime(
        (volume / 100) * 0.08,
        audioCtxRef.current.currentTime + 0.1
      );
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      if (lfoRef.current) {
        try { lfoRef.current.stop(); } catch(e) {}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e) {}
      }
    };
  }, []);

  return (
    <div id="ambient-audio-player" className="relative flex items-center bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-800 px-4 py-2 text-white shadow-xl max-w-sm gap-3 z-50">
      <button 
        id="toggle-ambient-play"
        onClick={handleTogglePlay}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#CDF12B] text-black hover:bg-white transition-all transform duration-300 hover:scale-105 active:scale-95 shadow-lg"
        title={lang === "fr" ? "Ambiance Sonore 'Calm Soul'" : "Ambient Sound 'Calm Soul'"}
      >
        {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
      </button>

      <div className="flex flex-col select-none">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
          <Music size={10} className="text-[#CDF12B]" /> Ambient: Calm Soul
        </span>
        <span className="text-[9px] text-[#CDF12B]/90 font-mono tracking-tight">
          {isPlaying ? (lang === "fr" ? "Apaisant" : "Soothing") : (lang === "fr" ? "Arrêté" : "Inactive")}
        </span>
      </div>

      {/* Pulsing Sound waves visualizer */}
      <div 
        id="sound-wave-visualizer" 
        className="flex items-end gap-0.5 h-6 px-1"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {visualizerState.map((h, i) => (
          <div 
            key={i} 
            className="w-[3px] bg-[#CDF12B]/90 rounded-full transition-all duration-300" 
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      {/* Volume slide container */}
      <div className="flex items-center gap-1.5 border-l border-gray-800 pl-3">
        <button 
          id="toggle-volume-mute"
          onClick={() => setVolume(prev => prev === 0 ? 30 : 0)} 
          className="text-gray-400 hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <input 
          id="volume-slider-control"
          type="range" 
          min="0" 
          max="100" 
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-16 h-1 accent-[#CDF12B] bg-gray-700 rounded-lg cursor-pointer max-sm:hidden"
        />
      </div>
    </div>
  );
}
