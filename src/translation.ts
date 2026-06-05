import { Language } from "./types";

export interface TransDict {
  [key: string]: {
    [lang in Language]?: string;
  };
}

export const UI_TRANSLATIONS: TransDict = {
  // Brand & Slogans
  brand: {
    fr: "AIDE-HUMANITAIRE",
    en: "AIDE-HUMANITAIRE",
    es: "AYUDA-HUMANITARIA",
    ar: "المساعدة الإنسانية",
    de: "HUMANITÄRE HILFE",
    it: "AIUTO-UMANITARIO",
    zh: "人道主义援助",
    pt: "AJUDA-HUMANITÁRIA",
    ru: "ГУМАНИТАРНАЯ ПОМОЩЬ",
    sw: "MSAADA WA KIBINADAMU"
  },
  slogan: {
    fr: "Unir les coeurs, préserver des vies. Agir avec amour.",
    en: "Uniting hearts, preserving lives. Act with love.",
    es: "Uniendo corazones, preservando vidas. Actuar con amor.",
    ar: "توحيد القلوب، الحفاظ على الحياة. العمل بحب.",
    de: "Herzen vereinen, Leben bewahren. Mit Liebe handeln.",
    it: "Unire i cuori, preservare le vite. Agire con amore.",
    zh: "凝聚爱心，挽救生命。用爱行动。",
    pt: "Unindo corações, preservando vidas. Agir com amor.",
    ru: "Объединяя сердца, спасаем жизни. Действуем с любовью.",
    sw: "Kuunganisha mioyo, kuokoa maisha. Tenda kwa upendo."
  },
  cta_donate: {
    fr: "Faire un Don",
    en: "Donate Now",
    es: "Donar Ahora",
    ar: "تبرع الآن",
    de: "Jetzt Spenden",
    it: "Dona Ora",
    zh: "立即捐款",
    pt: "Doar Agora",
    ru: "Пожертвовать",
    sw: "Toa Msaada"
  },
  cta_volunteer: {
    fr: "Devenir Bénévole",
    en: "Become Volunteer",
    es: "Ser Voluntario",
    ar: "كن متطوعاً",
    de: "Freiwilliger Werden",
    it: "Diventa Volontario",
    zh: "成为志愿者",
    pt: "Seja Voluntário",
    ru: "Стать волонтером",
    sw: "Kuwa Mjitoleaji"
  },
  cta_request: {
    fr: "Demander Assistance",
    en: "Request Support",
    es: "Solicitar Ayuda",
    ar: "طلب المساعدة",
    de: "Hilfe Anfordern",
    it: "Richiedi Aiuto",
    zh: "请求援助",
    pt: "Solicitar Ajuda",
    ru: "Запросить помощь",
    sw: "Omba Msaada"
  },
  phone_helpline: {
    fr: "Ligne Urgence non-surtaxée : +237657587129",
    en: "Toll-Free Emergency Helpline: +237657587129",
    es: "Línea Directa Gratuitas: +237657587129",
    ar: "خط الطوارئ المجاني: +237657587129",
    de: "Zollfreie Notrufnummer: +237657587129",
    it: "Numero Emergenza Gratuito: +237657587129",
    zh: "免费紧急求助热线: +237657587129",
    pt: "Linha de Emergência Gratuita: +237657587129",
    ru: "Горячая линия помощи (бесплатно): +237657587129",
    sw: "Nambari ya Dharura: +237657587129"
  },
  // Accessibility & Interface settings
  light_mode: {
    fr: "Ambiance Lumineuse",
    en: "Bright Mode",
    es: "Modo Claro",
    ar: "الوضع المضيء",
    de: "Heller Modus",
    it: "Modalità Chiara",
    zh: "明亮模式",
    pt: "Modo Claro",
    ru: "Светлый режим",
    sw: "Hali ya Mwangaza"
  },
  dark_mode: {
    fr: "Ambiance Sombre",
    en: "Dark Mode",
    es: "Modo Oscuro",
    ar: "الوضع المظلم",
    de: "Dunkler Modus",
    it: "Modalità Scura",
    zh: "深色模式",
    pt: "Modo Escuro",
    ru: "Темный режим",
    sw: "Hali ya Giza"
  },
  help_for_elders: {
    fr: "Dignité Seniors",
    en: "Elders Dignity",
    es: "Dignidad Mayores",
    ar: "كرامة كبار السن",
    de: "Würde Für Ältere",
    it: "Dignità Anziani",
    zh: "尊严安老",
    pt: "Dignidade Idosos",
    ru: "Забота о пожилых",
    sw: "Heshima kwa Wazee"
  },
  disabled_inclusion: {
    fr: "Inclusion Handicap",
    en: "Disable Inclusion",
    es: "Inclusión Discapacidad",
    ar: "دمج ذوي الاحتياجات",
    de: "Inklusion Behinderung",
    it: "Inclusione Disabili",
    zh: "残障包容",
    pt: "Inclusão Deficientes",
    ru: "Инклюзия инвалидов",
    sw: "Ushirikishwaji Walemavu"
  },
  medical_aid: {
    fr: "Secours Médical",
    en: "Medical Rescue",
    es: "Socorro Médico",
    ar: "الإغاثة الطبية",
    de: "Medizinische Hilfe",
    it: "Soccorso Medico",
    zh: "医疗救助",
    pt: "Socorro Médico",
    ru: "Медицинская помощь",
    sw: "Msaada wa Matibabu"
  },
  extreme_poverty: {
    fr: "Solidarité Familles",
    en: "Family Solidarity",
    es: "Solidaridad Familiar",
    ar: "التضامن الأسري",
    de: "Familien Solidarität",
    it: "Solidarietà Famiglie",
    zh: "家庭互助",
    pt: "Solidariedade Familiar",
    ru: "Семейная солидарность",
    sw: "Umoja wa Familia"
  },
  // Sections navigation fallback names
  section_mission: {
    fr: "Notre Combat & Mission",
    en: "Our Mission & Fight",
    es: "Nuestra Misión",
    ar: "مهمتنا الإنسانية",
    de: "Unsere Mission",
    it: "La Nostra Missione",
    zh: "我们的愿景",
    pt: "Nossa Missão",
    ru: "Наша миссия",
    sw: "Lengo Letu"
  },
  active_campaigns: {
    fr: "Campagnes Actives",
    en: "Urgent Campaigns",
    es: "Campañas Activas",
    ar: "الحملات العاجلة",
    de: "Dringende Spendenaufrufe",
    it: "Campagne Attive",
    zh: "紧急求助募捐",
    pt: "Campanhas Urgentes",
    ru: "Срочные сборы средств",
    sw: "Kampeni Zinazoendelea"
  },
  realtime_donor_wall: {
    fr: "Mur des Généreux Donateurs",
    en: "Generous Supporters Wall",
    es: "Muro de Donantes",
    ar: "لوحة الشرف للمانحين",
    de: "Spender-Wertschätzungswand",
    it: "Bacheca dei Donatori",
    zh: "爱心捐助芳名录",
    pt: "Mural de Doadores",
    ru: "Стена почета дарителей",
    sw: "Ukuta wa Wafadhili"
  }
};

/**
 * Robust translator helper. Reads key from translations. If translation is not found,
 * it returns the string or falls back cleanly to French or English.
 */
export function t(key: string, lang: Language): string {
  const item = UI_TRANSLATIONS[key];
  if (!item) return key;
  return item[lang] || item["fr"] || item["en"] || key;
}

/**
 * Safely fetches multilingual value from a data object.
 * Objects in data.ts might look like { fr: "...", en: "..." }.
 * If target lang is not fully defined, it falls back to fr, then en, then any string found.
 */
export function getLocalizedText(obj: any, lang: Language): string {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  if (obj[lang]) return obj[lang];
  return obj["fr"] || obj["en"] || Object.values(obj)[0] || "";
}
