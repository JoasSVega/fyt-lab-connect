// Componente placeholder para secciones sin contenido
import React from "react";
import { FileQuestion } from "lucide-react";

interface PlaceholderSectionProps {
  message?: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  message = "Aquí se cargará el contenido oficial del grupo de investigación." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <FileQuestion className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-slate-500 text-base max-w-md leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default PlaceholderSection;
