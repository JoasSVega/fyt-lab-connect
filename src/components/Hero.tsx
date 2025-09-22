import React, { useState } from "react";
import { ArrowRight, Users, BookOpen, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
const Hero = () => {
  const quickActions = [{
    title: "Equipo",
    description: "Conoce a nuestros investigadores",
    icon: Users,
    href: "#equipo",
    color: "primary"
  }, {
    title: "Proyectos",
    description: "Investigaciones en curso",
    icon: BookOpen,
    href: "#proyectos",
    color: "secondary"
  }, {
    title: "Publicaciones",
    description: "Nuestros logros científicos",
    icon: Award,
    href: "#proyectos",
    color: "accent"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return (
    <section
      id="inicio"
      className="w-full min-h-[80vh] flex flex-col items-center justify-center relative bg-white"
    >
      {/* Logo centrado con animación zoom-in */}
      <div className="flex flex-col items-center justify-center">
        <img
          src="/logo-fyt.png"
          alt="Logo Grupo FyT"
          className="mb-6 animate-zoom-in object-contain"
          style={{ width: '120px', height: '120px', maxWidth: '30vw', maxHeight: '30vw', aspectRatio: '1 / 1', animation: 'zoomIn 1s cubic-bezier(.42,0,.58,1)' }}
        />
        {/* Frase institucional con fade-in */}
        <h1 className="text-[#1e293b] text-3xl sm:text-5xl font-bold text-center mb-8 animate-fade-in" style={{ fontFamily: 'Poppins, Inter, Montserrat, sans-serif', animation: "fadeIn 1.2s ease" }}>
          Formando investigadores, mejorando la terapéutica
        </h1>
        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animation: "fadeIn 1.5s ease" }}>
          <a
            href="/herramientas"
            className="bg-[#9B59B6] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#ede9fe] hover:text-[#1e293b] transition text-lg focus:outline-none focus:ring-2 focus:ring-[#9B59B6] focus:ring-offset-2"
            aria-label="Explora herramientas"
          >
            Explora herramientas
          </a>
        </div>
      </div>
      {/* Animaciones CSS */}
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-zoom-in { animation: zoomIn 1s cubic-bezier(.42,0,.58,1); }
        .animate-fade-in { animation: fadeIn 1.2s ease; }
      `}</style>
    </section>
  );
};
export default Hero;