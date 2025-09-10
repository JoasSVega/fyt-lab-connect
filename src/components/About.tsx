import React, { useState } from "react";
import { Target, Eye, Microscope, Heart, Users, BookOpen } from "lucide-react";
import { Card } from "./ui/card";

const About = () => {
  const values = [
    {
      icon: Microscope,
      title: "Investigación Rigurosa",
      description: "Aplicamos metodologías científicas de vanguardia en todos nuestros proyectos de investigación."
    },
    {
      icon: Heart,
      title: "Compromiso con la Salud",
      description: "Trabajamos para mejorar la calidad de vida de los pacientes a través de la innovación terapéutica."
    },
    {
      icon: Users,
      title: "Trabajo Colaborativo",
      description: "Fomentamos la colaboración interdisciplinaria y el intercambio de conocimientos."
    },
    {
      icon: BookOpen,
      title: "Formación Académica",
      description: "Preparamos a la próxima generación de investigadores en farmacología y terapéutica."
    }
  ];

  const researchLines = [
    "Farmacología y Terapéutica",
    "Farmacovigilancia",
    "Farmacia Asistencial y Atención Farmacéutica",
    "Farmacoepidemiología",
    "Farmacoeconomía",
    "Estudios in sílico y modelización molecular para el diseño de nuevos fármacos"
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fyt-dark mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            El Grupo de Investigación en Farmacología y Terapéutica (FyT) desarrolla investigaciones 
            en Farmacología, Terapéutica, Farmacia Asistencial, Farmacovigilancia, Farmacoepidemiología, 
            Farmacoeconomía, estudios in sílico y modelización molecular para el diseño de nuevos fármacos.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="h-[400px] bg-gradient-hero rounded-xl flex items-center justify-center"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* History */}
            <div>
              <h3 className="text-2xl font-semibold text-fyt-dark mb-4">Nuestro Objetivo</h3>
              <p className="text-muted-foreground leading-relaxed">
                El objetivo principal del grupo es desarrollar investigaciones en Farmacología, Terapéutica, 
                Farmacia Asistencial, Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía, estudios in 
                sílico y modelización molecular para el diseño de nuevos fármacos. Busca que los estudiantes 
                adquieran competencias investigativas a través de proyectos, estudios temáticos y el intercambio 
                académico entre miembros del grupo.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-fyt-blue/20 bg-gradient-card shadow-soft">
                <Target className="h-8 w-8 text-fyt-blue mb-3" />
                <h4 className="text-lg font-semibold text-fyt-dark mb-2">Misión</h4>
                <p className="text-sm text-muted-foreground">
                  Desarrollar trabajos de investigación en Farmacología, Terapéutica, Farmacia Asistencial, 
                  Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in sílico/modelización 
                  molecular, para apoyar programas de pregrado y postgrado.
                </p>
              </Card>

              <Card className="p-6 border-fyt-purple/20 bg-gradient-card shadow-soft">
                <Eye className="h-8 w-8 text-fyt-purple mb-3" />
                <h4 className="text-lg font-semibold text-fyt-dark mb-2">Visión</h4>
                <p className="text-sm text-muted-foreground">
                  Posicionarse entre los mejores grupos de investigación en Farmacología y Terapéutica 
                  a nivel nacional en 2030 e internacional en 2035, desarrollando trabajos de alto nivel 
                  científico que respondan a necesidades locales, nacionales e internacionales, y formando 
                  nuevos investigadores.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-fyt-dark mb-8">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-fyt-dark mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Research Lines */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-fyt-dark mb-8">
            Líneas de Investigación
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {researchLines.map((line, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow min-h-[120px] flex items-center justify-start">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-hero rounded-full flex-shrink-0"></div>
                  <p className="text-sm font-medium text-fyt-dark leading-relaxed">{line}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Graduation Modalities */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-fyt-dark mb-8">
            Modalidades de Grado
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Proyecto de investigación",
              "Monografías",
              "Pasantías",
              "Asignaturas de postgrado",
              "Diplomados",
              "Publicación de artículo científico o capítulo de libro"
            ].map((modality, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow min-h-[120px] flex items-center justify-start">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-hero rounded-full flex-shrink-0"></div>
                  <p className="text-sm font-medium text-fyt-dark leading-relaxed">{modality}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Activities and Products */}
        <div>
          <h3 className="text-2xl font-semibold text-center text-fyt-dark mb-8">
            Actividades y Productos
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "Participación de semilleristas y tesistas en proyectos y productos del grupo",
              "Ponencias y posters",
              "Comunidad de aprendizaje entre estudiantes y docentes",
              "Cursos y actividades académicas"
            ].map((activity, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow min-h-[120px] flex items-center justify-start">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-hero rounded-full flex-shrink-0"></div>
                  <p className="text-sm font-medium text-fyt-dark leading-relaxed">{activity}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;