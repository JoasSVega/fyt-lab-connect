import React from "react";
import { Target, Eye, Microscope, Heart, Users, BookOpen } from "lucide-react";
import { Card } from "./ui/card";

const values = [
  {
    icon: <Microscope className="w-8 h-8 text-[#3BB9FF]" aria-label="Investigación Rigurosa" />,
    title: "Investigación Rigurosa",
    color: "#3BB9FF",
    border: "#3BB9FF",
    description: "Aplicamos metodologías científicas de vanguardia en todos nuestros proyectos de investigación."
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" aria-label="Compromiso con la Salud" />,
    title: "Compromiso con la Salud",
    color: "#ef4444",
    border: "#ef4444",
    description: "Trabajamos para mejorar la calidad de vida de los pacientes a través de la innovación terapéutica."
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" aria-label="Trabajo Colaborativo" />,
    title: "Trabajo Colaborativo",
    color: "#9b59b6",
    border: "#9b59b6",
    description: "Fomentamos la colaboración interdisciplinaria y el intercambio de conocimientos."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-gray-700" aria-label="Formación Académica" />,
    title: "Formación Académica",
    color: "#64748b",
    border: "#64748b",
    description: "Preparamos a la próxima generación de investigadores en farmacología y terapéutica."
  }
];

const AboutSobreNosotros = () => (
  <section id="sobre" className="py-12 min-h-[80vh] bg-[#f8fafc]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
        {/* Imagen decorativa */}
  <div className="relative h-[400px] w-full flex items-center justify-center">
          <picture>
            <source
              media="(min-width: 1280px)"
              srcSet="/images/objetivo-large.webp"
            />
            <source
              media="(min-width: 640px)"
              srcSet="/images/objetivo-medium.webp"
            />
            <img
              src="/images/objetivo-small.webp"
              alt="Miembros del grupo FyT trabajando en investigación"
              className="w-full h-full object-cover rounded-xl shadow-medium animate-fade-in"
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              fetchpriority="auto"
              style={{ minHeight: 400, maxHeight: 400 }}
            />
          </picture>
          {/* Eliminado el overlay gris para que la imagen se vea sin oscurecer */}
        </div>
        {/* Objetivo, Misión y Visión */}
        <div className="space-y-8">
          <div>
            <h3 className="site-section-title text-fyt-dark mb-4 drop-shadow-lg">Nuestro Objetivo</h3>
            <p className="text-fyt-dark/90 font-inter leading-relaxed text-left">
              El objetivo principal del grupo es desarrollar investigaciones en Farmacología, Terapéutica, 
              Farmacia Asistencial, Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía, estudios in 
              sílico y modelización molecular para el diseño de nuevos fármacos. Busca que los estudiantes 
              adquieran competencias investigativas a través de proyectos, estudios temáticos y el intercambio 
              académico entre miembros del grupo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-fyt-blue/40 bg-white/90 shadow-soft rounded-xl backdrop-blur-md hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-col items-center mb-4">
                <Target className="w-8 h-8 text-fyt-blue mb-3" aria-label="Misión" />
                <h4 className="text-lg font-raleway font-semibold text-fyt-blue">Misión</h4>
              </div>
                <p className="text-sm font-inter text-gray-700 text-left">
                Desarrollar trabajos de investigación en Farmacología, Terapéutica, Farmacia Asistencial, 
                Farmacovigilancia, Farmacoepidemiología, Farmacoeconomía y estudios in sílico/modelización 
                molecular, para apoyar programas de pregrado y postgrado.
              </p>
            </Card>
            <Card className="p-6 border-2 border-fyt-purple/40 bg-white/90 shadow-soft rounded-xl backdrop-blur-md hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-col items-center mb-4">
                <Eye className="w-8 h-8 text-fyt-purple mb-3" aria-label="Visión" />
                <h4 className="text-lg font-raleway font-semibold text-fyt-purple">Visión</h4>
              </div>
              <p className="text-sm font-inter text-gray-700 text-left">
                Posicionarse entre los mejores grupos de investigación en Farmacología y Terapéutica 
                a nivel nacional en 2030 e internacional en 2035, desarrollando trabajos de alto nivel 
                científico que respondan a necesidades locales, nacionales e internacionales, y formando 
                nuevos investigadores.
              </p>
            </Card>
          </div>
        </div>
      </div>
      {/* Valores */}
  <div className="mb-12">
        <h3 className="site-section-title text-center text-fyt-dark mb-8 drop-shadow-lg">
          Nuestros Valores
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className={`p-6 text-center bg-white/90 border-2 shadow-soft hover:shadow-medium hover:scale-[1.02] transition-all duration-300`} style={{ borderColor: value.border }}>
              <div className="flex items-center justify-center mx-auto mb-4 animate-fade-in">
                {value.icon}
              </div>
              <h4 className="text-lg font-raleway font-semibold mb-2" style={{ color: value.color }}>{value.title}</h4>
              <p className="text-sm font-inter text-slate-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSobreNosotros;
