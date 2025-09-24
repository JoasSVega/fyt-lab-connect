import React, { useState } from "react";
import { Target, Eye, Microscope, Heart, Users, BookOpen, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
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
    {
      title: "Farmacología y Terapéutica",
      description: "Estudio de los efectos de los medicamentos en el organismo y desarrollo de terapias farmacológicas optimizadas para mejorar la eficacia y seguridad en el tratamiento de enfermedades.",
      image: researchPharmacology
    },
    {
      title: "Farmacovigilancia",
      description: "Monitoreo y evaluación continua de la seguridad de los medicamentos, identificación de reacciones adversas y desarrollo de estrategias para minimizar riesgos.",
      image: researchPharmacovigilance
    },
    {
      title: "Farmacia Asistencial y Atención Farmacéutica",
      description: "Optimización del uso de medicamentos a través de la atención farmacéutica directa al paciente, educación sanitaria y seguimiento farmacoterapéutico.",
      image: researchClinicalPharmacy
    },
    {
      title: "Farmacoepidemiología",
      description: "Análisis del uso, efectividad y seguridad de los medicamentos en poblaciones reales, proporcionando evidencia para la toma de decisiones en salud pública.",
      image: researchPharmacoepidemiology
    },
    {
      title: "Farmacoeconomía",
      description: "Evaluación económica de las terapias farmacológicas, análisis de costo-efectividad y desarrollo de modelos para optimizar la asignación de recursos en salud.",
      image: researchPharmacoeconomics
    },
    {
      title: "Estudios in sílico y modelización molecular",
      description: "Diseño computacional de nuevos fármacos utilizando técnicas de modelado molecular, simulaciones y algoritmos para acelerar el desarrollo farmacéutico.",
      image: researchMolecularModeling
    }
  ];

  const graduationModalities = [
    {
      title: "Proyecto de investigación",
      description: "Desarrollo de investigaciones originales en las líneas del grupo, con metodología científica rigurosa y contribución al conocimiento farmacológico.",
      image: researchPharmacology
    },
    {
      title: "Monografías",
      description: "Revisiones sistemáticas y análisis críticos de temas específicos en farmacología y terapéutica, con enfoque en evidencia científica actualizada.",
      image: researchClinicalPharmacy
    },
    {
      title: "Pasantías",
      description: "Experiencias prácticas en centros de investigación, hospitales o industria farmacéutica para aplicar conocimientos teóricos en entornos reales.",
      image: researchPharmacovigilance
    },
    {
      title: "Asignaturas de postgrado",
      description: "Cursos especializados de nivel avanzado que complementan la formación en áreas específicas de farmacología y terapéutica.",
      image: researchPharmacoepidemiology
    },
    {
      title: "Diplomados",
      description: "Programas de educación continua en áreas especializadas como farmacovigilancia, farmacia clínica y desarrollo de medicamentos.",
      image: researchPharmacoeconomics
    },
    {
      title: "Publicación de artículo científico",
      description: "Contribución al conocimiento científico a través de la publicación de resultados de investigación en revistas indexadas o capítulos de libro.",
      image: researchMolecularModeling
    }
  ];

  const activitiesProducts = [
    {
      title: "Participación de semilleristas y tesistas",
      description: "Formación integral de estudiantes a través de su participación activa en proyectos de investigación y desarrollo de productos científicos del grupo.",
      image: researchPharmacology
    },
    {
      title: "Ponencias y posters",
      description: "Presentación de resultados de investigación en congresos nacionales e internacionales, promoviendo el intercambio científico y la visibilidad del grupo.",
      image: researchClinicalPharmacy
    },
    {
      title: "Comunidad de aprendizaje",
      description: "Creación de espacios de intercambio académico entre estudiantes y docentes para fomentar el pensamiento crítico y la investigación colaborativa.",
      image: researchPharmacovigilance
    },
    {
      title: "Cursos y actividades académicas",
      description: "Desarrollo de programas educativos especializados, talleres y seminarios para fortalecer las competencias investigativas en la comunidad académica.",
      image: researchPharmacoepidemiology
    }
  ];

  return (
    <>
      {/* Líneas de Investigación */}
      <section className="mb-16">
        <h3 className="text-2xl font-poppins font-bold text-center text-fyt-dark mb-8 drop-shadow-lg">
          Líneas de Investigación
        </h3>
  <div className="relative px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-64 py-6">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {researchLines.map((line, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/90 border-2 border-[#9B59B6]/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={line.image} 
                        alt={`Imagen de línea de investigación: ${line.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-raleway font-semibold text-[#9B59B6] mb-3">{line.title}</h4>
                      <p className="text-sm font-inter text-gray-700 leading-relaxed text-justify">{line.description}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </section>
      {/* Modalidades de Grado */}
      <section className="mb-16">
        <h3 className="text-2xl font-poppins font-bold text-center text-fyt-dark mb-8 drop-shadow-lg">
          Modalidades de Grado
        </h3>
  <div className="relative px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-64 py-6">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {graduationModalities.map((modality, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/90 border-2 border-[#3BB9FF]/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={modality.image} 
                        alt={`Imagen de modalidad de grado: ${modality.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-raleway font-semibold text-[#3BB9FF] mb-3">{modality.title}</h4>
                      <p className="text-sm font-inter text-gray-700 leading-relaxed text-justify">{modality.description}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </section>
      {/* Actividades y Productos */}
      <section>
        <h3 className="text-2xl font-poppins font-bold text-center text-fyt-dark mb-8 drop-shadow-lg">
          Actividades y Productos
        </h3>
  <div className="relative px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-64 py-6 mb-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {activitiesProducts.map((activity, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                  <Card className="bg-white/90 border-2 border-[#FF4C4C]/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={`Imagen de actividad o producto: ${activity.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-raleway font-semibold text-[#FF4C4C] mb-3">{activity.title}</h4>
                      <p className="text-sm font-inter text-gray-700 leading-relaxed text-justify">{activity.description}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
        {/* INSCRÍBETE AHORA Card */}
        <div className="flex justify-center mt-8">
            <Card 
              className="max-w-2xl w-full p-8 shadow-2xl text-center animate-fade-in bg-white"
            >
              <Bell className="w-12 h-12 mx-auto mb-4 text-black animate-bounce" aria-label="Inscríbete ahora" />
              <h3 className="text-2xl font-poppins font-bold mb-4 text-[#1e293b]">INSCRÍBETE AHORA</h3>
              <p className="mb-6 font-inter text-[#1e293b]">
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