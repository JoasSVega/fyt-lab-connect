import { Calculator, Database, Search, Microscope, Pill, FlaskConical, Stethoscope, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const Tools = () => {
  // Calculadoras clínicas disponibles
  const clinicalCalculators = [
    {
      title: "Tasa de Filtrado Glomerular (TFG)",
      description: "Cálculo de TFG usando fórmulas CKD-EPI, MDRD y Cockcroft-Gault",
      icon: <Calculator className="h-6 w-6 text-fyt-blue" />,
      comingSoon: false
    },
    {
      title: "Ajuste de Dosis por Función Renal",
      description: "Ajusta dosificación según función renal del paciente",
      icon: <Pill className="h-6 w-6 text-fyt-red" />,
      comingSoon: false
    },
    {
      title: "Conversión de Dosis",
      description: "Equivalencias entre diferentes vías de administración (ej. morfina oral vs IV)",
      icon: <FlaskConical className="h-6 w-6 text-fyt-purple" />,
      comingSoon: false
    },
    {
      title: "IMC y Fórmulas Antropométricas",
      description: "Índice de masa corporal y otras medidas antropométricas útiles",
      icon: <Stethoscope className="h-6 w-6 text-fyt-blue" />,
      comingSoon: false
    }
  ];

  // Herramientas de interacciones y comparaciones
  const drugTools = [
    {
      title: "Verificador de Interacciones",
      description: "Identifica interacciones medicamentosas potenciales entre fármacos",
      icon: <Search className="h-6 w-6 text-fyt-red" />,
      comingSoon: true
    },
    {
      title: "Comparador de Medicamentos",
      description: "Compara eficacia, precio y efectos adversos entre medicamentos",
      icon: <Database className="h-6 w-6 text-fyt-purple" />,
      comingSoon: true
    }
  ];

  // Herramientas futuras
  const futureTools = [
    {
      title: "Farmacocinética Clínica",
      description: "Modelos PK/PD para optimización terapéutica",
      icon: <Microscope className="h-6 w-6 text-fyt-blue" />,
      comingSoon: true
    },
    {
      title: "Adherencia Farmacoterapéutica",
      description: "Herramientas para evaluar y mejorar adherencia al tratamiento",
      icon: <Clock className="h-6 w-6 text-fyt-red" />,
      comingSoon: true
    }
  ];

  const ToolCard = ({ tool, category }: { tool: any, category: string }) => (
    <Card className="group hover:shadow-medium transition-all duration-300 border-card-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-lg bg-background/80 shadow-soft">
            {tool.icon}
          </div>
          {tool.comingSoon && (
            <span className="text-xs bg-fyt-purple/10 text-fyt-purple px-2 py-1 rounded-full font-medium">
              Próximamente
            </span>
          )}
        </div>
        <CardTitle className="text-lg text-fyt-dark group-hover:text-primary transition-colors">
          {tool.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-muted-foreground leading-relaxed">
          {tool.description}
        </CardDescription>
        <div className="mt-4">
          <button 
            className={`w-full px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              tool.comingSoon 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-gradient-hero text-white hover:bg-primary/90 hover:shadow-soft'
            }`}
            disabled={tool.comingSoon}
          >
            {tool.comingSoon ? 'En desarrollo' : 'Acceder'}
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="herramientas" className="py-20 px-4 bg-gradient-to-b from-background to-fyt-light/5">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-fyt-dark mb-4">
            Herramientas Farmacéuticas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conjunto de utilidades clínicas diseñadas para profesionales farmacéuticos. 
            Calculadoras, verificadores de interacciones y herramientas de análisis 
            para optimizar la práctica farmacéutica.
          </p>
        </div>

        {/* Calculadoras Clínicas */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-hero shadow-soft">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Calculadoras Clínicas
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicalCalculators.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="calculators" />
            ))}
          </div>
        </div>

        {/* Herramientas de Análisis Farmacológico */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-card shadow-soft">
              <Database className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Análisis Farmacológico
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drugTools.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="analysis" />
            ))}
          </div>
        </div>

        {/* Herramientas Futuras */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-accent shadow-soft">
              <Microscope className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Herramientas Avanzadas
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureTools.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="future" />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-card border border-card-border rounded-lg p-8 shadow-soft">
            <h4 className="text-xl font-bold text-fyt-dark mb-4">
              ¿Necesitas una herramienta específica?
            </h4>
            <p className="text-muted-foreground mb-6">
              Estamos en constante desarrollo de nuevas utilidades. 
              Comparte tus necesidades y sugerencias con nuestro equipo.
            </p>
            <button className="bg-gradient-hero text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-soft">
              Solicitar Herramienta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;