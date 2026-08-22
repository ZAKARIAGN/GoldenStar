import React, { useState } from "react";
import { AddContact } from "../../../Services/ContactService";
import ErrMsg from "../../../Components/ErrMsg";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr({});

    try {
      await AddContact(contactData, setErr);
      setContactData({ subject: "", message: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 w-full p-10 md:p-16 border border-white/5 rounded-[3rem] shadow-2xl bg-white/[0.02] backdrop-blur-xl relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl" />

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60">Conciergerie</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Contactez <span className="italic font-light text-[#D4AF37]">L'Étoile d'Or</span>
            </h1>
            <div className="h-[1px] w-20 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          </div>

          <div className="space-y-8">
            {/* Subject Input */}
            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 flex items-center gap-3">
                Objet de votre demande
              </label>
              <input
                type="text"
                name="subject"
                value={contactData.subject}
                onChange={handleChange}
                placeholder="Ex: Privatisation, Suggestion..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 
                text-white placeholder:text-gray-700 outline-none focus:border-[#D4AF37]/40 transition-all duration-500 font-light"
              />
              <ErrMsg msg={err.subject?.[0]} />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 flex items-center gap-3">
                <MessageSquare size={14} /> Votre Message
              </label>
              <textarea
                rows="5"
                name="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Comment pouvons-nous vous sublimer davantage ?"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 
                text-white placeholder:text-gray-700 outline-none focus:border-[#D4AF37]/40 transition-all duration-500 font-light resize-none"
              ></textarea>
              <ErrMsg msg={err.message?.[0]} />
            </div>
          </div>

          {/* Luxury Button with 1px border */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="relative group p-[1px] overflow-hidden rounded-full transition-all duration-700 active:scale-95 disabled:opacity-50"
            >
              {/* Shimmer Border */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#8B6508] via-[#C25E0A] to-[#8B6508] ${loading ? 'animate-[shimmer_1.5s_infinite]' : 'animate-[shimmer_4s_infinite]'}`} />

              <div className="relative bg-black rounded-full py-5 px-16 flex items-center justify-center min-w-[280px] group-hover:bg-transparent transition-all duration-500">
                <span className="relative z-10 uppercase text-[11px] font-black tracking-[0.5em] text-[#D4AF37] group-hover:text-black transition-all duration-500 flex items-center gap-3">
                  {loading ? (
                    <span className="animate-pulse">Envoi en cours...</span>
                  ) : (
                    <>
                      Envoyer <Send size={14} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;