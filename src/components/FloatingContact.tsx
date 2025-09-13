import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: () =>
        window.open(
          "https://wa.me/573137375217?text=Hola, me interesa conocer más sobre el Grupo FyT",
          "_blank"
        ),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Phone,
      label: "Llamar",
      action: () => window.open("tel:+573137375217", "_blank"),
      color: "bg-fyt-blue hover:bg-fyt-blue/90",
    },
    {
      icon: Mail,
      label: "Gmail",
      action: () =>
        window.open("mailto:farmacologiayterapeutica.gi@gmail.com", "_blank"),
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Opciones del menú */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 space-y-3"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {[...contactOptions].reverse().map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={index}
                  className="cursor-pointer"
                  onClick={option.action}
                  variants={itemVariants}
                >
                  <Card className="p-3 bg-white shadow-lg border-0">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}
                        whileHover={{ scale: 1.13 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <span className="text-sm font-medium text-fyt-dark">
                        {option.label}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {/* FAB button */}
      <motion.button
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={fabVariants}
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
        aria-label="Opciones de contacto"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
