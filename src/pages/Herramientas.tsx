import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Ruler, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import { getSoftwareApplicationSchema, baseUrl } from "@/utils/seoSchemas";

// Lista de herramientas farmacéuticas (fácil de extender)
const tools = [
  {
    title: "Calculadoras Antropométricas",
    description: "Herramienta farmacéutica para cálculos clínicos antropométricos: índice de masa corporal (IMC), superficie corporal, peso ideal.",
    color: "bg-green-50",
    href: "/herramientas/antropometricos",
    buttonText: "Ir a Calculadoras Antropométricas",
    icon: <Ruler className="w-8 h-8 text-green-600" aria-label="Antropométricas" />,
    keywords: "calculadora antropométrica, IMC, índice de masa corporal, superficie corporal, farmacología clínica",
  },
  {
    title: "Calculadoras de Función Renal",
    description: "Herramienta farmacéutica para cálculos clínicos de función renal: tasa de filtración glomerular (TFG), clearance, dosificación por insuficiencia renal.",
    color: "bg-blue-50",
    href: "/herramientas/funcion-renal",
    buttonText: "Ir a Calculadoras de Función Renal",
    icon: <Droplet className="w-8 h-8 text-blue-600" aria-label="Función Renal" />,
    keywords: "calculadora función renal, TFG, tasa filtración glomerular, clearance, dosificación, farmacocinética",
  },
  // Agrega aquí nuevas herramientas fácilmente
];

const Herramientas = () => {
  const navigate = useNavigate();
  usePageReady({
    responsiveImages: ["/images/hero-herramientas"],
  });

  // Schema para la página de herramientas con lista de aplicaciones
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Herramientas Farmacéuticas',
    description: 'Soluciones digitales para cálculos farmacéuticos y clínicos',
    url: `${baseUrl}/herramientas`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.map((tool, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: tool.title,
        description: tool.description,
        url: `${baseUrl}${tool.href}`,
      })),
    },
  };

  return (
    <div className="w-full bg-background flex flex-col pt-24">
      <Seo
        title="Herramientas y Calculadoras Farmacéuticas | Grupo FyT"
        description="Optimiza tu práctica clínica con nuestras herramientas digitales gratuitas. Soluciones rigurosas para cálculos farmacéuticos y dosificación."
        keywords={["Calculadora de dosis", "Farmacocinética", "Software médico", "Herramientas Salud", "Universidad de Cartagena"]}
        author="Grupo FyT"
        robots="index, follow"
        canonical={`${baseUrl}/herramientas`}
        openGraph={{
          title: "Herramientas y Calculadoras Farmacéuticas | Grupo FyT",
          description: "Optimiza tu práctica clínica con nuestras herramientas digitales gratuitas. Soluciones rigurosas para cálculos farmacéuticos y dosificación.",
          type: "website",
          url: `${baseUrl}/herramientas`,
          image: `${baseUrl}/logo-fyt.png`,
        }}
        twitter={{
          card: "summary_large_image",
          site: "@fytlab",
          image: `${baseUrl}/logo-fyt.png`,
        }}
        schema={schema}
      />
      {/* Hero Section con imagen de fondo */}
      <section
        className="relative left-1/2 -translate-x-1/2 w-screen h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
        aria-label="Hero Herramientas"
        style={{
          backgroundImage: "url('/images/hero-herramientas-small.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay oscuro sutil para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-white mb-6 tracking-tight drop-shadow-lg">
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
          {tools.map((tool, idx) => {
            // Schema individual para cada herramienta
            const toolSchema = getSoftwareApplicationSchema({
              name: tool.title,
              description: tool.description,
              category: "Medical",
              url: `${baseUrl}${tool.href}`,
            });

            return (
              <ScrollReveal key={tool.title} delay={idx * 0.1}>
                <Card className="flex flex-col items-center rounded-xl shadow-soft bg-white/80">
                  {/* JSON-LD inline para esta herramienta */}
                  <script type="application/ld+json">
                    {JSON.stringify(toolSchema)}
                  </script>
                  <CardContent className="flex flex-col items-center gap-4 p-8 w-full">
                    {/* Espacio reservado para imagen/icono */}
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full mb-2 ${tool.color}`}
                    >
                      {tool.icon}
                    </div>
                    <h2 className="text-xl font-raleway font-semibold text-fyt-dark mb-2 text-center">
                      {tool.title}
                    </h2>
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
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Herramientas;
