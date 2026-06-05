import { NavItem, StatItem, CauseItem, Campaign, Story, Testimonial, Partner, FAQItem, GalleryItem, NewsItem, DonorWallItem, RealtimeNotification } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: { fr: "Accueil", en: "Home" } },
  { id: "mission", label: { fr: "Notre Mission", en: "Our Mission" } },
  { id: "actions", label: { fr: "Nos Actions", en: "Our Actions" } },
  { id: "campaigns", label: { fr: "Campagnes", en: "Campaigns" } },
  { id: "donation", label: { fr: "Faire un Don", en: "Donate" } },
  { id: "aid-request", label: { fr: "Demander une Aide", en: "Request Aid" } },
  { id: "stories", label: { fr: "Histoires de Vie", en: "Life Stories" } },
  { id: "impact", label: { fr: "Impact Social", en: "Social Impact" } },
  { id: "gallery", label: { fr: "Galerie", en: "Gallery" } },
  { id: "news", label: { fr: "Actualités", en: "News" } },
  { id: "partners", label: { fr: "Partenaires", en: "Partners" } },
  { id: "faq", label: { fr: "FAQ", en: "FAQ" } },
  { id: "contact", label: { fr: "Contact", en: "Contact" } }
];

export const STATS: StatItem[] = [
  { id: "helped", count: 7500, suffix: "+", label: { fr: "Personnes Aidées", en: "People Helped" } },
  { id: "raised", count: 200000, prefix: "", suffix: " €", label: { fr: "Montant Collecté", en: "Amount Raised" } },
  { id: "donors", count: 104, suffix: "", label: { fr: "Donateurs Uniques", en: "Unique Donors" } },
  { id: "success", count: 13, suffix: "", label: { fr: "Campagnes Actives", en: "Active Campaigns" } },
  { id: "countries", count: 4, suffix: "", label: { fr: "Pays Particuliers", en: "Partner Countries" } }
];

export const CAUSES: CauseItem[] = [
  {
    id: "medical",
    category: "medical | handicap | elderly | family | orphan | emergency",
    title: { fr: "Aide Médicale & Soins", en: "Medical Aid & Healthcare" },
    shortDescription: {
      fr: "Prise en charge chirurgicale, traitements de pointe et cliniques mobiles d'urgence.",
      en: "Surgical support, cutting-edge treatments, and emergency mobile clinics."
    },
    longDescription: {
      fr: "Nous soutenons financièrement les opérations vitales, distribuons du matériel médical moderne et finançons des soins pédiatriques intensifs pour les familles qui n'ont aucune couverture médicale. Notre impact s'étend des zones rurales isolées aux hôpitaux métropolitains saturés.",
      en: "We financially support life-saving operations, distribute modern medical equipment, and fund pediatric intensive care for families with no medical coverage. Our impact extends from isolated rural areas to saturated metropolitan hospitals."
    },
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?q=80&w=700&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-surgeons-performing-a-surgical-operation-in-operating-room-41334-large.mp4",
    impactStats: {
      fr: ["4 200 chirurgies financées", "25 cliniques mobiles de terrain", "150 tonnes de matériel médical"],
      en: ["4,200 surgery procedures funded", "25 field mobile clinics", "150 tons of medical equipment"]
    }
  },
  {
    id: "handicap",
    category: "medical | handicap | elderly | family | orphan | emergency",
    title: { fr: "Un Avenir pour l'Inclusion", en: "A Future of Inclusion" },
    shortDescription: {
      fr: "Fauteuils roulants électriques, prothèses adaptées et programmes d'autonomie financière.",
      en: "Electric wheelchairs, customized prosthetics, and financial autonomy programs."
    },
    longDescription: {
      fr: "L'autonomie est un droit fondamental. En fournissant des technologies d'assistance personnalisées et en créant des pôles de formation professionnelle adaptés, nous offrons aux personnes handicapées physiques ou intellectuelles les outils nécessaires pour s'intégrer pleinement dans la société.",
      en: "Autonomy is a fundamental right. By providing custom assistive technologies and building adapted professional training hubs, we empower people with physical or cognitive challenges to fully integrate into society."
    },
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=700&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-learning-to-walk-with-prosthetic-leg-45318-large.mp4",
    impactStats: {
      fr: ["1 800 fauteuils roulants distribués", "450 prothèses sur-mesure", "89% de taux de retour à l'emploi"],
      en: ["1,800 wheelchairs distributed", "450 custom prosthetics", "89% job integration rate"]
    }
  },
  {
    id: "elderly",
    category: "medical | handicap | elderly | family | orphan | emergency",
    title: { fr: "Dignité pour nos Aînés", en: "Dignity for Our Elders" },
    shortDescription: {
      fr: "Soins à domicile, bris de l'isolement et soutien alimentaire pour les anciens démunis.",
      en: "In-home care, isolation prevention, and direct feeding supports for seniors."
    },
    longDescription: {
      fr: "Nos aînés méritent de vieillir dans la paix et la sécurité. Nous organisons des visites de bénévoles régulières, finançons des soins de santé gériatriques spécifiques et distribuons des panier repas équilibrés aux personnes âgées isolées ou sans retraite décente.",
      en: "Our elders deserve to age in peace and security. We organize routine volunteer home visits, fund specific geriatric healthcare, and distribute balanced warm nutrition to isolated or pensionless elderly people."
    },
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=700&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-caregiver-helping-older-man-walk-down-a-hallway-42407-large.mp4",
    impactStats: {
      fr: ["3 100 seniors accompagnés", "120 000 repas chauds livrés", "12 foyers d'accueil rénovés"],
      en: ["3,100 accompanied seniors", "120,000 warm meals delivered", "12 nursing homes refurbished"]
    }
  },
  {
    id: "family",
    category: "medical | handicap | elderly | family | orphan | emergency",
    title: { fr: "Soutien aux Familles", en: "Support for Families" },
    shortDescription: {
      fr: "Micro-crédits solidaires, aide d'urgence et accès à l'eau potable.",
      en: "Solidarity micro-credits, urgent lifelines, and access to clean water."
    },
    longDescription: {
      fr: "Nous aidons les familles en détresse à rebondir. Grâce à une assistance alimentaire d'urgence couplée à des micro-subventions pour le lancement de petites activités agricoles ou commerciales rurale, nous brisons durablement le cycle de la pauvreté générationnelle.",
      en: "We help struggling families bounce back. Through urgent food assistance paired with micro-grants for starting agricultural or rural business initiatives, we sustainably break the cycle of generational poverty."
    },
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=700&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-poor-family-eating-rice-together-on-a-mat-45308-large.mp4",
    impactStats: {
      fr: ["2 500 familles sorties de la précarité", "85 puits d'eau construits", "500 micro-entreprises lancées"],
      en: ["2,500 families lifted out of poverty", "85 manual water wells built", "500 micro-businesses started"]
    }
  },
  {
    id: "orphan",
    category: "medical | handicap | elderly | family | orphan | emergency",
    title: { fr: "Éducation & Épanouissement", en: "Education & Growth for Orphans" },
    shortDescription: {
      fr: "Parrainage scolaire complet, bourses d'études et soutien psychologique.",
      en: "Complete school sponsorships, academic scholarships, and psychological support."
    },
    longDescription: {
      fr: "Les orphelins sont les piliers de notre avenir commun. Nous offrons des structures d'accueil familiales stables et sûres, prenons en charge la totalité de leurs frais de scolarité, fournissons des cartables et assurons un accompagnement psychologique de haute qualité.",
      en: "Orphans represent the template of our shared future. We offer safe, stable family environments, cover 100% of their academy tuition, supply materials, and assure high-level trauma rehabilitation care."
    },
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kids-playing-and-laughing-in-a-sunny-classroom-45344-large.mp4",
    impactStats: {
      fr: ["1 250 orphelins scolarisés", "98% de taux de réussite scolaire", "5 orphelinats d'excellence construits"],
      en: ["1,250 orphans cataloged in schools", "98% academic success rate", "5 state-of-the-art orphanages built"]
    }
  },
  {
    id: "emergency",
    category: "medical | handicap | elderly | family | orphan | emergency",
    title: { fr: "Urgences & Catastrophes", en: "Emergencies & Disaster relief" },
    shortDescription: {
      fr: "Approvisionnement éclair, logistique de terrain et ponts aériens de secours.",
      en: "Lightning supply logistics, field rescue, and humanitarian airlift bridges."
    },
    longDescription: {
      fr: "Lorsqu'une catastrophe frappe, chaque minute compte. Nos équipes d'intervention rapide déploient immédiatement des tentes chauffées, de la nourriture énergétique réactive, de l'eau purifiée et des kits de premiers secours pour stabiliser les zones dévastées.",
      en: "When a disaster strikes, every minute counts. Our rapid action task forces deploy winterized shelter tents, emergency nourishment rations, pure water generation, and paramedic gear to stabilize devastated coordinates."
    },
    image: "https://images.unsplash.com/photo-1469571486040-af250c558d63?q=80&w=700&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-first-responders-working-in-a-disaster-zone-with-flares-45322-large.mp4",
    impactStats: {
      fr: ["15 crises majeures résolues", "40 000 tentes de secours montées", "90 minutes de temps de déploiement"],
      en: ["15 major crises resolved", "40,000 emergency shelters built", "90-minute deployment response time"]
    }
  }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: "camp-01",
    title: { fr: "Opérations du Cœur pour 50 Enfants", en: "Heart Surgeries for 50 Vulnerable Children" },
    story: {
      fr: "Des dizaines d'enfants atteints de malformations cardiaques congénitales graves attendent une opération d'urgence pour survivre. Sans couverture de soins, leurs familles font face à l'impossible. Votre aide finance la chirurgie, le séjour en soins intensifs et la médication post-opératoire.",
      en: "Dozens of young children with congenital heart problems desperately wait for critical surgeries to survive. Left without medical resources, their families face the unthinkable. Your donation covers the complex surgeon fees, post-op life support and medications."
    },
    goal: 150000,
    raised: 112450,
    backersCount: 1420,
    daysRemaining: 12,
    category: "medical",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=700&auto=format&fit=crop",
    beneficiary: { fr: "Hôpital Pédiatrique de l'Espoir", en: "Hope Children's Specialist Hospital" }
  },
  {
    id: "camp-02",
    title: { fr: "Fauteuils Électriques connectés pour l'Autonomie", en: "Connected Mobility Wheels for Autonomy" },
    story: {
      fr: "Permettre à de jeunes adolescents handicapés d'accéder à l'école de manière totalement indépendante. Notre campagne finance l'acquisition et l'adaptation ergonomique de fauteuils roulants motorisés robustes et légers.",
      en: "Empowering young physical challengers with custom motorized mobility wheels so they can attend educational academy commutes unassisted. This campaign sponsors lightweight high-grade motor chairs."
    },
    goal: 80000,
    raised: 68100,
    backersCount: 785,
    daysRemaining: 18,
    category: "handicap",
    image: "https://images.unsplash.com/photo-1534761049852-325012a2c02c?q=80&w=700&auto=format&fit=crop",
    beneficiary: { fr: "Jeunes d'Avenir Handicap", en: "Youth Inclusion Collective" }
  },
  {
    id: "camp-03",
    title: { fr: "Puits d'Eau Solaire et Agriculture Familiale", en: "Solar-Powered Clean Water & Safe Agro" },
    story: {
      fr: "L'accès à l'eau potable transforme des communautés entières. Nous construisons 12 puits de forage alimentés à l'énergie solaire pour fournir de l'eau salubre à plus de 5 000 villageois ruraux et arroser de petits potagers communautaires.",
      en: "Guarantees around clean running water completely pivot small communities. We are constructing 12 deep water solar pumps for 5,000 rural residents, alongside supporting local community-led organic farms."
    },
    goal: 120000,
    raised: 45000,
    backersCount: 520,
    daysRemaining: 29,
    category: "family",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=700&auto=format&fit=crop",
    beneficiary: { fr: "Région Agricole de Mali-Est", en: "East Malian Agro Co-Op" }
  },
  {
    id: "camp-04",
    title: { fr: "Bourses Scolaires Complètes et Logement", en: "Full Academy Tuition Sponsorship & Board" },
    story: {
      fr: "Parrainer des enfants orphelins de zones sinistrées en finançant la totalité de leur scolarité, leur uniforme, leurs manuels scolaires et un logement serein avec suivi éducatif sur 5 ans.",
      en: "Sponsor vulnerable kids with high-fidelity orphan status in rural zones by covering 100% of academy tuition, uniforms, manuals, and secure comfortable boarding alongside mentor care for 5 years."
    },
    goal: 95000,
    raised: 91400,
    backersCount: 1105,
    daysRemaining: 4,
    category: "orphan",
    image: "https://images.unsplash.com/photo-1544281679-5139ee530a27?q=80&w=700&auto=format&fit=crop",
    beneficiary: { fr: "Orphelinat de la Bienveillance", en: "Benevolence Orphanage Center" }
  }
];

export const STORIES: Story[] = [
  {
    id: "story-01",
    name: "Yasmine, 8 ans",
    location: { fr: "Dakar, Sénégal", en: "Dakar, Senegal" },
    before: {
      fr: "Atteinte d'une malformation oculaire progressive bilatérale lourde, Yasmine perdait lentement la vue. Sa famille vivait sous le seuil de pauvreté extrême et ne parvenait pas à payer la micro-chirurgie nécessaire.",
      en: "Diagnosed with heavy progressive bilateral visual impairment, Yasmine was gradually losing her sight. Her loving family lived below absolute poverty lines and couldn't spare the surgery amount."
    },
    after: {
      fr: "Grâce à notre campagne 'Soin des Yeux', Yasmine a bénéficié d'une double greffe oculaire par un chirurgien expert. Aujourd'hui, elle est retournée à l'école et dessine chaque jour des paysages colorés.",
      en: "Sponsored via our 'Vision Campaign', Yasmine successfully underwent expert micros surgery restoration. Today, she returned to standard primary classes, coloring beautiful landscapes every morning."
    },
    quote: {
      fr: "Je peux enfin voir les visages de mes amis et le tableau de l'école. Merci d'avoir redonné de la couleur à ma vie !",
      en: "I can finally look at my friends' faces and see the school blackboards. Thank you so much for bringing colors back to my day!"
    },
    imageBefore: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700&auto=format&fit=crop",
    impactMetric: { fr: "Vue restaurée à 100%", en: "100% Sight Restoration" }
  },
  {
    id: "story-02",
    name: "Moussa, 14 ans",
    location: { fr: "Bamako, Mali", en: "Bamako, Mali" },
    before: {
      fr: "Moussa a perdu l'usage de ses deux jambes à l'adolescence. Isolé chez lui, il avait dû abandonner l'école à cause de l'inaccessibilité physique des transports et du manque de matériel décent.",
      en: "Moussa lost physical controls of both lower legs during young age. Trapped, isolated at home, he had to give up elementary school due to long walking distances & zero mechanical supports."
    },
    after: {
      fr: "Nous lui avons fourni un fauteuil électrique connecté et une bourse technologique. Ses résultats en calcul et logique sont brillants et il ambitionne de devenir ingénieur informatique.",
      en: "We sponsored a sturdy custom solar charged wheelchair and a smart laptop scholarship. He achieved exceptional scores in mathematics and targets a software engineer career path."
    },
    quote: {
      fr: "Le fauteuil a brisé mes murs. Je ne suis plus spectateur, je suis acteur de mon parcours d'apprentissage.",
      en: "This chair completely shattered the boundaries holding me. I am no longer a bystander; I am leading my own education path."
    },
    imageBefore: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=700&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=700&auto=format&fit=crop",
    impactMetric: { fr: "Premier de sa classe de mathématiques", en: "Ranked 1st in Mathematics Class" }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-01",
    name: "Sarah Lindqvist",
    role: { fr: "Donatrice Régulière (Suède)", en: "Mounthly Backer (Sweden)" },
    message: {
      fr: "La transparence totale et les suivis réguliers par email avec photos et budgets clairs me rassurent. C’est la seule plateforme où j'ai pu voir l’impact de chaque centime.",
      en: "The total transparency, direct tracking reports with budget spreadsheets and direct beneficiary photos gives me endless confidence. This is the only platform where every dollar is detailed."
    },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=205&auto=format&fit=crop"
  },
  {
    id: "test-02",
    name: "Dr. Marc Dubois",
    role: { fr: "Chirurgien Bénévole (France)", en: "Volunteer Surgeon (France)" },
    message: {
      fr: "La logistique médicale mise en place est exceptionnelle. Les blocs de chirurgie sont installés avec professionnalisme et des vies d'enfants sont concrètement sauvées chaque jour.",
      en: "The medical logistic support is remarkable. Operating rooms are constructed in isolated territories with surgical levels, conserving precious infant lives on daily basis."
    },
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"
  }
];

export const PARTNERS: Partner[] = [
  { id: "part-01", name: "Red Cross Intl", type: { fr: "Partenaire Logistique", en: "Logistics Partner" }, logo: "🔴" },
  { id: "part-02", name: "UN Global Coalition", type: { fr: "Soutien Institutionnel", en: "Institutional Backer" }, logo: "🇺🇳" },
  { id: "part-03", name: "Skrill Payments", type: { fr: "Passerelle Sécurisée", en: "Payment Provider" }, logo: "💳" },
  { id: "part-04", name: "Wise Union", type: { fr: "Transferts Internationaux", en: "Transfer Network" }, logo: "🦉" },
  { id: "part-05", name: "Doctors Without Walls", type: { fr: "Coopération Médicale", en: "Medical Alliance" }, logo: "🩺" },
  { id: "part-06", name: "Green Energy Solar", type: { fr: "Énergie Verte Tech", en: "Solar Infrastructure" }, logo: "☀️" }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-01",
    question: { fr: "Comment puis-je être sûr de l'utilisation de mon don ?", en: "How can I be completely sure where my money goes?" },
    answer: {
      fr: "La transparence est notre valeur fondamentale. Chaque campagne dispose d'un rapport budgétaire détaillé et audité en public. Nous envoyons également des reçus fiscaux, des photos authentiques et des vidéos réelles des projets accomplis sur le terrain avec les fonds collectés.",
      en: "Transparency sits at our absolute core. Every campaign holds detailed, publicly viewable audited budget logs. We transmit official tax receipts, genuine photos, and actual video recordings highlighting the finalized project milestones."
    }
  },
  {
    id: "faq-02",
    question: { fr: "Quelles sont les méthodes de versement disponibles ?", en: "What are the safe donation methods available?" },
    answer: {
      fr: "Nous soutenons les paiements sécurisés internationaux via Skrill et Wise (virements bancaires ultra-rapides et cartes bancaires mondiales). Les informations de paiement sont entièrement chiffrées de bout en bout et jamais stockées sur nos serveurs.",
      en: "We support fully secure international gateways using Skrill and Wise bank wire networks or global cards. Payment transmission vectors are entirely encrypted end-to-end and never logged on our database server nodes."
    }
  },
  {
    id: "faq-03",
    question: { fr: "Comment puis-je demander une aide humanitaire ?", en: "How can I officially submit an assistance request?" },
    answer: {
      fr: "Rendez-vous dans notre espace 'Demander une Aide' et remplissez le formulaire certifié. Vous devez nous fournir vos coordonnées, votre situation précise, une description de vos besoins réels et des justificatifs médicaux ou de situation. Notre comité étudiera le dossier sous 48h.",
      en: "Venture to our 'Request Aid' area and compile the secured request form details. You'll need to specify coordinates, precise family situation indicators, detailed medical logs, and ID assets. Our vetting committee validates requests within 48 hours."
    }
  },
  {
    id: "faq-04",
    question: { fr: "Puis-je suivre en temps réel la progression d'une campagne ?", en: "Can we track campaign milestones in real time?" },
    answer: {
      fr: "Absolument. Nos compteurs financiers et statistiques d'impact sont mis à jour en direct lors de chaque transaction. Vous verrez immédiatement le montant s'ajouter et la jauge de progression s'animer.",
      en: "Absolutely. Our financial meters, backer tallies, and social impact stats dynamically update on every individual transaction. You'll witness the totals increase and progress indicators animate instantly."
    }
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "gal-01",
    title: { fr: "Inauguration de la clinique mobile", en: "Mobile Clinic Launch Event" },
    category: { fr: "Aide Médicale", en: "Medical Aid" },
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: "gal-02",
    title: { fr: "Sourire retrouvé à la bibliothèque", en: "Orphan Library reading laughs" },
    category: { fr: "Orphelins", en: "Orphans Support" },
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: "gal-03",
    title: { fr: "Installation d'un puits d'eau potable", en: "Drilling Clean Drinking Water Well" },
    category: { fr: "Familles", en: "Family Resilience" },
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: "gal-04",
    title: { fr: "Livraison de fauteuils solaires durables", en: "Delivery of Sustainable Solar Wheelchairs" },
    category: { fr: "Personnes Handicapées", en: "Disabled Autonomy" },
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=700&auto=format&fit=crop"
  }
];

export const NEWS: NewsItem[] = [
  {
    id: "news-01",
    title: { fr: "Rapport Annuel 2025 : 3,2 Millions d'Impact", en: "2025 Impact Report: $3.2M Direct Field Support" },
    date: "2026-05-15",
    excerpt: {
      fr: "Notre rapport d'impact montre une efficacité record avec 93% des transferts dirigés vers les bénéficiaires directes.",
      en: "Our transparent balance sheet demonstrates peak efficiency with 93% of funding directed purely into operations."
    },
    content: {
      fr: "Grâce à nos donateurs du monde entier, nous avons accompli 142 campagnes l'année dernière. Nos audits financiers tiers concluent à une transparence et une maîtrise logistique de pointe, assurant un impact direct mémorable.",
      en: "Through our worldwide community, we successfully concluded 142 discrete relief initiatives. Our independent audits conclude peak compliance and low logistics friction, ensuring direct localized impact."
    },
    image: "https://images.unsplash.com/photo-1469571486040-af250c558d63?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: "news-02",
    title: { fr: "Déploiement d'urgence Séisme Zone Nord", en: "Emergency Ground Taskforce: North Earthquake Zone" },
    date: "2026-06-01",
    excerpt: {
      fr: "Nos équipes d'urgence ont atteint les coordonnées du sinistre en moins de 90 minutes après la première alerte.",
      en: "Our rapid response personnel deployed in the target coordinate under 90 minutes from the initial warning signal."
    },
    content: {
      fr: "De l'eau purifiée et 450 tentes thermiques isolées sont installées de manière intensive. Les dons reçus ces dernières 24h ont déjà financé l'achat de kits chirurgicaux pédiatriques de terrain supplémentaires.",
      en: "Pure water generator stations and 450 durable thermal emergency tents are active. Donations over the past 24 hours funded secondary battlefield pediatric medical bags for field doctors."
    },
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=700&auto=format&fit=crop"
  }
];

export const RECENT_DONORS: DonorWallItem[] = [
  { id: "don-1", name: "Alexandra M.", amount: 250, cause: { fr: "Opérations du Cœur", en: "Heart Surgeries" }, time: { fr: "Il y a 3 min", en: "3 mins ago" } },
  { id: "don-2", name: "Anonyme", amount: 50, cause: { fr: "Aide Médicale & Soins", en: "Medical Care Aid" }, time: { fr: "Il y a 12 min", en: "12 mins ago" }, isAnonymous: true },
  { id: "don-3", name: "Haruto T.", amount: 1000, cause: { fr: "Urgences & Catastrophes", en: "Emergency Rescue" }, time: { fr: "Il y a 22 min", en: "22 mins ago" } },
  { id: "don-4", name: "Jean-Paul D.", amount: 20, cause: { fr: "Dignité pour nos Aînés", en: "Dignity for Seniors" }, time: { fr: "Il y a 35 min", en: "35 mins ago" } },
  { id: "don-5", name: "Clara S.", amount: 150, cause: { fr: "Fauteuils Électriques", en: "Inclusion Wheelchairs" }, time: { fr: "Il y a 1 h", en: "1 hour ago" } }
];

export const MOCK_NOTIFICATIONS: RealtimeNotification[] = [
  { id: "nt-1", type: "donation", message: { fr: "Julien de Paris vient d'effectuer un don de 100 € !", en: "Julien from Paris just contributed $100!" }, time: "1m" },
  { id: "nt-2", type: "campaign", message: { fr: "Nouvelle Campagne Urgences Séisme lancée !", en: "Emergency Earthquake relief campaign launched!" }, time: "10m" },
  { id: "nt-3", type: "goal", message: { fr: "Objectif atteint pour 'Bourses Scolaires Orphelins' !", en: "Goal Achieved for 'Orphans School Bursaries'!" }, time: "32m" }
];
