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
      className="w-full min-h-[80vh] flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/Hero-Index.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay gradiente colores logo + centro oscuro */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(120deg, rgba(59,185,255,0.35) 0%, rgba(155,89,182,0.35) 60%, rgba(255,76,76,0.32) 100%)"
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-transparent" />
        </div>
      </div>
      {/* Contenido centrado con fondo semitransparente y palabras clave resaltadas */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto max-w-2xl bg-white/30 rounded-2xl px-6 py-8 shadow-lg backdrop-blur-md flex flex-col items-center">
          <h1
            className="text-[#1e293b] text-4xl sm:text-6xl font-bold text-center mb-4 animate-slide-up font-poppins text-shadow-lg"
            style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', animation: "slideUpFade 1.2s cubic-bezier(.42,0,.58,1)" }}
          >
            Investigación rigurosa, impacto real en la <span className="highlight">Salud</span>
          </h1>
          <h2
            className="text-[#334155] text-lg sm:text-2xl font-normal text-center mb-6 animate-slide-up text-shadow-md"
            style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', animation: "slideUpFade 1.5s cubic-bezier(.42,0,.58,1)", animationDelay: "0.2s" }}
          >
            Unimos <span className="highlight">Ciencia</span>, formación y <span className="highlight">Innovación</span> para avanzar en la farmacología y la terapéutica.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animation: "fadeIn 1.8s cubic-bezier(.42,0,.58,1)", animationDelay: "0.4s" }}>
            <a
              href="/herramientas"
              className="bg-[#7e3af2] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#3BB9FF] hover:text-white transition text-lg focus:outline-none focus:ring-2 focus:ring-[#7e3af2] focus:ring-offset-2 font-poppins"
              style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', boxShadow: "0 4px 24px 0 rgba(126,58,242,0.18)" }}
              aria-label="Explora herramientas"
            >
              Explora herramientas
            </a>
          </div>
        </div>
      </div>
      {/* Animaciones y estilos reutilizables */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-slide-up { animation: slideUpFade 1.2s cubic-bezier(.42,0,.58,1); }
        .animate-fade-in { animation: fadeIn 1.2s ease; }
        .text-shadow-lg { text-shadow: 0 2px 12px rgba(30,41,59,0.18), 0 1px 0 #fff; }
        .text-shadow-md { text-shadow: 0 1px 8px rgba(30,41,59,0.12), 0 1px 0 #fff; }
        .highlight {
          color: #7e3af2;
          font-family: 'Merriweather', serif;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-size: 1em;
        }
      `}</style>
    </section>
  );
};
export default Hero;