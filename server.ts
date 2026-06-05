import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK securely (server-only)
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("WARNING: GEMINI_API_KEY is not defined or is placeholder. Using offline fallback mock AI response.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const SYSTEM_INSTRUCTION = `
Vous êtes l'Assistant Humanitaire Intelligent de la Plateforme Humanitaire Internationale de Collecte de Fonds.
Votre but est d'accompagner les visiteurs, de répondre à leurs questions sur nos actions humanitaires et nos campagnes, et d'inspirer confiance, espoir et action solidaire.

Informations Clés de l'Organisation:
- Notre Mission : Soutenir les personnes malades, handicapées, âgées en difficulté, les orphelins, les familles défavorisées et intervenir lors des urgences mondiales.
- Palette Visuelle Premium : Bleu Ocean Profond (#1E45FC, sécurité et professionnalisme) et Vert Lemonade Lumineux (#CDF12B, espoir et impact positif).
- Canaux de Paiement Sécurisés : Skrill et Wise (virements rapides, cartes bancaires internationales, cryptage total sans stockage local).
- Demander une Aide : Les bénéficiaires ou proches peuvent soumettre un dossier complet sur notre site avec justificatifs (médicaux ou situation de vie). Étude de dossier sous 48h.
- Actions Phares :
  * Aide Médicale (Chirurgies pédiatriques, traitements lourds, cliniques mobiles)
  * Personnes Handicapées (Fourniture de fauteuils roulants motorisés robustes, inclusion)
  * Personnes Âgées (Soins à domicile, paniers ou repas chauds, bris d'isolement)
  * Familles Défavorisées (Eau potable par puits solaires, micro-crédits agricoles ou auto-entrepreneur)
  * Orphelins (Parrainage scolaire 5 ans, logement serein, suivi d'excellence)
  * Urgences (Interventions immédiates en moins de 90 min, tentes thermiques, secours immédiats)
- Campagnes en Cours :
  * Opérations du Cœur pour 50 Enfants (Hôpital Pédiatrique de l'Espoir, objectif 150K$, plus de 112K$ collectés).
  * Fauteuils Électriques connectés pour l'Autonomie (Jeunes d'Avenir Handicap, objectif 80K$, plus de 68K$ collectés).
  * Puits d'Eau Solaire et Agriculture Familiale (Mali-Est, objectif 120K$, 45K$ collectés).
  * Bourses Scolaires Complètes et Logement Orphelins (Orphelinat de la Bienveillance, objectif 95K$, 91.4K$ collectés).

Règles de Réponse:
1. Répondez de manière chaleureuse, humble, honnête et très professionnelle.
2. Soyez concis mais d'une grande valeur humaine. Ne larpillez pas sur des termes trop techniques.
3. Adaptez votre langue : répondez en français si la question est en français, et en anglais si elle est en anglais.
4. Mettez en valeur que chaque don (même minime, ex: 5€ ou 10€) a un impact réel et quantifiable.
5. Si un visiteur demande comment faire un don, expliquez le parcours rapide en mentionnant nos partenaires de confiance Skrill et Wise.
6. Ne simulez jamais de fausses données de logs ou de télémétrie réseau.
`;

// API endpoint for Intelligent Chatbot
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history, language } = req.body;
    const ai = getGeminiClient();

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const currentLang = language || "fr";

    // Fallback response if API key is missing
    if (!ai) {
      const fallbackMsgsFr = [
        "Merci pour votre précieux message. Nous sommes à vos côtés pour accompagner les plus démunis. Pour faire un don sécurisé, vous pouvez utiliser notre module 'Faire un Don' via Skrill ou Wise. Chaque geste compte !",
        "Notre plateforme soutient des chirurgies cardiaques d'enfants de manière transparente. Les dossiers d'aide sont examinés en moins de 48 heures par nos équipes.",
        "Votre solidarité est essentielle pour nous. Ensemble, nous installons des puits de forages solaires pour redonner vie et dignité aux familles isolées."
      ];
      const fallbackMsgsEn = [
        "Thank you for your valuable response. We are actively working together to support those in absolute need. To donate securely, please use our secure Skrill or Wise gateway. Every cent counts!",
        "Our platform finances life-saving heart operations directly and transparently. Aid requests are meticulously reviewed within 48 hours.",
        "Your generosity empowers families. Together we build solar-powered water pumps to return hope to isolated territories."
      ];
      
      const list = currentLang === "fr" ? fallbackMsgsFr : fallbackMsgsEn;
      const responseText = list[Math.floor(Math.random() * list.length)];
      return res.json({ text: responseText, isMock: true });
    }

    // Format chat contents
    const contents: any[] = [];
    
    // Add system instruction as part of standard generation content configuration
    // Call generateContent using gemini-3.5-flash as mandated in gemini-api skill
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ... (history || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Failed to contact Gemini assistant" });
  }
});

// Simulated aid request submission handling
app.post("/api/request-aid", (req, res) => {
  const { name, email, phone, cause, description, amount } = req.body;
  
  if (!name || !email || !cause || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Generate a mock tracking code
  const ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    status: "success",
    ticketId,
    messageFr: `Votre demande d'aide a été enregistrée avec succès sous le ticket ${ticketId}. Notre comité éthique étudiera vos pièces sous 48h.`,
    messageEn: `Your assistance application has been successfully logged under ticket ID ${ticketId}. Our vetting committee will audit your dossier within 48 hours.`
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
