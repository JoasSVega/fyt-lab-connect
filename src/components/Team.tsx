import React, { useState } from "react";
import { ExternalLink, Mail, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import ImageUpload from "./ui/image-upload";

const Team = () => {
  const [memberImages, setMemberImages] = useState<{[key: number]: string}>({});
  const teamMembers = [
    {
      name: "Antistio Alviz Amador",
      role: "Director del grupo",
      specialty: "QF, M.Sc. Farmacología, PhD en Ciencias Biomédicas",
      description: "Docente y Director del programa de Química Farmacéutica, líder del grupo de investigación FyT.",
      
      links: {
        orcid: "0000-0000-0000-0000",
        scholar: "scholar-profile",
        email: "aalviza@unicartagena.edu.co"
      }
    },
    {
      name: "Yaneth García Milano",
      role: "Coordinadora del Semillero FyT",
      specialty: "QF, Esp. en Administración Educativa",
      description: "Docente de planta y coordinadora del semillero de investigación FyT.",
      
      links: {
        orcid: "0000-0000-0000-0001",
        scholar: "scholar-profile-2",
        email: "ygarciam1@unicartagena.edu.co"
      }
    },
    {
      name: "Shirley Cavadia Puello",
      role: "Jefe del departamento académico",
      specialty: "QF, M.Sc. Farmacia Clínica Universitaria",
      description: "Jefe del departamento académico con especialización en farmacia clínica.",
      
      links: {
        orcid: "0000-0000-0000-0002",
        scholar: "scholar-profile-3",
        email: "scavadiap@unicartagena.edu.co"
      }
    },
    {
      name: "Julian Martinez",
      role: "Docente de planta",
      specialty: "QF, M.Sc. Farmacología",
      description: "Docente de planta especializado en farmacología.",
      
      links: {
        orcid: "0000-0000-0000-0003",
        scholar: "scholar-profile-4",
        email: "jmartinezz@unicartagena.edu.co"
      }
    },
    {
      name: "Roger Caraballo",
      role: "Docente de planta, subgerente HUC",
      specialty: "QF, M.Sc. Farmacología",
      description: "Docente de planta y subgerente del Hospital Universitario del Caribe.",
      
      links: {
        orcid: "0000-0000-0000-0004",
        scholar: "scholar-profile-5",
        email: "rcaraballom@unicartagena.edu.co"
      }
    },
    {
      name: "Luis Utria",
      role: "Docente de cátedra",
      specialty: "QF, M.Sc. Farmacología",
      description: "Docente de cátedra especializado en farmacología.",
      
      links: {
        orcid: "0000-0000-0000-0005",
        scholar: "scholar-profile-6",
        email: "lutriaa@unicartagena.edu.co"
      }
    },
    {
      name: "Sergio Uribe",
      role: "Químico Farmacéutico asistencial",
      specialty: "QF, M.Sc. Farmacología, PhD(c) Ciencias Biomédicas",
      description: "Químico Farmacéutico asistencial, candidato a PhD en Ciencias Biomédicas.",
      
      links: {
        orcid: "0000-0000-0000-0006",
        scholar: "scholar-profile-7",
        email: "suribem@unicartagena.edu.co"
      }
    },
    {
      name: "Mariana Mercado Imitola",
      role: "Estudiante Coordinadora (VII semestre)",
      specialty: "Estudiante de Química Farmacéutica",
      description: "Estudiante coordinadora del semillero FyT, cursando séptimo semestre.",
      
      links: {
        orcid: "0000-0000-0000-0007",
        scholar: "scholar-profile-8",
        email: "mmercadoi1@unicartagena.edu.co"
      }
    }
  ];

  const handleImageUpload = (index: number, imageUrl: string) => {
    setMemberImages(prev => ({ ...prev, [index]: imageUrl }));
  };

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
              <div className="relative overflow-hidden h-64">
                {memberImages[index] ? (
                  <>
                    <img 
                      src={memberImages[index]} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fyt-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <ImageUpload
                    onImageUpload={(imageUrl) => handleImageUpload(index, imageUrl)}
                    currentImage={memberImages[index] || ''}
                    placeholder={`Foto de ${member.name}`}
                    aspectRatio="square"
                    className="h-full"
                  />
                )}
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