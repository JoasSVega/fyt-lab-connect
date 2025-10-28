import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

const Team = ({ compact = false }: { compact?: boolean }) => {
  // Imágenes disponibles en /public/images/equipo/
  const imageFiles = [
    "Antistio-Alviz.png",
    "Yaneth-Garcia.png",
    "Shirley-Cavadia.png",
    "Julian-Martinez.png",
    "Roger-Caraballo.png",
    "Luis-Utria.png",
    "Sergio-Uribe.png",
    "Mariana-Mercado.png"
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
    // Extraer nombre y primer apellido
    const nameParts = normName.split(" ");
    const nameAndSurname = nameParts.length > 1 ? `${nameParts[0]}-${nameParts[1]}` : nameParts[0];
    let match = null;
    for (const file of imageFiles) {
      const base = file.replace(/\.(png|webp)$/i, "");
      const normBase = normalize(base.replace(/-/g, " "));
      // Coincidencia exacta con nombre y primer apellido
      if (normBase === nameAndSurname.replace(/-/g, " ")) {
        match = `/images/equipo/${file}`;
        break;
      }
      // Coincidencia parcial: nombre o apellido incluido
      if (!match && (normName.includes(normBase) || normBase.includes(normName))) {
        match = `/images/equipo/${file}`;
      }
    }
    return match;
  }

  // Placeholder con iniciales
  // Devuelve las iniciales (máx 2 letras)
  function getInitials(name) {
    const words = name.split(" ").filter((w) => w.length > 0);
    return (words[0]?.[0] || "").toUpperCase() + (words[1]?.[0] || "").toUpperCase();
  }
  const teamMembers = [
    {
      name: "Antistio Alviz",
      role: "Director del grupo FyT",
      specialty: "QF, MSc. Farmacología, PhD. Ciencias Biomédicas",
      description: "Docente de planta y Director del programa de Química Farmacéutica.",
      
      links: {
        orcid: "0000-0000-0000-0000",
        scholar: "scholar-profile",
        email: "aalviza@unicartagena.edu.co"
      }
    },
    {
      name: "Yaneth García",
      role: "Coordinadora de semillero del grupo FyT",
      specialty: "QF, esp. en Administración Educativa",
      description: "Docente de planta.",
      
      links: {
        orcid: "0000-0000-0000-0001",
        scholar: "scholar-profile-2",
        email: "ygarciam1@unicartagena.edu.co"
      }
    },
    {
      name: "Mariana Mercado",
      role: "Estudiante Coordinadora del grupo FyT",
      specialty: "Estudiante de Química Farmacéutica",
      description: "Estudiante de pregrado.",
      
      links: {
        orcid: "0000-0000-0000-0007",
        scholar: "scholar-profile-8",
        email: "mmercadoi1@unicartagena.edu.co"
      }
    },
    {
      name: "Shirley Cavadia",
      role: "Líder de linea de investigación en Atención Farmacéutica y Farmacia Asistencial",
      specialty: "QF, MSc. Farmacia Clínica, esp. Gestión administartiva de Servicios Farmacéuticos",
      description: "Docente de Planta y Jefe del departamento académico.",
      
      links: {
        orcid: "0000-0000-0000-0002",
        scholar: "scholar-profile-3",
        email: "scavadiap@unicartagena.edu.co"
      }
    },
    {
      name: "Julian Martinez",
      role: "Líder de linea de investigación en Farmacología y Terapéutica",
      specialty: "QF, MSc. Farmacología",
      description: "Docente de planta.",
      
      links: {
        orcid: "0000-0000-0000-0003",
        scholar: "scholar-profile-4",
        email: "jmartinezz@unicartagena.edu.co"
      }
    },
    {
      name: "Roger Caraballo",
      role: "Líder de linea de investigación en Farmacoecoeconomía",
      specialty: "QF, MSc. Farmacología",
      description: "Docente de planta y subgerente del Hospital Universitario del Caribe.",
      
      links: {
        orcid: "0000-0000-0000-0004",
        scholar: "scholar-profile-5",
        email: "rcaraballom@unicartagena.edu.co"
      }
    },
    {
      name: "Luis Utria",
      role: "Líder de linea de investigación en Farmacovigilancia y Toxicología",
      specialty: "QF, M.Sc. Farmacología",
      description: "Docente de cátedra.",
      
      links: {
        orcid: "0000-0000-0000-0005",
        scholar: "scholar-profile-6",
        email: "lutriaa@unicartagena.edu.co"
      }
    },
    {
      name: "Sergio Uribe",
      role: "Líder de linea de investigación en Farmacoepidemiología y PROA",
      specialty: "QF, MSc. Farmacología, PhD(c) Ciencias Biomédicas",
      description: "Docente de Catedra y Químico Farmacéutico asistencial.",
      
      links: {
        orcid: "0000-0000-0000-0006",
        scholar: "scholar-profile-7",
        email: "suribem@unicartagena.edu.co"
      }
    },
    
  ];


  const wrapperClass = `${compact ? 'py-12 min-h-[0]' : 'py-20 min-h-[80vh]'} bg-[#f8fafc]`;

  return (
  <section id="equipo" className={wrapperClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => {
            const imgSrc = getImageForMember(member.name);
            if (!imgSrc) {
              // Imagen no encontrada para este miembro; se omite el console.log
              // Se mantiene el placeholder con iniciales para evitar errores de render.
              // (Limpieza: eliminación de logs de depuración para mejorar rendimiento y limpiar la salida)
            }
            return (
              <Card
                key={member.name}
                className="flex flex-col items-center justify-between p-7 rounded-2xl shadow-2xl border-2 border-[#9B59B6]/30 bg-white/90 min-h-[420px] hover:scale-[1.03] transition-transform duration-300 animate-fade-in"
              >
                {/* Foto o placeholder, sin tarjeta extra */}
                <>
                  {imgSrc ? (
                    (() => {
                      const base = imgSrc.replace(/\.(png|jpg|jpeg|webp)$/i, '');
                      const avifSet = `${base}-128.avif 128w, ${base}-256.avif 256w, ${base}-400.avif 400w, ${base}-800.avif 800w, ${base}-1200.avif 1200w`;
                      const webpSet = `${base}-128.webp 128w, ${base}-256.webp 256w, ${base}-400.webp 400w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`;
                      const sizes = "260px"; // fuerza una variante ligeramente mayor para más nitidez en desktop
                      return (
                        <picture>
                          <source type="image/avif" srcSet={avifSet} sizes={sizes} />
                          <source type="image/webp" srcSet={webpSet} sizes={sizes} />
                          <img
                            src={imgSrc}
                            alt={`Retrato de ${member.name}, ${member.role}`}
                            className="mb-5 shadow-lg border-2 border-[#3BB9FF]/30"
                            style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 16 }}
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                      );
                    })()
                  ) : (
                    <div className="mb-5 flex items-center justify-center bg-[#f1f5f9] border-2 border-[#3BB9FF]/30 shadow-lg" style={{ width: 220, height: 220, borderRadius: 16 }}>
                      <span className="text-5xl font-bold text-fyt-blue select-none">{getInitials(member.name)}</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center w-full">
                    <h3 className="text-lg font-bold text-fyt-blue mb-1 text-center">{member.name}</h3>
                    <p className="text-sm text-fyt-purple font-semibold mb-1 text-center">{member.role}</p>
                    {member.specialty && (
                      <p className="text-sm text-[#3BB9FF] font-medium mb-1 text-center">{member.specialty}</p>
                    )}
                    {member.description && (
                      <p className="text-xs text-[#334155] mb-4 text-center max-w-xs">{member.description}</p>
                    )}
                    <div className="w-full flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="group rounded-lg border-2 border-[#FF4C4C] bg-white text-[#FF4C4C] hover:bg-[#FF4C4C] hover:text-white px-6 py-2 font-medium shadow transition-colors"
                          onClick={() => window.open(`mailto:${member.links.email}`, '_blank')}
                        >
                          <Mail className="w-6 h-6 mr-2 text-[#FF4C4C] group-hover:text-white transition-colors" aria-label="Contactar" />
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
              className="group rounded-lg border-2 border-fyt-blue text-fyt-blue bg-white hover:bg-fyt-blue hover:text-white px-8 py-3 font-medium shadow-lg transition-colors"
            >
              <a
                href="mailto:grupoinvestigacion@gmail.com?subject=Unirse%20al%20grupo%20de%20investigaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contáctanos
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