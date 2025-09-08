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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Index />} />

          {/* Calculadoras */}
          <Route
            path="/calculator/dosage"
            element={
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6">FyT Lab Connect</h1>
                <DosageCalculator />
              </div>
            }
          />
          <Route
            path="/calculator/gfr"
            element={
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6">FyT Lab Connect</h1>
                <GFRCalculator />
              </div>
            }
          />
          <Route
            path="/calculator/bmi"
            element={
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6">FyT Lab Connect</h1>
                <BMICalculator />
              </div>
            }
          />
          <Route
            path="/calculator/bsa"
            element={
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6">FyT Lab Connect</h1>
                <BSACalculator />
              </div>
            }
          />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;