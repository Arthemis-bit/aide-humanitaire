import React, { useState } from "react";
import { MapPin, Globe, Star, Users, Briefcase, Heart } from "lucide-react";
import { Language } from "../types";

interface PinPoint {
  id: string;
  name: string;
  x: number; // percentage width
  y: number; // percentage height
  type: "donor" | "aid";
  title: { fr: string; en: string };
  metrics: { fr: string; en: string };
  impact: { fr: string; en: string };
}

interface InteractiveMapProps {
  lang: Language;
}

export function InteractiveMap({ lang }: InteractiveMapProps) {
  const [selectedPin, setSelectedPin] = useState<PinPoint | null>(null);

  const pins: PinPoint[] = [
    {
      id: "pin-sweden",
      name: "Sweden (Stockholm)",
      x: 52,
      y: 20,
      type: "donor",
      title: { fr: "Hub Donateur Nordique", en: "Nordic Donor Hub" },
      metrics: { fr: "840+ donateurs mensuels", en: "840+ monthly backers" },
      impact: { fr: "Financement stable de 12 cliniques", en: "Steady backing for 12 clinics" }
    },
    {
      id: "pin-france",
      name: "France (Paris)",
      x: 48,
      y: 32,
      type: "donor",
      title: { fr: "Centre de Coordination Global", en: "Global Logistics Gateway" },
      metrics: { fr: "1.2 M€ collectés en 2025", en: "$1.2M contributed in 2025" },
      impact: { fr: "Siège logistique & chirurgie solidaire", en: "HQ logistics & expert surgeon teams" }
    },
    {
      id: "pin-senegal",
      name: "Senegal (Dakar)",
      x: 42,
      y: 52,
      type: "aid",
      title: { fr: "Projet Vision & Aide Médicale", en: "Vision Restoration Centre" },
      metrics: { fr: "450 chirurgies de la cataracte accomplies", en: "450 cataract surgeries accomplished" },
      impact: { fr: "Guérison de la jeune Yasmine", en: "Life restructuration for young Yasmine" }
    },
    {
      id: "pin-mali",
      name: "Mali (Bamako)",
      x: 45,
      y: 56,
      type: "aid",
      title: { fr: "Puits Solaires & Agro-coopératives", en: "Solar Pumps & Co-ops" },
      metrics: { fr: "15 puits profonds en opération", en: "15 deep well generators active" },
      impact: { fr: "Eau courante saine pour 5000+ villageois", en: "Running safe water for 5000+ citizens" }
    },
    {
      id: "pin-congo",
      name: "DR Congo (Goma)",
      x: 53,
      y: 64,
      type: "aid",
      title: { fr: "Base Logistique d'Urgence", en: "Emergency Dispatch Station" },
      metrics: { fr: "Déploiement rapide en 90 minutes", en: "Rapid tactical deployment in 90 mins" },
      impact: { fr: "400 tentes thermiques d'urgence distribuées", en: "400 custom thermal tents deployed" }
    },
    {
      id: "pin-usa",
      name: "USA (New York)",
      x: 24,
      y: 35,
      type: "donor",
      title: { fr: "Alliance Internationale", en: "International NGO Alliance" },
      metrics: { fr: "35 partenaires corporatifs", en: "35 corporate allies" },
      impact: { fr: "Subventions croisées d'urgences majeures", en: "Inter-cooperated emergency aid" }
    }
  ];

  return (
    <div id="interactive-map-root" className="relative bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-hidden shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CDF12B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#CDF12B] bg-[#CDF12B]/10 px-2.5 py-1 rounded-full">
            {lang === "fr" ? "Réseau Mondial" : "Worldwide Network"}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-2 font-sans flex items-center gap-2">
            <Globe size={20} className="text-blue-500 animate-spin-slow" />
            {lang === "fr" ? "Carte d'Impact Solidaire" : "Global Solidarity Map"}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {lang === "fr" 
              ? "Cliquez sur les balises de notre réseau pour observer nos donateurs et nos zones d'action." 
              : "Click on our network beacons to observe our donors and local intervention zones."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span>{lang === "fr" ? "Lieux Donateurs" : "Donor Stations"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#CDF12B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CDF12B] animate-pulse" />
            <span>{lang === "fr" ? "Projets Secours" : "Rescue Projects"}</span>
          </div>
        </div>
      </div>

      {/* SVG Map Container */}
      <div id="world-map-svg-viewport" className="relative w-full aspect-[2/1] bg-slate-900/40 rounded-2xl border border-slate-800/80 overflow-hidden">
        {/* Futuristic Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Abstract Outlined Continents for Context */}
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-full opacity-20 pointer-events-none stroke-blue-500/40 fill-slate-950"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* North America */}
          <path d="M50,120 L150,110 L260,150 L280,220 L160,280 L180,320 L120,380 L80,250 Z" strokeWidth="1.5" />
          {/* South America */}
          <path d="M120,380 L180,320 L270,360 L320,440 L210,490 L160,430 Z" strokeWidth="1.5" />
          {/* Eurasia */}
          <path d="M380,80 L520,60 L780,50 L880,120 L800,280 L620,180 L520,240 L380,180 Z" strokeWidth="1.5" />
          {/* Africa */}
          <path d="M380,180 L520,240 L560,330 L550,420 L480,440 L410,320 L350,260 Z" strokeWidth="1.5" />
          {/* Australia */}
          <path d="M780,380 L880,360 L910,420 L810,440 Z" strokeWidth="1.5" />
        </svg>

        {/* Location Beacon Pins */}
        {pins.map((pin) => (
          <button
            key={pin.id}
            id={`map-pin-${pin.id}`}
            onClick={() => setSelectedPin(pin)}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-1.5 rounded-full transition-all duration-300 z-20 group ${
              selectedPin?.id === pin.id 
                ? "bg-white scale-125 ring-4 ring-offset-4 ring-offset-slate-900 " + (pin.type === "donor" ? "ring-blue-500" : "ring-[#CDF12B]")
                : pin.type === "donor" 
                  ? "bg-blue-600 hover:bg-blue-400 font-bold" 
                  : "bg-[#CDF12B] hover:bg-white text-black"
            }`}
          >
            {/* Beacon Ring Wave */}
            <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${pin.type === "donor" ? "bg-blue-500" : "bg-[#CDF12B]"}`} />
            
            <MapPin size={10} className={pin.type === "donor" ? "text-white" : "text-slate-900"} />
            
            {/* Direct Tooltip on Hover */}
            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white font-mono text-[9px] px-2 py-0.5 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              {pin.name}
            </span>
          </button>
        ))}

        {/* Floating details overlay on click */}
        {selectedPin && (
          <div 
            id="map-floating-overlay-card"
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-950/95 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-2xl z-30 animate-fade-in text-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedPin.type === "donor" ? "bg-blue-500" : "bg-[#CDF12B]"}`} />
                <h4 className="font-bold font-sans text-xs tracking-wider text-white uppercase">
                  {selectedPin.name}
                </h4>
              </div>
              <button 
                id="close-map-floating-card"
                onClick={() => setSelectedPin(null)}
                className="text-gray-400 hover:text-white text-xs border border-slate-800 rounded bg-slate-900 px-1.5 py-0.5"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="font-medium text-white text-sm">
                {lang === "fr" ? selectedPin.title.fr : selectedPin.title.en}
              </div>
              
              <div className="space-y-1.5 pt-1 border-t border-slate-900 font-sans text-gray-300">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Users size={12} className="text-blue-400 text-xs shrink-0" />
                  <span>
                    <strong>{lang === "fr" ? "Volume :" : "Activity :"}</strong>{" "}
                    {lang === "fr" ? selectedPin.metrics.fr : selectedPin.metrics.en}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                  <Heart size={12} className="text-[#CDF12B] text-xs shrink-0" />
                  <span>
                    <strong>{lang === "fr" ? "Impact :" : "Impact Outcome:"}</strong>{" "}
                    {lang === "fr" ? selectedPin.impact.fr : selectedPin.impact.en}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
