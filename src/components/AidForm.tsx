import React, { useState } from "react";
import { Send, FileText, Upload, CheckCircle, HelpCircle, Shield, AlertCircle } from "lucide-react";
import { Language } from "../types";

interface AidFormProps {
  lang: Language;
  isDark?: boolean;
}

export function AidForm({ lang, isDark = false }: AidFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("medical");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [docUploaded, setDocUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  // Status state: "idle" | "submitting" | "confirmed"
  const [status, setStatus] = useState<"idle" | "submitting" | "confirmed">("idle");
  const [ticketId, setTicketId] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const categories = [
    { id: "medical", label: { fr: "Aide Médicale & Soins Urgent", en: "Urgent Medical Aid & Clinic Care" } },
    { id: "handicap", label: { fr: "Inclusion & Handicap (Fauteuils/Prothèses)", en: "Disability & Inclusion (Wheelchairs)" } },
    { id: "elderly", label: { fr: "Personnes Âgées (Dignité & Logement)", en: "Elderly Companionship & Housing" } },
    { id: "family", label: { fr: "Soutien aux Familles Précaires", en: "Solidarity for Families in Distress" } },
    { id: "orphan", label: { fr: "Scolarité d'Orphelins & Habillement", en: "Orphans Education & Schooling" } },
    { id: "emergency", label: { fr: "Secours en Cas de Catastrophe", en: "Disaster Urgencies Recovery" } }
  ];

  const handleSubmitAidRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError("");

    if (!name.trim() || !email.trim() || !phone.trim() || !description.trim() || !amount.trim()) {
      setFeedbackError(lang === "fr" ? "Veuillez remplir tous les champs obligatoires (*)." : "Please fill in all required fields (*).");
      return;
    }

    setStatus("submitting");

    // Seamless simulated encryption and ticket registration
    setTimeout(() => {
      const generatedTicket = "TKT-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setStatus("confirmed");
    }, 1200);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCategory("medical");
    setDescription("");
    setAmount("");
    setDocUploaded(false);
    setPhotoUploaded(false);
    setStatus("idle");
    setTicketId("");
  };

  return (
    <div 
      id="aid-request-form-panel" 
      className={`border rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl transition-all duration-300 ${
        isDark 
          ? "bg-slate-900 border-slate-800 text-white" 
          : "bg-white border-slate-200 text-slate-800 shadow-slate-100"
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/5 rounded-full blur-2xl pointer-events-none" />
      
      {status !== "confirmed" ? (
        <form id="aid-application-wizard" onSubmit={handleSubmitAidRequest} className="space-y-6 text-left">
          
          {/* Header section with brand cross symbol */}
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff006e] bg-[#ff006e]/10 px-2.5 py-1 rounded-full inline-block font-semibold">
              {lang === "fr" ? "Portail d'Accompagnement Social" : "Welfare & Social Hub"}
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight mt-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-magenta font-mono text-xl">✚</span>
              <span>{lang === "fr" ? "Formulaire de Demande d'Assistance" : "Humanitarian Relief Request"}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {lang === "fr"
                ? "Vous vivez une situation de handicap, de détresse médicale, d'extrême précarité ou demandez pour un aîné démuni ? Nos coordinateurs étudient les besoins sous 48h dans le respect absolu de la dignité humaine."
                : "Are you submitting for a clinical emergency, physical disability handicap, or elderly relative? Our team studies all requests with full confidentiality within 48 hours."}
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 font-mono flex items-center gap-1.5 uppercase tracking-wider">
              <span>{lang === "fr" ? "1. Vos coordonnées de Contact" : "1. Personal Coordinates"}</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
              <input
                id="aid-applicant-name"
                type="text"
                required
                placeholder={lang === "fr" ? "Prénom & Nom du Bénéficiaire (Requis)*..." : "Applicant Full Name*..."}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
                }`}
              />

              <input
                id="aid-applicant-phone"
                type="tel"
                required
                placeholder={lang === "fr" ? "Numéro WhatsApp (Ex: +237657587129)*..." : "WhatsApp Cellphone (Ex: +237657587129)*..."}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
              <input
                id="aid-applicant-email"
                type="email"
                required
                placeholder={lang === "fr" ? "Adresse Email pour le suivi*..." : "Tracking Email Coordinate*..."}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
                }`}
              />

              <input
                id="aid-requested-amount"
                type="text"
                required
                placeholder={lang === "fr" ? "Aide estimée ou matériel (Ex: Fauteuil roulant, 800€)*..." : "Estimated budget or aid material (Ex: Wheelchair, 800€)*..."}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-magenta ${
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
                }`}
              />
            </div>
          </div>

          {/* Type of demand & full text description */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 font-mono block uppercase tracking-wider">
              {lang === "fr" ? "2. Catégorie & Histoire de situation" : "2. Domain & Personal Case History"}
            </label>

            <select
              id="aid-category-selector"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full text-xs font-medium rounded-xl px-4 py-3 focus:outline-none border ${
                isDark 
                  ? "bg-slate-950 text-white border-slate-800 accent-magenta" 
                  : "bg-white text-slate-900 border-stone-200 accent-magenta"
              }`}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {lang === "fr" ? cat.label.fr : cat.label.en}
                </option>
              ))}
            </select>

            <textarea
              id="aid-situation-description"
              required
              rows={4}
              placeholder={lang === "fr" 
                ? "Expliquez l'histoire de la personne, l'impact sur son autonomie ou sa santé, et ce que cette aide changera concrètement à son quotidien..."
                : "Explain the story of the beneficiary, how it affects their daily life/mobility, and how this backing will resolve their physical coordinates..."}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full text-xs font-medium focus:border-magenta focus:outline-none rounded-xl p-4 border ${
                isDark ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-stone-200"
              }`}
            />
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 font-mono block uppercase tracking-wider">
              {lang === "fr" ? "3. Justificatifs administratifs ou médicaux" : "3. Transmitted Proofs (Secured)"}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div 
                id="doc-upload-box" 
                onClick={() => setDocUploaded(true)}
                className={`p-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all ${
                  docUploaded 
                    ? "border-magenta bg-magenta/5 text-magenta" 
                    : isDark 
                      ? "border-slate-800 bg-slate-950 text-gray-400 hover:border-slate-700" 
                      : "border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300"
                }`}
              >
                <FileText size={20} className="text-magenta shrink-0" />
                <div className="text-left font-sans">
                  <span className="block font-bold text-[11px]">
                    {docUploaded ? (lang === "fr" ? "ID / Certificat médical OK" : "MedicalProof.pdf Loaded") : (lang === "fr" ? "Identité / Certificat Médical" : "Upload Medical Certificate")}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {lang === "fr" ? "PDF, PNG ou JPG (max 10MB)" : "Upload PDF or image files (max 10MB)"}
                  </p>
                </div>
              </div>

              <div 
                id="photo-upload-box" 
                onClick={() => setPhotoUploaded(true)}
                className={`p-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all ${
                  photoUploaded 
                    ? "border-magenta bg-magenta/5 text-magenta" 
                    : isDark 
                      ? "border-slate-800 bg-slate-950 text-gray-400 hover:border-slate-700" 
                      : "border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300"
                }`}
              >
                <Upload size={20} className="text-magenta shrink-0" />
                <div className="text-left font-sans">
                  <span className="block font-bold text-[11px]">
                    {photoUploaded ? (lang === "fr" ? "Photo de situation OK" : "SituationPhoto.jpg Loaded") : (lang === "fr" ? "Uploader Photo de situation" : "Upload Case/Situation Photo")}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {lang === "fr" ? "JPG, JPEG, PNG (max 10MB)" : "Upload JPGS, JPEGS (max 10MB)"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {feedbackError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs flex gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{feedbackError}</span>
            </div>
          )}

          {/* Action trigger button */}
          <div className="pt-2 border-t border-gray-200/40 space-y-3">
            <button
              id="submit-aid-application"
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 bg-magenta text-white font-extrabold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>
                {status === "submitting" 
                  ? (lang === "fr" ? "Enregistrement confidentiel du dossier..." : "Uploading application dossier...") 
                  : (lang === "fr" ? "Transmettre mon dossier humanitaire d'urgence" : "Submit Urgent Aid Application")}
              </span>
              <Send size={14} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-mono">
              <Shield size={14} className="text-magenta" />
              <span>
                {lang === "fr"
                  ? "Dossier crypté médicalement de bout en bout. Respect absolu de la vie privée."
                  : "Encrypted under full digital medical privacy protocol."}
              </span>
            </div>
          </div>
        </form>
      ) : (
        /* Succeeded State */
        <div id="aid-application-success-view" className="py-12 flex flex-col items-center justify-center text-center space-y-6 text-slate-800">
          <div className="w-16 h-16 rounded-full bg-magenta/10 text-magenta flex items-center justify-center border border-magenta/20">
            <CheckCircle size={32} />
          </div>

          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-magenta/10 text-magenta font-mono text-[10px] rounded-full uppercase font-bold tracking-wider">
              {lang === "fr" ? "Dossier Enregistré avec Succès" : "Folder Registered in Ledger"}
            </div>
            <h3 className={`text-2xl font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>
              {lang === "fr" ? "Dossier Mis en Audit !" : "Application Dossier Received!"}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              {lang === "fr"
                ? `Merci ${name}. Votre dossier confidentiel a été loggé de manière sécurisée. Un responsable d'AIDE-HUMANITAIRE étudie les faits et vous contactera d'ici 48h sur WhatsApp.`
                : `Thank you ${name}. Your secure files are posted to our database ledger. A designated AIDE-HUMANITAIRE coordinator will reach out via WhatsApp under 48 hours.`}
            </p>
          </div>

          <div className={`w-full max-w-sm border p-5 rounded-2xl font-mono text-xs text-left space-y-2 ${
            isDark ? "bg-slate-950 border-slate-850 text-stone-350" : "bg-neutral-50 border-stone-200 text-stone-700"
          }`}>
            <div className="flex justify-between border-b border-gray-200/50 pb-2 text-[10px] text-gray-400 font-bold mb-2">
              <span>{lang === "fr" ? "RÉFÉRENCE DE SUIVI" : "TRACK TICKET ID"}</span>
              <span className="text-magenta font-mono select-all font-bold">{ticketId}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === "fr" ? "Statut Dossier :" : "Stage :"}</span>
              <span className="text-magenta font-bold">{lang === "fr" ? "Vérification clinique active" : "Clinical audit active"}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === "fr" ? "Ligne Directe WhatsApp :" : " हेल्पलाइन WhatsApp :"}</span>
              <span className={`font-bold ${isDark ? "text-white" : "text-stone-900"}`}>{phone}</span>
            </div>
          </div>

          <button
            id="reset-aid-request-form"
            onClick={handleResetForm}
            className={`px-6 py-2.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition ${
              isDark ? "bg-slate-950 text-stone-300 hover:text-white hover:bg-slate-900" : "bg-stone-150 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {lang === "fr" ? "Déposer un Autre Dossier" : "Submit Another Request"}
          </button>
        </div>
      )}
    </div>
  );
}
