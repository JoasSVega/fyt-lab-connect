import React, { useEffect, useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { sanitizeURL } from "@/lib/sanitize";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fm, setFm] = useState<{ motion: typeof import("framer-motion").motion; AnimatePresence: typeof import("framer-motion").AnimatePresence } | null>(null);

  // Prefetch framer-motion after idle; ensures animations load without blocking first paint.
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      import("framer-motion")
        .then((mod) => {
          if (cancelled) return;
          setFm({ motion: mod.motion, AnimatePresence: (mod as unknown as typeof mod).AnimatePresence ?? mod.AnimatePresence });
        })
        .catch(() => {});
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(load) : window.setTimeout(load, 1200);
    return () => {
      cancelled = true;
      if (idle && typeof id === "number") (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
      else clearTimeout(id as number);
    };
  }, []);

  const contactOptions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: sanitizeURL("https://wa.me/573137375217?text=Hola, me interesa conocer más sobre el Grupo FyT") ||
        "https://wa.me/573137375217?text=Hola, me interesa conocer más sobre el Grupo FyT",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Phone,
      label: "Llamar",
      href: sanitizeURL("tel:+573137375217") || "tel:+573137375217",
      color: "bg-fyt-blue hover:bg-fyt-blue/90",
    },
    {
      icon: Mail,
      label: "Gmail",
      href: sanitizeURL("mailto:farmacologiayterapeutica.gi@gmail.com") ||
        "mailto:farmacologiayterapeutica.gi@gmail.com",
      color: "bg-fyt-purple hover:bg-fyt-purple/90",
    },
  ];

  // Animación del botón principal (giro 3D + cambio de color)
  const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];
  const fabVariants = {
    closed: {
      rotateY: 0,
      backgroundColor: "#7c3aed", // morado
      transition: { duration: 0.6, ease: easeInOut },
    },
    open: {
      rotateY: 180,
      backgroundColor: "#e11d48", // rojo
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  // Menu container: stagger children
  const menuVariants = {
    closed: {
      transition: {
        staggerChildren: 0.07,
        staggerDirection: -1, // top disappears first
      },
    },
    open: {
      transition: {
        staggerChildren: 0.11,
        delayChildren: 0.1,
        staggerDirection: 1, // bottom appears first
      },
    },
  };

  // Each item animates in/out
  const itemVariants = {
    closed: { opacity: 0, y: 20, transition: { duration: 0.22, ease: easeInOut } },
    open: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeInOut } },
  };

  const MotionDiv = fm?.motion?.div || "div";
  const MotionButton = fm?.motion?.button || "button";
  const MotionAnimatePresence = fm?.AnimatePresence || (({ children }: { children: React.ReactNode }) => <>{children}</>);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Opciones del menú */}
      <MotionAnimatePresence>
        {isOpen && (
          <MotionDiv
            className="mb-4 space-y-3"
            initial={fm ? "closed" : undefined}
            animate={fm ? "open" : undefined}
            exit={fm ? "closed" : undefined}
            variants={fm ? menuVariants : undefined}
          >
            {[...contactOptions].reverse().map((option, index) => {
              const Icon = option.icon;
              return (
                <MotionDiv
                  key={index}
                  className="cursor-pointer"
                  variants={fm ? itemVariants : undefined}
                >
                  <a 
                    href={option.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Contactar por ${option.label}`}
                  >
                    <Card className="p-3 bg-white shadow-lg border-0">
                      <div className="flex items-center space-x-3">
                        <MotionDiv
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}
                          whileHover={fm ? { scale: 1.13 } : undefined}
                          transition={fm ? { type: "spring", stiffness: 250 } : undefined}
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </MotionDiv>
                        <span className="text-sm font-medium text-fyt-dark">
                          {option.label}
                        </span>
                      </div>
                    </Card>
                  </a>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        )}
      </MotionAnimatePresence>
      {/* FAB button */}
      <MotionButton
        initial={fm ? false : undefined}
        animate={fm ? (isOpen ? "open" : "closed") : undefined}
        variants={fm ? fabVariants : undefined}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center p-0 border-0 shadow-lg"
        style={{
          borderRadius: "50%",
          perspective: 800,
          WebkitPerspective: 800,
          transformStyle: "preserve-3d",
          background: isOpen ? "#e11d48" : "#7c3aed",
          transition: "background 0.6s cubic-bezier(0.42,0,0.58,1)",
          boxShadow: "0 8px 32px rgba(31, 41, 55, 0.18)",
        }}
        aria-label={isOpen ? "Cerrar menú de contacto" : "Abrir menú de contacto"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" aria-hidden="true" />
        )}
      </MotionButton>
    </div>
  );
};

export default FloatingContact;
