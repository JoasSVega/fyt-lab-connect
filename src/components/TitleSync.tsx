import { useEffect, FC } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Farmacología y Terapéutica";

function titleCase(s: string) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function computeTitle(pathname: string): string {
  const path = pathname.replace(/\/+$/, ""); // trim trailing slash
  const map: Record<string, string> = {
    "": SITE_NAME,
    "/": SITE_NAME,
    "/sobre-nosotros": `Sobre nosotros — ${SITE_NAME}`,
    "/herramientas": `Herramientas Farmacéuticas — ${SITE_NAME}`,
    "/herramientas/clinicos": `Cálculos Clínicos y Farmacéuticos — ${SITE_NAME}`,
    "/herramientas/antropometricos": `Cálculos Fisiológicos y Antropométricos — ${SITE_NAME}`,
    "/herramientas/escalas": `Escalas clínicas y validación farmacoterapéutica — ${SITE_NAME}`,
    "/investigacion": `Investigación — ${SITE_NAME}`,
    "/noticias": `Noticias — ${SITE_NAME}`,
    "/contactos": `Contactos — ${SITE_NAME}`,
    "/PrivacyPolicy": `Política de privacidad — ${SITE_NAME}`,
    "/TermsOfUse": `Términos de uso — ${SITE_NAME}`,
    "/CodeOfEthics": `Código de Ética — ${SITE_NAME}`,
  };

  if (map[path] !== undefined) return map[path];

  if (path === "" || path === "/") return SITE_NAME;

  // Fallback: derive from last segment
  const seg = decodeURIComponent(path.split("/").filter(Boolean).pop() || "");
  const normalized = titleCase(seg.replace(/[-_]+/g, " "));
  if (!normalized) return SITE_NAME;
  return `${normalized} — ${SITE_NAME}`;
}

const TitleSync: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const next = computeTitle(pathname);
    // Set title at the end of the tick to win over any in-page effects
    const id = window.setTimeout(() => {
      document.title = next;
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
};

export default TitleSync;