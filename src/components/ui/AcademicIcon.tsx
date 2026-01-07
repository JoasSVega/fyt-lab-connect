import React from "react";
import { iconBase, iconVariants } from "@/lib/styleUtils";

interface AcademicIconProps {
  variant?: keyof typeof iconVariants;
  children: React.ReactNode;
  className?: string;
}

const AcademicIcon: React.FC<AcademicIconProps> = ({ variant = "blue", children, className = "" }) => {
  // Visual académico: fondo azul claro, ícono azul institucional, tamaño homogéneo
  return (
    <span className={`w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-soft ${className}`.trim()}>
      {children}
    </span>
  );
};

export default AcademicIcon;
