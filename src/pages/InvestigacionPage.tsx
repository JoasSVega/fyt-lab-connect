// Página principal de Investigación y Producción Académica
// Hero, párrafo editorial, KPIs, proyectos, publicaciones, eventos y producción tecnológica
import React, { useState } from "react";
import { BookOpen, Microscope, FileText, Award, Briefcase, MapPin, Calendar, Users, ExternalLink } from "lucide-react";
import HeroInvestigacion from "@/components/HeroInvestigacion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import { sanitizeURL } from "@/lib/sanitize";

// Importar datos reales desde JSON
import projectsData from "@/data/projects.json";
import publicationsData from "@/data/publications.json";
import eventsCoursesData from "@/data/events_courses.json";
import techProductionData from "@/data/tech_production.json";

type Project = { 
  id: number; 
  title: string; 
  summary: string; 
  meta: string; 
  image: string; 
  status: "En curso" | "Finalizado"; 
  year: number; 
  area: string;
  role?: string;
};
type Publication = { 
  id: number; 
  title: string; 
  authors: string; 
  journal: string; 
  year: number; 
  summary: string; 
  image: string; 
  type: "articulo" | "libro" | "capitulo" | "divulgacion"; 
  doi?: string;
  link?: string;
};
type EventCourse = { 
  id: number; 
  title: string; 
  year: number; 
  type: string;
  participation: string;
  location: string;
};
type TechProduction = { 
  id: number; 
  title: string; 
  type: string; 
  year: number; 
  description: string; 
};

const InvestigacionPage: React.FC = () => {
  const [proyectosTab, setProyectosTab] = useState<'en-curso' | 'finalizados' | 'todos'>("todos");
  const [publicacionesTab, setPublicacionesTab] = useState<'articulos' | 'libros' | 'capitulos'>("articulos");
  
  const allProjects = projectsData as unknown as Project[];
  const proyectosEnCurso = allProjects.filter((p) => p.status === "En curso");
  const proyectosFinalizados = allProjects.filter((p) => p.status === "Finalizado");
  
  const getDisplayedProjects = () => {
    switch (proyectosTab) {
      case 'en-curso': return proyectosEnCurso;
      case 'finalizados': return proyectosFinalizados;
      default: return allProjects.slice(0, 6);
    }
  };

  usePageReady();

  return (
    <div className="w-full bg-background flex flex-col">
      <Seo
        title="Investigación y Producción Académica – FYT Lab Connect"
        description="KPIs académicos, proyectos destacados, publicaciones recientes y eventos científicos del grupo FYT."
        author="FYT Lab Connect"
        robots="index, follow"
        canonical="https://fytlabconnect.com/investigacion"
        openGraph={{ title: "Investigación", description: "Resultados y proyectos científicos", type: "article" }}
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

      {/* Content sections */}
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full">
        
        {/* Proyectos de investigación */}
        <ScrollReveal>
          <section className="py-16 md:py-20 lg:py-24">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-4">
                Proyectos de Investigación
              </h2>
              <p className="text-base sm:text-lg font-inter text-slate-600 max-w-2xl mx-auto">
                Iniciativas científicas activas y finalizadas del grupo de investigación.
              </p>
            </div>
            
            {/* Botones de categoría */}
            <div className="flex gap-3 flex-wrap justify-center mb-10 md:mb-12">
              <button 
                onClick={() => setProyectosTab('en-curso')} 
                className={`px-6 py-2.5 rounded-full text-sm font-inter font-medium border transition-all duration-200 ${
                  proyectosTab === 'en-curso' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                En curso
              </button>
              <button 
                onClick={() => setProyectosTab('finalizados')} 
                className={`px-6 py-2.5 rounded-full text-sm font-inter font-medium border transition-all duration-200 ${
                  proyectosTab === 'finalizados' 
                    ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                    : 'bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300'
                }`}
              >
                Finalizados
              </button>
              <button 
                onClick={() => setProyectosTab('todos')} 
                className={`px-6 py-2.5 rounded-full text-sm font-inter font-medium border transition-all duration-200 ${
                  proyectosTab === 'todos' 
                    ? 'bg-slate-700 text-white border-slate-700 shadow-sm' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                Ver todos
              </button>
            </div>
            
            {/* Grid de proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {getDisplayedProjects().map((proj) => (
                <article 
                  key={proj.id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 md:p-7 flex flex-col h-full transition-all duration-300 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                        <Microscope className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">{proj.year}</span>
                        <span className="text-xs text-slate-400">{proj.area}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      proj.status === 'En curso' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-raleway font-semibold text-slate-800 mb-3 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 flex-1 font-inter leading-relaxed mb-4">
                    {proj.summary}
                  </p>
                  {proj.role && (
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-500 font-medium">{proj.role}</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Publicaciones científicas y académicas */}
        <ScrollReveal delay={0.1}>
          <section className="py-16 md:py-20 lg:py-24 border-t border-slate-100">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-4">
                Publicaciones Científicas y Académicas
              </h2>
              <p className="text-base sm:text-lg font-inter text-slate-600 max-w-2xl mx-auto">
                Producción intelectual indexada en revistas y editoriales especializadas.
              </p>
            </div>
            
            {/* Botones de categoría */}
            <div className="flex gap-3 flex-wrap justify-center mb-10 md:mb-12">
              {[ 
                { key: "articulos", label: "Artículos científicos", icon: <FileText className="w-4 h-4" /> },
                { key: "libros", label: "Libros", icon: <BookOpen className="w-4 h-4" /> },
                { key: "capitulos", label: "Capítulos de libro", icon: <BookOpen className="w-4 h-4" /> }
              ].map(tabItem => (
                <button
                  key={tabItem.key}
                  className={`px-5 py-2.5 rounded-full text-sm font-inter font-medium border transition-all duration-200 flex items-center gap-2 ${
                    publicacionesTab === tabItem.key
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => setPublicacionesTab(tabItem.key as 'articulos' | 'libros' | 'capitulos')}
                  type="button"
                >
                  {tabItem.icon}
                  <span>{tabItem.label}</span>
                </button>
              ))}
            </div>
            
            {/* Grid de publicaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Artículos científicos */}
              {publicacionesTab === "articulos" && (
                (publicationsData as unknown as Publication[])
                  .filter((pub) => pub.type === "articulo")
                  .map((pub) => (
                    <article 
                      key={pub.id} 
                      className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col transition-all duration-300 border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{pub.journal}</span>
                        </div>
                      </div>
                      <h3 className="text-sm md:text-base font-raleway font-semibold text-slate-800 mb-3 leading-snug line-clamp-3">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 font-inter flex-1">
                        {pub.summary}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500 line-clamp-1 flex-1 mr-2">{pub.authors}</span>
                        {pub.doi && (
                          <a 
                            href={`https://doi.org/${pub.doi}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium text-xs hover:bg-blue-100 transition"
                          >
                            <ExternalLink className="w-3 h-3" />
                            DOI
                          </a>
                        )}
                      </div>
                    </article>
                  ))
              )}
              
              {/* Libros */}
              {publicacionesTab === "libros" && (
                (publicationsData as unknown as Publication[])
                  .filter((pub) => pub.type === "libro")
                  .map((pub) => (
                    <article 
                      key={pub.id} 
                      className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col transition-all duration-300 border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50">
                          <BookOpen className="w-5 h-5 text-green-600" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{pub.journal}</span>
                        </div>
                      </div>
                      <h3 className="text-sm md:text-base font-raleway font-semibold text-slate-800 mb-3 leading-snug line-clamp-3">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 font-inter flex-1">
                        {pub.summary}
                      </p>
                      <div className="pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500 line-clamp-1">{pub.authors}</span>
                      </div>
                    </article>
                  ))
              )}
              
              {/* Capítulos */}
              {publicacionesTab === "capitulos" && (
                (publicationsData as unknown as Publication[])
                  .filter((pub) => pub.type === "capitulo")
                  .map((pub) => (
                    <article 
                      key={pub.id} 
                      className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col transition-all duration-300 border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-50">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{pub.journal}</span>
                        </div>
                      </div>
                      <h3 className="text-sm md:text-base font-raleway font-semibold text-slate-800 mb-3 leading-snug line-clamp-3">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 font-inter flex-1">
                        {pub.summary}
                      </p>
                      <div className="pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500 line-clamp-1">{pub.authors}</span>
                      </div>
                    </article>
                  ))
              )}
            </div>
          </section>
        </ScrollReveal>

        {/* Eventos y cursos */}
        <ScrollReveal delay={0.15}>
          <section className="py-16 md:py-20 lg:py-24 border-t border-slate-100">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-4">
                Eventos y Cursos
              </h2>
              <p className="text-base sm:text-lg font-inter text-slate-600 max-w-2xl mx-auto">
                Espacios de formación, intercambio académico y difusión del conocimiento.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 lg:p-10">
              <div className="space-y-0 divide-y divide-slate-100">
                {(eventsCoursesData as unknown as EventCourse[]).map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <span className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${
                      item.type === 'Curso' ? 'bg-teal-50' : item.type === 'Internacional' ? 'bg-purple-50' : 'bg-blue-50'
                    }`}>
                      {item.type === 'Curso' ? (
                        <BookOpen className="w-5 h-5 text-teal-600" />
                      ) : (
                        <Award className="w-5 h-5 text-blue-600" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.type === 'Curso' ? 'bg-teal-100 text-teal-700' : 
                          item.type === 'Internacional' ? 'bg-purple-100 text-purple-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.year}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>
                      <h3 className="font-raleway font-semibold text-slate-800 text-sm md:text-base mb-1">
                        {item.title}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        Participación: {item.participation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Producción tecnológica */}
        <ScrollReveal delay={0.2}>
          <section className="py-16 md:py-20 lg:py-24 border-t border-slate-100">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-4">
                Producción Tecnológica
              </h2>
              <p className="text-base sm:text-lg font-inter text-slate-600 max-w-2xl mx-auto">
                Desarrollos, software y herramientas generadas por el grupo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {(techProductionData as unknown as TechProduction[]).map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col transition-all duration-300 border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">{item.year}</span>
                      <span className="text-xs text-emerald-600 font-medium">{item.type}</span>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-base font-raleway font-semibold text-slate-800 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 flex-1 font-inter leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA final */}
        <section className="py-16 md:py-20 px-8 sm:px-12 rounded-2xl my-16 md:my-20 bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 border border-slate-100 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-5 text-center">
            ¿Quieres colaborar o conocer más?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 text-center max-w-xl font-inter leading-relaxed">
            Contáctanos para sumar esfuerzos, compartir ideas o recibir información sobre nuestras líneas de investigación y producción académica.
          </p>
          <a 
            href="/contactos" 
            className="inline-block px-7 py-3 rounded-full bg-blue-600 text-white font-inter font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 text-base"
          >
            Contactar al equipo
          </a>
        </section>

        {/* Frase motivadora */}
        <section className="py-12 mb-12">
          <p className="text-center text-lg md:text-xl font-inter font-semibold text-blue-700 italic">
            "Generamos conocimiento para transformar la salud y la sociedad"
          </p>
        </section>
      </div>
    </div>
  );
};

export default InvestigacionPage;
