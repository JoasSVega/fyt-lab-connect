// import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Ruler, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Lista de herramientas farmacéuticas (fácil de extender)
const tools = [
  {
    title: "Calculadoras de Función Renal",
    description: "Herramienta farmacéutica para cálculos clínicos de función renal.",
    color: "bg-blue-50",
    href: "/herramientas/funcion-renal",
    buttonText: "Ir a Calculadoras de Función Renal",
  icon: <Droplet className="w-8 h-8 text-blue-600" aria-label="Función Renal" />,
  },
  {
    title: "Calculadoras Antropométricas",
    description: "Herramienta farmacéutica para cálculos clínicos antropométricos.",
    color: "bg-green-50",
  href: "/herramientas/antropometricos",
    buttonText: "Ir a Calculadoras Antropométricas",
    icon: <Ruler className="w-8 h-8 text-green-600" aria-label="Antropométricas" />,
  },
  // Agrega aquí nuevas herramientas fácilmente
];

const Herramientas = () => {
	const navigate = useNavigate();
	return (
			<div className="w-full bg-background overflow-x-hidden flex flex-col">
			<main className="flex-1 w-full pt-24">
                {/* Hero Section con imagen de fondo */}
                <section
                  className="relative left-1/2 -translate-x-1/2 w-screen min-h-[65vh] flex items-center justify-center overflow-hidden"
                  aria-label="Hero Herramientas"
                >
                  {/* Background Image */}
                  <img
                    src="/images/hero-herramientas.png"
                    alt="Fondo hero Herramientas"
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden="true"
                  />
                  {/* Overlay for text contrast */}
                  <div className="absolute inset-0 bg-white/55 pointer-events-none" />
                  {/* Content */}
                  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-slate-800 mb-8">
                      Herramientas Farmacéuticas
                    </h1>
                  </div>
                </section>
                {/* Sección de tarjetas */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {tools.map((tool, idx) => (
                      <Card
                        key={tool.title}
                        className="flex flex-col items-center rounded-xl shadow-soft bg-white/80"
                      >
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
                    ))}
                  </div>
        </section>
      </main>
     </div>
	);
};

export default Herramientas;
