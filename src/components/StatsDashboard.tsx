import React, { useState } from "react";
import { TrendingUp, Award, Utensils, HeartPulse, School, Accessibility, ShieldCheck, PieChart, Users, Heart, Globe, Flame } from "lucide-react";
import { Language } from "../types";
import { getLocalizedText } from "../translation";

interface StatsDashboardProps {
  lang: Language;
  raisedTotal: number;
  backersCount: number;
  isDark?: boolean;
}

export function StatsDashboard({ lang, raisedTotal, backersCount, isDark = false }: StatsDashboardProps) {
  const [selectedStatId, setSelectedStatId] = useState<string>("raised");

  // Custom localized months
  const months: Record<Language, string[]> = {
    fr: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
    ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"],
    de: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"],
    it: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug"],
    zh: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
    pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
    ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл"],
    sw: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"]
  };

  const activeMonths = months[lang] || months["fr"];

  // Custom trend curves for each category
  const STAT_DETAILS = [
    {
      id: "raised",
      icon: Heart,
      color: "#ff006e", // Magenta
      title: {
        fr: "Fonds Collectés (Euros)",
        en: "Amount Raised (Euros)",
        es: "Fondos Recaudados",
        ar: "الأموال التي تم جمعها",
        de: "Gesammelte Spenden",
        it: "Fondi Raccolti",
        zh: "已募集资金",
        pt: "Fundos Arrecadados",
        ru: "Собрано средств",
        sw: "Kiasi Kilichochangwa"
      },
      currentValue: `${raisedTotal.toLocaleString()} €`,
      targetValue: "200 000 €",
      milestones: [35000, 72000, 115000, 142000, 175000, 191000, raisedTotal],
      maxMilestone: 220000,
      description: {
        fr: "Évolution de notre fonds humanitaire mondial. Chaque versement est inscrit à notre registre de transparence.",
        en: "Growth of our worldwide humanitarian treasury. Every payment is logged for public accountability.",
        es: "Crecimiento de nuestros fondos globales. Transparencia certificada.",
        ar: "تطور الصندوق الإنساني العالمي مع مراجعة عامة.",
        de: "Wachstum unseres humanitären Fonds. Transparente Belege.",
        it: "Crescita dei fondi globali d'emergenza.",
        zh: "我们全球人道主义基金的成长记录。公开透明。",
        pt: "Evolução do fundo de ajuda emergencial pública.",
        ru: "Динамика гуманитарного фонда с открытой проверкой.",
        sw: "Ukuaji wa mfuko wa fedha za kibinadamu duniani."
      }
    },
    {
      id: "helped",
      icon: Users,
      color: "#ffd60a", // Yellow
      title: {
        fr: "Personnes Secourues",
        en: "People Helped",
        es: "Personas Ayudadas",
        ar: "أشخاص تم مساعدتهم",
        de: "Unterstützte Menschen",
        it: "Persone Aiutate",
        zh: "受助人员总数",
        pt: "Famílias Assistidas",
        ru: "Люди, получившие помощь",
        sw: "Watu Waliookolewa"
      },
      currentValue: "7 500+",
      targetValue: "7 500+",
      milestones: [1100, 2400, 3805, 4900, 5800, 6900, 7500],
      maxMilestone: 8000,
      description: {
        fr: "Courbe d'évolution du nombre total de bénéficiaires directs incluant l'aide médicale, les seniors et les personnes en situation de handicap.",
        en: "Evolution curve of direct beneficiaries including clinical surgery cases, elder companions, and disabled children.",
        es: "Curva del total de beneficiarios directos asistidos médicamente.",
        ar: "المستفيدين المباشرين من الرعاية الصحية وكبار السن.",
        de: "Entwicklungskurve der direkten Hilfeempfänger.",
        it: "Evoluzione dei beneficiari diretti delle operazioni.",
        zh: "受助人口增长曲线，包含医疗抢救、养老保障及伤残辅助。",
        pt: "Acompanhamento do total de beneficiários atendidos.",
        ru: "График роста числа прямых бенефициаров.",
        sw: "Kupanda kwa idadi ya watu walionufaika kwa misaada wetu."
      }
    },
    {
      id: "donors",
      icon: Award,
      color: "#ff006e",
      title: {
        fr: "Donateurs de Cœur",
        en: "Unique Donors",
        es: "Donantes Únicos",
        ar: "الجهات المانحة",
        de: "Spender Engagement",
        it: "Donatori Unici",
        zh: "爱心捐献者人数",
        pt: "Doadores Únicos",
        ru: "Уникальные спонсоры",
        sw: "Wafadhili wa Kipekee"
      },
      currentValue: backersCount.toString(),
      targetValue: "104",
      milestones: [12, 34, 55, 78, 89, 98, backersCount],
      maxMilestone: 120,
      description: {
        fr: "Membres actifs de notre collectivité de soutien. Le nombre d'acteurs de l'espoir progresse régulièrement à l'international.",
        en: "Active network of solidary sponsors. Our community continues to expand across countries.",
        es: "Comunidad activa de patrocinadores solidarios mundiales.",
        ar: "شبكة المانحين المتطوعين والداعمين المخلصين.",
        de: "Sponsorennetzwerk. Neue Botschafter der Solidarität.",
        it: "Donatori di tutto il mondo uniti in rete.",
        zh: "爱心赞助社区，全球合作伙伴不断增加。",
        pt: "Membros dedicados em nossa aliança global de esperança.",
        ru: "Сеть поддержки уникальных спонсоров.",
        sw: "Wanaumoja wanaozidi kujitolea kila siku."
      }
    },
    {
      id: "campaigns",
      icon: Flame,
      color: "#ffd60a",
      title: {
        fr: "Campagnes Réussies",
        en: "Succesful Projects",
        es: "Campañas Exitosas",
        ar: "حملات إنسانية ناجحة",
        de: "Erfolgreiche Kampagnen",
        it: "Campagne Concluse",
        zh: "成功的筹款项目",
        pt: "Campanhas Concluídas",
        ru: "Завершенные проекты",
        sw: "Kampeni Zilizofanikiwa"
      },
      currentValue: "13",
      targetValue: "13",
      milestones: [2, 4, 6, 8, 10, 11, 13],
      maxMilestone: 15,
      description: {
        fr: "Campagnes chirurgicales et d'inclusion d'urgence entièrement clôturées et concrétisées avec succès sur le terrain.",
        en: "Emergency surgical/inclusion campaigns closed and fully materialized on site.",
        es: "Campañas de emergencia médica financiadas con éxito.",
        ar: "الحملات الطبية والطارئة المفتوحة والمغلقة بنجاح.",
        de: "Medizinische Hilfsaktionen erfolgreich umgesetzt.",
        it: "Progetti sul campo completati con trasparenza.",
        zh: "紧急医疗与包容援助项目，均已按目标圆满完成。",
        pt: "Projetos financiados plenamente executados na prática.",
        ru: "Успешные завершенные гуманитарные сборы.",
        sw: "Kampeni zote za matibabu zilizomalizika kwa mafanikio."
      }
    },
    {
      id: "countries",
      icon: Globe,
      color: "#ff006e",
      title: {
        fr: "Pays Particuliers",
        en: "Special Zones",
        es: "Países de Enfoque",
        ar: "الدول الأكثر احتياجاً",
        de: "Schwerpunktländer",
        it: "Paesi Cooperatori",
        zh: "特别关注国家",
        pt: "Países Parceiros",
        ru: "Страны присутствия",
        sw: "Nchi Zenye Miradi"
      },
      currentValue: "4",
      targetValue: "4",
      milestones: [1, 2, 2, 3, 3, 4, 4],
      maxMilestone: 5,
      description: {
        fr: "Zones géographiques d'intervention permanente où nos équipes de volontaires agissent chaque jour pour soulager la vulnérabilité.",
        en: "Geographic territories holding permanent field volunteer bases working 24/7.",
        es: "Zonas geográficas con voluntariado permanente activo.",
        ar: "المناطق الجغرافية ذات الوجود الإنساني الدائم.",
        de: "Länder mit permanenten Rettungszentren.",
        it: "Aree di intervento permanente con logistica attiva.",
        zh: "设有长期志愿服务站、提供全天候支持的重点国家。",
        pt: "Territórios soberanos com equipes locais instaladas.",
        ru: "Регионы постоянного присутствия гуманитарных миссий.",
        sw: "Maeneo maalum yaliyo na ofisi za kudumu za misaada."
      }
    }
  ];

  const currentStat = STAT_DETAILS.find(s => s.id === selectedStatId) || STAT_DETAILS[0];

  // Point geometry helper for SVG math
  const getPointsPath = (data: number[], max: number) => {
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 95 - (val / max) * 85; 
      return `${x},${y}`;
    }).join(" ");
  };

  const getPointsArea = (data: number[], max: number) => {
    const points = getPointsPath(data, max);
    return `0,95 ${points} 100,95`;
  };

  return (
    <div 
      id="evolution-curves-dashboard" 
      className={`border rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl transition-all duration-300 ${
        isDark 
          ? "bg-slate-900/90 border-slate-800 text-white" 
          : "bg-white border-slate-200 text-slate-800 shadow-slate-100"
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 uppercase font-mono tracking-widest text-[10px] text-magenta font-semibold mb-1">
          <TrendingUp size={12} />
          <span>{lang === "fr" ? "Indicateurs d'Évolution Récents" : "Metric Performance & Curves"}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight leading-snug">
          {lang === "fr" ? "Courbes de Progrès et Transparence" : "Interactive Progress Splines"}
        </h3>
        <p className="text-xs text-gray-500 mt-1 max-w-2xl">
          {lang === "fr" 
            ? "Cliquez sur une statistique pour charger la courbe d'évolution mensuelle certifiée correspondante."
            : "Click any metric card below to dynamically view its authenticated monthly evolution spline curve."}
        </p>
      </div>

      {/* Stat Grid toggles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 select-none font-sans">
        {STAT_DETAILS.map((stat) => {
          const Icon = stat.icon;
          const isSelected = selectedStatId === stat.id;
          return (
            <button
              key={stat.id}
              id={`stat-toggle-btn-${stat.id}`}
              onClick={() => setSelectedStatId(stat.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? `shadow-md border-magenta ring-1 ring-magenta ${isDark ? "bg-slate-950/80" : "bg-neutral-50"}`
                  : `${isDark ? "bg-slate-900 border-slate-800/80 hover:border-slate-700" : "bg-neutral-50/50 border-stone-200 hover:border-stone-300"}`
              }`}
            >
              {/* Highlight ribbon representing brand color code */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1" 
                style={{ backgroundColor: stat.color }}
              />

              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] font-bold text-gray-400 truncate uppercase tracking-wider block max-w-[85%]">
                  {getLocalizedText(stat.title, lang)}
                </span>
                <div 
                  className={`p-1.5 rounded-lg text-white scale-90 ${isSelected ? "animate-pulse" : ""}`}
                  style={{ backgroundColor: stat.color }}
                >
                  <Icon size={14} />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xl font-black font-mono tracking-tight flex items-baseline gap-1" style={{ color: isSelected ? stat.color : "inherit" }}>
                  <span>{stat.currentValue}</span>
                </div>
                <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                  Goal: {stat.targetValue}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Spline Area Container */}
      <div className={`p-5 rounded-2xl border ${isDark ? "bg-slate-950/40 border-slate-800" : "bg-stone-50 border-stone-150"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Curve plot visual details */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span className="font-bold flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentStat.color }} />
                {getLocalizedText(currentStat.title, lang)}
              </span>
              <span>{lang === "fr" ? "Registre Certifié 2026" : "Certified Ledger 2026"}</span>
            </div>

            {/* Graph wrapper */}
            <div className={`relative aspect-[3/1.2] w-full p-4 border rounded-xl overflow-hidden shadow-inner ${isDark ? "bg-slate-950 border-slate-900" : "bg-white border-stone-200"}`}>
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="w-full h-full overflow-visible"
              >
                {/* Horizontal guide marks */}
                <line x1="0" y1="20" x2="100" y2="20" stroke={isDark ? "#1e293b" : "#f5f5f4"} strokeDasharray="3" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke={isDark ? "#1e293b" : "#f5f5f4"} strokeDasharray="3" strokeWidth="0.5" />
                <line x1="0" y1="80" x2="100" y2="80" stroke={isDark ? "#1e293b" : "#f5f5f4"} strokeDasharray="3" strokeWidth="0.5" />

                {/* Shaded support block */}
                <polygon 
                  points={getPointsArea(currentStat.milestones, currentStat.maxMilestone)} 
                  fill={`url(#line-gradient-${currentStat.id})`}
                  className="opacity-25"
                />

                {/* Curve Line */}
                <path 
                  d={`M ${getPointsPath(currentStat.milestones, currentStat.maxMilestone).replace(/ /g, " L ")}`}
                  fill="none" 
                  stroke={currentStat.color} 
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Circle knots */}
                {currentStat.milestones.map((val, idx) => {
                  const x = (idx / (currentStat.milestones.length - 1)) * 100;
                  const y = 95 - (val / currentStat.maxMilestone) * 85;
                  return (
                    <circle 
                      key={idx}
                      cx={x}
                      cy={y}
                      r="1.2"
                      fill={isDark ? "#020617" : "#ffffff"}
                      stroke={currentStat.color}
                      strokeWidth="0.8"
                    />
                  );
                })}

                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id={`line-gradient-${currentStat.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={currentStat.color} />
                    <stop offset="100%" stopColor={currentStat.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* X-Axis labels */}
            <div className="flex justify-between px-2 text-[10px] font-mono text-gray-500 font-bold">
              {activeMonths.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>
          </div>

          {/* Descriptive text block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-1.5 h-6 rounded-full" 
                style={{ backgroundColor: currentStat.color }}
              />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                {lang === "fr" ? "Description & Rapport" : "Story & Report"}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-gray-500 font-sans italic">
              "{getLocalizedText(currentStat.description, lang)}"
            </p>

            <div className={`p-4 rounded-xl border flex gap-3 text-xs ${isDark ? "bg-slate-900/60 border-slate-800" : "bg-stone-50 border-stone-200"}`}>
              <ShieldCheck size={18} className="text-[#ff006e] shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold">
                  {lang === "fr" ? "Allocation de Solidarité" : "Secured Human Rights"}
                </span>
                <span className="text-gray-400 text-[11px] mt-1 block">
                  {lang === "fr" 
                    ? "Nos audits sont enregistrés sous protocole de transparence publique."
                    : "Every impact metrics is linked back to our digital public ledger logs."}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
