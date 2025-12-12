// Componente de navegación secundaria reutilizable para sección de Investigación
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Microscope, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Video 
} from "lucide-react";

const navItems = [
  { 
    path: "/investigacion/proyectos", 
    label: "Proyectos", 
    icon: Microscope 
  },
  { 
    path: "/investigacion/publicaciones", 
    label: "Publicaciones", 
    icon: FileText 
  },
  { 
    path: "/investigacion/eventos", 
    label: "Eventos", 
    icon: Calendar 
  },
  { 
    path: "/investigacion/formacion", 
    label: "Formación", 
    icon: GraduationCap 
  },
  { 
    path: "/investigacion/contenidos", 
    label: "Contenidos digitales", 
    icon: Video 
  },
];

interface ResearchSubNavProps {
  className?: string;
}

const ResearchSubNav: React.FC<ResearchSubNavProps> = ({ className = "" }) => {
  const location = useLocation();

  return (
    <nav className={`bg-white border-b border-slate-200 sticky top-16 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium 
                  whitespace-nowrap transition-all duration-200
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ResearchSubNav;
