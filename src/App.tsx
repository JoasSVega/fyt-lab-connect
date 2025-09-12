// Using standardized logo from public folder
import AnthropometricCalculatorsPage from "./pages/AnthropometricCalculatorsPage";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DosageCalculator from "./components/DosageCalculator";
import GFRCalculator from "./components/GFRCalculator";
import BMICalculator from "./components/BMICalculator";
import BSACalculator from "./components/BSACalculator";
import Navbar from "./components/Navbar";
import RenalFunctionPage from "./pages/RenalFunctionPage";
import { pathRenal } from "./pages/RenalFunctionPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Barra superior fija */}
          <Navbar />
          {/* Contenido principal: darle padding-top para no quedar debajo del navbar */}
          <main className="flex-1 bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 pt-16 min-h-screen flex flex-col items-center justify-center">
            <img src="/logo-fyt.png" alt="Logo Grupo FyT" className="h-20 w-auto mb-8" />
            <Routes>
              {/* Página principal */}
              <Route path="/" element={<Index />} />
              {/* Calculadoras */}
              <Route
                path="/calculator/dosage"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Calculadora de Dosificación</h1>
                    <DosageCalculator />
                  </div>
                }
              />
              <Route
                path="/calculator/gfr"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Calculadora de TFG</h1>
                    <GFRCalculator />
                  </div>
                }
              />
              <Route
                path="/calculator/bmi"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Calculadora de IMC</h1>
                    <BMICalculator />
                  </div>
                }
              />
              <Route
                path="/calculator/bsa"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Calculadora de Superficie Corporal</h1>
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
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};



export default App;