// Cleaned Footer component for the site.
import React from "react";
import { Mail, Phone, MapPin, ExternalLink, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  const openExternal = (url: string) => window.open(url, "_blank");

  return (
    <footer className="w-full border-t border-slate-200/50 bg-white text-[#0f172a]">
      <div className="container mx-auto px-6 md:px-16 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 items-start">
          {/* 1. Información del grupo */}
          <div className="flex flex-col min-w-[220px] col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <picture>
                <source srcSet="/images/logo-fyt-medium.webp" media="(min-width: 640px)" />
                <img
                  src="/images/logo-fyt-small.webp"
                  alt="Logo Grupo FyT"
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-2xl transition-all duration-300"
                  width={96}
                  height={96}
                />
              </picture>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-poppins">
                  Grupo FyT
                </h3>
                <p className="text-slate-600 text-sm font-raleway font-medium">Farmacología y Terapéutica</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4 text-sm font-inter">
              Desarrollando investigaciones en Farmacología, Terapéutica, Farmacia Asistencial, Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in silico.
            </p>
          </div>

          {/* 2. Contacto */}
          <div className="flex flex-col items-start gap-3 col-span-1">
            <h4 className="text-base font-raleway font-bold mb-2 text-slate-900">Contacto</h4>
            <div className="flex items-center gap-2 text-sm text-slate-700 font-inter">
              <Phone className="w-5 h-5 text-fyt-purple flex-shrink-0" aria-label="Teléfono" />
              <span>+57 313 7375217</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-700 font-inter">
              <Mail className="w-5 h-5 text-fyt-blue flex-shrink-0" aria-label="Correo electrónico" />
              <span>farmacologiayterapeutica.gi@gmail.com</span>
            </div>

            <div className="flex items-start gap-2 text-sm text-slate-700 font-inter">
              <MapPin className="w-5 h-5 text-fyt-red flex-shrink-0 mt-0.5" aria-label="Dirección" />
              <span className="break-words">Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Provincia de Cartagena, Bolívar</span>
            </div>
          </div>

          {/* 3. Enlaces Institucionales */}
          <div className="flex flex-col items-start gap-3 col-span-1">
            <h4 className="text-base font-raleway font-bold mb-2 text-slate-900">Enlaces Institucionales</h4>
            <a href="https://www.unicartagena.edu.co/" target="_blank" rel="noopener noreferrer" aria-label="Abrir sitio de la Universidad de Cartagena en nueva pestaña" className="inline-flex items-center text-sm text-slate-700 hover:text-fyt-blue p-0 h-auto min-w-[120px] text-left font-inter font-medium transition-colors duration-200">
              <span>Universidad de Cartagena</span>
              <ExternalLink className="h-3 w-3 ml-1 inline-block" />
            </a>
            <a href="https://www.unicartagena.edu.co/estudia-con-nosotros?view=search&resetSearch=1&preserve=1&geo-latitude=&geo-longitude=&geo-country=&location-detected=&geolocation=&categorySuggestion=&suggestionType=&categorySearch=250" target="_blank" rel="noopener noreferrer" aria-label="Abrir Facultad de Ciencias Farmacéuticas en nueva pestaña" className="inline-flex items-center text-sm text-slate-700 hover:text-fyt-blue p-0 h-auto min-w-[120px] text-left font-inter font-medium transition-colors duration-200">
              <span>Facultad de Ciencias Farmacéuticas</span>
              <ExternalLink className="h-3 w-3 ml-1 inline-block" />
            </a>
            <a href="https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000008618" target="_blank" rel="noopener noreferrer" aria-label="Abrir página de MinCiencias del grupo en nueva pestaña" className="inline-flex items-center text-sm text-slate-700 hover:text-fyt-blue p-0 h-auto min-w-[120px] text-left font-inter font-medium transition-colors duration-200">
              <span>MinCiencias</span>
              <ExternalLink className="h-3 w-3 ml-1 inline-block" />
            </a>
          </div>

          {/* 4. Síguenos (icono) */}
          <div className="flex flex-col items-start gap-3 col-span-1">
            <h4 className="text-base font-raleway font-bold mb-2 text-slate-900">Síguenos</h4>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram Grupo FyT" className="p-2 rounded-full text-slate-700 hover:text-fyt-purple hover:bg-slate-100 transition-all duration-200">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-xs sm:text-sm text-[#64748b]">
            <p className="text-left w-full md:w-auto">© 2025 Grupo de Investigación FyT. Todos los derechos reservados.</p>

            <div className="flex flex-row gap-3 md:gap-6 w-full md:w-auto items-center justify-end font-inter font-medium">
              <a href="/PrivacyPolicy" className="hover:text-fyt-blue transition-colors duration-200 text-left md:text-center" aria-label="Política de Privacidad">Política de Privacidad</a>
              <a href="/TermsOfUse" className="hover:text-fyt-purple transition-colors duration-200 text-left md:text-center" aria-label="Términos de Uso">Términos de Uso</a>
              <a href="/CodeOfEthics" className="hover:text-fyt-red transition-colors duration-200 text-left md:text-center" aria-label="Código de Ética">Código de Ética</a>
            </div>
          </div>

          <div className="w-full flex justify-start mt-2">
            <a href="https://www.linkedin.com/in/joassvega" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-slate-500 hover:text-fyt-blue transition-colors duration-200 flex items-center gap-1 font-inter">
              Desarrollado por: Joas S. Vega
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;