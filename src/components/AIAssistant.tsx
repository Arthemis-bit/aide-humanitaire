import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { Language } from "../types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  lang: Language;
}

export function AIAssistant({ lang }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with a friendly welcome message on mount or language switch
  useEffect(() => {
    const welcomeFr = "Bonjour ! Je suis votre compagnon humanitaire intelligent. Posez-moi vos questions sur nos actions, l'utilisation sécurisée des dons (Skrill/Wise) ou comment soumettre une demande d'aide.";
    const welcomeEn = "Hello! I am your intelligent humanitarian companion. Ask me anything about our rescue initiatives, the secure use of donations (Skrill/Wise), or how to apply for urgent aid.";
    setHistory([
      { role: "assistant", content: lang === "fr" ? welcomeFr : welcomeEn }
    ]);
  }, [lang]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userQuery = message.trim();
    setMessage("");
    setErrorMsg("");
    setIsLoading(true);

    // Optimistically add user message
    const updatedHistory = [...history, { role: "user" as const, content: userQuery }];
    setHistory(updatedHistory);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send history up (excluding the first prompt and keep it compact)
        body: JSON.stringify({
          message: userQuery,
          history: updatedHistory.slice(1, -1),
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error(lang === "fr" ? "Erreur serveur" : "Server response failed");
      }

      const data = await response.json();
      setHistory(prev => [...prev, { role: "assistant", content: data.text }]);

    } catch (e: any) {
      console.error(e);
      setErrorMsg(lang === "fr" 
        ? "Impossible de contacter l'assistant. Veuillez réessayer." 
        : "Cannot reach assistant. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const welcomeFr = "Bonjour ! Je suis votre compagnon humanitaire intelligent. Posez-moi vos questions sur nos actions, l'utilisation sécurisée des dons (Skrill/Wise) ou comment soumettre une demande d'aide.";
    const welcomeEn = "Hello! I am your intelligent humanitarian companion. Ask me anything about our rescue initiatives, the secure use of donations (Skrill/Wise), or how to apply for urgent aid.";
    setHistory([
      { role: "assistant", content: lang === "fr" ? welcomeFr : welcomeEn }
    ]);
    setErrorMsg("");
    setMessage("");
  };

  return (
    <div id="ai-assistant-wrapper" className="fixed bottom-6 right-6 z-55 flex flex-col items-end">
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          id="open-ai-chat-button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-[#1E45FC] text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all font-medium border border-blue-500/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#CDF12B] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#CDF12B] rounded-full" />
            <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs tracking-wide">
            {lang === "fr" ? "Assistant IA" : "AI Companion"}
          </span>
        </button>
      )}

      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div 
          id="ai-chat-dialog"
          className="w-80 sm:w-96 h-[480px] bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-3xl flex flex-col overflow-hidden text-white transition-all transform scale-100 origin-bottom-right"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900/60 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#CDF12B] flex items-center justify-center text-black shadow-inner">
                <Bot size={16} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wide font-sans flex items-center gap-1.5">
                  {lang === "fr" ? "Compagnon Solidaire" : "Humanitarian Bot"}
                  <Sparkles size={11} className="text-[#CDF12B]" />
                </h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-mono font-medium">Gemini 3.5 Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                id="reset-chat-history"
                onClick={handleResetChat}
                className="p-1 px-1.5 text-gray-400 hover:text-white rounded-md text-[10px] border border-gray-800 hover:bg-gray-800 transition"
                title={lang === "fr" ? "Effacer historique" : "Reset chat"}
              >
                <RefreshCw size={12} />
              </button>
              <button 
                id="close-ai-chat-button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {history.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[#1E45FC]" : "bg-slate-800 text-[#CDF12B]"}`}>
                  <span className="text-[10px] font-bold font-mono">
                    {msg.role === "user" ? "Me" : "AI"}
                  </span>
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.role === "user" ? "bg-blue-600/90 text-white rounded-tr-none" : "bg-slate-900 border border-slate-800 text-gray-200 rounded-tl-none"}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[#CDF12B]">
                  <span className="text-[10px] font-bold font-mono">AI</span>
                </div>
                <div className="p-3 py-4 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-none flex items-center gap-1.5 h-7">
                  <span className="w-1.5 h-1.5 bg-[#CDF12B] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#CDF12B] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#CDF12B] rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {/* Error view */}
            {errorMsg && (
              <div className="p-2.5 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-2 text-[11px] text-red-300">
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
                <p>{errorMsg}</p>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form 
            id="ai-assistant-input-form"
            onSubmit={handleSendMessage} 
            className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2"
          >
            <input
              id="ai-assistant-text-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={lang === "fr" ? "Écrivez votre question..." : "Ask your question..."}
              maxLength={250}
              className="flex-1 bg-slate-900 border border-slate-800 text-xs rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CDF12B] transition-colors"
            />
            <button
              id="submit-ai-chat"
              type="submit"
              disabled={!message.trim() || isLoading}
              className="p-3 bg-[#1E45FC] hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-[#1E45FC] flex items-center justify-center shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
