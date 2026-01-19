import React from "react";
import { LucideIcon } from "lucide-react";

interface ToolsSmallHeroProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string; // Hex color code
}

const ToolsSmallHero: React.FC<ToolsSmallHeroProps> = ({ title, subtitle, icon: Icon, color }) => {
  // Genera gradiente dinámico basado en el color
  const generateGradient = (hexColor: string): string => {
    const colorMap: Record<string, string> = {
      "#6366F1": "from-indigo-900 via-indigo-800 to-indigo-900",
      "#0EA5E9": "from-cyan-900 via-cyan-800 to-cyan-900",
      "#16A34A": "from-green-900 via-green-800 to-green-900",
      "#A855F7": "from-violet-900 via-violet-800 to-violet-900",
    };
    return colorMap[hexColor] || "from-blue-900 via-cyan-900 to-blue-900";
  };

  // Genera color claro para el icono basado en el color oscuro
  const generateLightColor = (hexColor: string): string => {
    const colorMap: Record<string, string> = {
      "#6366F1": "text-indigo-300",
      "#0EA5E9": "text-cyan-300",
      "#16A34A": "text-green-300",
      "#A855F7": "text-violet-300",
    };
    return colorMap[hexColor] || "text-cyan-300";
  };

  // Genera color de fondo semi-transparente para el icono
  const generateBgColor = (hexColor: string): string => {
    const colorMap: Record<string, string> = {
      "#6366F1": "bg-indigo-500/20",
      "#0EA5E9": "bg-cyan-500/20",
      "#16A34A": "bg-green-500/20",
      "#A855F7": "bg-violet-500/20",
    };
    return colorMap[hexColor] || "bg-cyan-500/20";
  };

  return (
    <section className={`relative bg-gradient-to-br ${generateGradient(color)} py-16 md:py-20 lg:py-24`}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="flex justify-center mb-4">
          <div className={`p-3 ${generateBgColor(color)} rounded-full`}>
            <Icon className={`w-8 h-8 ${generateLightColor(color)}`} aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-white mb-4 md:mb-6">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default ToolsSmallHero;
