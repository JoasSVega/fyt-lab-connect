// Eliminado: funcionalidad de subida de imágenes eliminada del proyecto.
import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide' | 'tall' | 'auto';
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  className,
  aspectRatio = 'auto',
  placeholder = "Subir imagen"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("El archivo no es una imagen válida");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = () => onImageUpload('');

  const openFileDialog = () => fileInputRef.current?.click();

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'wide': return 'aspect-video';
      case 'tall': return 'aspect-[3/4]';
      default: return 'min-h-[200px]';
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {currentImage ? (
        <div className={cn("relative overflow-hidden rounded-xl group", getAspectRatioClass())}>
          <img
            src={currentImage}
            alt="Imagen subida"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-fyt-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={openFileDialog}
                className="bg-white text-fyt-dark hover:bg-white/90"
              >
                <Camera className="h-4 w-4 mr-1" />
                Cambiar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="bg-fyt-red hover:bg-fyt-red/90"
              >
                <X className="h-4 w-4 mr-1" />
                Quitar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "border-2 border-dashed rounded-xl transition-colors duration-300 cursor-pointer",
            getAspectRatioClass(),
            isDragging 
              ? "border-fyt-blue bg-fyt-blue/5" 
              : "border-muted-foreground/25 hover:border-fyt-blue hover:bg-fyt-blue/5"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFileDialog()}
        >
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-fyt-dark mb-2">{placeholder}</p>
            <p className="text-xs text-muted-foreground mb-4">
              Arrastra y suelta una imagen aquí, o haz clic para seleccionar
            </p>
            <Button variant="outline" size="sm" className="border-fyt-blue/20 hover:bg-fyt-blue hover:text-white">
              <Camera className="h-4 w-4 mr-1" />
              Seleccionar archivo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
