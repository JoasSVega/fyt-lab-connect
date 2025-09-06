import { Calendar, ExternalLink, FileText, Users, Clock, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Projects = () => {
  const currentProjects = [
    {
      title: "Evaluación de la Efectividad de Nuevos Antihipertensivos en Población Colombiana",
      description: "Estudio clínico fase III para evaluar la eficacia y seguridad de nuevos medicamentos antihipertensivos en pacientes con hipertensión arterial resistente.",
      status: "En curso",
      progress: 75,
      duration: "2023-2025",
      team: 8,
      funding: "COLCIENCIAS",
      category: "Farmacología Clínica"
    },
    {
      title: "Farmacogenómica del Metabolismo de Warfarina en Pacientes Anticoagulados",
      description: "Investigación sobre polimorfismos genéticos que afectan la respuesta a warfarina y desarrollo de algoritmos de dosificación personalizada.",
      status: "En curso",
      progress: 60,
      duration: "2024-2026",
      team: 6,
      funding: "Universidad",
      category: "Medicina Personalizada"
    },
    {
      title: "Seguridad y Efectividad de Medicamentos en Pacientes Pediátricos",
      description: "Estudio observacional multicéntrico sobre el uso de medicamentos off-label en población pediátrica hospitalizada.",
      status: "En curso",
      progress: 40,
      duration: "2024-2025",
      team: 10,
      funding: "MinCiencias",
      category: "Farmacovigilancia"
    }
  ];

  const completedProjects = [
    {
      title: "Adherencia Terapéutica en Pacientes con Diabetes Tipo 2",
      description: "Evaluación de factores que influyen en la adherencia al tratamiento farmacológico en pacientes diabéticos.",
      year: "2023",
      impact: "15 publicaciones",
      category: "Farmacología Clínica"
    },
    {
      title: "Interacciones Medicamentosas en UCI",
      description: "Identificación y caracterización de interacciones medicamentosas clínicamente relevantes en unidades de cuidados intensivos.",
      year: "2022",
      impact: "8 publicaciones",
      category: "Farmacia Hospitalaria"
    }
  ];

  const publications = [
    {
      title: "Pharmacogenetic-guided warfarin dosing in Colombian patients: A randomized controlled trial",
      authors: "Fernández M, Rodríguez C, Martínez AS, et al.",
      journal: "Journal of Clinical Pharmacology",
      year: "2024",
      impact: "Q1 - JCR 4.2",
      doi: "10.1002/jcph.2024.01234",
      url: "#"
    },
    {
      title: "Safety profile of antihypertensive drugs in elderly patients: A real-world evidence study",
      authors: "Herrera JL, Vega LP, Castro DA, et al.",
      journal: "Clinical Therapeutics",
      year: "2024",
      impact: "Q2 - JCR 3.8",
      doi: "10.1016/j.clinthera.2024.01.001",
      url: "#"
    },
    {
      title: "Drug-drug interactions in intensive care units: A systematic review and meta-analysis",
      authors: "Martínez AS, Fernández M, Rodríguez C, et al.",
      journal: "Critical Care Medicine",
      year: "2023",
      impact: "Q1 - JCR 8.7",
      doi: "10.1097/CCM.0000000000005123",
      url: "#"
    },
    {
      title: "Adherence to diabetes medications: Barriers and facilitators in Latin American populations",
      authors: "Vega LP, Herrera JL, Castro DA, et al.",
      journal: "Diabetes Research and Clinical Practice",
      year: "2023",
      impact: "Q1 - JCR 4.5",
      doi: "10.1016/j.diabres.2023.110234",
      url: "#"
    }
  ];

  return (
    <section id="proyectos" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fyt-dark mb-4">
            Proyectos y Publicaciones
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conoce nuestras investigaciones actuales y los resultados científicos que hemos logrado 
            a través de nuestro trabajo riguroso y colaborativo.
          </p>
        </div>

        {/* Current Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-fyt-dark mb-8 flex items-center">
            <Clock className="h-6 w-6 text-fyt-blue mr-3" />
            Proyectos en Curso
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="text-xs border-green-500 text-green-600"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-fyt-dark mb-2">{project.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-hero h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.team} investigadores</span>
                  </div>
                  <div className="col-span-2 text-fyt-purple font-medium">
                    Financiado por: {project.funding}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-fyt-dark mb-8 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            Proyectos Completados
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-soft">
                <Badge variant="outline" className="text-xs mb-3 border-green-500 text-green-600">
                  {project.category}
                </Badge>
                <h4 className="text-lg font-semibold text-fyt-dark mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Año: {project.year}</span>
                  <span className="text-fyt-purple font-medium">{project.impact}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div>
          <h3 className="text-2xl font-semibold text-fyt-dark mb-8 flex items-center">
            <FileText className="h-6 w-6 text-fyt-purple mr-3" />
            Publicaciones Recientes
          </h3>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-fyt-dark mb-2">{pub.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{pub.authors}</p>
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      <span className="text-fyt-purple font-medium">{pub.journal}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{pub.year}</span>
                      <Badge variant="outline" className="text-xs">
                        {pub.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">DOI: {pub.doi}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-fyt-blue/20 hover:bg-fyt-blue hover:text-white shrink-0"
                    onClick={() => window.open(pub.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Artículo
                  </Button>  
                </div>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-fyt-purple/20 hover:bg-fyt-purple hover:text-white">
              Ver Todas las Publicaciones
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;