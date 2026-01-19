// Componente de navegación secundaria reutilizable para sección de Herramientas
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Stethoscope,
  Ruler,
  Zap,
  BarChart3 
} from "lucide-react";

// Paleta de colores consistente para cada herramienta
const toolColors = {
  clinicos: {
    hex: "#6366F1",
    bg: "bg-indigo-600",
    hover: "hover:bg-indigo-100",
    text: "text-indigo-600",
  },
  antropometricos: {
    hex: "#0EA5E9",
    bg: "bg-cyan-600",
    hover: "hover:bg-cyan-100",
    text: "text-cyan-600",
  },
  avanzados: {
    hex: "#16A34A",
    bg: "bg-green-600",
    hover: "hover:bg-green-100",
    text: "text-green-600",
  },
  escalas: {
    hex: "#A855F7",
    bg: "bg-violet-600",
    hover: "hover:bg-violet-100",
    text: "text-violet-600",
  },
};

const navItems = [
  { 
    path: "/herramientas/clinicos", 
    label: "Clínicos", 
    icon: Stethoscope,
    colorKey: "clinicos" as const,
  },
  { 
    path: "/herramientas/antropometricos", 
    label: "Antropométricos", 
    icon: Ruler,
    colorKey: "antropometricos" as const,
  },
  { 
    path: "/herramientas/avanzados", 
    label: "Avanzados", 
    icon: Zap,
    colorKey: "avanzados" as const,
  },
  { 
    path: "/herramientas/escalas", 
    label: "Escalas", 
    icon: BarChart3,
    colorKey: "escalas" as const,
  },
];

interface ToolsSubNavProps {
  className?: string;
}

const ToolsSubNav: React.FC<ToolsSubNavProps> = ({ className = "" }) => {
  const location = useLocation();

  return (
    <nav className={`bg-white border-b border-slate-200 sticky top-16 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const colors = toolColors[item.colorKey];
            
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
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ToolsSubNav;
