import React, { useState, useEffect } from "react";
import { 
  Globe, Heart, Phone, ShieldCheck, Search, ArrowRight, Sparkles, Check, 
  HelpCircle, ChevronDown, MessageSquare, Image as ImageIcon, Award, AlertCircle, 
  MapPin, Send, Calendar, Mail, FileText, Activity, Users, Star, Info, Moon, Sun, Volume2, Landmark
} from "lucide-react";

import { Language, Campaign, DonorWallItem, RealtimeNotification } from "./types";
import { NAV_ITEMS, STATS, CAUSES, CAMPAIGNS, STORIES, TESTIMONIALS, PARTNERS, FAQS, GALLERY, NEWS, RECENT_DONORS, MOCK_NOTIFICATIONS } from "./data";
import { t, getLocalizedText } from "./translation";
import { AudioPlayer } from "./components/AudioPlayer";
import { AIAssistant } from "./components/AIAssistant";
import { InteractiveMap } from "./components/InteractiveMap";
import { DonationForm } from "./components/DonationForm";
import { AidForm } from "./components/AidForm";
import { StatsDashboard } from "./components/StatsDashboard";

export default function App() {
  const [lang, setLang] = useState<Language>("fr");
  const [activeSection, setActiveSection] = useState("hero");
  const [isDark, setIsDark] = useState(false); // Default is Bright Light Mode ("ambiance de fond claire") for senior accessibility

  // Dynamic statistics figures
  const [raisedTotal, setRaisedTotal] = useState(200000); // User requested 200,000 € collected
  const [backersCount, setBackersCount] = useState(104);  // User requested 104 donors
  const [recentDonors, setRecentDonors] = useState<DonorWallItem[]>(RECENT_DONORS);
  const [notifications, setNotifications] = useState<RealtimeNotification[]>(MOCK_NOTIFICATIONS);
  const [activeNotification, setActiveNotification] = useState<RealtimeNotification | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Contact States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState("");

  // Gallery zoom
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("all");

  // Short campaign donation focus
  const [donationFocusedCampaign, setDonationFocusedCampaign] = useState<{ id: string; title: string } | null>(null);

  // FAQ open state accordion
  const [faqOpened, setFaqOpened] = useState<Record<string, boolean>>({});

  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Language selectors dropdown open
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Hero slideshow logic "image qui bouge" (Disabled individuals, caring elders, paramedics)
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = [
    // 1. Volunteer helper accompanying disabled teen in wheelchair
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop",
    // 2. Loving elder grandmother receiving care assistance
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
    // 3. Healthcare nurse restoring sight / checking pediatric health
    "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?q=80&w=1200&auto=format&fit=crop",
    // 4. Inclusive community group of diverse families and partners
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // System/Browser language tracking on load
  useEffect(() => {
    try {
      const userLang = navigator.language || (navigator as any).userLanguage;
      if (userLang) {
        const primaryCode = userLang.substring(0, 2).toLowerCase();
        const supported = ["fr", "en", "es", "ar", "de", "it", "zh", "pt", "ru", "sw"];
        if (supported.includes(primaryCode)) {
          setLang(primaryCode as Language);
        }
      }
    } catch (e) {}
  }, []);

  // Real-time notification toaster
  useEffect(() => {
    let index = 0;
    const triggerNext = () => {
      if (notifications.length > 0) {
        setActiveNotification(notifications[index]);
        index = (index + 1) % notifications.length;
        
        setTimeout(() => {
          setActiveNotification(null);
        }, 5500);
      }
    };

    triggerNext();
    const interval = setInterval(triggerNext, 18000);
    return () => clearInterval(interval);
  }, [notifications]);

  const handleDonationComplete = (amount: number, name: string, causeTitle: string) => {
    setRaisedTotal(prev => prev + amount);
    setBackersCount(prev => prev + 1);

    const translatedCauseText = { fr: causeTitle, en: causeTitle };

    const newWallItem: DonorWallItem = {
      id: "don-new-" + Date.now(),
      name: name || (lang === "fr" ? "Donateur Heureux" : "Generous Donor"),
      amount: amount,
      cause: translatedCauseText,
      time: { fr: "À l'instant", en: "Just now" }
    };

    setRecentDonors(prev => [newWallItem, ...prev.slice(0, 4)]);

    const newNotification: RealtimeNotification = {
      id: "nt-new-" + Date.now(),
      type: "donation",
      time: "1s",
      message: {
        fr: `💝 ${name || "Un donateur"} vient de faire un versement de ${amount} € pour : ${causeTitle} ! Sincère gratitude.`,
        en: `💝 ${name || "A solidary donor"} just contributed ${amount} € for: ${causeTitle}! Deepest gratitude.`,
        es: `💝 ¡${name || "Un donante"} acaba de aportar ${amount} € para ${causeTitle}!`,
        ar: `💝 تبرع ${name || "فاعل خير"} بمبلغ ${amount} يورو لصالح ${causeTitle} !`,
        de: `💝 ${name || "Ein Spender"} hat ${amount} € für ${causeTitle} überwiesen!`
      }
    };

    setNotifications(prev => [newNotification, ...prev]);
    setActiveNotification(newNotification);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMsg) {
      setContactSent(true);
      setContactSuccessMsg(lang === "fr" 
        ? "Votre message d'espoir a été transmis à nos bénévoles avec succès. Merci d'agir à nos côtés."
        : "Your warm query has reached our volunteers. Thank you for standing with us."
      );
      setTimeout(() => {
        setContactSent(false);
        setContactName("");
        setContactEmail("");
        setContactMsg("");
      }, 5000);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (id: string) => {
    setFaqOpened(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCampaigns = CAMPAIGNS.filter(camp => {
    const titleMatch = (lang === "fr" ? camp.title.fr : camp.title.en).toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategoryFilter === "all" || camp.category === selectedCategoryFilter;
    return titleMatch && categoryMatch;
  });

  const filteredGallery = activeGalleryFilter === "all" 
    ? GALLERY 
    : GALLERY.filter(item => {
        if (activeGalleryFilter === "medical") return item.category.fr.includes("Médicale") || item.category.en.includes("Medical");
        if (activeGalleryFilter === "orphans") return item.category.fr.includes("Orphelins") || item.category.en.includes("Orphans");
        if (activeGalleryFilter === "family") return item.category.fr.includes("Familles") || item.category.en.includes("Family");
        return true;
      });

  const languageLabels: Record<Language, string> = {
    fr: "Français 🇫🇷",
    en: "English 🇬🇧",
    es: "Español 🇪🇸",
    ar: "العربية 🇸🇦",
    de: "Deutsch 🇩🇪",
    it: "Italiano 🇮🇹",
    zh: "中文 🇨🇳",
    pt: "Português 🇵🇹",
    ru: "Русский 🇷🇺",
    sw: "Kiswahili 🇰🇪"
  };

  return (
    <div 
      id="humanitarian-root-layout" 
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 antialiased ${
        isDark 
          ? "bg-slate-950 text-stone-100 selection:bg-magenta selection:text-white" 
          : "bg-[#faf9f6] text-slate-900 selection:bg-magenta selection:text-white"
      }`}
    >
      
      {/* Live Toast Feed */}
      {activeNotification && (
        <div 
          id="realtime-notification-toast" 
          className="fixed bottom-6 left-6 z-50 bg-white/95 text-slate-800 border-l-4 border-magenta rounded-2xl p-4 shadow-xl max-w-sm animate-fade-in flex items-start gap-3.5 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-magenta/10 flex items-center justify-center text-magenta shrink-0 mt-0.5">
            <Heart size={14} className="fill-magenta text-magenta" />
          </div>
          <div>
            <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-widest uppercase text-gray-400">
              <span>{lang === "fr" ? "AIDE DIRECTE" : "REALTIME RECORD"}</span>
              <span className="text-[#ff006e]">{activeNotification.time}</span>
            </div>
            <p className="text-xs text-slate-700 font-sans mt-1 leading-relaxed">
              {getLocalizedText(activeNotification.message, lang)}
            </p>
          </div>
        </div>
      )}

      {/* HELPLINE & ACCESSIBILITY FLOATING BAR (Perfect for elders) */}
      <div className="bg-magenta text-white py-1.5 px-4 font-mono text-[10px] md:text-xs text-center font-bold tracking-wider flex flex-col md:flex-row items-center justify-center gap-2 relative z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span>✚</span>
          <span>{t("phone_helpline", lang)}</span>
        </div>
        <span className="hidden md:inline text-white/50">|</span>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} />
          <span>Pour les personnes malades, seniors et handicapées, l'accompagnement est 100% gratuit.</span>
        </div>
      </div>

      {/* STICKY MAIN HEADER */}
      <header 
        id="sticky-header" 
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 select-none ${
          isDark 
            ? "bg-slate-950/85 border-slate-900" 
            : "bg-white/85 border-stone-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title with Humanitarian Emblem */}
          <div 
            onClick={() => scrollToSection("hero")} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-magenta flex items-center justify-center text-white shadow-md relative overflow-hidden transition-transform group-hover:scale-105">
              <span className="text-lg font-mono font-bold">✚</span>
            </div>
            <div>
              <h1 className="text-sm font-black font-accent tracking-widest text-magenta uppercase">
                {t("brand", lang)}
              </h1>
              <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase font-mono">
                {lang === "fr" ? "Dignité & Solidarité" : "Solidarity & Action"}
              </p>
            </div>
          </div>

          {/* Desktop Links (13 Navigation Points requested by user) */}
          <nav className="hidden xl:flex items-center gap-1 font-accent">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wide ${
                  activeSection === item.id 
                    ? "text-magenta bg-magenta/10" 
                    : isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-stone-600 hover:text-magenta"
                }`}
              >
                {t(`section_${item.id}`, lang) || getLocalizedText(item.label, lang)}
              </button>
            ))}
          </nav>

          {/* Controls Bar (Language Switch, Sound, Theme Switch) */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Ambient Sound Module */}
            <AudioPlayer lang={lang} />

            {/* Theme Toggle Button */}
            <button 
              id="theme-toggler"
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isDark 
                  ? "bg-slate-900 border-slate-800 text-yellow-400 hover:text-white" 
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:text-magenta"
              }`}
              title={isDark ? t("light_mode", lang) : t("dark_mode", lang)}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* 10 Languages Selector */}
            <div className="relative">
              <button 
                id="language-selector-dropdown-trigger"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 transition ${
                  isDark ? "bg-slate-950 border-slate-850 text-gray-300" : "bg-stone-50 border-stone-200 text-stone-700"
                }`}
              >
                <Globe size={14} className="text-magenta" />
                <span className="uppercase">{lang}</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {langMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-50 font-mono text-xs ${
                  isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-stone-200 text-stone-900"
                }`}>
                  <div className="p-1.5 grid grid-cols-1 gap-0.5">
                    {Object.entries(languageLabels).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLang(code as Language);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition ${
                          lang === code 
                            ? "bg-magenta text-white font-bold" 
                            : isDark 
                              ? "hover:bg-slate-800 text-stone-300" 
                              : "hover:bg-stone-100 text-slate-700"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Access Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 border rounded-lg text-magenta"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)} 
              className="p-2 border rounded-lg text-xs font-mono font-black"
            >
              {lang.toUpperCase()}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border rounded-lg"
            >
              ☰
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`xl:hidden p-4 border-b space-y-2 max-h-[75vh] overflow-y-auto ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-white border-stone-200"
          }`}>
            <div className="grid grid-cols-2 gap-1.5 text-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition uppercase ${
                    activeSection === item.id 
                      ? "bg-magenta text-white" 
                      : "bg-stone-100/50 text-stone-700 hover:text-stone-900"
                  }`}
                >
                  {getLocalizedText(item.label, lang)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Secondary mobile languages quick selection bar */}
        {langMenuOpen && (
          <div className={`block lg:hidden border-b p-3 max-h-40 overflow-y-auto ${
            isDark ? "bg-slate-950 border-slate-900" : "bg-neutral-50 border-stone-200"
          }`}>
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(languageLabels).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code as Language);
                    setLangMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
                    lang === code ? "bg-magenta text-white border-magenta" : "bg-stone-50 text-stone-700"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION ("ACCUEIL SPLANDISE AVEC DES IMAGE QUI BOUGE DERRIER") */}
      <section 
        id="hero" 
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16"
      >
        {/* Animated Slide backgrounds (the moving images request!) */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
                idx === heroImgIndex 
                  ? "opacity-25 scale-105" 
                  : "opacity-0 scale-100 pointer-events-none"
              }`}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          ))}
          {/* Subtle color shading mask representing Magenta/Yellow glow behind typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-magenta/10 to-transparent mix-blend-color-burn" />
        </div>

        {/* Ambient Pulsing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-magenta/10 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-accent-yellow/5 rounded-full blur-[100px] pointer-events-none animate-pulse-soft" />

        <div className="max-w-6xl mx-auto px-4 z-10 text-center space-y-8 relative">
          
          <div className="inline-flex items-center gap-2 bg-magenta/10 border border-magenta/30 rounded-full px-4 py-1.5 text-magenta animate-pulse">
            <Sparkles size={13} className="fill-magenta" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {lang === "fr" ? "Luttons Ensemble Contre le Handicap et la Maladie" : "United Worldwide Solidarity"}
            </span>
          </div>

          {/* Title with Playfair Serif Typography */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight font-display drop-shadow-sm">
            <span className={isDark ? "text-white" : "text-slate-900"}>
              {lang === "fr" ? "Aidons les plus " : "Empowering "}
            </span>
            <span className="text-magenta italic font-display">
              {lang === "fr" ? "vulnérables à renaître" : "vulnerable souls"}
            </span>
          </h2>

          <p className={`text-base sm:text-lg max-w-3xl mx-auto font-medium leading-relaxed font-sans px-4 ${
            isDark ? "text-stone-300" : "text-stone-700"
          }`}>
            {t("slogan", lang)}
            <br />
            {lang === "fr" 
              ? "Prise en charge médicale, fourniture de fauteuils roulants motorisés pour handicapés, accompagnement bienveillant de nos aînés."
              : "Direct health treatments, customized motor wheel chairs for disabled independence, and daily geriatric welfare."}
          </p>

          {/* Secure Actions buttons matching brand identity colors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 select-none">
            <button
              id="cta-faire-un-don"
              onClick={() => scrollToSection("donation")}
              className="w-full sm:w-auto px-8 py-4 bg-magenta hover:opacity-90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-magenta/10 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t("cta_donate", lang)}</span>
              <Heart size={14} className="group-hover:scale-125 transition-transform fill-white" />
            </button>

            <button
              id="cta-demander-aide"
              onClick={() => scrollToSection("aid-request")}
              className={`w-full sm:w-auto px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border ${
                isDark 
                  ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-850" 
                  : "bg-white border-stone-250 text-slate-800 hover:bg-stone-50"
              }`}
            >
              <span>{t("cta_request", lang)}</span>
              <ArrowRight size={14} className="text-magenta" />
            </button>
          </div>

          {/* Live Secure Stat Badging */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-500 font-mono">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
              isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-stone-200"
            }`}>
              <span className="w-2.5 h-2.5 rounded-full bg-magenta" />
              <span>Assistance Téléphonique : +237657587129</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
              isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-stone-200"
            }`}>
              <ShieldCheck size={12} className="text-magenta" />
              <span>{lang === "fr" ? "Fonds Audités Publiquement" : "Audited Solidarity Treasury"}</span>
            </div>
          </div>

        </div>
      </section>

      {/* CORE 6 MISSION DOMAINS SECTIONS */}
      <section 
        id="mission" 
        className={`py-20 border-t ${
          isDark ? "bg-slate-950/40 border-slate-900" : "bg-white border-stone-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#ff006e] bg-[#ff006e]/10 px-3 py-1 rounded-full">
              {lang === "fr" ? "Nos Domaines d'Accompagnement" : "Main Rescue Sectors"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-slate-900 mt-3">
              <span className={isDark ? "text-white" : "text-slate-900"}>
                {lang === "fr" ? "6 Piliers d'Intervention " : "6 Pillars of Permanent "}
              </span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "Humanitaire" : "Rescue"}</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-3 leading-relaxed">
              {lang === "fr"
                ? "Chaque jour, nos équipes luttent contre l'exclusion des personnes handicapées, s'occupent des personnes âgées, logent les orphelins et financent les opérations médicales."
                : "Every day, our volunteer networks design custom support nodes for physical challengers, elderly healthcare, and orphan schools."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAUSES.map((cause) => (
              <div 
                key={cause.id}
                className={`border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group transition-transform duration-300 hover:scale-[1.015] ${
                  isDark 
                    ? "bg-slate-900/50 border-slate-800 text-stone-200" 
                    : "bg-stone-50/50 border-stone-150 text-slate-850"
                }`}
              >
                {/* Visual Image representation */}
                <div className="h-44 w-full rounded-xl overflow-hidden relative mb-4">
                  <img 
                    referrerPolicy="no-referrer"
                    src={cause.image} 
                    alt={getLocalizedText(cause.title, lang)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-magenta text-white py-0.5 px-2 rounded font-mono text-[9px] font-bold uppercase">
                    {cause.id}
                  </div>
                </div>

                <div className="space-y-2 flex-grow">
                  <h3 className={`text-lg font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>
                    {getLocalizedText(cause.title, lang)}
                  </h3>
                  
                  {/* Detailed descriptions / personal cases as requested */}
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    {getLocalizedText(cause.shortDescription, lang)}
                  </p>

                  <div className={`text-[11px] p-3 rounded-lg border mb-2 font-sans flex flex-col gap-1 ${
                    isDark ? "bg-slate-950/40 border-slate-850 text-stone-400" : "bg-white border-stone-200 text-stone-600"
                  }`}>
                    <span className="font-bold text-[10px] tracking-wider text-magenta uppercase font-mono mb-1">Rapport de Mission :</span>
                    {(cause.impactStats[lang] || cause.impactStats["en"] || []).map((stat: string, sIdx: number) => (
                      <div key={sIdx} className="flex items-center gap-1">
                        <span className="text-magenta">✔</span>
                        <span>{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/20 flex gap-2">
                  <button 
                    onClick={() => scrollToSection("donation")}
                    className="flex-1 py-2 rounded-xl bg-magenta text-white text-[11px] font-extrabold uppercase tracking-wider hover:opacity-95 transition"
                  >
                    {t("cta_donate", lang)}
                  </button>
                  <button 
                    onClick={() => scrollToSection("aid-request")}
                    className={`px-3 py-2 rounded-xl border text-[11px] font-bold ${
                      isDark ? "border-slate-800 text-gray-300" : "border-stone-250 text-slate-800"
                    }`}
                  >
                    Assistance ✚
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SOLIDARITY ACTIONS & INTERACTIVE PROGRESS MAP */}
      <section id="actions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-black text-white bg-magenta px-3 py-1 rounded-full uppercase tracking-widest">
                {lang === "fr" ? "Carte d'Action Locale" : "Local Impact Coordinates"}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight">
                <span className={isDark ? "text-white" : "text-slate-900"}>Savoir où agit </span>
                <span className="text-magenta italic font-display">AIDE-HUMANITAIRE</span>
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {lang === "fr"
                  ? "Nous disposons d'antennes de volontaires permanentes pour distribuer les fauteuils motorisés, acheminer les repas chauds aux aînés esseulés et réaliser le suivi des dossiers de soins médicaux d'urgence."
                  : "We coordinate permanent volunteer networks on site to safely transport clean water, distribute motorized chairs to disabled youth, and check clinical operations."}
              </p>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-magenta/10 text-magenta flex items-center justify-center font-bold font-mono">1</div>
                  <div>
                    <span className="font-bold text-magenta block">Antenne Est (Cameroun Helplines)</span>
                    <span className="text-gray-400">Prise en charge d'urgence et ligne directe active : +237657587129.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-magenta/10 text-magenta flex items-center justify-center font-bold font-mono">2</div>
                  <div>
                    <span className="font-bold text-magenta block">Soutien Inclusion Sahel</span>
                    <span className="text-gray-400">Distribution continue de fauteuils solaires de haute durabilité.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Region Locator widget map */}
              <InteractiveMap lang={lang} />
            </div>

          </div>

        </div>
      </section>

      {/* EVOLUTIONS INTERACTIVE SPLINES DASHBOARD */}
      <section id="impact" className="py-12 bg-[#ffd60a]/5 border-y border-[#ffd60a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsDashboard 
            lang={lang} 
            raisedTotal={raisedTotal} 
            backersCount={backersCount} 
            isDark={isDark} 
          />
        </div>
      </section>

      {/* URGENT CAMPAIGNS & CASE STORIES SECTION */}
      <section id="campaigns" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-magenta">
                {lang === "fr" ? "Spontanéité & Volonté" : "Direct Engagement"}
              </span>
              <h2 className="text-2xl md:text-4xl font-black font-display text-slate-900 mt-2">
                <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Campagnes à Soutenir d'Urgence " : "Critical "}</span>
                <span className="text-magenta italic font-display">{lang === "fr" ? "Dès Maintenant" : "Campaigns"}</span>
              </h2>
            </div>
            
            {/* Search filtering */}
            <div className="relative font-mono">
              <input
                type="text"
                placeholder={lang === "fr" ? "Rechercher une situation..." : "Filter campaigns..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`text-xs pl-9 pr-4 py-2 border rounded-xl focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-stone-250 text-slate-800"
                }`}
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCampaigns.map((camp) => {
              const currentPct = Math.min(100, Math.floor((camp.raised / camp.goal) * 100));
              return (
                <div 
                  key={camp.id}
                  className={`border rounded-2xl p-6 relative flex flex-col justify-between transition-shadow ${
                    isDark ? "bg-slate-900/60 border-slate-850 text-white" : "bg-white border-stone-200 text-slate-800 shadow-slate-100/40 shadow-sm"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="h-56 w-full rounded-xl overflow-hidden relative">
                      <img 
                        referrerPolicy="no-referrer"
                        src={camp.image} 
                        alt={getLocalizedText(camp.title, lang)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-magenta text-white text-[9px] px-2 py-0.5 rounded uppercase font-mono font-bold tracking-widest">
                        {camp.category}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold font-display leading-tight">{getLocalizedText(camp.title, lang)}</h3>
                    
                    {/* Detailed story narrative "histoire pour chaque cas" */}
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {getLocalizedText(camp.story, lang)}
                    </p>

                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-[11px] font-mono font-bold">
                        <span>Objectif : {camp.goal.toLocaleString()} €</span>
                        <span className="text-magenta">{currentPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-magenta transition-all duration-500" 
                          style={{ width: `${currentPct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                        <span>Coll : {camp.raised.toLocaleString()} €</span>
                        <span>{camp.daysRemaining} {lang === "fr" ? "jours restants" : "days left"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100/10">
                    <button
                      onClick={() => {
                        setDonationFocusedCampaign({ id: camp.id, title: getLocalizedText(camp.title, lang) });
                        scrollToSection("donation");
                      }}
                      className="w-full py-2.5 rounded-xl bg-magenta text-white font-extrabold text-[11px] uppercase tracking-wider hover:opacity-90 active:scale-95 transition"
                    >
                      {lang === "fr" ? "Financer cette cause" : "Support this Cause"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PRIMARY DONATION SPACE (ACCUEIL SECURE BILLBOARD ACCENT MAGENTA) */}
      <section id="donation" className="py-20 bg-magenta/5 border-y border-magenta/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-black text-white bg-magenta px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "fr" ? "Soutien Solidaire Public" : "Certified Direct Backing"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mt-3">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Faire un " : "Convey your "}</span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "Versement d'Espoir" : "Contribution"}</span>
            </h2>
          </div>

          <DonationForm 
            lang={lang} 
            onDonationComplete={handleDonationComplete}
            selectedCampaignName={donationFocusedCampaign?.title}
            selectedCampaignId={donationFocusedCampaign?.id}
            isDark={isDark}
          />
        </div>
      </section>

      {/* AID APPLICANT URGENT PORTAL (MEDIC/SENIOR/DISABLES CONFIDENTIEL DOSSIER) */}
      <section id="aid-request" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <AidForm lang={lang} isDark={isDark} />
        </div>
      </section>

      {/* HISTOIRES DE VIE (EMOTIONAL REAL STORIES OF DISABLED & FAMILY LIVES) */}
      <section id="stories" className={`py-20 ${isDark ? "bg-slate-950/45" : "bg-stone-50/50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-white bg-magenta px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "fr" ? "Vies Sauvées & Reconnaissance" : "Transformed Chronicles"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-slate-900 mt-3">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Histoires de Vies " : "Stories of "}</span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "Métamorphosées" : "Hope"}</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-3 leading-relaxed">
              {lang === "fr"
                ? "Découvrez l'histoire humaine, le combat difficile et la joie retrouvée par nos bénéficiaires après la mise à disposition de soins médicaux et de fauteuils autonomes."
                : "Explore the authentic stories of survival and the smiles restored through your active solidary backing."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {STORIES.map((story) => (
              <div 
                key={story.id}
                className={`border rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isDark ? "bg-slate-900/60 border-slate-850" : "bg-white border-stone-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4 border-b pb-3 border-gray-100/10">
                  <div>
                    <h3 className={`text-lg font-extrabold font-display ${isDark ? "text-white" : "text-slate-900"}`}>{story.name}</h3>
                    <span className="text-[10px] font-mono text-magenta inline-flex items-center gap-1">
                      <MapPin size={10} />
                      {getLocalizedText(story.location, lang)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-magenta/10 rounded text-magenta font-mono text-[9px] font-bold uppercase tracking-wider">
                      {getLocalizedText(story.impactMetric, lang)}
                    </span>
                  </div>
                </div>

                {/* Before / After imagery details */}
                <div className="grid grid-cols-2 gap-3 mb-4 h-48 select-none">
                  <div className="rounded-xl overflow-hidden relative">
                    <img 
                      referrerPolicy="no-referrer"
                      src={story.imageBefore} 
                      className="w-full h-full object-cover filter saturate-50 brightness-90"
                      alt="Before"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/70 text-[9px] text-white px-2 py-0.5 rounded font-mono uppercase">
                      {lang === "fr" ? "Avant" : "Before"}
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden relative border border-magenta/45">
                    <img 
                      referrerPolicy="no-referrer"
                      src={story.imageAfter} 
                      className="w-full h-full object-cover"
                      alt="After"
                    />
                    <div className="absolute top-2 left-2 bg-magenta text-[9px] text-white px-2 py-0.5 rounded font-mono uppercase">
                      {lang === "fr" ? "Aujourd'hui" : "Today"}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className={`p-3 rounded-xl italic ${isDark ? "bg-slate-950 text-stone-300" : "bg-stone-50 text-stone-600"}`}>
                    "{getLocalizedText(story.quote, lang)}"
                  </div>

                  <div className="text-xs leading-relaxed text-gray-500 space-y-2">
                    <p>
                      <strong>{lang === "fr" ? "Histoire :" : "Dossier :"} </strong>
                      {getLocalizedText(story.before, lang)}
                    </p>
                    <p>
                      <strong>{lang === "fr" ? "Impact de votre don :" : "Outcome of backing :"} </strong>
                      {getLocalizedText(story.after, lang)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BENEFACTORS TESTIMONIALS */}
      <section id="impact-testimonials" className="py-20 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-magenta uppercase tracking-widest block">
                {lang === "fr" ? "Témoignages du Réseau" : "Sponsor Testimony"}
              </span>
              <h2 className="text-3xl font-bold font-display leading-tight">
                <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Ils partagent notre " : "Trusted by our "}</span>
                <span className="text-magenta italic font-display">{lang === "fr" ? "combat quotidien" : "allies"}</span>
              </h2>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                {lang === "fr" 
                  ? "Découvrez l'avis de donateurs internationaux et de médecins de terrain sur le fonctionnement de notre plateforme de solidarité."
                  : "Hear from our direct surgical coordinators and regular supporters about the escrow speed."}
              </p>
            </div>

            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  isDark ? "bg-slate-900/60 border-slate-850" : "bg-white border-stone-200"
                }`}
              >
                <p className="text-xs font-sans text-gray-500 italic leading-relaxed">
                  "{getLocalizedText(test.message, lang)}"
                </p>
                <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-gray-100/10">
                  <img 
                    referrerPolicy="no-referrer"
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover border border-magenta"
                  />
                  <div>
                    <span className={`block font-bold text-xs ${isDark ? "text-white" : "text-slate-900"}`}>{test.name}</span>
                    <span className="text-[10px] text-magenta font-mono">{getLocalizedText(test.role, lang)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION RECORD WALL OF GENEROUS SUPPORTERS */}
      <section id="impact-wall" className={`py-12 ${isDark ? "bg-slate-950/80 border-t border-slate-900" : "bg-stone-50 border-t border-stone-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200/40 gap-4">
            <div>
              <h3 className={`text-lg font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>
                {lang === "fr" ? "Mur des Donateurs Récents" : "Wall of Magnanimous Donors"}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {lang === "fr" ? "Mise à jour en direct lors de chaque transaction sécurisée." : "Live ledger updates upon successful contribution clearing."}
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-magenta bg-magenta/10 px-3 py-1.5 rounded-full inline-block">
              {lang === "fr" ? "104 Héros de la bientraitance" : "104 Registered Lifesavers"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {recentDonors.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-xl border text-center transition-transform hover:scale-105 select-none relative overflow-hidden ${
                  isDark ? "bg-slate-900/40 border-slate-850 text-white" : "bg-white border-stone-200 text-slate-850 shadow-inner"
                }`}
              >
                <span className="text-magenta font-mono text-xs block">✚</span>
                <span className={`block text-xs font-extrabold mt-1 truncate ${isDark ? "text-white" : "text-slate-950"}`}>{item.name}</span>
                <span className="block font-mono text-magenta text-sm font-black mt-1 font-semibold">{item.amount} €</span>
                <span className="block text-[10px] text-gray-400 mt-0.5 truncate">{getLocalizedText(item.cause, lang)}</span>
                <span className="block text-[9px] text-[#ff006e]/70 font-mono mt-1 font-bold uppercase">{getLocalizedText(item.time, lang)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COOPERATIVE PARTNERS */}
      <section id="partners" className="py-12 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
          <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#ff006e] uppercase block mb-6">
            {lang === "fr" ? "NOTRE RÉSEAU DE COOPÉRATION ET CONFIDENCE" : "OUR SOLIDARY REGISTRARS & HEALTH ALLIANCES"}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {PARTNERS.map((p) => (
              <div key={p.id} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <span className="text-2xl">{p.logo}</span>
                <span className={`text-[11.5px] font-mono font-bold ${isDark ? "text-stone-300" : "text-slate-800"}`}>
                  {p.name} <span className="text-[9px] text-magenta block font-medium">{getLocalizedText(p.type, lang)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY OF ACCOMPLISHMENTS */}
      <section id="gallery" className={`py-20 ${isDark ? "bg-slate-950/40 border-t border-slate-900" : "bg-stone-50 border-t border-stone-250"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-magenta bg-magenta/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {lang === "fr" ? "Rapport en Images" : "Humanitarian Frames"}
            </span>
            <h2 className="text-3xl font-bold font-display mt-3 leading-snug">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Galerie des Actions " : "Accomplishments "}</span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "Terrain" : "Gallery"}</span>
            </h2>
          </div>

          <div className="flex justify-center gap-2 mb-8 select-none font-mono text-[10px] font-bold uppercase tracking-wider">
            {["all", "medical", "orphans", "family"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveGalleryFilter(f)}
                className={`px-4 py-1.5 rounded-lg border transition ${
                  activeGalleryFilter === f 
                    ? "bg-magenta text-white border-magenta" 
                    : isDark ? "bg-slate-900 text-gray-400 border-slate-800 hover:text-white" : "bg-white text-stone-700 border-stone-200"
                }`}
              >
                {f === "all" ? (lang === "fr" ? "Tout" : "All") : f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedGalleryImg(item.image)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-zoom-in border border-stone-200/10 shadow-sm"
              >
                <img 
                  referrerPolicy="no-referrer"
                  src={item.image} 
                  alt={getLocalizedText(item.title, lang)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[9px] font-mono font-bold text-magenta bg-magenta/10 px-2 py-0.5 rounded uppercase">
                    {getLocalizedText(item.category, lang)}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1.5 truncate">
                    {getLocalizedText(item.title, lang)}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LATEST NEWS & LOGISTICS BLOG */}
      <section id="news" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-black text-white bg-magenta px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "fr" ? "Bulletins d'Information" : "Solidarity Logs"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-slate-900 mt-3">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Actualités du " : "Direct From the "}</span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "Terrain" : "Field"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {NEWS.map((item) => (
              <div 
                key={item.id}
                className={`border rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start ${
                  isDark ? "bg-slate-900/40 border-slate-850" : "bg-white border-stone-200"
                }`}
              >
                <img 
                  referrerPolicy="no-referrer"
                  src={item.image} 
                  alt={getLocalizedText(item.title, lang)}
                  className="w-full md:w-36 h-36 rounded-lg object-cover bg-stone-100 shrink-0"
                />
                <div className="space-y-2 text-left">
                  <span className="text-[10px] text-magenta font-mono font-bold tracking-widest">{item.date}</span>
                  <h3 className={`text-base font-bold font-accent ${isDark ? "text-white" : "text-slate-900"}`}>{getLocalizedText(item.title, lang)}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">{getLocalizedText(item.excerpt, lang)}</p>
                  <p className="text-[11px] text-gray-405 leading-relaxed font-sans">{getLocalizedText(item.content, lang)}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (ACCORDION ACCESSIBLE FOR ELDERS) */}
      <section id="faq" className={`py-20 border-t ${isDark ? "bg-slate-950/30 border-slate-900" : "bg-stone-50 border-stone-250"}`}>
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-extrabold text-magenta bg-magenta/10 px-3 py-1 rounded-full uppercase">
              {lang === "fr" ? "Foire Aux Questions" : "Common Clarifications"}
            </span>
            <h2 className="text-3xl font-bold font-display mt-3 text-slate-900">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Des réponses à vos " : "Clear "}</span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "interrogations" : "Answers"}</span>
            </h2>
          </div>

          <div className="space-y-3 font-sans">
            {FAQS.map((faq) => {
              const isOpen = !!faqOpened[faq.id];
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? "border-magenta bg-magenta/[0.02]" 
                      : isDark ? "bg-slate-900/60 border-slate-850 hover:border-slate-700" : "bg-white border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center font-bold text-xs md:text-sm select-none focus:outline-none"
                  >
                    <span className={isDark ? "text-white" : "text-slate-900"}>{getLocalizedText(faq.question, lang)}</span>
                    <span className={`text-magenta text-base transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-500 leading-relaxed font-sans border-t border-gray-100/5 animate-fade-in">
                      {getLocalizedText(faq.answer, lang)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT WELL-FORM (EASY TO SUBMIT MESSAGESS) */}
      <section id="contact" className="py-20 border-t">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold text-magenta bg-magenta/10 px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "fr" ? "Écrire à nos Bénévoles" : "Reach our Office Helpers"}
            </span>
            <h2 className="text-3xl font-bold font-display mt-2 text-slate-800">
              <span className={isDark ? "text-white" : "text-slate-900"}>{lang === "fr" ? "Besoin d'un " : "How can we "}</span>
              <span className="text-magenta italic font-display">{lang === "fr" ? "renseignement ?" : "collaborate ?"}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Adresse physique coordinatrice d'aide internationale : +237657587129
            </p>
          </div>

          <form id="contact-form" onSubmit={handleContactSubmit} className={`p-6 border rounded-3xl space-y-4 ${
            isDark ? "bg-slate-900/50 border-slate-850" : "bg-white border-stone-200 shadow-sm"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <input 
                type="text" 
                required
                placeholder={lang === "fr" ? "Votre nom complet*..." : "Your name*..."}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className={`w-full py-3 px-4 border rounded-xl focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-stone-50 border-stone-150 text-slate-900 bg-white"
                }`}
              />
              <input 
                type="email" 
                required
                placeholder={lang === "fr" ? "Adresse email*..." : "Email coordinate*..."}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className={`w-full py-3 px-4 border rounded-xl focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-stone-50 border-stone-150 text-slate-900 bg-white"
                }`}
              />
            </div>
            <textarea 
              required
              rows={4}
              placeholder={lang === "fr" ? "Notez votre demande de renseignement ou d'encouragement..." : "Write your prompt coordinate..."}
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              className={`w-full text-xs py-3 px-4 border rounded-xl focus:outline-none focus:border-magenta ${
                isDark ? "bg-slate-950 text-white border-slate-800" : "bg-stone-50 border-stone-150 text-slate-900 bg-white"
              }`}
            />

            {contactSent && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs">
                {contactSuccessMsg}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-magenta text-white font-extrabold text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2"
            >
              <span>{lang === "fr" ? "Transmettre le message" : "Transmit message"}</span>
              <Send size={13} />
            </button>
          </form>

        </div>
      </section>

      {/* FOOTER ACCUEIL ACCENT YELLOW/MAGENTA */}
      <footer className={`py-12 border-t font-sans mt-auto ${
        isDark ? "bg-slate-950 border-slate-900 text-stone-400" : "bg-stone-50 border-stone-200 text-stone-600"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-full bg-magenta flex items-center justify-center text-white font-mono text-sm font-bold">
                  ✚
                </div>
                <span className="text-sm font-black text-magenta font-accent tracking-widest uppercase">
                  {t("brand", lang)}
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {lang === "fr"
                  ? "Association solidaire agréée dédiée à l'accompagnement d'urgence des malades d'Afrique et à l'inclusion sociale active."
                  : "A registered solidary hub supporting clinical rescue and physical inclusion."}
              </p>
              <div className="text-magenta font-mono text-xs font-bold">
                Helpline: +237657587129
              </div>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                {lang === "fr" ? "Nos Combats" : "Intervention Sectors"}
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a onClick={() => scrollToSection("mission")} className="cursor-pointer hover:text-magenta transition">Medical Assistances</a></li>
                <li><a onClick={() => scrollToSection("mission")} className="cursor-pointer hover:text-magenta transition">Inclusion handicapés (Fauteuils)</a></li>
                <li><a onClick={() => scrollToSection("mission")} className="cursor-pointer hover:text-magenta transition">Secours Seniors déshérités</a></li>
                <li><a onClick={() => scrollToSection("mission")} className="cursor-pointer hover:text-magenta transition">Education orphelins</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                {lang === "fr" ? "Législation" : "Legislations"}
              </h4>
              <ul className="space-y-2 text-xs">
                <li><span className="cursor-not-allowed">Agrément CNPS N°2026/A-04</span></li>
                <li><span className="cursor-not-allowed">Rapport de Transparence Publique</span></li>
                <li><span className="cursor-not-allowed">Code de Déontologie Clinique</span></li>
                <li><span className="cursor-not-allowed">Zéro frais administratifs cachés</span></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                {lang === "fr" ? "Assistance Confidentielle" : "Secured Coordination Office"}
              </h4>
              <p className="text-xs leading-relaxed">
                {lang === "fr"
                  ? "Nos délégués reçoivent sur rendez-vous confidentiel. Une question WhatsApp ? Ligne directe Kamerun : 24h/24 au +237657587129."
                  : "For details, consult our regional coordinators on WhatsApp 24/7 helpline : +237657587129."}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200/20 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 font-mono gap-4">
            <p>© {new Date().getFullYear()} {t("brand", lang)} (AIDE-HUMANITAIRE). Tous droits réservés.</p>
            <p>Certified PCI-DSS Secure Escrowed Ledger Gateways.</p>
          </div>

        </div>
      </footer>

      {/* Zoom image modal */}
      {selectedGalleryImg && (
        <div 
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <img 
            referrerPolicy="no-referrer"
            src={selectedGalleryImg} 
            className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl" 
            alt="Expanded gallery file"
          />
        </div>
      )}

      {/* Floating Interactive Live Chat Assistant */}
      <AIAssistant lang={lang} />

    </div>
  );
}
