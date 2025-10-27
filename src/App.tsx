// Rutas de investigación
import InvestigacionPage from "./pages/InvestigacionPage";
import PublicacionesPage from "./pages/PublicacionesPage";
import ProyectosPage from "./pages/ProyectosPage";

// Exportar paths
export const pathInvestigacion = "/investigacion";
export const pathProyectos = "/investigacion/proyectos";
export const pathPublicaciones = "/investigacion/publicaciones";
//
// Using standardized logo from public folder
import AnthropometricCalculatorsPage from "./pages/AnthropometricCalculatorsPage";
import SobreNosotros from "./pages/SobreNosotros";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Index from "./pages/Index";
import Equipo from "./pages/Equipo";
import Contactos from "./pages/Contactos";
import NotFound from "./pages/NotFound";
import DosageCalculator from "./components/DosageCalculator";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import RenalFunctionPage from "./pages/RenalFunctionPage";
import { pathRenal } from "./pages/RenalFunctionPage";
import Noticias from "./pages/Noticias";
import Herramientas from "./pages/Herramientas";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CodeOfEthics from "./pages/CodeOfEthics";

const queryClient = new QueryClient();



function AnimatedRoutes() {
  const location = useLocation();
  // Carga dinámica de framer-motion para reducir el bundle inicial.
  const [FM, setFM] = useState<any>(null);
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
    <Routes location={location}>
      {/* Investigación y Producción Académica */}
      <Route path={pathInvestigacion} element={<InvestigacionPage />} />
      <Route path={pathProyectos} element={<ProyectosPage />} />
      <Route path={pathPublicaciones} element={<PublicacionesPage />} />
      {/* Página principal */}
      <Route path="/" element={<Index />} />
      {/* Noticias y Herramientas */}
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/herramientas" element={<Herramientas />} />
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
      {/* Función Renal */}
      <Route path={pathRenal} element={<RenalFunctionPage />} />
      {/* Antropometría */}
      <Route path="/herramientas/antropometricas" element={<AnthropometricCalculatorsPage />} />
      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToasterShadcn />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {/* Barra superior fija */}
          <Navbar />
          {/* Contenido principal: darle padding-top para no quedar debajo del navbar */}
          <main className="flex-1 bg-gray-50 w-full">
            <AnimatedRoutes />
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


