import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tools from "@/components/Tools";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingContact from "@/components/FloatingContact";
// Animaciones eliminadas

const Index = () => {
  const navigate = useNavigate();
  return (
  <div className="w-full min-h-screen overflow-x-hidden" style={{background: "linear-gradient(120deg, #e0f2ff 0%, #f8fafc 60%, #f3f4f6 100%)"}}>
      {/* Fixed Navigation */}
      <Navbar />
      {/* Main Content */}
      <main className="w-full pt-24">
        <section className="w-full mb-6">
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-800 mb-4 text-center">
            Grupo de Investigación en Farmacología y Terapéutica
          </h1>
        </section>
        {/* Hero Section (sin ScrollReveal para evitar scroll interno y problemas de visualización) */}
        <Hero />
        {/* Tarjetas principales: Equipo, Proyectos, Publicaciones (con contenido de las tarjetas inferiores) */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16">
          {/* Equipo */}
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Nuestro Equipo</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Conoce a los integrantes y colaboradores del grupo FyT.</p>
            <Button onClick={() => navigate('/equipo')} className="w-full rounded-full px-5 py-2 font-semibold shadow bg-fyt-blue text-white hover:bg-fyt-blue/90 transition">Ver Equipo</Button>
          </div>
          {/* Proyectos */}
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Proyectos</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Conoce nuestras investigaciones actuales y resultados científicos.</p>
            <Button onClick={() => navigate('/proyectos')} className="w-full rounded-full px-5 py-2 font-semibold shadow bg-fyt-purple text-white hover:bg-fyt-purple/90 transition">Ver Proyectos</Button>
          </div>
          {/* Publicaciones (usa contenido de Noticias) */}
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Publicaciones</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Mantente informado sobre nuestras actividades y logros recientes.</p>
            <Button onClick={() => navigate('/noticias')} className="w-full rounded-full px-5 py-2 font-semibold shadow bg-fyt-green text-white hover:bg-fyt-green/90 transition">Ver Noticias</Button>
          </div>
        </section>
        {/* About Section */}
        <About />
        {/* Pharmaceutical Tools Section removida: ahora solo en la página Herramientas */}
      </main>
      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
};

export default Index;
