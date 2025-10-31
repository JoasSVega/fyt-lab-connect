import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

// ModalCalculator: modal con fondo borroso y tarjeta con animación flip 3D para mostrar resultados.
// Uso:
// <ModalCalculator open={open} onOpenChange={setOpen} title="TFG" description="..." flipped={flipped}>
//   <ModalCalculator.Front>...formulario...</ModalCalculator.Front>
//   <ModalCalculator.Back>...resultado...</ModalCalculator.Back>
// </ModalCalculator>

export type ModalCalculatorProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  flipped?: boolean;
  className?: string;
};

const ModalCalculatorContext = React.createContext<{ flipped: boolean }>({ flipped: false });

const ModalCalculatorBase: React.FC<React.PropsWithChildren<ModalCalculatorProps>> = ({ open, onOpenChange, title, description, flipped = false, className, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-[90vw] backdrop:backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-raleway text-2xl">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-muted-foreground">{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 opacity-80 hover:opacity-100">
          <X className="w-5 h-5" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
        <ModalCalculatorContext.Provider value={{ flipped }}>
          <div className={`relative perspective-[1200px] ${className || ""}`}>
            <div
              className={`transform-style-preserve-3d transition-transform duration-500 ${
                flipped ? "rotate-y-180" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </ModalCalculatorContext.Provider>
        <style>{`
          .transform-style-preserve-3d { transform-style: preserve-3d; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

const Front: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { flipped } = React.useContext(ModalCalculatorContext);
  return (
    <div className={`backface-hidden ${flipped ? "rotate-y-180 hidden" : ""}`}>{children}</div>
  );
};

const Back: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { flipped } = React.useContext(ModalCalculatorContext);
  return (
    <div className={`backface-hidden rotate-y-180 ${flipped ? "block" : "hidden"}`}>{children}</div>
  );
};

export const ModalCalculator = Object.assign(ModalCalculatorBase, { Front, Back });

export default ModalCalculator;
