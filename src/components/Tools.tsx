import { Calculator, Database, Search, Microscope, Pill, FlaskConical, Stethoscope, Clock, ChevronRight, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

const Tools = () => {
  // Estado para el buscador de fármacos
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Datos de demostración para el buscador
  const mockDrugData = {
    "morfina": {
      name: "Morfina",
      alerts: [
        { type: "high-risk", text: "Medicamento de alto riesgo", icon: <AlertTriangle className="h-4 w-4" /> },
        { type: "lasa", text: "Medicamento LASA", icon: <AlertCircle className="h-4 w-4" /> },
        { type: "controlled", text: "Sustancia controlada", icon: <Info className="h-4 w-4" /> }
      ],
      routes: [
        {
          name: "Oral",
          icon: "💊",
          doses: ["5-15 mg cada 4h", "30-60 mg liberación prolongada cada 12h"],
          notes: "Ajustar dosis en insuficiencia hepática"
        },
        {
          name: "Intravenosa",
          icon: "💉",
          doses: ["2-10 mg cada 4h", "0.1-0.2 mg/kg en pediatría"],
          notes: "Administrar lentamente, monitorear función respiratoria"
        },
        {
          name: "Subcutánea",
          icon: "🩹",
          doses: ["5-20 mg cada 4h"],
          notes: "Rotar sitios de inyección"
        }
      ],
      precautions: "No administrar en insuficiencia respiratoria severa. Requiere monitoreo de niveles plasmáticos en uso prolongado."
    },
    "paracetamol": {
      name: "Paracetamol",
      alerts: [
        { type: "hepatotoxic", text: "Riesgo de hepatotoxicidad", icon: <AlertTriangle className="h-4 w-4" /> },
        { type: "safe", text: "Seguro en embarazo", icon: <CheckCircle className="h-4 w-4" /> }
      ],
      routes: [
        {
          name: "Oral",
          icon: "💊",
          doses: ["500-1000 mg cada 6-8h", "Máximo 4g/día"],
          notes: "Tomar con alimentos si hay molestias gástricas"
        },
        {
          name: "Intravenosa",
          icon: "💉",
          doses: ["1g cada 6h", "15 mg/kg cada 4-6h en pediatría"],
          notes: "Infusión en 15 minutos mínimo"
        },
        {
          name: "Rectal",
          icon: "🔹",
          doses: ["500-1000 mg cada 6-8h"],
          notes: "Útil cuando la vía oral no está disponible"
        }
      ],
      precautions: "Reducir dosis en insuficiencia hepática. No exceder dosis máxima diaria."
    }
  };

  // Función de búsqueda
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    // Simular llamada a API
    setTimeout(() => {
      const result = mockDrugData[searchTerm.toLowerCase() as keyof typeof mockDrugData];
      setSearchResults(result || null);
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'high-risk': return 'destructive';
      case 'lasa': return 'secondary';
      case 'controlled': return 'outline';
      case 'hepatotoxic': return 'destructive';
      case 'safe': return 'default';
      default: return 'outline';
    }
  };

  // Calculadoras de Función Renal
  const renalCalculators = [
    {
      title: "Tasa de Filtrado Glomerular (TFG)",
      description: "Cálculo de TFG usando fórmulas CKD-EPI, MDRD y Cockcroft-Gault",
      icon: <Calculator className="h-6 w-6 text-fyt-blue" />,
      href: "/calculator/gfr",
      comingSoon: false
    }
  ];

  // Calculadoras Antropométricas
  const anthropometricCalculators = [
    {
      title: "Calculadora de IMC",
      description: "Índice de masa corporal y clasificación según estándares internacionales",
      icon: <Stethoscope className="h-6 w-6 text-fyt-blue" />,
      href: "/calculator/bmi",
      comingSoon: false
    },
    {
      title: "Superficie Corporal (BSA)",
      description: "Cálculo de superficie corporal usando fórmulas de Dubois y Mosteller",
      icon: <Calculator className="h-6 w-6 text-fyt-purple" />,
      href: "/calculator/bsa",
      comingSoon: false
    }
  ];

  // Otras calculadoras clínicas
  const otherCalculators = [
    {
      title: "Calculadora de Dosificación",
      description: "Cálculo de dosis farmacológicas personalizadas según parámetros del paciente",
      icon: <Pill className="h-6 w-6 text-fyt-red" />,
      href: "/calculator/dosage",
      comingSoon: false
    }
  ];

  // Herramientas de análisis farmacológico
  const analysisTools = [
    {
      title: "Consultor Farmacológico",
      description: "Sistema inteligente de consulta para información farmacológica",
      icon: <Search className="h-6 w-6 text-fyt-red" />,
      href: "/consultor",
      comingSoon: true
    },
    {
      title: "Comparador de Fármacos",
      description: "Compara eficacia, precio y efectos adversos entre medicamentos",
      icon: <Database className="h-6 w-6 text-fyt-purple" />,
      href: "/comparador",
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
    <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-[#3BB9FF]/20 bg-white/90 backdrop-blur-sm animate-fade-in-card">
      {/* Animaciones CSS */}
      <style>{`
        @keyframes fadeInCard {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-card { animation: fadeInCard 1.2s cubic-bezier(.42,0,.58,1); }
        .group:hover { box-shadow: 0 8px 32px 0 rgba(59,185,255,0.15), 0 1.5px 6px 0 rgba(155,89,182,0.10); transform: scale(1.04); }
      `}</style>
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
          {tool.comingSoon ? (
            <button 
              className="w-full px-4 py-2 rounded-md font-medium bg-muted text-muted-foreground cursor-not-allowed"
              disabled
            >
              En desarrollo
            </button>
          ) : (
            <a 
              href={tool.href}
              className="block w-full px-4 py-2 rounded-md font-medium transition-all duration-200 bg-gradient-hero text-white hover:bg-primary/90 hover:shadow-soft text-center"
            >
              Acceder
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
  <section id="herramientas" className="py-20 min-h-[80vh] bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-fyt-dark mb-4 drop-shadow-lg">
            Herramientas Farmacéuticas
          </h2>
          <p className="text-lg text-fyt-dark/90 max-w-3xl mx-auto leading-relaxed">
            Conjunto de utilidades clínicas diseñadas para profesionales farmacéuticos. 
            Calculadoras, verificadores de interacciones y herramientas de análisis 
            para optimizar la práctica farmacéutica.
          </p>
        </div>

        {/* Calculadoras de Función Renal */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-hero shadow-soft">
              <Calculator className="h-6 w-6 text-fyt-blue" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Calculadora de Función Renal
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renalCalculators.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="renal" />
            ))}
          </div>
        </div>

        {/* Calculadoras Antropométricas */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-card shadow-soft">
              <Stethoscope className="h-6 w-6 text-fyt-blue" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Calculadoras Antropométricas
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {anthropometricCalculators.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="anthropometric" />
            ))}
          </div>
        </div>

        {/* Otras Calculadoras */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-accent shadow-soft">
              <Pill className="h-6 w-6 text-fyt-red" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Otras Calculadoras
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherCalculators.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="other" />
            ))}
          </div>
        </div>

        {/* Herramientas de Análisis Farmacológico */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-card shadow-soft">
              <Database className="h-6 w-6 text-fyt-purple" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Análisis Farmacológico
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisTools.map((tool, index) => (
              <ToolCard key={index} tool={tool} category="analysis" />
            ))}
          </div>
        </div>

        {/* Buscador de Fármacos */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-fyt-blue text-fyt-dark shadow-soft">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-fyt-dark">
              Buscador de Fármacos
            </h3>
          </div>

          {/* Barra de búsqueda */}
          <div className="mb-8">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar medicamento (ej: morfina, paracetamol)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching || !searchTerm.trim()}
                    className="bg-gradient-hero text-fyt-dark hover:bg-primary/90"
                  >
                    {isSearching ? "Buscando..." : "Buscar"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Los resultados aquí mostrados son solo de demostración. Próximamente se integrará la base de datos completa.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Resultados de búsqueda */}
          {searchResults && (
            <Card className="border-card-border bg-card shadow-medium">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Pill className="h-8 w-8 text-fyt-blue" />
                  <CardTitle className="text-3xl text-fyt-dark">
                    {searchResults.name}
                  </CardTitle>
                </div>
                
                {/* Etiquetas de alerta */}
                <div className="flex flex-wrap gap-2">
                  {searchResults.alerts.map((alert: any, index: number) => (
                    <Badge 
                      key={index} 
                      variant={getBadgeVariant(alert.type)}
                      className="flex items-center space-x-1"
                    >
                      {alert.icon}
                      <span>{alert.text}</span>
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                {/* Vías de administración */}
                <h4 className="text-xl font-bold text-fyt-dark mb-4">Vías de Administración</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {searchResults.routes.map((route: any, index: number) => (
                    <Card key={index} className="border border-card-border bg-background/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{route.icon}</span>
                          <CardTitle className="text-lg text-fyt-dark">
                            {route.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-3">
                          {route.doses.map((dose: string, doseIndex: number) => (
                            <div key={doseIndex} className="flex items-center space-x-2">
                              <ChevronRight className="h-4 w-4 text-fyt-blue" />
                              <span className="text-sm font-medium">{dose}</span>
                            </div>
                          ))}
                        </div>
                        {route.notes && (
                          <div className="bg-fyt-light/10 border border-fyt-blue/20 rounded-md p-3">
                            <p className="text-xs text-muted-foreground">
                              <Info className="h-3 w-3 inline mr-1" />
                              {route.notes}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Precauciones adicionales */}
                {searchResults.precautions && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h5 className="font-bold text-destructive mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Precauciones Importantes
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {searchResults.precautions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Mensaje cuando no hay resultados */}
          {searchTerm && searchResults === null && !isSearching && (
            <Card className="border-card-border bg-card/50">
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-medium text-fyt-dark mb-2">
                  No se encontraron resultados
                </h4>
                <p className="text-muted-foreground">
                  No se encontró información para "{searchTerm}". Intenta con otro medicamento como "morfina" o "paracetamol".
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Herramientas Avanzadas */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-accent shadow-soft">
              <Microscope className="h-6 w-6 text-fyt-blue" />
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
          <div className="bg-gradient-to-tr from-[#3BB9FF] via-[#9B59B6] to-[#FF4C4C] border-2 border-white/30 rounded-lg p-8 shadow-2xl animate-fade-in">
            <h4 className="text-xl font-bold text-fyt-dark mb-4 drop-shadow-lg">
              ¿Necesitas una herramienta específica?
            </h4>
            <p className="text-fyt-dark/90 mb-6">
              Estamos en constante desarrollo de nuevas utilidades. 
              Comparte tus necesidades y sugerencias con nuestro equipo.
            </p>
            <button className="bg-white text-fyt-purple font-bold px-6 py-3 rounded-md hover:bg-white/90 transition-all duration-200 hover:shadow-lg">
              Solicitar Herramienta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;