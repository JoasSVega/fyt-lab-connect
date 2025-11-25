import React, { useState } from "react";
import { Target, Eye, Microscope, Heart, Users, BookOpen, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Carrusel from "./ui/Carrusel";
import researchPharmacology from "@/assets/research-pharmacology.jpg";
import researchPharmacovigilance from "@/assets/research-pharmacovigilance.jpg";
import researchClinicalPharmacy from "@/assets/research-clinical-pharmacy.jpg";
import researchPharmacoepidemiology from "@/assets/research-pharmacoepidemiology.jpg";
import researchPharmacoeconomics from "@/assets/research-pharmacoeconomics.jpg";
import researchMolecularModeling from "@/assets/research-molecular-modeling.jpg";

const About = () => {
  const values = [
    {
      icon: <Microscope className="w-8 h-8 text-[#0066FF]" aria-label="Investigación Rigurosa" />,
      title: "Investigación Rigurosa",
      color: "#0066FF",
      border: "#0066FF",
      description: "Aplicamos metodologías científicas de vanguardia en todos nuestros proyectos de investigación."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#FF0000]" aria-label="Compromiso con la Salud" />,
      title: "Compromiso con la Salud",
      color: "#FF0000",
      border: "#FF0000",
      description: "Trabajamos para mejorar la calidad de vida de los pacientes a través de la innovación terapéutica."
    },
    {
      icon: <Users className="w-8 h-8 text-[#800080]" aria-label="Trabajo Colaborativo" />,
      title: "Trabajo Colaborativo",
      color: "#800080",
      border: "#800080",
      description: "Fomentamos la colaboración interdisciplinaria y el intercambio de conocimientos."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-black" aria-label="Formación Académica" />,
      title: "Formación Académica",
      color: "#000000",
      border: "#000000",
      description: "Preparamos a la próxima generación de investigadores en farmacología y terapéutica."
    }
  ];

  const researchLines = [
    // Títulos alineados EXACTAMENTE con CVLAC (ver captura adjunta del usuario)
    {
      title: "Atención Farmacéutica y Farmacia Asistencial",
      description:
        "Optimización del uso de medicamentos a través de la atención farmacéutica directa al paciente, educación sanitaria y seguimiento farmacoterapéutico.",
      image: "/images/Carrusel/Farmacia-Asistencial.png",
    },
    {
      title: "Diseño de Fármacos por Simulación y Modelización Molecular",
      description:
        "Aplicación de métodos computacionales y modelos moleculares para el diseño racional de nuevos fármacos.",
      // Usamos el set de imágenes 'Estudios-In-silico' que ya existe optimizado (avif/webp/png)
      image: "/images/Carrusel/Estudios-In-silico.png",
    },
    {
      title: "Farmacoeconomia",
      description:
        "Evaluación comparativa del costo, efectividad y eficiencia de tratamientos y tecnologías farmacéuticas. Se generan análisis costo-beneficio, costo-efectividad y costo-utilidad para optimizar la toma de decisiones en salud.",
      image: "/images/Carrusel/Farmacoeconomia.png",
    },
    {
      title: "Farmacoepidemiologia",
      description:
        "Análisis del uso, efectividad y seguridad de los medicamentos en poblaciones reales, proporcionando evidencia para la toma de decisiones en salud pública.",
      image: "/images/Carrusel/Farmacoepidemiologia.png",
    },
    {
      title: "Farmacologia y Terapeutica",
      description:
        "Estudio de los efectos de los medicamentos en el organismo y desarrollo de terapias farmacológicas optimizadas para mejorar la eficacia y seguridad en el tratamiento de enfermedades.",
      image: "/images/Carrusel/Farmacologia.png",
    },
    {
      title: "Farmacovigilancia y Toxicología",
      description:
        "Monitoreo y evaluación continua de la seguridad de los medicamentos, identificación de reacciones adversas y desarrollo de estrategias para minimizar riesgos.",
      image: "/images/Carrusel/Farmacovigilancia.png",
    },
  ];

  const graduationModalities = [
    {
      title: "Proyecto de investigación",
      description: "Desarrollo de investigaciones originales en las líneas del grupo, con metodología científica rigurosa y contribución al conocimiento farmacológico.",
  image: "/images/Carrusel/Proyecto-de-Investigacion.png"
    },
    {
      title: "Monografías",
      description: "Revisiones sistemáticas y análisis críticos de temas específicos en farmacología y terapéutica, con enfoque en evidencia científica actualizada.",
  image: "/images/Carrusel/Monografia.png"
    },
    {
      title: "Pasantías",
      description: "Experiencias prácticas en centros de investigación, hospitales o industria farmacéutica para aplicar conocimientos teóricos en entornos reales.",
  image: "/images/Carrusel/Pasantia.png"
    },
    {
      title: "Asignaturas de postgrado",
      description: "Cursos especializados de nivel avanzado que complementan la formación en áreas específicas de farmacología y terapéutica.",
  image: "/images/Carrusel/Asignatura-de-Postgrado.png"
    },
    {
      title: "Diplomados",
      description: "Programas de educación continua en áreas especializadas como farmacovigilancia, farmacia clínica y desarrollo de medicamentos.",
  image: "/images/Carrusel/Diplomado.png"
    },
    {
      title: "Publicación de artículo científico",
      description: "Contribución al conocimiento científico a través de la publicación de resultados de investigación en revistas indexadas o capítulos de libro.",
  image: "/images/Carrusel/Articulo-Cientifico.png"
    }
  ];

  const activitiesProducts = [
    {
      title: "Participación de semilleristas y tesistas",
      description: "Formación integral de estudiantes a través de su participación activa en proyectos de investigación y desarrollo de productos científicos del grupo.",
  image: "/images/Carrusel/Semilleristas.png"
    },
    {
      title: "Ponencias y posters",
      description: "Presentación de resultados de investigación en congresos nacionales e internacionales, promoviendo el intercambio científico y la visibilidad del grupo.",
  image: "/images/Carrusel/Ponencias.png"
    },
    {
      title: "Comunidad de aprendizaje",
      description: "Creación de espacios de intercambio académico entre estudiantes y docentes para fomentar el pensamiento crítico y la investigación colaborativa.",
  image: "/images/Carrusel/Comunidad.png"
    },
    {
      title: "Cursos y actividades académicas",
      description: "Desarrollo de programas educativos especializados, talleres y seminarios para fortalecer las competencias investigativas en la comunidad académica.",
  image: "/images/Carrusel/Cursos.png"
    }
  ];

  return (
    <>
      {/* Líneas de Investigación */}
      <section className="mb-16">
        <h3 className="text-4xl font-poppins font-bold text-center text-fyt-dark mb-8 drop-shadow-lg">
          Líneas de Investigación
        </h3>
        <div className="relative px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-64 py-8">
          <Carrusel
            items={researchLines}
            color="#9B59B6"
            showDescription={true}
            className="w-full"
            imageClassName="home-carousel-image w-full h-full object-cover rounded-t-2xl"
          />
        </div>
      </section>
      {/* Modalidades de Grado */}
      <section className="mb-16">
        <h3 className="text-4xl font-poppins font-bold text-center text-fyt-dark mb-8 drop-shadow-lg">
          Modalidades de Grado
        </h3>
        <div className="relative px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-64 py-8">
          <Carrusel items={graduationModalities} color="#3BB9FF" showDescription={true} className="w-full" imageClassName="home-carousel-image w-full h-full object-cover rounded-t-2xl" />
        </div>
      </section>
      {/* Actividades y Productos */}
      <section>
        <h3 className="text-4xl font-poppins font-bold text-center text-fyt-dark mb-8 drop-shadow-lg">
          Actividades y Productos
        </h3>
        <div className="relative px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-64 py-8 mb-12">
          <Carrusel items={activitiesProducts} color="#FF4C4C" showDescription={true} className="w-full" imageClassName="home-carousel-image w-full h-full object-cover rounded-t-2xl" />
        </div>
        {/* INSCRÍBETE AHORA Card */}
        <div className="flex justify-center mt-8">
            <Card 
              className="group max-w-2xl w-full p-8 shadow-2xl text-center animate-fade-in bg-fyt-blue text-white border-2 border-fyt-blue hover:bg-white transition-colors"
            >
              <Bell className="w-12 h-12 mx-auto mb-4 text-white group-hover:text-fyt-blue animate-bounce" aria-label="Inscríbete ahora" />
              <h3 className="text-4xl font-poppins font-bold mb-4 text-white group-hover:text-fyt-blue">INSCRÍBETE AHORA</h3>
              <p className="mb-6 font-inter text-white/95 group-hover:text-fyt-blue">
                ¿Interesado en formar parte de nuestro semillero de investigación? 
                Completa el formulario oficial de inscripción.
              </p>
              <Button 
                variant="outline"
                size="lg"
                className="bg-white text-[#3BB9FF] border-2 border-[#3BB9FF] hover:bg-[#3BB9FF] hover:text-white transition-colors duration-300 px-8 py-3 font-inter font-semibold shadow-lg"
                onClick={() => window.open('https://forms.gle/3fbXVW7b4Db6Q9dWA', '_blank')}
              >
                Inscribirse Ahora
              </Button>
            </Card>
        </div>
        {/* Animaciones CSS */}
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(.42,0,.58,1); }
          .animate-bounce { animation: bounce 1.2s infinite alternate; }
          @keyframes bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-18px); }
          }
        `}</style>
      </section>
    </>
  );
};

export default About;