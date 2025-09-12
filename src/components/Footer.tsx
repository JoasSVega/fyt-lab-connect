// Using standardized logo from public folder
import React, { useState } from "react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre nosotros", href: "#sobre" },
    { name: "Equipo", href: "#equipo" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Noticias", href: "#noticias" },
    { name: "Contacto", href: "#contacto" }
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
                <span>aalviza@unicartagena.edu.co</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                <Phone className="h-4 w-4 text-fyt-blue flex-shrink-0" />
                <span>Universidad de Cartagena</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                <MapPin className="h-4 w-4 text-fyt-blue flex-shrink-0" />
                <span>Cartagena, Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">Enlaces Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-fyt-blue transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </button>
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
                  className="border-slate-300 text-slate-700 hover:bg-fyt-blue hover:border-fyt-blue hover:text-white min-w-[90px]"
                  onClick={() => window.open('#', '_blank')}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-fyt-purple hover:border-fyt-purple hover:text-white min-w-[90px]"
                  onClick={() => window.open('#', '_blank')}
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-fyt-red hover:border-fyt-red hover:text-white min-w-[90px]"
                  onClick={() => window.open('#', '_blank')}
                >
                  ResearchGate
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-slate-800">Enlaces Institucionales</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto min-w-[120px]"
                  onClick={() => window.open('#', '_blank')}
                >
                  Universidad Nacional
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto min-w-[120px]"
                  onClick={() => window.open('#', '_blank')}
                >
                  Facultad de Ciencias
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto min-w-[120px]"
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
      <div className="border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-xs sm:text-sm text-slate-500 flex-wrap">
            <p className="text-center md:text-left w-full md:w-auto">
              © 2024 Grupo de Investigación FyT. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-6 justify-center md:justify-end w-full md:w-auto">
              <button className="hover:text-fyt-blue transition-colors">
                Política de Privacidad
              </button>
              <button className="hover:text-fyt-blue transition-colors">
                Términos de Uso
              </button>
              <button className="hover:text-fyt-blue transition-colors">
                Código de Ética
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;