import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8 text-fyt-blue" aria-label="Correo Institucional" />,
      title: "Correo Institucional",
      info: "farmacologiayterapeutica.gi@gmail.com",
      description: "Respuesta en 24-48 horas"
    },
    {
      icon: <Phone className="w-8 h-8 text-fyt-purple" aria-label="Teléfono y WhatsApp" />,
      title: "Teléfono y WhatsApp",
      info: "+57 313 7375217",
      description: "Lunes a Viernes, 8:00 AM - 5:00 PM"
    },
    {
      icon: <MapPin className="w-8 h-8 text-fyt-red" aria-label="Ubicación" />,
      title: "Ubicación",
      info: "Facultad de Ciencias Farmacéuticas",
      description: "Universidad de Cartagena, Colombia"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un correo electrónico válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <section id="contacto" className="py-10 sm:py-16 md:py-20 min-h-screen bg-[#f8fafc]">
  <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header eliminado para evitar duplicidad de título principal. */}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Información Institucional */}
            <Card className="p-4 sm:p-6 bg-white text-fyt-dark shadow-2xl w-full max-w-full animate-fade-in">
              <h3 className="text-xl font-semibold mb-3 drop-shadow-lg">
                Grupo de Investigación en Farmacología y Terapéutica
              </h3>
              <p className="text-fyt-dark/90 mb-2">
                Universidad de Cartagena
              </p>
              <p className="text-fyt-dark/90">
                Facultad de Ciencias Farmacéuticas
              </p>
            </Card>

            <div>
              <h3 className="text-2xl font-semibold text-fyt-dark mb-6 drop-shadow-lg">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="p-4 sm:p-6 bg-white border-2 border-[#3BB9FF]/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 w-full max-w-full animate-fade-in">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-fyt-blue mb-1 break-words">
                          {item.title}
                        </h4>
                        {item.title === "Correo Institucional" ? (
                          <a 
                            href={`mailto:${item.info}`}
                            className="text-fyt-purple font-medium mb-1 hover:underline cursor-pointer break-all"
                          >
                            {item.info}
                          </a>
                        ) : (
                          <p className="text-fyt-purple font-medium mb-1 break-all">
                            {item.info}
                          </p>
                        )}
                        <p className="text-gray-700 text-xs sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media & Additional Info */}
            <Card className="p-4 sm:p-6 bg-white border-2 border-[#9B59B6]/20 shadow-xl w-full max-w-full animate-fade-in">
              <h4 className="text-base sm:text-lg font-semibold text-[#9B59B6] mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex flex-wrap gap-2 sm:space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#9B59B6]/40 hover:bg-[#ede9fe] hover:text-fyt-dark"
                  onClick={() => window.open('https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA==', '_blank')}
                >
                  Instagram
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-4 sm:p-6 md:p-8 bg-white border-2 border-[#FF4C4C]/20 shadow-xl w-full max-w-full animate-fade-in">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FF4C4C] mb-4 sm:mb-6">
                Envíanos un Mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#3BB9FF] text-[#1e293b] text-base sm:text-lg font-bold shadow-lg hover:bg-[#e0f2ff]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obligatorios. Tu información será tratada de forma confidencial.
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Map or Additional CTA */}
        <div className="mt-10 sm:mt-14 md:mt-16">
          <Card className="p-4 sm:p-6 md:p-8 bg-white text-fyt-dark shadow-2xl text-center w-full max-w-full animate-fade-in">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 break-words drop-shadow-lg">¿Interesado en Colaborar?</h3>
            <p className="mb-4 sm:mb-6 text-fyt-dark/90 max-w-full sm:max-w-2xl mx-auto break-words">
              Si eres investigador, estudiante o institución interesada en establecer 
              colaboraciones académicas o de investigación, estaremos encantados de conocer 
              más sobre tus propuestas.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-fyt-purple font-bold hover:bg-white/90 text-base sm:text-lg shadow-lg"
              onClick={() => window.open('mailto:farmacologiayterapeutica.gi@gmail.com?subject=Propuesta de Colaboración', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2 text-fyt-blue" aria-label="Proponer Colaboración" />
              Proponer Colaboración
            </Button>
          </Card>
        </div>
      {/* Animaciones CSS */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(.42,0,.58,1); }
      `}</style>
      </div>
    </section>
  );
};

export default Contact;