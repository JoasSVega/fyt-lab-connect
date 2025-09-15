// Using standardized logo from public folder
import React, { useState } from "react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/#sobre" },
    { name: "Equipo", href: "/equipo" },
    { name: "Proyectos", href: "/proyectos" },
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
  <footer className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 border-t border-slate-200/50 w-full overflow-x-hidden">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 md:gap-4 mb-6 flex-wrap">
              <div className="flex-shrink-0">
                <img src="/logo-fyt.png" alt="Logo Grupo FyT" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-lg transition-all duration-300" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Grupo FyT</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Farmacología y Terapéutica</p>
              </div>
            </div>
            
            
            <p className="text-slate-700 leading-relaxed mb-6 max-w-md text-sm sm:text-base">
              Desarrollando investigaciones en Farmacología, Terapéutica, Farmacia Asistencial, 
              Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in sílico.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                <Mail className="h-4 w-4 text-fyt-blue flex-shrink-0" />
                <a 
                  href="mailto:farmacologiayterapeutica.gi@gmail.com"
                  className="hover:text-fyt-blue hover:underline cursor-pointer"
                >
                  farmacologiayterapeutica.gi@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                <Phone className="h-4 w-4 text-fyt-blue flex-shrink-0" />
                <span>Universidad de Cartagena</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-fyt-blue flex-shrink-0 mt-0.5" />
                <span className="break-words">Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Provincia de Cartagena, Bolívar</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">Enlaces Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-fyt-blue transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">Áreas de Investigación</h4>
            <ul className="space-y-2 sm:space-y-3">
              {researchAreas.map((area, index) => (
                <li key={index} className="text-slate-600 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-fyt-purple rounded-full flex-shrink-0"></div>
                    <span>{area}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media and External Links */}
        <div className="border-t border-slate-200/60 mt-10 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 flex-wrap">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-slate-800">Síguenos</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-fyt-purple hover:border-fyt-purple hover:text-white min-w-[90px]"
                  onClick={() => window.open('https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA==', '_blank')}
                >
                  Instagram
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-slate-800 text-left">Enlaces Institucionales</h4>
              <div className="flex flex-col items-start gap-2 sm:gap-3 sm:flex-row sm:flex-wrap">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto min-w-[120px] justify-start"
                  onClick={() => window.open('https://www.unicartagena.edu.co/', '_blank')}
                >
                  Universidad de Cartagena
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto min-w-[120px] justify-start"
                  onClick={() => window.open('https://www.unicartagena.edu.co/estudia-con-nosotros?view=search&resetSearch=1&preserve=1&geo-latitude=&geo-longitude=&geo-country=&location-detected=&geolocation=&categorySuggestion=&suggestionType=&categorySearch=250', '_blank')}
                >
                  Facultad de Ciencias Farmacéuticas
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto min-w-[120px] justify-start"
                  onClick={() => window.open('#', '_blank')}
                >
                  MinCiencias
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200/60 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-xs sm:text-sm text-slate-500 flex-wrap">
            <p className="text-left w-full md:w-auto">
              © 2024 Grupo de Investigación FyT. Todos los derechos reservados.
            </p>
            <div className="flex flex-col items-start gap-1 w-full md:w-auto md:flex-row md:items-center md:justify-end md:gap-6 md:space-y-0 md:space-x-0 md:gap-x-6 md:gap-y-0 md:flex-nowrap md:space-x-6 md:space-y-0 md:mt-0 mt-1">
              <div className="flex flex-row gap-3 md:gap-6 w-full md:w-auto">
                <a href="/PrivacyPolicy" className="hover:text-fyt-blue transition-colors text-left md:text-center" aria-label="Política de Privacidad">
                  Política de Privacidad
                </a>
                <a href="/TermsOfUse" className="hover:text-fyt-blue transition-colors text-left md:text-center" aria-label="Términos de Uso">
                  Términos de Uso
                </a>
                <a href="/CodeOfEthics" className="hover:text-fyt-blue transition-colors text-left md:text-center" aria-label="Código de Ética">
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
              className="text-xs sm:text-sm text-slate-500 hover:text-fyt-blue transition-colors flex items-center gap-1"
            >
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