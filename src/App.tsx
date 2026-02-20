import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { TransitionProvider, useTransition } from "./providers/TransitionProvider";

// Rutas de investigación (carga diferida)
const InvestigacionPage = React.lazy(() => import("./pages/InvestigacionPage"));
const PublicacionesPage = React.lazy(() => import("./pages/PublicacionesPage"));
const ProyectosPage = React.lazy(() => import("./pages/ProyectosPage"));
const EventosPage = React.lazy(() => import("./pages/EventosPage"));
const FormacionPage = React.lazy(() => import("./pages/FormacionPage"));
const ContenidosPage = React.lazy(() => import("./pages/ContenidosPage"));

// Rutas de divulgación (carga diferida)
const DivulgacionPage = React.lazy(() => import("./pages/DivulgacionPage"));
const DivulgacionPostPage = React.lazy(() => import("./pages/DivulgacionPostPage"));

// Rutas de noticias (carga diferida)
const NoticiaPage = React.lazy(() => import("./pages/NoticiaPage"));

// Exportar paths
export const pathInvestigacion = "/investigacion";
export const pathProyectos = "/investigacion/proyectos";
export const pathPublicaciones = "/investigacion/publicaciones";
export const pathEventos = "/investigacion/eventos";
export const pathFormacion = "/investigacion/formacion";
export const pathDivulgacionCientifica = "/investigacion/contenido-digital";
export const pathDivulgacion = "/divulgacion";
export const pathContactos = "/contactos";

const SobreNosotros = React.lazy(() => import("./pages/SobreNosotros"));
import Index from "./pages/Index";
const Equipo = React.lazy(() => import("./pages/Equipo"));
const Contactos = React.lazy(() => import("./pages/Contactos"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Noticias = React.lazy(() => import("./pages/Noticias"));
const Herramientas = React.lazy(() => import("./pages/Herramientas"));

// Nuevas páginas de la plataforma de herramientas
const ToolsIndex = React.lazy(() => import("./pages/tools/IndexTools"));
const ToolsClinicos = React.lazy(() => import("./pages/tools/Clinicos"));
const ToolsAntropometricos = React.lazy(() => import("./pages/tools/Antropometricos"));
const ToolsAvanzados = React.lazy(() => import("./pages/tools/Avanzados"));
const ToolsEscalas = React.lazy(() => import("./pages/tools/Escalas"));

const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = React.lazy(() => import("./pages/TermsOfUse"));
const CodeOfEthics = React.lazy(() => import("./pages/CodeOfEthics"));

// Componentes core lazy loaded
const Navbar = React.lazy(() => import("./components/Navbar"));
const ScrollToTop = React.lazy(() => import("./components/ScrollToTop"));
const Footer = React.lazy(() => import("./components/Footer"));
const TitleSync = React.lazy(() => import("./components/TitleSync"));
const AccessibleH1 = React.lazy(() => import("./components/AccessibleH1"));
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));

// TrailingSlashNormalizer - normaliza URLs con trailing slash
import TrailingSlashNormalizer from "./components/TrailingSlashNormalizer";

import Loader from "./components/Loader";
import TopLoader from "./components/loaders/TopLoader";
import PageLoader from "./components/loaders/PageLoader";
import { useTopLoader } from "./hooks/useTopLoader";

const queryClient = new QueryClient();

// Componente interno que usa el contexto de transición
function AnimatedRoutes() {
  const location = useLocation();
  const { isTransitioning, signalPageReady } = useTransition();
  const { isLoading: isTopLoading } = useTopLoader();

  // Fallback: si la página no usa usePageReady, señalamos listo tras el render.
  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) signalPageReady();
    };
    requestAnimationFrame(() => requestAnimationFrame(done));
    return () => { cancelled = true; };
  }, [location.pathname, signalPageReady]);

  return (
    <>
      {isTransitioning && <Loader />}
      <TopLoader isLoading={isTopLoading} color="#8b5cf6" />
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
        {/* Investigación y Producción Académica */}
          <Route path={pathInvestigacion} element={<InvestigacionPage />} />
          <Route path={pathProyectos} element={<ProyectosPage />} />
          <Route path={pathPublicaciones} element={<PublicacionesPage />} />
          <Route path={pathEventos} element={<EventosPage />} />
          <Route path={pathFormacion} element={<FormacionPage />} />
          <Route path={pathDivulgacionCientifica} element={<ContenidosPage />} />
          
          {/* Página principal */}
          <Route path="/" element={<Index />} />
          
          {/* Noticias y Herramientas */}
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:slug" element={<NoticiaPage />} />
          
          {/* Divulgación */}
          <Route path="/divulgacion" element={<DivulgacionPage />} />
          <Route path="/divulgacion/:slug" element={<DivulgacionPostPage />} />
          
          {/* Nueva arquitectura de Herramientas */}
          <Route path="/herramientas" element={<ToolsIndex />} />
          <Route path="/herramientas/clinicos" element={<ToolsClinicos />} />
          <Route path="/herramientas/antropometricos" element={<ToolsAntropometricos />} />
          <Route path="/herramientas/avanzados" element={<ToolsAvanzados />} />
          <Route path="/herramientas/escalas" element={<ToolsEscalas />} />
          
          {/* Sobre nosotros y contacto */}
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/equipo" element={<Equipo />} />
          
          {/* Páginas legales */}
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-uso" element={<TermsOfUse />} />
          <Route path="/codigo-etica" element={<CodeOfEthics />} />
          
          {/* Redirecciones (301 redirects para SEO) */}
          <Route path="/herramientas/antropometricas" element={<Navigate to="/herramientas/antropometricos" replace />} />
          
          {/* Redirects para URLs legales antiguas (evitar 404 desde sitemap antiguo) */}
          <Route path="/PrivacyPolicy" element={<Navigate to="/politica-privacidad" replace />} />
          <Route path="/TermsOfUse" element={<Navigate to="/terminos-uso" replace />} />
          <Route path="/CodeOfEthics" element={<Navigate to="/codigo-etica" replace />} />
          <Route path="/investigacion/contenidos" element={<Navigate to="/investigacion/contenido-digital" replace />} />
          <Route path="/investigacion/divulgacion-cientifica" element={<Navigate to="/investigacion/contenido-digital" replace />} />
          
          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

const App: React.FC = () => {
  // Evita posibles discrepancias en ciertos hosts de preview que ejecutan React en modo prod durante dev.
  // Retrasamos la inserción del TooltipProvider hasta el montaje en el cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // La lógica de loader inicial y bloqueo de scroll ahora está centralizada
  // en TransitionProvider; no se requiere gestión local aquí.

  // Aplica automáticamente la clase de mejora de legibilidad a botones con texto blanco y fondo sólido.
  // Optimized: debounced observer to reduce performance impact
  useEffect(() => {
    const applyEnhancement = () => {
      const candidates = Array.from(document.querySelectorAll('button.text-white, a.text-white, [role="button"].text-white')) as HTMLElement[];
      candidates.forEach(el => {
        if (el.classList.contains('btn-text-enhanced')) return;
        const cls = el.className;
        // Detectar clases de fondo sólidas generadas por Tailwind (bg-*) excluyendo bg-transparent
        const hasBgClass = /(^|\s)bg-[^\s]+/.test(cls) && !/(^|\s)bg-transparent(\s|$)/.test(cls);
        // Detectar uso de bg arbitrario como bg-[#9333ea] (Tailwind JIT genera una clase con ese patrón)
        const hasArbitraryBg = /bg-\[/.test(cls);
        // O fondo inline style distinto de transparente
        const inlineBg = el.style.backgroundColor && el.style.backgroundColor !== 'transparent';
        if (hasBgClass || hasArbitraryBg || inlineBg) {
          el.classList.add('btn-text-enhanced');
          // Añadir clase de interacción corporativa unificada
          if (!el.classList.contains('btn-solid-interactive')) {
            el.classList.add('btn-solid-interactive');
          }
        }
      });
    };
    
    // Primera aplicación diferida para no bloquear FCP
    // Safari: polyfill de requestIdleCallback cargado en index.html
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(applyEnhancement);
    } else {
      setTimeout(applyEnhancement, 100);
    }
    
    // Observa mutaciones con debounce para reducir overhead
    let timeoutId: number | null = null;
    const debouncedApply = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(applyEnhancement, 150);
    };
    
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.addedNodes.length) {
          debouncedApply();
          break; // Solo llamar una vez por batch
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const shell = (
    <>
      <ToasterShadcn />
      <Sonner />
      <TransitionProvider>
        <React.Suspense fallback={null}>
          {/* Normalizar trailing slashes ANTES de cualquier otra lógica */}
          <TrailingSlashNormalizer />
          <ScrollToTop />
          {/* TitleSync deshabilitado: conflicto con Seo.tsx que gestiona títulos por página */}
          {/* <TitleSync /> */}
          {/* Barra superior fija */}
          <Navbar />
          {/* Contenido principal: darle padding-top para no quedar debajo del navbar */}
          <main className="bg-gray-50 w-full">
            {/* Provide a guaranteed H1 for a11y without impacting layout */}
            <AccessibleH1 />
            <ErrorBoundary>
              <AnimatedRoutes />
            </ErrorBoundary>
          </main>
          <Footer />
        </React.Suspense>
      </TransitionProvider>
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      {mounted ? <TooltipProvider>{shell}</TooltipProvider> : shell}
    </QueryClientProvider>
  );
}

export default App;
