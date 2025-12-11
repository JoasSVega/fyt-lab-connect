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

// Exportar paths
export const pathInvestigacion = "/investigacion";
export const pathProyectos = "/investigacion/proyectos";
export const pathPublicaciones = "/investigacion/publicaciones";
export const pathEventos = "/investigacion/eventos";

const SobreNosotros = React.lazy(() => import("./pages/SobreNosotros"));
const Index = React.lazy(() => import("./pages/Index"));
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

import DosageCalculator from "./components/DosageCalculator";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import TitleSync from "./components/TitleSync";
import Loader from "./components/Loader";
import AccessibleH1 from "./components/AccessibleH1";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

// Componente interno que usa el contexto de transición
function AnimatedRoutes() {
  const location = useLocation();
  const { isTransitioning, signalPageReady } = useTransition();

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
      <React.Suspense fallback={null}>
        <Routes>
          {/* Investigación y Producción Académica */}
          <Route path={pathInvestigacion} element={<InvestigacionPage />} />
          <Route path={pathProyectos} element={<ProyectosPage />} />
          <Route path={pathPublicaciones} element={<PublicacionesPage />} />
          <Route path={pathEventos} element={<EventosPage />} />
          
          {/* Página principal */}
          <Route path="/" element={<Index />} />
          
          {/* Noticias y Herramientas */}
          <Route path="/noticias" element={<Noticias />} />
          
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
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfUse" element={<TermsOfUse />} />
          <Route path="/CodeOfEthics" element={<CodeOfEthics />} />
          
          {/* Calculadoras */}
          <Route
            path="/calculator/dosage"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Calculadora de Dosificación</h1>
                <DosageCalculator />
              </div>
            }
          />
          
          {/* Redirecciones */}
          <Route path="/herramientas/antropometricas" element={<Navigate to="/herramientas/antropometricos" replace />} />
          
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
    if (requestIdleCallback) {
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
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TransitionProvider>
          <ScrollToTop />
          {/* Sincroniza el título del navegador con la ruta actual */}
          <TitleSync />
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
        </TransitionProvider>
      </BrowserRouter>
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      {mounted ? <TooltipProvider>{shell}</TooltipProvider> : shell}
    </QueryClientProvider>
  );
}

export default App;


