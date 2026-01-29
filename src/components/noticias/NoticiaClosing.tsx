import React from "react";
import { Building2, Users, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Noticia } from "@/types/noticias";

interface NoticiaClosingProps {
  noticia: Noticia;
}

/**
 * Bloque de cierre institucional para página individual de noticia
 * 
 * Contiene:
 * - Instituciones involucradas
 * - Grupos de investigación
 * - Enlaces institucionales
 * - Navegación hacia overview
 * 
 * Estilos: Color dinámico por categoría (similar a divulgación)
 */
const NoticiaClosing: React.FC<NoticiaClosingProps> = ({ noticia }) => {
  return (
    <footer className="w-full noticia-page__closing border-t-4 border-[color:var(--accent-primary,#1565C0)] mt-16 pt-12 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Instituciones involucradas */}
        {noticia.principalInstitutions && noticia.principalInstitutions.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4 font-raleway">
              <Building2 className="w-5 h-5" style={{ color: "var(--accent-primary, #1565C0)" }} />
              Instituciones Involucradas
            </h3>
            <ul className="space-y-2">
              {noticia.principalInstitutions.map((institution, idx) => (
                <li key={idx} className="flex items-start gap-3 font-inter text-gray-700">
                  <span
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "var(--accent-primary, #1565C0)" }}
                  />
                  <span>{institution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Grupos de investigación */}
        {noticia.researchGroups && noticia.researchGroups.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4 font-raleway">
              <Users className="w-5 h-5" style={{ color: "var(--accent-primary, #1565C0)" }} />
              Grupos de Investigación
            </h3>
            <ul className="space-y-2">
              {noticia.researchGroups.map((group, idx) => (
                <li key={idx} className="flex items-start gap-3 font-inter text-gray-700">
                  <span
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "var(--accent-primary, #1565C0)" }}
                  />
                  <span>{group}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Enlaces institucionales */}
        {noticia.relatedLinks && noticia.relatedLinks.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4 font-raleway">
              <LinkIcon className="w-5 h-5" style={{ color: "var(--accent-primary, #1565C0)" }} />
              Enlaces Relacionados
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              {noticia.relatedLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-250 text-sm font-inter font-medium hover:translate-y-[-2px]"
                  style={{
                    borderColor: "var(--accent-light, #BBDEFB)",
                    backgroundColor: "var(--accent-secondary, #E3F2FD)",
                    color: "var(--accent-primary, #1565C0)"
                  }}
                >
                  {link.title}
                  <LinkIcon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Separador y CTA */}
        <div className="border-t-2 border-[color:var(--accent-secondary,#E3F2FD)] pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600 font-inter">
            Volver al registro de noticias institucionales
          </p>
          <a href="/noticias" className="inline-block">
            <Button
              className="transition-all duration-250 hover:translate-y-[-2px]"
              style={{
                backgroundColor: "var(--accent-primary, #1565C0)",
                color: "white"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
            >
              ← Ver todas las noticias
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default NoticiaClosing;
