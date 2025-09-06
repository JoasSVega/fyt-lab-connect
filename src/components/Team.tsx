import { ExternalLink, Mail, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. María Fernández García",
      role: "Directora del Semillero",
      specialty: "Químico Farmacéutico Clínico",
      description: "Especialista en farmacología clínica con más de 15 años de experiencia en investigación.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      links: {
        orcid: "0000-0000-0000-0000",
        scholar: "scholar-profile",
        email: "maria.fernandez@universidad.edu.co"
      }
    },
    {
      name: "Dr. Carlos Rodríguez López",
      role: "Codirector",
      specialty: "Farmacéutico Hospitalario",
      description: "Experto en farmacoterapia y seguridad de medicamentos en el ámbito hospitalario.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      links: {
        orcid: "0000-0000-0000-0001",
        scholar: "scholar-profile-2",
        email: "carlos.rodriguez@universidad.edu.co"
      }
    },
    {
      name: "Dra. Ana Sofía Martínez",
      role: "Investigadora Principal",
      specialty: "Farmacóloga Clínica",
      description: "Especialista en farmacogenómica y medicina personalizada.",
      image: "https://images.unsplash.com/photo-1594824502624-c60a444e862f?w=400&h=400&fit=crop&crop=face",
      links: {
        orcid: "0000-0000-0000-0002",
        scholar: "scholar-profile-3",
        email: "ana.martinez@universidad.edu.co"
      }
    },
    {
      name: "Dr. Jorge Luis Herrera",
      role: "Investigador Asociado",
      specialty: "Químico Farmacéutico Asistencial",
      description: "Especialista en atención farmacéutica y seguimiento farmacoterapéutico.",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      links: {
        orcid: "0000-0000-0000-0003",
        scholar: "scholar-profile-4",
        email: "jorge.herrera@universidad.edu.co"
      }
    },
    {
      name: "Dra. Laura Patricia Vega",
      role: "Investigadora Junior",
      specialty: "Química Farmacéutica",
      description: "Especialista en desarrollo de formulaciones y tecnología farmacéutica.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
      links: {
        orcid: "0000-0000-0000-0004",
        scholar: "scholar-profile-5",
        email: "laura.vega@universidad.edu.co"
      }
    },
    {
      name: "Mg. Diego Alejandro Castro",
      role: "Estudiante de Doctorado",
      specialty: "Farmacología Experimental",
      description: "Investigador en formación especializado en modelos preclínicos.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      links: {
        orcid: "0000-0000-0000-0005",
        scholar: "scholar-profile-6",
        email: "diego.castro@universidad.edu.co"
      }
    }
  ];

  return (
    <section id="equipo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fyt-dark mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Un equipo multidisciplinario de investigadores comprometidos con la excelencia 
            académica y científica en farmacología y terapéutica.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fyt-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-fyt-dark mb-1">{member.name}</h3>
                  <p className="text-fyt-purple font-medium text-sm mb-1">{member.role}</p>
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                    <GraduationCap className="h-4 w-4" />
                    <span>{member.specialty}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {member.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-fyt-blue/20 hover:bg-fyt-blue hover:text-white"
                    onClick={() => window.open(`https://orcid.org/${member.links.orcid}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    ORCID
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-fyt-purple/20 hover:bg-fyt-purple hover:text-white"
                    onClick={() => window.open(`https://scholar.google.com/citations?user=${member.links.scholar}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Scholar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-fyt-red/20 hover:bg-fyt-red hover:text-white"
                    onClick={() => window.open(`mailto:${member.links.email}`, '_blank')}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-hero text-white shadow-large">
            <h3 className="text-2xl font-semibold mb-4">¿Interesado en unirte?</h3>
            <p className="mb-6 text-white/90">
              Si eres estudiante, profesional o investigador interesado en formar parte 
              de nuestro equipo, te invitamos a contactarnos.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-fyt-dark hover:bg-white/90"
              onClick={() => {
                const element = document.querySelector('#contacto');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contactar
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;