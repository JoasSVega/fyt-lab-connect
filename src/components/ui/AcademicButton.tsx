import React from "react";
import { buttonBase, buttonVariants } from "@/lib/styleUtils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "blue", children, className = "", ...props }) => {
  // Visual académico: fondo blanco, borde azul claro, sombra sutil, texto azul institucional
  const style = `bg-white text-fyt-blue border border-blue-200 rounded-2xl shadow-soft hover:bg-blue-50 transition font-semibold px-6 py-2`;
  return (
    <button
      className={`${style} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
