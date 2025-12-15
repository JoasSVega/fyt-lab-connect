// Página principal de Investigación - Hub académico premium
// Vista general estructurada de la producción investigativa del grupo FyT
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Microscope, FileText, Users, Video, ChevronRight, Presentation, GraduationCap } from "lucide-react";
import HeroInvestigacion from "@/components/HeroInvestigacion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";

// Importar datos reales desde GrupLAC
import { publicacionesFyT } from "@/data/publicaciones";
import { proyectos } from "@/data/proyectos";
import { divulgacionCientifica } from "@/data/contenidosDigitales";
import { eventos } from "@/data/eventos";
import type { Publicacion, Proyecto, DivulgacionCientifica, Evento } from "@/types/investigacion";
import { pathPublicaciones, pathProyectos, pathFormacion, pathDivulgacionCientifica, pathEventos } from "@/App";


const InvestigacionPage: React.FC = () => {
  usePageReady();

  // Calcular datos reales sin duplicar
  const publicacionesRecientes = [...publicacionesFyT]
    .sort((a, b) => b.anio - a.anio)
    .slice(0, 5);
  
  const totalPublicaciones = publicacionesFyT.length;
  
  const proyectosActivos = proyectos.filter(p => p.estado === "En curso");
  const proyectosDestacados = [
    ...proyectosActivos.slice(0, 2),
    ...proyectos.filter(p => p.estado === "Finalizado").slice(0, 1)
  ].slice(0, 3);
  
  const contenidosDestacados = [...divulgacionCientifica]
    .sort((a, b) => b.anio - a.anio)
    .slice(0, 3);

  const eventosRecientes = [...eventos]
    .sort((a, b) => b.anio - a.anio)
    .slice(0, 3);

  return (
    <div className="w-full bg-background flex flex-col">
      <Seo
        title="Investigación y Producción Académica – FYT Lab Connect"
        description="Hub académico del Grupo FyT: publicaciones científicas, proyectos, eventos científicos y producción digital desde GrupLAC."
        author="FYT Lab Connect"
        robots="index, follow"
        canonical="https://fytlabconnect.com/investigacion"
        openGraph={{ title: "Investigación", description: "Producción científica del grupo FyT", type: "article" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      
      {/* Hero con KPIs */}
      <HeroInvestigacion />

      {/* Párrafo Editorial */}
      <ScrollReveal>
        <section className="py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-slate-50/50">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl font-inter text-slate-700 leading-relaxed md:leading-loose text-justify">
              El Grupo de Investigación Farmacología y Terapéutica (FyT), creado en 2009 y con sede en Cartagena de Indias, desarrolla actividades científicas enmarcadas en las áreas de Farmacología, Farmacia Asistencial y Ciencias Biomédicas. Clasificado en categoría B por Minciencias, articula investigación básica y aplicada a través de sus líneas oficiales: Atención Farmacéutica, Diseño y Modelización Molecular, Farmacoeconomía, Farmacoepidemiología, Farmacología y Terapéutica, y Farmacovigilancia y Toxicología. Bajo el liderazgo del profesor Antistio Aníbal Alviz Amador, el grupo impulsa procesos formativos en pregrado, maestría y doctorado, ejecuta proyectos estratégicos alineados con los programas nacionales de Ciencias Básicas y Ciencia, Tecnología e Innovación en Salud, y participa activamente en la generación de evidencia científica, innovación, formación de talento humano y divulgación académica. Su visión institucional proyecta al grupo como referente nacional en 2030 e internacional en 2035, contribuyendo al diseño de soluciones terapéuticas y al fortalecimiento de la investigación farmacéutica en Colombia.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Subnavegación interna */}
      <ScrollReveal>
        <nav className="py-8 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link 
                to={pathPublicaciones}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-sm transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Publicaciones
              </Link>
              <Link 
                to={pathProyectos}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-sm transition-all duration-200"
              >
                <Microscope className="w-4 h-4" />
                Proyectos
              </Link>
              <Link 
                to={pathEventos}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-sm transition-all duration-200"
              >
                <Users className="w-4 h-4" />
                Eventos
              </Link>
              <Link 
                to={pathFormacion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-sm transition-all duration-200"
              >
                <GraduationCap className="w-4 h-4" />
                Formación
              </Link>
              <Link 
                to={pathDivulgacionCientifica}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-sm transition-all duration-200"
              >
                <Video className="w-4 h-4" />
                Contenido Digital
              </Link>
            </div>
          </div>
        </nav>
      </ScrollReveal>

      {/* Content sections */}
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full">
        
        {/* 🔬 Publicaciones científicas */}
        <ScrollReveal>
          <section className="py-16 md:py-20 lg:py-24">
            <div className="flex items-center justify-between mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800">
                Publicaciones Científicas
              </h2>
              <span className="text-sm text-slate-600 font-inter">
                {totalPublicaciones} publicaciones registradas
              </span>
            </div>

            <div className="space-y-4 mb-8">
              {publicacionesRecientes.map((pub: Publicacion) => {
                const isBook = pub.tipo === "libro" || pub.tipo === "capitulo";
                const iconColor = isBook ? "text-violet-600" : "text-sky-600";
                const badgeBg = isBook ? "bg-violet-50" : "bg-sky-50";
                const badgeText = isBook ? "text-violet-800" : "text-sky-800";
                return (
                <article
                  key={pub.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-6">
                    {/* Header: icon + badges (badges mobile here, desktop on right) */}
                    <div className="flex items-center justify-between md:justify-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5">
                        <FileText className={`w-5 h-5 ${iconColor} shrink-0`} />
                      </span>
                      <div className="flex items-center gap-2 md:hidden">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${badgeBg} ${badgeText} text-xs font-semibold`}>
                          {pub.tipo}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                          {pub.anio}
                        </span>
                      </div>
                    </div>
                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-inter font-semibold text-gray-900 leading-snug">
                        {pub.titulo}
                      </h3>
                    </div>
                    {/* Badges desktop */}
                    <div className="hidden md:flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${badgeBg} ${badgeText} text-xs font-semibold`}>
                        {pub.tipo}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {pub.anio}
                      </span>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>

            <div className="text-center">
              <Link 
                to={pathPublicaciones}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Ver todas las publicaciones
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* 🧪 Proyectos de investigación */}
        <ScrollReveal>
          <section className="py-16 md:py-20 lg:py-24 border-t border-slate-200">
            <div className="flex items-center justify-between mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800">
                Proyectos de Investigación
              </h2>
              <span className="text-sm text-slate-600 font-inter">
                {proyectosActivos.length} activos · {proyectos.length} totales
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosDestacados.map((proyecto: Proyecto) => (
                <article
                  key={proyecto.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Header: Icono + Badges en una línea (Mobile: icon prominent) */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Icono fijo - NO se aplasta */}
                    <span className="inline-flex items-center justify-center w-6 h-6 min-w-[24px] shrink-0">
                      <Microscope className="w-6 h-6 text-indigo-600" />
                    </span>
                    {/* Badge Estado */}
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                      {proyecto.estado}
                    </span>
                    {/* Badge Año - alineado a la derecha */}
                    <span className="ml-auto px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                      {proyecto.anio}
                    </span>
                  </div>
                  {/* Título en línea nueva */}
                  <div>
                    <h3 className="text-base md:text-lg font-inter font-semibold text-gray-900 leading-snug">
                      {proyecto.titulo}
                    </h3>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link 
                to={pathProyectos}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Ver todos los proyectos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* 🎤 Participación en Eventos Científicos */}
        <ScrollReveal>
          <section className="py-16 md:py-20 lg:py-24 border-t border-slate-200">
            <div className="mb-10 md:mb-12 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800">
                Participación en Eventos Científicos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosRecientes.map((evento: Evento) => (
                <article
                  key={evento.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Header: Icono + Badges en una línea */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Icono fijo - NO se aplasta */}
                    <span className="inline-flex items-center justify-center w-6 h-6 min-w-[24px] shrink-0">
                      <Presentation className="w-6 h-6 text-fuchsia-600" />
                    </span>
                    {/* Badge Tipo de Participación */}
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-50 text-fuchsia-700">
                      {evento.participacion}
                    </span>
                    {/* Badge Año - alineado a la derecha */}
                    <span className="ml-auto px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                      {evento.anio}
                    </span>
                  </div>
                  {/* Nombre del Evento */}
                  <div className="mb-3">
                    <h3 className="text-base md:text-lg font-inter font-semibold text-gray-900 leading-snug line-clamp-3">
                      {evento.titulo}
                    </h3>
                  </div>
                  {/* Lugar */}
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">{evento.ciudad}</span>, {evento.pais}
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link 
                to={pathEventos}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Ver todos los eventos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* 📣 Producción de contenido digital */}
        <ScrollReveal>
          <section className="py-16 md:py-20 lg:py-24 border-t border-slate-200">
            <div className="mb-10 md:mb-12 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800">
                Producción Audiovisual y Sonora
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contenidosDestacados.map((contenido: DivulgacionCientifica) => (
                <article
                  key={contenido.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold inline-flex items-center gap-1">
                      <Video className="w-4 h-4 text-rose-600" />
                      {contenido.tipo}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                      {contenido.anio}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-inter font-semibold text-gray-900 leading-snug line-clamp-2">
                    {contenido.titulo}
                  </h3>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link 
                to={pathDivulgacionCientifica}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Ver todos los contenidos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default InvestigacionPage;
