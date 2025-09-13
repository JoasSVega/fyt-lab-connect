import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tools from "@/components/Tools";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingContact from "@/components/FloatingContact";

const Index = () => {
  return (
    <div className="w-full bg-background overflow-x-hidden">
      {/* Fixed Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero />

        {/* Tarjetas principales: Nuestro Equipo, Proyectos, Noticias */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16">
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Nuestro Equipo</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Conoce a los integrantes y colaboradores del grupo FyT.</p>
            <Button onClick={() => useNavigate()('/equipo')} className="w-full bg-fyt-purple text-white hover:bg-fyt-purple/90">Ver Equipo</Button>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Proyectos</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Conoce nuestras investigaciones actuales y resultados científicos.</p>
            <Button onClick={() => useNavigate()('/proyectos')} className="w-full bg-fyt-blue text-white hover:bg-fyt-blue/90">Ver Proyectos</Button>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Noticias</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Mantente informado sobre nuestras actividades y logros recientes.</p>
            <Button onClick={() => useNavigate()('/noticias')} className="w-full bg-fyt-purple text-white hover:bg-fyt-purple/90">Ver Noticias</Button>
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
