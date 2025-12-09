// Página principal de Investigación y Producción Académica
// Hero, KPIs, proyectos destacados, publicaciones recientes, CTA y frase motivadora
import React, { useState } from "react";
import { BookOpen, Microscope, FileText, Award, Briefcase } from "lucide-react";
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

type Project = { id: number; title: string; summary: string; meta: string; image: string; status: "En curso" | "Finalizado"; year: number; area: string };
type Publication = { id: number; title: string; authors: string; journal: string; year: number; summary: string; image: string; type: "articulo" | "libro" | "capitulo" | "divulgacion" | "reporte" | "conferencia" | "memoria"; link?: string };
type EventCourse = { id: number; title: string; year: number; type: string };
type TechProduction = { id: number; title: string; type: string; year: number; description: string };

const InvestigacionPage: React.FC = () => {
  const [proyectosTab, setProyectosTab] = useState<'en-curso' | 'finalizados'>("en-curso");
  const [publicacionesTab, setPublicacionesTab] = useState<'articulos' | 'libros' | 'otras'>("articulos");
  const proyectosEnCurso = (projectsData as unknown as Project[]).filter((p) => p.status === "En curso").slice(0, 3);
  const proyectosFinalizados = (projectsData as unknown as Project[]).filter((p) => p.status === "Finalizado").slice(0, 3);

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
      
      {/* HeroInvestigacion: Hero moderno con KPIs animados y accesibles */}
      <HeroInvestigacion />

      {/* Content sections with proper padding */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
        {/* Proyectos destacados */}
        <ScrollReveal>
          <section className="mb-12 md:mb-16">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center">Proyectos de investigación</h2>
              <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
                <button onClick={() => setProyectosTab('en-curso')} className={`px-4 py-1.5 rounded-full text-sm font-inter border min-w-[110px] transition-colors ${proyectosTab === 'en-curso' ? 'bg-fyt-blue text-white border-fyt-blue' : 'bg-white text-fyt-blue border-fyt-blue/40 hover:bg-fyt-blue/5'}`}>En curso</button>
                <button onClick={() => setProyectosTab('finalizados')} className={`px-4 py-1.5 rounded-full text-sm font-inter border min-w-[110px] transition-colors ${proyectosTab === 'finalizados' ? 'bg-fyt-purple text-white border-fyt-purple' : 'bg-white text-fyt-purple border-fyt-purple/40 hover:bg-fyt-purple/5'}`}>Completados</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {(proyectosTab === 'en-curso' ? proyectosEnCurso : proyectosFinalizados).map((proj) => (
                <div key={proj.id} className="bg-white rounded-xl shadow-soft p-5 sm:p-6 flex flex-col h-full transition-all hover:shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <Microscope className="w-5 h-5 text-fyt-blue" aria-hidden="true" />
                    <span className="text-xs text-slate-500">{proj.year}</span>
                    <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-semibold ${proj.status === 'En curso' ? 'bg-fyt-blue/10 text-fyt-blue' : 'bg-fyt-purple/10 text-fyt-purple'}`}>{proj.status}</span>
                  </div>
                  <h3 className="text-base font-raleway font-semibold text-slate-800 mb-2">{proj.title}</h3>
                  <p className="text-sm text-slate-600 flex-1 font-inter leading-relaxed">{proj.summary}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <a href="/investigacion/proyectos" className="inline-block px-5 py-2 rounded-full bg-fyt-blue text-white font-inter shadow hover:bg-fyt-blue/90 transition">Ver todos los proyectos</a>
            </div>
          </section>
        </ScrollReveal>

        {/* Publicaciones científicas y académicas */}
        <ScrollReveal delay={0.1}>
          <section className="mb-12 md:mb-16">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center">Publicaciones científicas y académicas</h2>
              <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
                {[ 
                  { key: "articulos", label: "Artículos científicos", icon: <FileText className="w-4 h-4" /> },
                  { key: "libros", label: "Libros y capítulos", icon: <BookOpen className="w-4 h-4" /> },
                  { key: "otras", label: "Divulgación", icon: <Award className="w-4 h-4" /> }
                ].map(tabItem => (
                  <button
                    key={tabItem.key}
                    className={`px-4 py-1.5 rounded-full text-sm font-inter border transition-colors flex items-center gap-2 ${
                      publicacionesTab === tabItem.key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                    onClick={() => setPublicacionesTab(tabItem.key as 'articulos' | 'libros' | 'otras')}
                    type="button"
                  >
                    {tabItem.icon}
                    <span>{tabItem.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* Artículos científicos */}
              {publicacionesTab === "articulos" && (
                (publicationsData as unknown as Publication[]).filter((pub) => pub.type === "articulo").slice(0, 6).map((pub) => (
                  <div key={pub.id} className="bg-white rounded-xl shadow-soft p-5 flex flex-col group transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                    </div>
                    <h3 className="text-sm font-raleway font-semibold text-slate-800 mb-2 line-clamp-2">{pub.title}</h3>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2 font-inter flex-1">{pub.summary}</p>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <span className="text-xs text-slate-500 line-clamp-1">{pub.authors}</span>
                      <a href={pub.link ? (sanitizeURL(pub.link) || pub.link) : "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-xs hover:bg-blue-100 transition">Ver más</a>
                    </div>
                  </div>
                ))
              )}
              {/* Libros y capítulos */}
              {publicacionesTab === "libros" && (
                (publicationsData as unknown as Publication[]).filter((pub) => pub.type === "libro" || pub.type === "capitulo").slice(0, 6).map((pub) => (
                  <div key={pub.id} className="bg-white rounded-xl shadow-soft p-5 flex flex-col group transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                    </div>
                    <h3 className="text-sm font-raleway font-semibold text-slate-800 mb-2 line-clamp-2">{pub.title}</h3>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2 font-inter flex-1">{pub.summary}</p>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <span className="text-xs text-slate-500 line-clamp-1">{pub.authors}</span>
                      <a href={pub.link ? (sanitizeURL(pub.link) || pub.link) : "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium text-xs hover:bg-green-100 transition">Ver más</a>
                    </div>
                  </div>
                ))
              )}
              {/* Divulgación */}
              {publicacionesTab === "otras" && (
                (publicationsData as unknown as Publication[]).filter((pub) => pub.type === "divulgacion" || pub.type === "reporte" || pub.type === "conferencia" || pub.type === "memoria").slice(0, 6).map((pub) => (
                  <div key={pub.id} className="bg-white rounded-xl shadow-soft p-5 flex flex-col group transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                        <Award className="w-5 h-5 text-slate-600" />
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                    </div>
                    <h3 className="text-sm font-raleway font-semibold text-slate-800 mb-2 line-clamp-2">{pub.title}</h3>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2 font-inter flex-1">{pub.summary}</p>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <span className="text-xs text-slate-500 line-clamp-1">{pub.authors}</span>
                      <a href={pub.link ? (sanitizeURL(pub.link) || pub.link) : "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 transition">Ver más</a>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end mt-6">
              <a href="/investigacion/publicaciones" className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-800 font-semibold shadow hover:bg-blue-100 transition">Ver todas las publicaciones</a>
            </div>
          </section>
        </ScrollReveal>

        {/* Eventos y cursos */}
        <ScrollReveal delay={0.15}>
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center mb-6">Eventos y cursos</h2>
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
              <ul className="space-y-4">
                {(eventsCoursesData as unknown as EventCourse[]).slice(0, 8).map((item) => (
                  <li key={item.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.type.includes('Curso') ? 'bg-teal-100' : 'bg-blue-100'}`}>
                      {item.type.includes('Curso') ? <BookOpen className="w-4 h-4 text-teal-700" /> : <Award className="w-4 h-4 text-blue-700" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-500 font-medium">{item.year}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.type.includes('Curso') ? 'bg-teal-50 text-teal-700' : 'bg-blue-50 text-blue-700'}`}>{item.type}</span>
                      </div>
                      <p className="font-raleway font-medium text-slate-800 mt-1">{item.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-6">
                <button className="inline-block px-5 py-2 rounded-full bg-fyt-blue text-white font-semibold shadow hover:bg-fyt-blue/90 transition">Ver todos los eventos</button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Producción tecnológica */}
        <ScrollReveal delay={0.2}>
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center mb-6">Producción tecnológica</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {(techProductionData as unknown as TechProduction[]).map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-soft p-5 flex flex-col group transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                      {item.type === 'Software' && <Briefcase className="w-5 h-5 text-green-600" />}
                      {item.type === 'Protocolo' && <FileText className="w-5 h-5 text-blue-600" />}
                      {item.type === 'Aplicación móvil' && <BookOpen className="w-5 h-5 text-purple-600" />}
                      {item.type === 'Patente' && <Award className="w-5 h-5 text-orange-600" />}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{item.year}</span>
                    <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">{item.type}</span>
                  </div>
                  <h3 className="text-sm font-raleway font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 flex-1 font-inter">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA final */}
        <section className="py-12 px-6 sm:px-10 rounded-2xl mb-12 bg-gradient-to-r from-fyt-blue/5 to-fyt-purple/5 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-4 text-center">¿Quieres colaborar o conocer más?</h2>
          <p className="text-base sm:text-lg text-slate-600 mb-6 text-center max-w-xl font-inter">Contáctanos para sumar esfuerzos, compartir ideas o recibir información sobre nuestras líneas de investigación y producción académica.</p>
          <a href="/contactos" className="inline-block px-6 py-3 rounded-full bg-fyt-blue text-white font-inter font-semibold shadow hover:bg-fyt-blue/90 transition text-base">Contactar al equipo</a>
        </section>

        {/* Frase motivadora */}
        <section className="py-8 mb-8">
          <p className="text-center text-lg font-inter font-semibold text-fyt-blue italic">"Generamos conocimiento para transformar la salud y la sociedad"</p>
        </section>
      </div>
    </div>
  );
};

export default InvestigacionPage;
