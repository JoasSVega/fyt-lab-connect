import { useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: () => window.open('https://wa.me/573137375217?text=Hola, me interesa conocer más sobre el Grupo FyT', '_blank'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Phone,
      label: "Llamar",
      action: () => window.open('tel:+573137375217', '_blank'),
      color: "bg-fyt-blue hover:bg-fyt-blue/90"
    },
    {
      icon: Mail,
      label: "Gmail",
      action: () => window.open('mailto:farmacologiayterapeutica.gi@gmail.com', '_blank'),
      color: "bg-fyt-purple hover:bg-fyt-purple/90"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="mb-4 space-y-3 animate-in fade-in-0 slide-in-from-bottom-2">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card 
                key={index}
                className="p-3 bg-white shadow-large border-0 cursor-pointer hover:shadow-medium transition-all duration-200"
                onClick={option.action}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color} transition-colors`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-fyt-dark">
                    {option.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Main Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-large transition-all duration-300 ${
          isOpen 
            ? 'bg-fyt-red hover:bg-fyt-red/90 rotate-45' 
            : 'bg-gradient-hero hover:shadow-medium'
        }`}
        aria-label="Opciones de contacto"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
};

export default FloatingContact;