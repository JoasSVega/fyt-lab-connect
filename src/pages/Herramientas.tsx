import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Ruler, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

// Lista de herramientas farmacéuticas (fácil de extender)
const tools = [
  {
    title: "Calculadoras Antropométricas",
    description: "Herramienta farmacéutica para cálculos clínicos antropométricos.",
    color: "bg-green-50",
  href: "/herramientas/antropometricos",
    buttonText: "Ir a Calculadoras Antropométricas",
    icon: <Ruler className="w-8 h-8 text-green-600" aria-label="Antropométricas" />,
  },
  {
    title: "Calculadoras de Función Renal",
    description: "Herramienta farmacéutica para cálculos clínicos de función renal.",
    color: "bg-blue-50",
    href: "/herramientas/funcion-renal",
    buttonText: "Ir a Calculadoras de Función Renal",
  icon: <Droplet className="w-8 h-8 text-blue-600" aria-label="Función Renal" />,
  },
  // Agrega aquí nuevas herramientas fácilmente
];

const Herramientas = () => {
	const navigate = useNavigate();
	return (
			<div className="w-full bg-background flex flex-col pt-24">
                {/* Hero Section con imagen de fondo */}
                <section
                  className="relative left-1/2 -translate-x-1/2 w-screen h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
                  aria-label="Hero Herramientas"
                  style={{
                    backgroundImage: "url('/images/hero-herramientas.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                >
                  {/* Overlay oscuro sutil para mejorar legibilidad */}
                  <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                  {/* Content */}
                  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                      Herramientas Digitales para Profesionales Farmacéuticos
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl font-inter text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                      Soluciones inteligentes diseñadas para análisis clínico, gestión de datos y optimización de decisiones en entornos sanitarios.
                    </p>
                  </div>
                </section>
                {/* Sección de tarjetas */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {tools.map((tool, idx) => (
                      <ScrollReveal key={tool.title} delay={idx * 0.1}>
                        <Card className="flex flex-col items-center rounded-xl shadow-soft bg-white/80">
                          <CardContent className="flex flex-col items-center gap-4 p-8 w-full">
                            {/* Espacio reservado para imagen/icono */}
                            <div
                              className={`w-16 h-16 flex items-center justify-center rounded-full mb-2 ${tool.color}`}
                            >
                              {tool.icon}
                            </div>
                            <h3 className="text-xl font-raleway font-semibold text-fyt-dark mb-2 text-center">
                              {tool.title}
                            </h3>
                            <p className="text-muted-foreground text-center text-sm mb-4 font-inter">
                              {tool.description}
                            </p>
                            <Button
                              onClick={() => navigate(tool.href)}
                              className={`w-full rounded-full px-5 py-2 font-inter shadow bg-fyt-blue text-white hover:bg-fyt-blue/90 transition font-inter`}
                            >
                              {tool.buttonText}
                            </Button>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
				</section>
			</div>
	);
};export default Herramientas;
