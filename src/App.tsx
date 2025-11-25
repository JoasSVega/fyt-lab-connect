import React, { useEffect, useState } from "react";
// Rutas de investigación (carga diferida)
const InvestigacionPage = React.lazy(() => import("./pages/InvestigacionPage"));
const PublicacionesPage = React.lazy(() => import("./pages/PublicacionesPage"));
const ProyectosPage = React.lazy(() => import("./pages/ProyectosPage"));

// Exportar paths
export const pathInvestigacion = "/investigacion";
export const pathProyectos = "/investigacion/proyectos";
export const pathPublicaciones = "/investigacion/publicaciones";
//
// Using standardized logo from public folder
// Página antigua de antropometría eliminada; se redirige a la nueva plataforma
const SobreNosotros = React.lazy(() => import("./pages/SobreNosotros"));
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

const Index = React.lazy(() => import("./pages/Index"));
const Equipo = React.lazy(() => import("./pages/Equipo"));
const Contactos = React.lazy(() => import("./pages/Contactos"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
import DosageCalculator from "./components/DosageCalculator";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
const Noticias = React.lazy(() => import("./pages/Noticias"));
const Herramientas = React.lazy(() => import("./pages/Herramientas"));
// Nuevas páginas de la plataforma de herramientas
const ToolsIndex = React.lazy(() => import("./pages/tools/IndexTools"));
const ToolsClinicos = React.lazy(() => import("./pages/tools/Clinicos"));
const ToolsAntropometricos = React.lazy(() => import("./pages/tools/Antropometricos"));
const ToolsAvanzados = React.lazy(() => import("./pages/tools/Avanzados"));
const ToolsEscalas = React.lazy(() => import("./pages/tools/Escalas"));
import Footer from "./components/Footer";
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = React.lazy(() => import("./pages/TermsOfUse"));
const CodeOfEthics = React.lazy(() => import("./pages/CodeOfEthics"));
import TitleSync from "./components/TitleSync";

const queryClient = new QueryClient();



type FramerMotionModule = typeof import('framer-motion');

function AnimatedRoutes() {
  const location = useLocation();
  // Carga dinámica de framer-motion para reducir el bundle inicial.
  const [FM, setFM] = useState<FramerMotionModule | null>(null);
  useEffect(() => {
    let mounted = true;
    import('framer-motion')
      .then((mod) => {
        if (mounted) setFM(mod);
      })
      .catch(() => {
        // Si la carga falla, se continúa sin animaciones.
      });
    return () => {
      mounted = false;
    };
  }, []);

  const routesJSX = (
    <React.Suspense fallback={<div className="w-full pt-16 pb-6 px-2 sm:px-4 lg:px-8 text-sm text-slate-600">Cargando…</div>}>
    <Routes location={location}>
      {/* Investigación y Producción Académica */}
      <Route path={pathInvestigacion} element={<InvestigacionPage />} />
      <Route path={pathProyectos} element={<ProyectosPage />} />
      <Route path={pathPublicaciones} element={<PublicacionesPage />} />
      {/* Página principal */}
      <Route path="/" element={<Index />} />
      {/* Noticias y Herramientas */}
      <Route path="/noticias" element={<Noticias />} />
  {/* Nueva arquitectura de Herramientas: */}
  <Route path="/herramientas" element={<ToolsIndex />} />
  <Route path="/herramientas/clinicos" element={<ToolsClinicos />} />
  <Route path="/herramientas/antropometricos" element={<ToolsAntropometricos />} />
  <Route path="/herramientas/avanzados" element={<ToolsAvanzados />} />
  <Route path="/herramientas/escalas" element={<ToolsEscalas />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/contactos" element={<Contactos />} />
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
      {/* Rutas de calculadoras eliminadas: BMI, BSA */}
  {/* Función Renal eliminada: calculadora integrada en Herramientas / Clínicos */}
  {/* Antropometría (ruta antigua -> redirección) */}
  <Route path="/herramientas/antropometricas" element={<Navigate to="/herramientas/antropometricos" replace />} />
      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </React.Suspense>
  );

  // Si framer-motion aún no carga, renderizamos el contenido sin animación.
  if (!FM) {
    return <div className="w-full pt-16 pb-6 px-2 sm:px-4 lg:px-8">{routesJSX}</div>;
  }

  // framer-motion cargado: usamos AnimatePresence y motion desde FM
  return (
    <FM.AnimatePresence mode="wait" initial={false}>
      <FM.motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="w-full pt-16 pb-6 px-2 sm:px-4 lg:px-8"
      >
        {routesJSX}
      </FM.motion.div>
    </FM.AnimatePresence>
  );
}

const App: React.FC = () => {
  // Evita posibles discrepancias en ciertos hosts de preview que ejecutan React en modo prod durante dev.
  // Retrasamos la inserción del TooltipProvider hasta el montaje en el cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Aplica automáticamente la clase de mejora de legibilidad a botones con texto blanco y fondo sólido.
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
        }
      });
    };
    // Primera aplicación
    applyEnhancement();
    // Observa mutaciones para aplicar a elementos agregados dinámicamente
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.addedNodes.length) {
          applyEnhancement();
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const shell = (
    <>
      <ToasterShadcn />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        {/* Sincroniza el título del navegador con la ruta actual */}
        <TitleSync />
        {/* Barra superior fija */}
        <Navbar />
        {/* Contenido principal: darle padding-top para no quedar debajo del navbar */}
        <main className="flex-1 bg-gray-50 w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
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


