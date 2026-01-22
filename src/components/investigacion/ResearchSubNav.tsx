// Componente de navegación secundaria reutilizable para sección de Investigación
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BookOpen,
  Microscope, 
  Users,
  GraduationCap, 
  Video,
  ChevronDown
} from "lucide-react";

// Paleta de colores específicos para cada categoría de investigación
const researchColors = {
  publicaciones: {
    hex: "#3B82F6",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-100",
    text: "text-blue-600",
  },
  proyectos: {
    hex: "#10B981",
    bg: "bg-green-600",
    hover: "hover:bg-green-100",
    text: "text-green-600",
  },
  eventos: {
    hex: "#9333EA",
    bg: "bg-purple-600",
    hover: "hover:bg-purple-100",
    text: "text-purple-600",
  },
  formacion: {
    hex: "#6B7280",
    bg: "bg-gray-600",
    hover: "hover:bg-gray-100",
    text: "text-gray-600",
  },
  contenido: {
    hex: "#DC2626",
    bg: "bg-red-600",
    hover: "hover:bg-red-100",
    text: "text-red-600",
  },
};

const navItems = [
  { 
    path: "/investigacion/publicaciones", 
    label: "Publicaciones", 
    icon: BookOpen,
    colorKey: "publicaciones" as const,
  },
  { 
    path: "/investigacion/proyectos", 
    label: "Proyectos", 
    icon: Microscope,
    colorKey: "proyectos" as const,
  },
  { 
    path: "/investigacion/eventos", 
    label: "Eventos", 
    icon: Users,
    colorKey: "eventos" as const,
  },
  { 
    path: "/investigacion/formacion", 
    label: "Formación", 
    icon: GraduationCap,
    colorKey: "formacion" as const,
  },
  { 
    path: "/investigacion/contenido-digital", 
    label: "Contenido Digital", 
    icon: Video,
    colorKey: "contenido" as const,
  },
];

interface ResearchSubNavProps {
  className?: string;
}

const ResearchSubNav: React.FC<ResearchSubNavProps> = ({ className = "" }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const closeExpand = () => {
    setIsExpanded(false);
  };

  return (
    <nav className={`bg-white border-b border-slate-200 sticky top-16 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop view: Always visible horizontal list */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2 py-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const colors = researchColors[item.colorKey];
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium 
                  whitespace-nowrap transition-all duration-200
                  ${isActive 
                    ? `${colors.bg} text-white shadow-sm` 
                    : `text-slate-600 ${colors.hover} hover:text-slate-900`
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Mobile view: Expandable menu */}
        <div className="sm:hidden py-3">
          <button
            onClick={toggleExpand}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium transition-all duration-200 hover:bg-slate-200 active:scale-95"
          >
            <span>Filtros</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Expandable menu with animation */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-out
              ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
            `}
          >
            <div className="flex flex-col gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const colors = researchColors[item.colorKey];
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeExpand}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
                      transition-all duration-200 transform hover:scale-105 active:scale-95
                      ${isActive 
                        ? `${colors.bg} text-white shadow-sm` 
                        : `text-slate-700 bg-white ${colors.hover} hover:bg-slate-100`
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResearchSubNav;
