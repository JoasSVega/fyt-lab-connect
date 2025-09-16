import Contact from "@/components/Contact";
import Navbar from "../components/Navbar";
import FloatingContact from "@/components/FloatingContact";
// import ScrollReveal from "@/components/ScrollReveal";

const Contactos = () => (
  <div className="w-full bg-background overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-16">
      {/* Título principal eliminado para evitar duplicado, el componente Contact lo incluye */}
      <Contact />
      {/* ...existing code... */}
    </main>
  </div>
);

export default Contactos;
