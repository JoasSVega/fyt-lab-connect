import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tools from "@/components/Tools";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
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
        
        {/* About Section */}
        <About />
        
  {/* Pharmaceutical Tools Section */}
        <Tools />
        
        {/* Access to Projects and News */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16">
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Proyectos y Publicaciones</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Conoce nuestras investigaciones actuales y resultados científicos.</p>
            <Button onClick={() => useNavigate()('/proyectos')} className="w-full bg-fyt-blue text-white hover:bg-fyt-blue/90">Ver Proyectos</Button>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Noticias y Eventos</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Mantente informado sobre nuestras actividades y logros recientes.</p>
            <Button onClick={() => useNavigate()('/noticias')} className="w-full bg-fyt-purple text-white hover:bg-fyt-purple/90">Ver Noticias</Button>
          </div>
        </section>
        
        {/* Access to Equipo and Contactos */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16">
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Nuestro Equipo</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">Conoce a los integrantes y colaboradores del grupo FyT.</p>
            <Button onClick={() => useNavigate()('/equipo')} className="w-full bg-fyt-purple text-white hover:bg-fyt-purple/90">Ver Equipo</Button>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-soft p-8 max-w-xs w-full">
            <h3 className="text-xl font-bold text-fyt-dark mb-2">Contactos</h3>
            <p className="text-muted-foreground text-center text-sm mb-4">¿Tienes dudas o quieres colaborar? Contáctanos aquí.</p>
            <Button onClick={() => useNavigate()('/contactos')} className="w-full bg-fyt-blue text-white hover:bg-fyt-blue/90">Ver Contactos</Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
};

export default Index;
