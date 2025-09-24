// Using standardized logo from public folder
import React, { useState } from "react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nuestro Equipo", href: "/equipo" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Investigación", href: "/investigacion" },
    { name: "Noticias", href: "/noticias" },
    { name: "Contactos", href: "/contactos" }
  ];

  const researchAreas = [
    "Farmacología Clínica",
    "Medicina Personalizada",
    "Farmacovigilancia",
    "Farmacogenómica",
    "Terapéutica",
    "Seguridad Medicamentosa"
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="w-full overflow-x-hidden border-t border-slate-200/50 bg-white"
    >
      {/* Main Footer Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* 1. Información del grupo */}
            <div className="flex flex-col min-w-[220px] max-w-lg col-span-1">
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <img src="/logo-fyt.png" alt="Logo Grupo FyT" className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-2xl transition-all duration-300 animate-zoom-in" />
                <div>
                  <h3 className="text-2xl font-bold text-[#1e293b] tracking-wide" style={{ fontFamily: 'Poppins, Inter, Montserrat, sans-serif' }}>Grupo FyT</h3>
                    <p className="text-[#334155] text-sm font-inter">Farmacología y Terapéutica</p>
                </div>
              </div>
              <p className="text-[#334155] leading-relaxed mb-6 text-sm font-inter">
                Desarrollando investigaciones en Farmacología, Terapéutica, Farmacia Asistencial, Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in sílico.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#334155] flex-wrap font-inter">
                  <Mail className="w-6 h-6 text-fyt-blue flex-shrink-0" aria-label="Correo electrónico" />
                  <a 
                    href="mailto:farmacologiayterapeutica.gi@gmail.com"
                    className="hover:text-fyt-blue hover:underline cursor-pointer"
                  >
                    farmacologiayterapeutica.gi@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#334155] flex-wrap font-inter">
                  <Phone className="w-6 h-6 text-fyt-purple flex-shrink-0" aria-label="Teléfono" />
                  <span>Universidad de Cartagena</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-[#334155] font-inter">
                  <MapPin className="w-6 h-6 text-fyt-red flex-shrink-0 mt-0.5" aria-label="Dirección" />
                  <span className="break-words">Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Provincia de Cartagena, Bolívar</span>
                </div>
              </div>
            </div>
            {/* 2. Redes sociales */}
            <div className="flex flex-col items-start gap-4 min-w-[180px] col-span-1">
              <h4 className="text-lg font-raleway font-bold mb-3 text-[#1e293b]">Síguenos</h4>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#9B59B6] text-[#9B59B6] hover:bg-[#9B59B6] hover:text-fyt-dark min-w-[90px] font-inter"
                onClick={() => window.open('https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA==', '_blank')}
              >
                Instagram
              </Button>
            </div>
            {/* 3. Enlaces Institucionales */}
            <div className="flex flex-col items-start gap-4 min-w-[180px] col-span-1">
              <h4 className="text-lg font-raleway font-bold mb-3 text-[#1e293b]">Enlaces Institucionales</h4>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#334155] hover:text-[#3BB9FF] p-0 h-auto min-w-[120px] justify-start font-inter"
                onClick={() => window.open('https://www.unicartagena.edu.co/', '_blank')}
              >
                Universidad de Cartagena
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#334155] hover:text-[#9B59B6] p-0 h-auto min-w-[120px] justify-start font-inter"
                onClick={() => window.open('https://www.unicartagena.edu.co/estudia-con-nosotros?view=search&resetSearch=1&preserve=1&geo-latitude=&geo-longitude=&geo-country=&location-detected=&geolocation=&categorySuggestion=&suggestionType=&categorySearch=250', '_blank')}
              >
                Facultad de Ciencias Farmacéuticas
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#334155] hover:text-[#FF4C4C] p-0 h-auto min-w-[120px] justify-start font-inter"
                onClick={() => window.open('https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000008618', '_blank')}
              >
                MinCiencias
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            {/* 4. Acciones rápidas / enlaces útiles */}
            <div className="flex flex-col items-start gap-4 min-w-[180px] col-span-1">
              <h4 className="text-lg font-raleway font-bold mb-3 text-[#1e293b]">Acciones rápidas</h4>
              <a href="/PrivacyPolicy" className="hover:text-[#3BB9FF] transition-colors text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#3BB9FF] focus:ring-offset-2" aria-label="Política de Privacidad">
                Política de Privacidad
              </a>
              <a href="/TermsOfUse" className="hover:text-[#9B59B6] transition-colors text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#9B59B6] focus:ring-offset-2" aria-label="Términos de Uso">
                Términos de Uso
              </a>
              <a href="/CodeOfEthics" className="hover:text-[#FF4C4C] transition-colors text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#FF4C4C] focus:ring-offset-2" aria-label="Código de Ética">
                Código de Ética
              </a>
            </div>
          </div>
  {/* Copyright y créditos */}
      </div>

      {/* Copyright */}
  <div className="border-t border-slate-200/60 relative">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-xs sm:text-sm text-[#64748b] flex-wrap">
            <p className="text-left w-full md:w-auto font-inter">
              © 2025 Grupo de Investigación FyT. Todos los derechos reservados.
            </p>
            <div className="flex flex-col items-start gap-1 w-full md:w-auto md:flex-row md:items-center md:justify-end md:gap-6 md:space-y-0 md:space-x-0 md:gap-x-6 md:gap-y-0 md:flex-nowrap md:space-x-6 md:space-y-0 md:mt-0 mt-1">
              <div className="flex flex-row gap-3 md:gap-6 w-full md:w-auto">
                <a href="/PrivacyPolicy" className="hover:text-[#3BB9FF] transition-colors text-left md:text-center font-inter focus:outline-none focus:ring-2 focus:ring-[#3BB9FF] focus:ring-offset-2" aria-label="Política de Privacidad">
                  Política de Privacidad
                </a>
                <a href="/TermsOfUse" className="hover:text-[#9B59B6] transition-colors text-left md:text-center font-inter focus:outline-none focus:ring-2 focus:ring-[#9B59B6] focus:ring-offset-2" aria-label="Términos de Uso">
                  Términos de Uso
                </a>
                <a href="/CodeOfEthics" className="hover:text-[#FF4C4C] transition-colors text-left md:text-center font-inter focus:outline-none focus:ring-2 focus:ring-[#FF4C4C] focus:ring-offset-2" aria-label="Código de Ética">
                  Código de Ética
                </a>
              </div>
            </div>
          </div>
          {/* LinkedIn credit bottom left */}
          <div className="w-full flex justify-start mt-2">
            <a
              href="https://www.linkedin.com/in/joassvega"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-[#64748b] hover:text-[#3BB9FF] transition-colors flex items-center gap-1 font-inter"
            >
              Desarrollado por: Joas S. Vega
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
          </div>
      {/* Animaciones CSS para logo */}
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in { animation: zoomIn 1s cubic-bezier(.42,0,.58,1); }
      `}</style>
        </div>
      </div>
    </footer>
  );
};

export default Footer;