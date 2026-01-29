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
 */
const NoticiaClosing: React.FC<NoticiaClosingProps> = ({ noticia }) => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 mt-16 pt-12 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Instituciones involucradas */}
        {noticia.principalInstitutions && noticia.principalInstitutions.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4 font-raleway">
              <Building2 className="w-5 h-5 text-blue-600" />
              Instituciones Involucradas
            </h3>
            <ul className="space-y-2">
              {noticia.principalInstitutions.map((institution, idx) => (
                <li key={idx} className="text-slate-700 flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span className="font-inter">{institution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Grupos de investigación */}
        {noticia.researchGroups && noticia.researchGroups.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4 font-raleway">
              <Users className="w-5 h-5 text-purple-600" />
              Grupos de Investigación
            </h3>
            <ul className="space-y-2">
              {noticia.researchGroups.map((group, idx) => (
                <li key={idx} className="text-slate-700 flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span className="font-inter">{group}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Enlaces institucionales */}
        {noticia.relatedLinks && noticia.relatedLinks.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4 font-raleway">
              <LinkIcon className="w-5 h-5 text-teal-600" />
              Enlaces Relacionados
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              {noticia.relatedLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-teal-300 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-inter"
                >
                  {link.title}
                  <LinkIcon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Separador y CTA */}
        <div className="border-t border-slate-300 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-600 font-inter">
            Volver al registro de noticias institucionales
          </p>
          <a href="/noticias" className="inline-block">
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              ← Ver todas las noticias
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default NoticiaClosing;
