import LogoFyT from "../assets/Logo FyT.png";
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
    <footer className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 border-t border-slate-200/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0">
                <img src={LogoFyT} alt="Logo Grupo FyT" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg transition-all duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Grupo FyT</h3>
                <p className="text-slate-600 text-sm">Farmacología y Terapéutica</p>
              </div>
            </div>
            
            
            <p className="text-slate-700 leading-relaxed mb-6 max-w-md">
              Desarrollando investigaciones en Farmacología, Terapéutica, Farmacia Asistencial, 
              Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in sílico.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-fyt-blue" />
                <span>aalviza@unicartagena.edu.co</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-fyt-blue" />
                <span>Universidad de Cartagena</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-fyt-blue" />
                <span>Cartagena, Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-800">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-fyt-blue transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-800">Áreas de Investigación</h4>
            <ul className="space-y-3">
              {researchAreas.map((area, index) => (
                <li key={index} className="text-slate-600 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-fyt-purple rounded-full"></div>
                    <span>{area}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media and External Links */}
        <div className="border-t border-slate-200/60 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-800">Síguenos</h4>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-fyt-blue hover:border-fyt-blue hover:text-white"
                  onClick={() => window.open('#', '_blank')}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-fyt-purple hover:border-fyt-purple hover:text-white"
                  onClick={() => window.open('#', '_blank')}
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-fyt-red hover:border-fyt-red hover:text-white"
                  onClick={() => window.open('#', '_blank')}
                >
                  ResearchGate
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-800">Enlaces Institucionales</h4>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto"
                  onClick={() => window.open('#', '_blank')}
                >
                  Universidad Nacional
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto"
                  onClick={() => window.open('#', '_blank')}
                >
                  Facultad de Ciencias
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-fyt-blue p-0 h-auto"
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
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-500">
            <p>
              © 2024 Grupo de Investigación FyT. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
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