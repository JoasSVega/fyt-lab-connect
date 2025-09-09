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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-16 bg-gray-50 min-h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Página principal</h1>
                    <Index />
                  </div>
                }
              />
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
              <Route
                path="/consultor"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Consultor Farmacológico</h1>
                    <p className="text-gray-600">Página en construcción...</p>
                  </div>
                }
              />
              <Route
                path="/comparador"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <h1 className="text-3xl font-bold mb-6">Comparador de Fármacos</h1>
                    <p className="text-gray-600">Página en construcción...</p>
                  </div>
                }
              />
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen p-8">
                    <NotFound />
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;