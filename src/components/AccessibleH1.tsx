import * as React from "react";
import { useLocation } from "react-router-dom";

function titleFromPath(pathname: string): string {
  const map: Record<string, string> = {
    "/": "Inicio",
    "/sobre-nosotros": "Sobre nosotros",
    "/herramientas": "Herramientas",
    "/herramientas/clinicos": "Cálculos Clínicos y Farmacéuticos",
    "/herramientas/antropometricos": "Cálculos Fisiológicos y Antropométricos",
    "/herramientas/avanzados": "Herramientas Avanzadas",
    "/herramientas/escalas": "Escalas clínicas",
    "/investigacion": "Investigación",
    "/investigacion/proyectos": "Proyectos",
    "/investigacion/publicaciones": "Publicaciones",
    "/noticias": "Noticias",
    "/contactos": "Contactos",
    "/equipo": "Equipo",
    "/PrivacyPolicy": "Política de privacidad",
    "/TermsOfUse": "Términos de uso",
    "/CodeOfEthics": "Código de Ética",
  };
  return map[pathname] || document.title || "Grupo FyT";
}

const AccessibleH1: React.FC = () => {
  const { pathname } = useLocation();
  const [label, setLabel] = React.useState<string>("");

  React.useEffect(() => {
    setLabel(titleFromPath(pathname));
  }, [pathname]);

  return (
    <h1 className="sr-only" id="page-top-heading">{label || "Grupo FyT"}</h1>
  );
};

export default AccessibleH1;
