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
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-fyt-dark/90 via-fyt-dark/70 to-fyt-dark/50"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Grupo de Investigación
            <span className="block text-transparent bg-gradient-to-r from-fyt-blue to-fyt-purple bg-clip-text">FyT</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
            Farmacología y Terapéutica
          </p>

          {/* Description */}
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Desarrollando investigaciones en Farmacología, Terapéutica, Farmacia Asistencial, 
            Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in sílico.
          </p>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group shadow-large" 
                  onClick={() => scrollToSection(action.href)}
                >
                  <div className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      action.color === 'primary' ? 'bg-fyt-blue' : 
                      action.color === 'secondary' ? 'bg-fyt-purple' : 'bg-fyt-red'
                    }`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm">{action.description}</p>
                    <ArrowRight className="h-4 w-4 text-white/50 mx-auto mt-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;