import React, { useState } from "react";
import { ExternalLink, Mail, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Antistio Alviz Amador",
      role: "Director del grupo",
      specialty: "QF, M.Sc. Farmacología, PhD en Ciencias Biomédicas",
      description: "Docente y Director del programa de Química Farmacéutica, líder del grupo de investigación FyT.",
      
      links: {
        orcid: "0000-0000-0000-0000",
        scholar: "scholar-profile",
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
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
        email: "farmacologiayterapeutica.gi@gmail.com"
      }
    }
  ];


  return (
    <section id="equipo" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              {/* Imagen fija o avatar por defecto (puedes poner un logo o dejar vacío) */}
              <div className="relative overflow-hidden h-64 bg-gradient-hero flex items-center justify-center">
                {/* Aquí podrías poner un logo fijo si lo deseas */}
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
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-fyt-red/20 hover:bg-fyt-red hover:text-white"
                    onClick={() => window.open(`mailto:${member.links.email.replace(/\s+/g, '')}`, '_blank')}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Contactar
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