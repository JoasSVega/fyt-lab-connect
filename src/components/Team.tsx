import React, { useState } from "react";
import { ExternalLink, Mail, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";
import { CardReveal } from "./animations/CardReveal";
import { FadeInUp } from "./animations/FadeInUp";
import { ButtonReveal } from "./animations/ButtonReveal";
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


  return (
    <section id="equipo" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header eliminado para evitar duplicidad de título principal. */}

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <CardReveal key={member.name}>
                <Card className="overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 group">
                  {/* Imagen fija o avatar por defecto (puedes poner un logo o dejar vacío) */}
                  <div className="relative overflow-hidden h-64 bg-gradient-hero flex items-center justify-center">
                    {/* Aquí podrías poner un logo fijo si lo deseas */}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <FadeInUp>
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-fyt-dark mb-1">{member.name}</h3>
                        <p className="text-fyt-purple font-medium text-sm mb-1">{member.role}</p>
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                          <GraduationCap className="h-4 w-4" />
                          <span>{member.specialty}</span>
                        </div>
                      </div>
                    </FadeInUp>
                    <FadeInUp delay={0.1}>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {member.description}
                      </p>
                    </FadeInUp>
                    {/* Links */}
                    <ButtonReveal delay={0.15}>
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs border-fyt-red/20 hover:bg-fyt-red hover:text-white"
                          onClick={() => window.open(`mailto:${member.links.email}`, '_blank')}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Contactar
                        </Button>
                      </div>
                    </ButtonReveal>
                  </div>
                </Card>
              </CardReveal>
            ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <CardReveal>
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-hero text-white shadow-large">
              <FadeInUp>
                  <h3 className="text-2xl font-semibold mb-4">¿Te interesa unirte a nuestro grupo de investigación?</h3>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <p className="mb-6 text-white/90">
                  Si eres estudiante, profesional o investigador interesado en formar parte 
                  de nuestro equipo, te invitamos a contactarnos.
                </p>
              </FadeInUp>
              <ButtonReveal delay={0.15}>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white text-fyt-dark hover:bg-fyt-red hover:text-white transition-colors duration-200 shadow-md border border-fyt-red/30"
                  >
                    <a
                      href="mailto:grupoinvestigacion@gmail.com?subject=Unirse%20al%20grupo%20de%20investigaci%C3%B3n"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contactar
                    </a>
                  </Button>
              </ButtonReveal>
            </Card>
          </CardReveal>
        </div>
      </div>
    </section>
  );
};

export default Team;