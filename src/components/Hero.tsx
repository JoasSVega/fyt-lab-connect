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
    <section id="inicio" className="w-full min-h-[120px] flex items-center justify-center bg-transparent">
      {/* Hero limpio, sin títulos ni fondo degradado. */}
    </section>
  );
};
export default Hero;