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
      icon: Mail,
      title: "Correo Institucional",
      info: "farmacologiayterapeutica.gi@gmail.com",
      description: "Respuesta en 24-48 horas"
    },
    {
      icon: Phone,
      title: "Teléfono y WhatsApp",
      info: "+57 313 7375217",
      description: "Lunes a Viernes, 8:00 AM - 5:00 PM"
    },
    {
      icon: MapPin,
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
    <section id="contacto" className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background min-h-screen">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fyt-dark mb-4 break-words">
            Contáctanos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-full sm:max-w-2xl md:max-w-3xl mx-auto break-words">
            ¿Tienes preguntas sobre nuestras investigaciones o quieres colaborar con nosotros? 
            Estamos aquí para ayudarte.
          </p>
        </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Información Institucional */}
            <Card className="p-4 sm:p-6 bg-gradient-hero text-white shadow-soft w-full max-w-full">
              <h3 className="text-xl font-semibold mb-3">
                Grupo de Investigación en Farmacología y Terapéutica
              </h3>
              <p className="text-white/90 mb-2">
                Universidad de Cartagena
              </p>
              <p className="text-white/90">
                Facultad de Ciencias Farmacéuticas
              </p>
            </Card>

            <div>
              <h3 className="text-2xl font-semibold text-fyt-dark mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="p-4 sm:p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow w-full max-w-full">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-hero rounded-full flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-fyt-dark mb-1 break-words">
                            {item.title}
                          </h4>
                          {item.icon === Mail ? (
                            <a 
                              href={`mailto:${item.info}`}
                              className="text-fyt-blue font-medium mb-1 hover:underline cursor-pointer break-all"
                            >
                              {item.info}
                            </a>
                          ) : (
                            <p className="text-fyt-blue font-medium mb-1 break-all">
                              {item.info}
                            </p>
                          )}
                          <p className="text-muted-foreground text-xs sm:text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Social Media & Additional Info */}
            <Card className="p-4 sm:p-6 bg-gradient-card shadow-soft w-full max-w-full">
              <h4 className="text-base sm:text-lg font-semibold text-fyt-dark mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex flex-wrap gap-2 sm:space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-fyt-purple/20 hover:bg-fyt-purple hover:text-white"
                  onClick={() => window.open('https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA==', '_blank')}
                >
                  Instagram
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-4 sm:p-6 md:p-8 bg-gradient-card shadow-soft w-full max-w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-fyt-dark mb-4 sm:mb-6">
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
                  className="w-full bg-gradient-hero text-white text-base sm:text-lg"
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
          <Card className="p-4 sm:p-6 md:p-8 bg-gradient-hero text-white shadow-large text-center w-full max-w-full">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 break-words">¿Interesado en Colaborar?</h3>
            <p className="mb-4 sm:mb-6 text-white/90 max-w-full sm:max-w-2xl mx-auto break-words">
              Si eres investigador, estudiante o institución interesada en establecer 
              colaboraciones académicas o de investigación, estaremos encantados de conocer 
              más sobre tus propuestas.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-fyt-dark hover:bg-white/90 text-base sm:text-lg"
              onClick={() => window.open('mailto:farmacologiayterapeutica.gi@gmail.com?subject=Propuesta de Colaboración', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Proponer Colaboración
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;