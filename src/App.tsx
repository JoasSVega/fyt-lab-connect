//
// Using standardized logo from public folder
import AnthropometricCalculatorsPage from "./pages/AnthropometricCalculatorsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import Equipo from "./pages/Equipo";
import Contactos from "./pages/Contactos";
import NotFound from "./pages/NotFound";
import DosageCalculator from "./components/DosageCalculator";
import GFRCalculator from "./components/GFRCalculator";
import BMICalculator from "./components/BMICalculator";
import BSACalculator from "./components/BSACalculator";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import RenalFunctionPage from "./pages/RenalFunctionPage";
import { pathRenal } from "./pages/RenalFunctionPage";
import Proyectos from "./pages/Proyectos";
import Noticias from "./pages/Noticias";
import Herramientas from "./pages/Herramientas";
import Footer from "./components/Footer";

const queryClient = new QueryClient();


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location.pathname} className="w-full flex flex-col items-center justify-center pt-16 pb-6 px-2 sm:px-4 lg:px-8">
        <img src="/logo-fyt.png" alt="Logo Grupo FyT" className="h-16 sm:h-20 w-auto mb-4 sm:mb-8" />
        <Routes location={location}>
          {/* Página principal */}

          <Route path="/" element={<Index />} />
          {/* Proyectos, Noticias y Herramientas */}
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/herramientas" element={<Herramientas />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/contactos" element={<Contactos />} />
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
          <Route
            path="/calculator/bmi"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Calculadora de IMC</h1>
                <BMICalculator />
              </div>
            }
          />
          <Route
            path="/calculator/bsa"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
                <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center">Calculadora de Superficie Corporal</h1>
                <BSACalculator />
              </div>
            }
          />
          {/* Función Renal */}
          <Route path={pathRenal} element={<RenalFunctionPage />} />
          {/* Antropometría */}
          <Route path="/herramientas/antropometricas" element={<AnthropometricCalculatorsPage />} />
          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AnimatePresence>
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
          <main className="flex-1 bg-gray-50 w-full min-h-screen">
            <AnimatedRoutes />
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


