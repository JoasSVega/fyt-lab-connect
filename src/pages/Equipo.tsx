import Team from "@/components/Team";
import Navbar from "../components/Navbar";
import { lazy, Suspense } from "react";

// Carga perezosa del botón flotante de contacto para reducir el bundle inicial
const FloatingContact = lazy(() => import("@/components/FloatingContact"));

const Equipo = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-24">
      {/* Título principal eliminado para evitar duplicado, el componente Team lo incluye */}
      <Team />
    </main>
    <Suspense fallback={null}>
      <FloatingContact />
    </Suspense>
  </div>
);

export default Equipo;
