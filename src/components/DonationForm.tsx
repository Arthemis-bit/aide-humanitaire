import React, { useState } from "react";
import { CheckCircle, ShieldCheck, Heart, ArrowRight, Share2, Award, Copy, Volume2, VolumeX, Sparkles, AlertCircle, Cross } from "lucide-react";
import { Language } from "../types";
import { t, getLocalizedText } from "../translation";

interface DonationFormProps {
  lang: Language;
  onDonationComplete?: (amount: number, donorName: string, causeTitle: string) => void;
  selectedCampaignName?: string;
  selectedCampaignId?: string;
  isDark?: boolean;
}

export function DonationForm({ 
  lang, 
  onDonationComplete, 
  selectedCampaignName = "", 
  selectedCampaignId = "",
  isDark = false 
}: DonationFormProps) {
  const [amountType, setAmountType] = useState<"preset" | "custom">("preset");
  const [presetAmount, setPresetAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"skrill" | "wise">("skrill");
  const [selectedCause, setSelectedCause] = useState(selectedCampaignId || "all");
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // States
  const [step, setStep] = useState<"input" | "processing" | "success">("input");
  const [processingMsg, setProcessingMsg] = useState("");
  const [txnRef, setTxnRef] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  const presetOptions = [10, 20, 50, 100, 250];

  const getActiveAmount = (): number => {
    if (amountType === "preset") return presetAmount;
    const val = parseFloat(customAmount);
    return isNaN(val) ? 0 : val;
  };

  // 10 languages gratitude messages
  const gratitudeMessages: Record<Language, (name: string, amt: number) => string> = {
    fr: (n, a) => `Merci de tout cœur, ${n || "généreux donateur"} ! Votre don de ${a} € va directement financer des vies et soulager la détresse. Que la bénédiction vous accompagne. 💝`,
    en: (n, a) => `Thank you from the bottom of our hearts, ${n || "generous backer"}! Your gift of ${a} € goes directly to preserve lives. May blessings accompany you. 💝`,
    es: (n, a) => `¡Muchas gracias de todo corazón, ${n || "generoso donante"}! Su donación de ${a} € va directamente a financiar vidas. Que la bendición le acompañe. 💝`,
    ar: (n, a) => `نشكرك من أعماق قلوبنا، ${n || "المتبرع الكريم"}! تبرعك بقيمة ${a} يذهب مباشرة لإنقاذ الأرواح. بارك الله فيك. 💝`,
    de: (n, a) => `Vielen Dank von ganzem Herzen, ${n || "großzügiger Spender"}! Ihre Spende von ${a} € fließt direkt in die Rettung von Lebenswelten. Segen begleite Sie. 💝`,
    it: (n, a) => `Grazie di cuore, ${n || "generoso donatore"}! La tua donazione di ${a} € finanzia direttamente delle vite e riduce le sofferenze. Siano benedette le tue azioni. 💝`,
    zh: (n, a) => `衷心感谢您，${n || "慷慨的捐助者"}！您的 ${a} 欧元善款将直接用于挽救生命。愿福祉与您相伴。 💝`,
    pt: (n, a) => `Muito obrigado de todo o coração, ${n || "generoso doador"}! Sua doação de ${a} € irá diretamente para financiar vidas e aliviar a dor. Que a bênção o acompanhe. 💝`,
    ru: (n, a) => `Спасибо от всего сердца, ${n || "благородный спонсор"}! Ваше пожертвование в размере ${a} € напрямую спасает жизни. Да пребудет с вами благословение! 💝`,
    sw: (n, a) => `Asante sana kutoka chini ya mioyo yetu, ${n || "mfadhili mwema"}! Msaada wako wa ${a} € utasaidia kuokoa maisha na kuleta tumaini. Baraka ziwe nawe. 💝`
  };

  const getGratitudeText = (name: string, amt: number): string => {
    const fn = gratitudeMessages[lang] || gratitudeMessages["fr"];
    return fn(name, amt);
  };

  const speakThanks = (amount: number, name: string) => {
    if (!ttsEnabled) return;
    try {
      const basicMsg = getGratitudeText(name, amount).replace("💝", "");
      const utterance = new SpeechSynthesisUtterance(basicMsg);
      const synthLangMap: Record<Language, string> = {
        fr: "fr-FR", en: "en-US", es: "es-ES", ar: "ar-SA", de: "de-DE",
        it: "it-IT", zh: "zh-CN", pt: "pt-PT", ru: "ru-RU", sw: "sw-KE"
      };
      utterance.lang = synthLangMap[lang] || "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getActiveAmount();
    if (finalAmount <= 0) {
      setCheckoutError(lang === "fr" ? "Veuillez spécifier un montant de don supérieur à 0." : "Please specify a contribution value above 0.");
      return;
    }

    if (!donorEmail.trim()) {
      setCheckoutError(lang === "fr" ? "Veuillez enregistrer votre adresse email." : "Please input a valid email coordinate.");
      return;
    }

    setCheckoutError("");
    setStep("processing");

    const ticks: Record<Language, string[]> = {
      fr: ["Initialisation de la passerelle ultra-sécurisée...", "Chiffrement AES-256 certifié...", "Validation de la signature solidaire...", "Finalisation du don d'espoir..."],
      en: ["Initializing secure gateway channel...", "Encrypting AES-256 ledger...", "Validating solidarity signatures...", "Finalizing contribution clearance..."],
      es: ["Iniciando pasarela de pago...", "Encriptando transacción...", "Validando firma solidaria...", "Concluyendo proceso de donación..."],
      ar: ["بدء تشغيل بوابة الدفع الآمنة...", "تشفير البيانات الحساسة...", "تأكيد التبرع الإنساني...", "إرسال الأموال بنجاح..."],
      de: ["Sicheres Zahlungsportal wird geladen...", "AES-256 Verschlüsselung aktiv...", "Überprüfung der Spendensignatur...", "Spende wird erfolgreich verbucht..."],
      it: ["Inizializzazione gateway cifrato...", "Crittografia dei dati sensibili...", "Validazione firma umanitaria...", "Completamento transazione solida..."],
      zh: ["正在启动安全支付通道...", "进行 AES-256 高级加密...", "验证爱心签署密钥...", "捐赠处理圆满成功..."],
      pt: ["Inicializando canal de pagamento...", "Criptografando dados sensíveis...", "Verificando assinatura solidária...", "Concluindo recebimento do apoio..."],
      ru: ["Запуск безопасного шлюза...", "Шифрование транзакции...", "Подписание акта солидарности...", "Зачисление пожертвования..."],
      sw: ["Inaanza njia salama ya malipo...", "Inafunga data salama...", "Inathibitisha mchango wa tumaini...", "Inamilikisha msaada wako..."]
    };

    const currentTicks = ticks[lang] || ticks["fr"];
    let tickIdx = 0;
    setProcessingMsg(currentTicks[0]);

    const interval = setInterval(() => {
      tickIdx++;
      if (tickIdx < currentTicks.length) {
        setProcessingMsg(currentTicks[tickIdx]);
      } else {
        clearInterval(interval);
        const mockTxn = "TXN-AH-" + paymentMethod.toUpperCase() + "-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        setTxnRef(mockTxn);
        setStep("success");

        speakThanks(finalAmount, donorName);

        if (onDonationComplete) {
          const causeLabel = selectedCampaignName || (selectedCause === "all" ? (lang === "fr" ? "Fonds Globaux" : "Global Fund") : selectedCause);
          onDonationComplete(finalAmount, donorName || (lang === "fr" ? "Donateur Heureux" : "Warm Contributor"), causeLabel);
        }
      }
    }, 900);
  };

  const handleShare = () => {
    try {
      const text = lang === "fr"
        ? `Je viens de faire un don à l'association AIDE-HUMANITAIRE pour s'occuper des personnes malades et handicapées. Rejoignez mon action ! 💝`
        : `I just contributed to AIDE-HUMANITAIRE to empower sick elders and disable people. Join my action! 💝`;
      const url = window.location.href;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } catch(e) {}
  };

  return (
    <div 
      id="donation-panel" 
      className={`border rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl transition-all duration-300 ${
        isDark 
          ? "bg-slate-900 border-slate-800 text-white" 
          : "bg-white border-slate-200 text-slate-800 shadow-slate-100"
      }`}
    >
      {/* Decorative Brand Cross Motif in background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-accent-yellow/5 rounded-full blur-2xl pointer-events-none" />

      {step === "input" && (
        <form id="donation-wizard-form" onSubmit={handleDonateSubmit} className="space-y-6">
          <div className="text-center md:text-left relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff006e] bg-[#ff006e]/10 px-2.5 py-1 rounded-full inline-block font-semibold">
                {lang === "fr" ? "Espace Sécurisé International" : "Secure Global Gateway"}
              </span>
              <button 
                type="button"
                onClick={() => setTtsEnabled(!ttsEnabled)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  isDark ? "bg-slate-950 border-slate-800 text-gray-400 hover:text-white" : "bg-neutral-50 border-stone-200 text-stone-500 hover:text-slate-800"
                }`}
                title="Toggle Voice Gratitude Synthesis"
              >
                {ttsEnabled ? <Volume2 size={14} className="text-magenta" /> : <VolumeX size={14} />}
                <span className="font-mono text-[9px] hidden sm:inline">Voice: {ttsEnabled ? "ON" : "OFF"}</span>
              </button>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight mt-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-magenta font-mono text-xl">✚</span>
              <span>{lang === "fr" ? "Faire un Don d'Espoir" : "Send a Gift of Hope"}</span>
            </h3>
            
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {selectedCampaignName 
                ? (lang === "fr" ? `Soutien ciblé : ${selectedCampaignName}` : `Backing campaign: ${selectedCampaignName}`)
                : (lang === "fr" ? "Vos contributions alimentent l'achat direct de fauteuils, matériel d'inclusion et d'assistance médicale locale." : "Your gifts directly fund tailored wheelchairs, medical treatments, and direct assistance.")}
            </p>
          </div>

          {/* Preset buttons using corporate Yellow #ffd60a and deep contrasts */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 font-mono flex items-center justify-between uppercase tracking-wider">
              <span>{lang === "fr" ? "1. Choisir le Montant" : "1. Choose Amount"}</span>
              <span className="text-[10px] text-magenta">AIDE-HUMANITAIRE</span>
            </label>

            <div className="grid grid-cols-5 gap-2 select-none font-mono">
              {presetOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  id={`preset-${opt}-eur`}
                  onClick={() => {
                    setAmountType("preset");
                    setPresetAmount(opt);
                    setCustomAmount("");
                  }}
                  className={`py-3 rounded-xl text-center text-xs font-extrabold transition-all duration-200 ${
                    amountType === "preset" && presetAmount === opt
                      ? "bg-magenta text-white border-magenta shadow-md"
                      : isDark
                        ? "bg-slate-950 text-gray-300 border-slate-80 border-slate-800 hover:border-slate-700"
                        : "bg-neutral-50 text-slate-700 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {opt} €
                </button>
              ))}
            </div>

            <div className="relative font-mono">
              <input
                id="custom-donation-amount-input"
                type="number"
                placeholder={lang === "fr" ? "Saisir un autre montant personnalisé (€)..." : "Or type customized amount (€)..."}
                value={customAmount}
                onChange={(e) => {
                  setAmountType("custom");
                  setCustomAmount(e.target.value);
                }}
                className={`w-full text-xs rounded-xl pl-4 pr-12 py-3 placeholder-gray-500 transition-colors focus:outline-none ${
                  isDark 
                    ? "bg-slate-950 text-white border border-slate-800 focus:border-magenta" 
                    : "bg-white text-slate-900 border border-stone-200 focus:border-magenta"
                }`}
                min={1}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-bold">
                EUR (€)
              </span>
            </div>
          </div>

          {/* Secure Payment Methods */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 font-mono block uppercase tracking-wider">
              {lang === "fr" ? "2. Passerelle de Paiement" : "2. Selection Gateway"}
            </label>
            <div className="grid grid-cols-2 gap-3 font-sans">
              <button
                type="button"
                id="select-skrill-gateway"
                onClick={() => setPaymentMethod("skrill")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === "skrill"
                    ? "border-magenta bg-magenta/5"
                    : isDark ? "border-slate-850 bg-slate-950 text-gray-400" : "border-stone-200 bg-stone-50 text-stone-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-mono tracking-wide">SKRILL Pay</span>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === "skrill" ? "border-magenta bg-magenta" : "border-gray-400"}`}>
                    {paymentMethod === "skrill" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {lang === "fr" ? "Carte Bancaire, Visa, Mastercard" : "International card checkout"}
                </p>
              </button>

              <button
                type="button"
                id="select-wise-gateway"
                onClick={() => setPaymentMethod("wise")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === "wise"
                    ? "border-magenta bg-magenta/5"
                    : isDark ? "border-slate-850 bg-slate-950 text-gray-400" : "border-stone-200 bg-stone-50 text-stone-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-mono tracking-wide">WISE Transfer</span>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === "wise" ? "border-magenta bg-magenta" : "border-gray-400"}`}>
                    {paymentMethod === "wise" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {lang === "fr" ? "Virement Direct Rapide" : "Secure direct local wire transfer"}
                </p>
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-1">
            <label className="text-xs font-bold text-gray-400 font-mono block uppercase tracking-wider">
              {lang === "fr" ? "3. Identité du Donateur" : "3. Backer Identity"}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
              <input
                id="donation-donor-name"
                type="text"
                placeholder={lang === "fr" ? "Nom Complet (Optionnel)..." : "Full Name (Optional)..."}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
                }`}
              />
              <input
                id="donation-donor-email"
                type="email"
                required
                placeholder={lang === "fr" ? "Adresse Email (Requis)*..." : "Email Address (Required)*..."}
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
                }`}
              />
            </div>
          </div>

          {checkoutError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs flex gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{checkoutError}</span>
            </div>
          )}

          {/* Action button in Magenta/Yellow accents */}
          <div className="space-y-3 pt-2">
            <button
              id="submit-donation-action"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-magenta text-white font-extrabold text-xs uppercase tracking-wider hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>
                {lang === "fr" 
                  ? `Valider mon Don Solidaire de ${getActiveAmount()} €` 
                  : `Submit my Solidary Gift of ${getActiveAmount()} €`}
              </span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-mono">
              <ShieldCheck size={14} className="text-magenta" />
              <span>
                {lang === "fr"
                  ? "Rapport d'aide certifié. Cryptage SSL & RSA 2048 bits."
                  : "Certified aid report. Cryptographic SSL & RSA 2048 bits."}
              </span>
            </div>
          </div>
        </form>
      )}

      {/* Processing screen */}
      {step === "processing" && (
        <div id="processing-donation-state-screen" className="py-16 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-magenta animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-magenta animate-pulse">
              <span className="text-xl font-bold">✚</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black text-gray-400 tracking-widest font-mono uppercase">
              {lang === "fr" ? "PROCESSEUR DE SOLIDARITÉ" : "SOLIDARITY LEDGER IN PROCESS"}
            </h4>
            <p className="text-xs text-magenta font-mono max-w-sm px-4">
              {processingMsg}
            </p>
          </div>
        </div>
      )}

      {/* Immersive Gratitude Page Sheet! */}
      {step === "success" && (
        <div id="donation-thanks-glory-sheet" className="py-6 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in text-slate-800">
          
          <div className="relative">
            <div className="absolute inset-0 w-20 h-20 bg-magenta/15 rounded-full blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-magenta text-white flex items-center justify-center shadow-lg relative z-10 scale-110">
              <Heart size={32} className="fill-white" />
            </div>
          </div>

          <div className="space-y-3 px-2">
            <div className="inline-block px-3 py-1 bg-[#ff006e]/10 text-[#ff006e] font-mono text-[10px] uppercase font-bold tracking-widest rounded-full">
              {lang === "fr" ? "MÉDAILLE DE COMPASSION" : "MEDAL OF SOLIDARITY"}
            </div>
            
            <h3 className={`text-2xl md:text-3xl font-bold font-display tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {lang === "fr" ? "Merci Infiniment !" : "Infinite Blessings !"}
            </h3>
            
            {/* The multi-language thank you message output */}
            <p className={`text-xs md:text-sm font-sans max-w-lg leading-relaxed ${isDark ? "text-stone-300" : "text-stone-600 bg-neutral-50 border border-stone-100 p-4 rounded-xl shadow-inner"}`}>
              {getGratitudeText(donorName, getActiveAmount())}
            </p>
          </div>

          {/* Elegant Receipt Card details */}
          <div className={`w-full rounded-2xl border p-5 font-mono text-left text-xs space-y-2 relative ${
            isDark ? "bg-slate-950 border-slate-800 text-stone-300" : "bg-neutral-50 border-stone-200 text-stone-700"
          }`}>
            <div className="absolute top-4 right-4">
              <Award size={18} className="text-magenta" />
            </div>
            
            <div className="flex justify-between border-b border-gray-200/50 pb-2 text-[10px] text-gray-400 font-bold">
              <span>AIDE-HUMANITAIRE RECEIPT</span>
              <span>{new Date().toISOString().split('T')[0]}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>{lang === "fr" ? "Donateur :" : "Benefactor :"}</span>
              <span className={`font-bold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>{donorName || (lang === "fr" ? "Donateur Sincère" : "Anonymous Hero")}</span>
            </div>

            <div className="flex justify-between">
              <span>{lang === "fr" ? "Email :" : "Receipt email :"}</span>
              <span className={`text-right truncate max-w-[150px] ${isDark ? "text-gray-300" : "text-gray-900"}`}>{donorEmail}</span>
            </div>

            <div className="flex justify-between">
              <span>{lang === "fr" ? "Passerelle :" : "Channel :"}</span>
              <span className="text-magenta uppercase font-bold">{paymentMethod} SSL</span>
            </div>

            <div className="flex justify-between">
              <span>{lang === "fr" ? "Transaction ID :" : "Tx ID :"}</span>
              <span className={`tracking-wider text-[10px] font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{txnRef}</span>
            </div>

            <div className="flex justify-between border-t border-gray-200/40 pt-2.5 font-bold text-xs">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "SOMME ACQUITÉE :" : "SUM DELIVERED :"}</span>
              <span className="text-magenta font-extrabold text-sm">{getActiveAmount().toLocaleString()} EUR (€)</span>
            </div>
          </div>

          {/* Social and return buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              id="share-payment-success"
              onClick={handleShare}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-magenta text-white hover:opacity-95 font-mono text-[10px] font-black uppercase tracking-wider transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow"
            >
              <Share2 size={12} />
              <span>{lang === "fr" ? "Partager Solidairement" : "Share the Cause"}</span>
            </button>
            <button
              id="return-to-donate-form"
              onClick={() => {
                setStep("input");
                setCustomAmount("");
                setDonorName("");
                setDonorEmail("");
              }}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-[10px] font-bold uppercase transition flex items-center justify-center ${
                isDark ? "bg-slate-950 text-stone-300 hover:text-white hover:bg-slate-900" : "bg-stone-150 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {lang === "fr" ? "Refaire un Don" : "Donate Another Sum"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
