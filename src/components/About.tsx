import { Target, Eye, Microscope, Heart, Users, BookOpen } from "lucide-react";
import { Card } from "./ui/card";
import researchImage from "@/assets/research-team.jpg";

const About = () => {
  const values = [
    {
      icon: Microscope,
      title: "Investigación Rigurosa",
      description: "Aplicamos metodologías científicas de vanguardia en todos nuestros proyectos de investigación."
    },
    {
      icon: Heart,
      title: "Compromiso con la Salud",
      description: "Trabajamos para mejorar la calidad de vida de los pacientes a través de la innovación terapéutica."
    },
    {
      icon: Users,
      title: "Trabajo Colaborativo",
      description: "Fomentamos la colaboración interdisciplinaria y el intercambio de conocimientos."
    },
    {
      icon: BookOpen,
      title: "Formación Académica",
      description: "Preparamos a la próxima generación de investigadores en farmacología y terapéutica."
    }
  ];

  const researchLines = [
    "Farmacología Clínica y Translacional",
    "Desarrollo de Nuevas Terapias",
    "Farmacovigilancia y Seguridad de Medicamentos",
    "Medicina Personalizada y Farmacogenómica",
    "Investigación en Enfermedades Crónicas",
    "Evaluación de Tecnologías Sanitarias"
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fyt-dark mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            El Semillero de Investigación FYT es un grupo académico comprometido con la excelencia 
            en la investigación farmacológica y terapéutica.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <img 
              src={researchImage} 
              alt="Equipo de investigación FYT"
              className="rounded-xl shadow-large w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fyt-dark/20 to-transparent rounded-xl"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* History */}
            <div>
              <h3 className="text-2xl font-semibold text-fyt-dark mb-4">Nuestra Historia</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fundado con el propósito de fomentar la investigación de calidad en el área de 
                farmacología y terapéutica, nuestro semillero ha crecido hasta convertirse en 
                un referente académico en el desarrollo de conocimiento científico aplicado a 
                la mejora de la salud humana.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-fyt-blue/20 bg-gradient-card shadow-soft">
                <Target className="h-8 w-8 text-fyt-blue mb-3" />
                <h4 className="text-lg font-semibold text-fyt-dark mb-2">Misión</h4>
                <p className="text-sm text-muted-foreground">
                  Generar conocimiento científico de alta calidad en farmacología y terapéutica, 
                  formando investigadores comprometidos con el avance de las ciencias de la salud.
                </p>
              </Card>

              <Card className="p-6 border-fyt-purple/20 bg-gradient-card shadow-soft">
                <Eye className="h-8 w-8 text-fyt-purple mb-3" />
                <h4 className="text-lg font-semibold text-fyt-dark mb-2">Visión</h4>
                <p className="text-sm text-muted-foreground">
                  Ser reconocidos como un grupo líder en investigación farmacológica, 
                  contribuyendo al desarrollo de terapias innovadoras y seguras.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-fyt-dark mb-8">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-fyt-dark mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Research Lines */}
        <div>
          <h3 className="text-2xl font-semibold text-center text-fyt-dark mb-8">
            Líneas de Investigación
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {researchLines.map((line, index) => (
              <Card key={index} className="p-4 bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-hero rounded-full"></div>
                  <p className="text-sm font-medium text-fyt-dark">{line}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;