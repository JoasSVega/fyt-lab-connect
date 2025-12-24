import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { stripInvisible, safeText, isLikelyEmail, sanitizeURL } from "@/lib/sanitize";
import { motion } from "framer-motion";
import heroContacto from "@/assets/hero-contacto.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      delay, 
      ease: "easeOut" as const 
    },
  }),
};

const ContactPremium = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Ubicación",
      info: "Facultad de Ciencias Farmacéuticas",
      description: "Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Bolívar",
      color: "bg-fyt-purple/10 text-fyt-purple",
    },
    {
      icon: Mail,
      title: "Correo Institucional",
      info: "farmacologiayterapeutica.gi@gmail.com",
      description: "Respuesta en 24-48 horas",
      color: "bg-primary/10 text-primary",
      isEmail: true,
    },
    {
      icon: Phone,
      title: "Teléfono y WhatsApp",
      info: "+57 313 7375217",
      description: "Lunes a Viernes, 8:00 AM - 5:00 PM",
      color: "bg-fyt-red/10 text-fyt-red",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/grupofyt_udea/",
      color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white",
    },
  ];

  const subjectOptions = [
    { value: "investigacion", label: "Propuesta de Investigación" },
    { value: "pasantia", label: "Pasantía / Práctica" },
    { value: "consulta", label: "Consulta Académica" },
    { value: "colaboracion", label: "Colaboración Institucional" },
    { value: "otro", label: "Otro" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const cleaned = stripInvisible(value);
    setFormData((prev) => ({
      ...prev,
      [name]: cleaned,
    }));
  };

  const handleSubjectChange = (value: string) => {
    const option = subjectOptions.find((opt) => opt.value === value);
    setFormData((prev) => ({
      ...prev,
      subject: option?.label || value,
    }));
  };

  const validateEmail = (email: string) => isLikelyEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = safeText(formData.name);
    const email = safeText(formData.email);
    const subject = safeText(formData.subject);
    const message = safeText(formData.message, { preserveNewlines: true });

    if (!name || !email || !subject || !message) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Correo inválido",
        description: "Por favor, ingresa un correo electrónico válido.",
        variant: "destructive",
      });
      return;
    }

    const mailtoRaw = `mailto:farmacologiayterapeutica.gi@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
    )}`;
    const mailto = sanitizeURL(mailtoRaw) || mailtoRaw;

    const a = document.createElement("a");
    a.href = mailto;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Redirigiendo a tu correo",
      description: "Completa el envío desde tu cliente de correo.",
    });
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroContacto}
            alt="Laboratorio de investigación"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Conectemos Ciencia y Futuro
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Promovemos la excelencia mediante alianzas en investigación, docencia y extensión. 
            Tu visión puede ser el motor que transforme la salud del mañana.
          </p>
        </motion.div>
      </section>

      {/* Contact Content Section */}
      <section className="relative bg-slate-50 overflow-hidden py-16 md:py-24">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-fyt-purple/20 via-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid: Info (40%) + Form (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    custom={0.15 + index * 0.1}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${item.color} shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-fyt-dark text-sm mb-0.5">
                        {item.title}
                      </h3>
                      {item.isEmail ? (
                        <a
                          href={`mailto:${item.info}`}
                          className="text-primary font-medium text-sm hover:underline break-all"
                        >
                          {item.info}
                        </a>
                      ) : (
                        <p className="text-fyt-dark font-medium text-sm break-words">
                          {item.info}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={0.5}
              className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm"
            >
              <h3 className="font-semibold text-fyt-dark mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-primary" />
                Síguenos en Redes
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={sanitizeURL(social.href) || social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} hover:scale-110`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={0.6}
              className="p-6 rounded-xl bg-white border border-gray-200/60 shadow-md"
            >
              <h3 className="font-semibold text-fyt-dark mb-2">
                ¿Propuesta urgente?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contáctanos directamente para colaboraciones de investigación o proyectos especiales.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <a
                  href={
                    sanitizeURL(
                      "mailto:farmacologiayterapeutica.gi@gmail.com?subject=Propuesta de Colaboración"
                    ) ||
                    "mailto:farmacologiayterapeutica.gi@gmail.com?subject=Propuesta de Colaboración"
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Proponer Colaboración
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.2}
            className="lg:col-span-3"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200/60">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-fyt-dark mb-2">
                  Envíanos un mensaje
                </h2>
                <p className="text-muted-foreground text-sm">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-fyt-dark">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    required
                    className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-fyt-dark">
                    Correo electrónico *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>

                {/* Subject Select */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-fyt-dark">
                    Asunto *
                  </Label>
                  <Select onValueChange={handleSubjectChange}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-fyt-dark">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    rows={6}
                    required
                    className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button - Solid Color */}
                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obligatorios. Tu información será tratada de forma confidencial.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0.3}
          className="mt-16"
        >
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-50/30" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.573964624252!2d-75.5038549!3d10.3994434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625bfe9eac921%3A0xa752ed6a0af4fe9b!2sCartagena%20University%20Campus%20Zaragocilla!5e0!3m2!1ses!2sco!4v1695660000000!5m2!1ses!2sco"
              width="100%"
              height="350"
              style={{ border: 0, filter: "grayscale(20%) contrast(110%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Universidad de Cartagena - Campus Zaragocilla"
              className="w-full"
            />
          </div>
        </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPremium;
