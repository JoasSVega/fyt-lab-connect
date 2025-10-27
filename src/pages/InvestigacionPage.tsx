// Página principal de Investigación y Producción Académica
// Hero, KPIs, proyectos destacados, publicaciones recientes, CTA y frase motivadora
import React, { useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { BookOpen, Microscope, FileText, Folder, Users, Award, Dna, Atom, Briefcase, Star } from "lucide-react";
import HeroInvestigacion from "@/components/HeroInvestigacion";


// Importar datos reales desde JSON

import projectsData from "@/data/projects.json";
import publicationsData from "@/data/publications.json";

import eventsCoursesData from "@/data/events_courses.json";

import techProductionData from "@/data/tech_production.json";
import academicImpactData from "@/data/academic_impact.json";



// KPIs académicos personalizados y visualmente sobrios
const kpis = [
  {
    icon: <FileText className="w-9 h-9 text-blue-400" aria-label="Publicaciones científicas" />,
    value: 90,
    label: "Publicaciones científicas",
    subtitle: "Artículos indexados en revistas nacionales e internacionales",
    colorFrom: "from-blue-100",
    colorTo: "to-white",
    iconBg: "bg-blue-50",
    numberColor: "text-blue-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <BookOpen className="w-9 h-9 text-purple-300" aria-label="Libros y capítulos" />,
    value: 3,
    label: "Libros y capítulos",
    subtitle: "Producción académica especializada en farmacología y terapéutica",
    colorFrom: "from-purple-100",
    colorTo: "to-white",
    iconBg: "bg-purple-50",
    numberColor: "text-purple-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <Microscope className="w-9 h-9 text-green-300" aria-label="Proyectos de investigación" />,
    value: 48,
    label: "Proyectos de investigación",
    subtitle: "Iniciativas desarrolladas en diferentes áreas de la salud",
    colorFrom: "from-green-100",
    colorTo: "to-white",
    iconBg: "bg-green-50",
    numberColor: "text-green-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <Users className="w-9 h-9 text-orange-300" aria-label="Tutorías y trabajos dirigidos" />,
    value: 116,
    label: "Tutorías y trabajos dirigidos",
    subtitle: "Formando nuevas generaciones de investigadores",
    colorFrom: "from-orange-100",
    colorTo: "to-white",
    iconBg: "bg-orange-50",
    numberColor: "text-orange-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <Award className="w-9 h-9 text-gray-400" aria-label="Eventos científicos" />,
    value: 65,
    label: "Eventos científicos",
    subtitle: "Participación activa en congresos, simposios y seminarios",
    colorFrom: "from-gray-100",
    colorTo: "to-white",
    iconBg: "bg-gray-50",
    numberColor: "text-gray-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <BookOpen className="w-9 h-9 text-teal-300" aria-label="Cursos y formación continua" />,
    value: 43,
    label: "Cursos y formación continua",
    subtitle: "Capacitaciones y formación especializada",
    colorFrom: "from-teal-100",
    colorTo: "to-white",
    iconBg: "bg-teal-50",
    numberColor: "text-teal-700",
    subtitleColor: "text-slate-600"
  },
];

const publicationIcons = {
  articulo: <FileText className="w-6 h-6 text-fyt-blue" />,
  libro: <BookOpen className="w-6 h-6 text-fyt-purple" />,
  capitulo: <Folder className="w-6 h-6 text-fyt-green" />
};

const InvestigacionPage: React.FC = () => {
  const [proyectosTab, setProyectosTab] = useState<'en-curso' | 'finalizados'>("en-curso");
  const [publicacionesTab, setPublicacionesTab] = useState<'articulos' | 'libros' | 'otras'>("articulos");
  const proyectosEnCurso = projectsData.filter((p: any) => p.status === "En curso").slice(0, 3);
  const proyectosFinalizados = projectsData.filter((p: any) => p.status === "Finalizado").slice(0, 3);

  return (
    <BaseLayout>
  {/* HeroInvestigacion: Hero moderno con KPIs animados y accesibles */}
  <div className="px-2 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
    <HeroInvestigacion />

      {/* Proyectos destacados */}
      <section className="mb-10">
        <div className="flex flex-col gap-2 mb-4 px-2 sm:px-8 lg:px-16">
          <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center">Proyectos de investigación</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center sm:justify-start">
            <button onClick={() => setProyectosTab('en-curso')} className={`px-3 py-1 rounded-full text-sm font-inter border min-w-[110px] ${proyectosTab === 'en-curso' ? 'bg-fyt-blue text-white border-fyt-blue' : 'bg-white text-fyt-blue border-fyt-blue/40'}`}>En curso</button>
            <button onClick={() => setProyectosTab('finalizados')} className={`px-3 py-1 rounded-full text-sm font-inter border min-w-[110px] ${proyectosTab === 'finalizados' ? 'bg-fyt-purple text-white border-fyt-purple' : 'bg-white text-fyt-purple border-fyt-purple/40'}`}>Completados</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(proyectosTab === 'en-curso' ? proyectosEnCurso : proyectosFinalizados).map((proj: any) => (
            <div key={proj.id} className="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col h-full mx-1 sm:mx-2">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="w-5 h-5 text-fyt-blue" aria-hidden="true" />
                <span className="text-xs text-slate-500">{proj.year}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${proj.status === 'En curso' ? 'bg-fyt-blue/10 text-fyt-blue border border-fyt-blue/30' : 'bg-fyt-purple/10 text-fyt-purple border border-fyt-purple/30'}`}>{proj.status}</span>
              </div>
              <h3 className="text-base font-raleway font-medium text-slate-800 mb-1">{proj.title}</h3>
              <p className="text-xs text-slate-600 mb-2 flex-1 font-inter">{proj.summary}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <a href="/investigacion/proyectos" className="inline-block px-5 py-2 rounded-full bg-fyt-blue text-white font-inter shadow hover:bg-fyt-blue/90 transition">Ver todos los proyectos</a>
        </div>
      </section>


      {/* Publicaciones científicas y académicas */}
  <section className="mb-10">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 text-center">Publicaciones científicas y académicas</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
            {[
              { key: "articulos", label: "Artículos científicos", icon: <FileText className="w-5 h-5 text-blue-500" /> },
              { key: "libros", label: "Libros y capítulos", icon: <BookOpen className="w-5 h-5 text-green-500" /> },
              { key: "otras", label: "Divulgación", icon: <Award className="w-5 h-5 text-gray-500" /> }
            ].map(tabItem => (
              <button
                key={tabItem.key}
                className={`px-4 py-1 rounded-full text-xs sm:text-sm font-inter border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center gap-2 min-w-[140px] sm:min-w-[120px] ${
                  publicacionesTab === tabItem.key
                    ? "bg-blue-50 text-blue-800 border-blue-300"
                    : "bg-white text-blue-700 border-blue-100 hover:bg-blue-50"
                }`}
                onClick={() => setPublicacionesTab(tabItem.key as any)}
                aria-current={publicacionesTab === tabItem.key ? "page" : undefined}
                type="button"
              >
                {tabItem.icon}
                <span>{tabItem.label}</span>
              </button>
            ))}
          </div>
        </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Artículos científicos */}
          {publicacionesTab === "articulos" && (
            publicationsData.filter((pub: any) => pub.type === "articulo").slice(0, 6).map((pub: any, idx: number) => (
              <div key={pub.id} className="bg-white rounded-3xl shadow-soft p-4 sm:p-6 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mx-1 sm:mx-2" style={{animation: `fadeInUp 0.5s ease ${idx * 0.08}s`}}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 group-hover:scale-110 transition-transform" />
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">{pub.year}</span>
                </div>
                <h3 className="text-sm sm:text-base font-raleway font-medium text-blue-900 mb-1 line-clamp-2">{pub.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-1 line-clamp-2 font-inter">{pub.summary}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-1">
                  <span className="text-xs sm:text-sm text-slate-500">{pub.authors}</span>
                  <a href={pub.link || "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm shadow hover:bg-blue-100 transition mt-1 sm:mt-0">Ver más</a>
                </div>
              </div>
            ))
          )}
          {/* Libros y capítulos */}
          {publicacionesTab === "libros" && (
            publicationsData.filter((pub: any) => pub.type === "libro" || pub.type === "capitulo").slice(0, 6).map((pub: any, idx: number) => (
              <div key={pub.id} className="bg-white rounded-3xl shadow-soft p-6 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{animation: `fadeInUp 0.5s ease ${idx * 0.08}s`}}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                    <BookOpen className="w-7 h-7 text-green-600 group-hover:scale-110 transition-transform" />
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                </div>
                <h3 className="text-base font-raleway font-medium text-green-900 mb-1 line-clamp-2">{pub.title}</h3>
                <p className="text-xs text-slate-600 mb-1 line-clamp-2 font-inter">{pub.summary}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">{pub.authors}</span>
                  <a href={pub.link || "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-green-50 text-green-800 font-semibold text-xs shadow hover:bg-green-100 transition">Ver más</a>
                </div>
              </div>
            ))
          )}
          {/* Divulgación */}
          {publicacionesTab === "otras" && (
            publicationsData.filter((pub: any) => pub.type === "divulgacion" || pub.type === "reporte" || pub.type === "conferencia" || pub.type === "memoria").slice(0, 6).map((pub: any, idx: number) => (
              <div key={pub.id} className="bg-white rounded-3xl shadow-soft p-6 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{animation: `fadeInUp 0.5s ease ${idx * 0.08}s`}}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <Award className="w-7 h-7 text-gray-600 group-hover:scale-110 transition-transform" />
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                </div>
                <h3 className="text-base font-raleway font-medium text-gray-900 mb-1 line-clamp-2">{pub.title}</h3>
                <p className="text-xs text-slate-600 mb-1 line-clamp-2 font-inter">{pub.summary}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">{pub.authors}</span>
                  <a href={pub.link || "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-gray-50 text-gray-800 font-semibold text-xs shadow hover:bg-gray-100 transition">Ver más</a>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end mt-8">
          <a href="/investigacion/publicaciones" className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-800 font-semibold shadow hover:bg-blue-100 transition">Ver todas las publicaciones</a>
        </div>
    </section>
  </div>


      {/* Eventos y cursos */}
      <section className="mb-10">
        <div className="mb-4 px-2 sm:px-8 lg:px-16">
          <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center">Eventos y cursos</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 mx-1 sm:mx-2">
          <ul className="timeline list-none m-0 p-0">
            {eventsCoursesData.slice(0, 10).map((item: any, idx: number) => (
              <li key={item.id} className="relative pl-8 mb-8 last:mb-0">
                <span className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center shadow ${item.type.includes('Curso') ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                  {item.type.includes('Curso') ? <BookOpen className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium w-20">{item.year}</span>
                  <span className="font-raleway font-medium text-slate-800">{item.title}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold border ${item.type.includes('Curso') ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{item.type}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <button className="inline-block px-5 py-2 rounded-full bg-fyt-blue text-white font-semibold shadow hover:bg-fyt-blue/90 transition">Ver todos los eventos y cursos</button>
          </div>
        </div>
      </section>

      {/* Producción tecnológica */}
      <section className="mb-10">
        <div className="mb-4 px-2 sm:px-8 lg:px-16">
          <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center">Producción tecnológica</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {techProductionData.map((item: any) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mx-1 sm:mx-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-fyt-green/10 group-hover:bg-fyt-green/20 transition-colors">
                  {item.type === 'Software' && <Briefcase className="w-6 h-6 text-fyt-green" />}
                  {item.type === 'Protocolo' && <FileText className="w-6 h-6 text-fyt-blue" />}
                  {item.type === 'Aplicación móvil' && <BookOpen className="w-6 h-6 text-fyt-purple" />}
                  {item.type === 'Patente' && <Award className="w-6 h-6 text-fyt-orange" />}
                </span>
                <span className="text-xs text-slate-500 font-medium">{item.year}</span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-fyt-green/10 text-fyt-green border border-fyt-green/30">{item.type}</span>
              </div>
              <h3 className="text-base font-raleway font-medium text-slate-800 mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-xs text-slate-600 mb-2 flex-1 font-inter">{item.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Impacto académico */}
      <section className="mb-10">
        <div className="mb-4 px-2 sm:px-8 lg:px-16">
          <h2 className="text-xl sm:text-2xl font-poppins font-bold text-slate-800 text-center">Impacto académico</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {academicImpactData.map((item: any) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mx-1 sm:mx-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-fyt-blue/10 group-hover:bg-fyt-blue/20 transition-colors">
                  {item.type === 'Citas' && <FileText className="w-6 h-6 text-fyt-blue" />}
                  {item.type === 'Índice H' && <Award className="w-6 h-6 text-fyt-purple" />}
                  {item.type === 'Colaboraciones' && <Users className="w-6 h-6 text-fyt-green" />}
                  {item.type === 'Premios' && <Star className="w-6 h-6 text-fyt-orange" />}
                </span>
                <span className="text-2xl font-bold text-fyt-blue">{item.value}</span>
              </div>
              <h3 className="text-base font-raleway font-medium text-slate-800 mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-xs text-slate-600 mb-2 flex-1 font-inter">{item.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA final */}
      <section className="py-10 px-4 sm:px-8 rounded-3xl mb-8 bg-gradient-to-r from-fyt-blue/10 to-fyt-green/10 flex flex-col items-center justify-center">
    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-4 text-center">¿Quieres colaborar o conocer más?</h2>
    <p className="text-lg text-slate-600 mb-6 text-center max-w-xl font-inter">Contáctanos para sumar esfuerzos, compartir ideas o recibir información sobre nuestras líneas de investigación y producción académica.</p>
  <a href="/contactos" className="inline-block px-6 py-3 rounded-full bg-white text-fyt-blue border-2 border-fyt-blue font-inter font-semibold shadow hover:bg-fyt-blue hover:text-white transition text-lg">Contactar al equipo</a>
      </section>

      {/* Frase motivadora */}
      <section className="py-6">
  <p className="text-center text-lg font-inter font-semibold text-fyt-blue">“Generamos conocimiento para transformar la salud y la sociedad”.</p>
      </section>
    </BaseLayout>
  );
};

export default InvestigacionPage;
