import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
        <ModalCalculatorContext.Provider value={{ flipped }}>
          {/* Contenedor con perspectiva y caras solapadas para flip de tarjeta */}
          <div className={`relative perspective-[1200px] ${className || ""}`}>
            <div
              className={`relative transform-style-preserve-3d transition-transform duration-500 ${
                flipped ? "rotate-y-180" : ""
              }`}
              style={{ minHeight: 180 }}
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
    <div
      className={"backface-hidden absolute inset-0"}
    >
      {children}
    </div>
  );
};

const Back: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { flipped } = React.useContext(ModalCalculatorContext);
  return (
    <div className={"backface-hidden rotate-y-180 absolute inset-0"}>{children}</div>
  );
};

export const ModalCalculator = Object.assign(ModalCalculatorBase, { Front, Back });

export default ModalCalculator;
