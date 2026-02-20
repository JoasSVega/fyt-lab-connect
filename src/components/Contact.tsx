import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { stripInvisible, safeText, isLikelyEmail, sanitizeURL } from "@/lib/sanitize";

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
      description: "Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Provincia de Cartagena, Bolívar"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Limpiar caracteres invisibles y normalizar espacios, manteniendo UX fluida
    const cleaned = stripInvisible(value);
    setFormData(prev => ({
      ...prev,
      [name]: cleaned
    }));
  };

  const validateEmail = (email: string) => isLikelyEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sanitizar entradas antes de validar
    const name = safeText(formData.name);
    const email = safeText(formData.email);
    const subject = safeText(formData.subject);
    const message = safeText(formData.message, { preserveNewlines: true });

    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un correo electrónico válido.",
        variant: "destructive"
      });
      return;
    }
    const mailtoRaw = `mailto:farmacologiayterapeutica.gi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`)}`;
    const mailto = sanitizeURL(mailtoRaw) || mailtoRaw; // fallback conservador si pasa validación
    const a = document.createElement('a');
    a.href = mailto;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast({
      title: "Redirigiendo a tu correo",
      description: "Completa el envío desde tu cliente de correo.",
    });
  };

  return (
    <section id="contacto" className="py-10 sm:py-16 md:py-20 min-h-screen bg-[#f8fafc]">
  <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        {/* Mapa Google Maps embebido */}
        <div className="w-full mb-10 rounded-2xl shadow-medium overflow-hidden animate-fade-in" style={{height: '350px'}}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.573964624252!2d-75.5038549!3d10.3994434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625bfe9eac921%3A0xa752ed6a0af4fe9b!2sCartagena%20University%20Campus%20Zaragocilla!5e0!3m2!1ses!2sco!4v1695660000000!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{border:0}}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Universidad de Cartagena"
          ></iframe>
        </div>

        {/* Grid principal de 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Columna Izquierda: Información y redes */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-fyt-dark mb-6 drop-shadow-lg">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="p-4 sm:p-6 md:p-8 bg-white border-2 border-fyt-blue/20 shadow-soft hover:shadow-medium hover:scale-[1.02] transition-all duration-300 w-full max-w-full animate-fade-in mx-1 sm:mx-2">
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
                            href={sanitizeURL(`mailto:${item.info}`) || `mailto:${item.info}`}
                            className="text-fyt-purple font-medium mb-1 hover:underline cursor-pointer break-words text-xs sm:text-sm md:text-base w-full block"
                            style={{wordBreak: 'break-word', fontSize: 'clamp(0.75rem, 2vw, 1rem)'}}
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

            <Card className="p-4 sm:p-6 bg-white border-2 border-fyt-purple/20 shadow-soft w-full max-w-full animate-fade-in">
              <h4 className="text-base sm:text-lg font-semibold text-[#9B59B6] mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex flex-wrap gap-2 sm:space-x-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="group border-[#9B59B6]/40 hover:bg-[#ede9fe] hover:text-fyt-dark"
                  aria-label="Instagram Grupo FyT"
                >
                  <a
                    href={sanitizeURL('https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA==') || 'https://www.instagram.com/grupo_fyt?igsh=MXNxbXo3eHM2MHRweA=='}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5 text-[#9B59B6] group-hover:text-fyt-dark" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Columna Derecha: Envíanos un mensaje */}
          <div className="flex flex-col justify-center h-full">
            <Card className="p-6 md:p-8 bg-white border-2 border-fyt-red/20 shadow-soft w-full max-w-full animate-fade-in flex flex-col justify-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FF4C4C] mb-4 sm:mb-6">
                Envíanos un Mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={7}
                    required
                    className="text-sm sm:text-base min-h-[120px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="mt-4 w-full bg-white text-fyt-red border-2 border-fyt-red text-base sm:text-lg font-bold shadow-soft hover:bg-fyt-red hover:text-white transition-colors duration-300"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  * Campos obligatorios. Tu información será tratada de forma confidencial.
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* CTA Colaboración */}
        <div className="mt-10 sm:mt-14 md:mt-16">
          <Card className="p-4 sm:p-6 md:p-8 bg-white text-fyt-dark shadow-medium text-center w-full max-w-full animate-fade-in">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 break-words drop-shadow-lg">¿Interesado en Colaborar?</h3>
            <p className="mb-4 sm:mb-6 text-fyt-dark/90 max-w-full sm:max-w-2xl mx-auto break-words">
              Si eres investigador, estudiante o institución interesada en establecer 
              colaboraciones académicas o de investigación, estaremos encantados de conocer 
              más sobre tus propuestas.
            </p>
             <Button 
               asChild
               variant="outline"
               size="lg"
               className="group bg-[#9B59B6] text-white border-2 border-[#9B59B6] hover:bg-white hover:text-[#9B59B6] transition-colors duration-300 px-8 py-3 font-semibold shadow-lg"
             >
               <a
                 href={sanitizeURL('mailto:farmacologiayterapeutica.gi@gmail.com?subject=Propuesta de Colaboración') || 'mailto:farmacologiayterapeutica.gi@gmail.com?subject=Propuesta de Colaboración'}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <Mail className="w-5 h-5 mr-2 text-white group-hover:text-[#9B59B6]" aria-label="Proponer Colaboración" />
                 Proponer Colaboración
               </a>
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