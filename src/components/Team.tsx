import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

const Team = () => {
  // Imágenes disponibles en /public/images/equipo/
  const imageFiles = [
    "Sergio Uribe.png",
    "Roger Caraballo.png",
    "Mariana mercado.png",
    "Antistio Alviz.png",
    "Luis Utria.png",
    "Julian Martinez.png",
    "Yaneth Garcia.png"
  ];

  // Función para normalizar nombres (sin tildes, minúsculas, sin espacios extras)
  // Normaliza nombres para comparación flexible
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Buscar imagen para el miembro
  // 1. Prioriza coincidencia exacta (nombre completo normalizado)
  // 2. Si no hay, busca coincidencia parcial (archivo incluido en nombre)
  // 3. Si no hay coincidencia, retorna null
  function getImageForMember(name) {
    const normName = normalize(name);
    let exactMatch = null;
    let partialMatch = null;
    for (const file of imageFiles) {
      const base = file.replace(/\.(png|webp)$/i, "");
      const normBase = normalize(base);
      // Coincidencia exacta
      if (normBase === normName) {
        exactMatch = `/images/equipo/${file}`;
        break;
      }
      // Coincidencia parcial flexible: nombre del archivo está en el nombre del miembro o viceversa
      if (!partialMatch && (normName.includes(normBase) || normBase.includes(normName))) {
        partialMatch = `/images/equipo/${file}`;
      }
    }
    return exactMatch || partialMatch || null;
  }

  // Placeholder con iniciales
  // Devuelve las iniciales (máx 2 letras)
  function getInitials(name) {
    const words = name.split(" ").filter((w) => w.length > 0);
    return (words[0]?.[0] || "").toUpperCase() + (words[1]?.[0] || "").toUpperCase();
  }
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
  <section id="equipo" className="py-20 min-h-[80vh] bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => {
            const imgSrc = getImageForMember(member.name);
            if (!imgSrc) {
              console.log(`Sin foto: ${member.name}`);
            }
            return (
              <Card
                key={member.name}
                className="flex flex-col items-center justify-between p-7 rounded-2xl shadow-2xl border-2 border-[#9B59B6]/30 bg-white/90 min-h-[420px] hover:scale-[1.03] transition-transform duration-300 animate-fade-in"
              >
                {/* Foto o placeholder, sin tarjeta extra */}
                <>
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={`Retrato de ${member.name}, ${member.role}`}
                      className="mb-5 shadow-lg border-2 border-[#3BB9FF]/30"
                      style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 16 }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="mb-5 flex items-center justify-center bg-[#f1f5f9] border-2 border-[#3BB9FF]/30 shadow-lg" style={{ width: 220, height: 220, borderRadius: 16 }}>
                      <span className="text-5xl font-bold text-fyt-blue select-none">{getInitials(member.name)}</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center w-full">
                    <h3 className="text-lg font-bold text-fyt-blue mb-1 text-center">{member.name}</h3>
                    <p className="text-sm text-fyt-purple font-semibold mb-1 text-center">{member.role}</p>
                    {member.description && (
                      <p className="text-xs text-[#334155] mb-4 text-center max-w-xs">{member.description}</p>
                    )}
                    <div className="w-full flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-2 border-[#FF4C4C]/40 text-fyt-blue hover:bg-[#FF4C4C]/10 px-6 py-2 font-medium shadow"
                        onClick={() => window.open(`mailto:${member.links.email}`, '_blank')}
                      >
                        <Mail className="w-6 h-6 mr-2 text-fyt-blue" aria-label="Contactar" />
                        Contactar
                      </Button>
                    </div>
                  </div>
                </>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-7 bg-white text-[#1e293b] shadow-2xl border-2 border-[#3BB9FF]/30 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 drop-shadow-lg">
¿Te interesa unirte a nuestro grupo de investigación?</h3>
            <p className="mb-6 text-[#334155]">
              Si eres estudiante, profesional o investigador interesado en formar parte 
              de nuestro equipo, te invitamos a contactarnos.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-2 border-fyt-blue text-fyt-blue hover:bg-fyt-blue hover:text-white px-8 py-3 font-medium shadow-lg"
            >
              <a
                href="mailto:grupoinvestigacion@gmail.com?subject=Unirse%20al%20grupo%20de%20investigaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar
              </a>
            </Button>
          </Card>
        </div>
      {/* Animaciones CSS */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(.42,0,.58,1); }
      `}</style>
      </div>
    </section>
  );
};

export default Team;