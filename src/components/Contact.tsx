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
      title: "Correo Electrónico",
      info: "semillero.fyt@universidad.edu.co",
      description: "Respuesta en 24-48 horas"
    },
    {
      icon: Phone,
      title: "Teléfono",
      info: "+57 (1) 234-5678",
      description: "Lunes a Viernes, 8:00 AM - 5:00 PM"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      info: "Facultad de Ciencias de la Salud",
      description: "Universidad Nacional, Bogotá, Colombia"
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
    <section id="contacto" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fyt-dark mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ¿Tienes preguntas sobre nuestras investigaciones o quieres colaborar con nosotros? 
            Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-fyt-dark mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-fyt-dark mb-1">
                            {item.title}
                          </h4>
                          <p className="text-fyt-blue font-medium mb-1">
                            {item.info}
                          </p>
                          <p className="text-muted-foreground text-sm">
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
            <Card className="p-6 bg-gradient-card shadow-soft">
              <h4 className="text-lg font-semibold text-fyt-dark mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-fyt-blue/20 hover:bg-fyt-blue hover:text-white"
                  onClick={() => window.open('#', '_blank')}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-fyt-purple/20 hover:bg-fyt-purple hover:text-white"
                  onClick={() => window.open('#', '_blank')}
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-fyt-red/20 hover:bg-fyt-red hover:text-white"
                  onClick={() => window.open('#', '_blank')}
                >
                  ResearchGate
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8 bg-gradient-card shadow-soft">
              <h3 className="text-2xl font-semibold text-fyt-dark mb-6">
                Envíanos un Mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero text-white"
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
        <div className="mt-16">
          <Card className="p-8 bg-gradient-hero text-white shadow-large text-center">
            <h3 className="text-2xl font-semibold mb-4">¿Interesado en Colaborar?</h3>
            <p className="mb-6 text-white/90 max-w-2xl mx-auto">
              Si eres investigador, estudiante o institución interesada en establecer 
              colaboraciones académicas o de investigación, estaremos encantados de conocer 
              más sobre tus propuestas.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-fyt-dark hover:bg-white/90"
              onClick={() => window.open('mailto:semillero.fyt@universidad.edu.co?subject=Propuesta de Colaboración', '_blank')}
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