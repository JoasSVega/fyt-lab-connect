import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tools from "@/components/Tools";
import { Button } from "@/components/ui/button";
import { Users, Microscope, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingContact from "@/components/FloatingContact";
// Animaciones eliminadas

const Index = () => {
  const navigate = useNavigate();
  return (
  <div className="w-full min-h-screen overflow-x-hidden px-2 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48" style={{background: "linear-gradient(120deg, #e0f2ff 0%, #f8fafc 60%, #f3f4f6 100%)"}}>
      {/* Fixed Navigation */}
      <Navbar />
      {/* Main Content */}
  <main className="w-full pt-24">
        {/* Título principal eliminado para evitar duplicidad. */}
        {/* Hero Section (sin ScrollReveal para evitar scroll interno y problemas de visualización) */}
        <Hero />
        {/* Tarjetas principales eliminadas. Solo se conservan las inferiores, actualizadas y con diseño uniforme. */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16">
          {/* Sobre Nosotros */}
            <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-soft p-8 max-w-xs w-full border border-blue-100">
              <span className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                <Users className="w-8 h-8 text-blue-600" aria-label="Sobre Nosotros" />
              </span>
              <h3 className="text-lg font-raleway font-bold text-fyt-dark mb-2">Sobre Nosotros</h3>
              <p className="text-muted-foreground text-center text-sm mb-4 font-inter">Conoce el objetivo, valores y equipo del grupo FyT.</p>
              <Button onClick={() => navigate('/sobre-nosotros')} className="w-full rounded-full px-5 py-2 font-inter shadow bg-fyt-blue text-white hover:bg-fyt-blue/90 transition">Ver Más</Button>
            </div>
          {/* Investigación */}
          <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-soft p-8 max-w-xs w-full border border-purple-100">
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 mb-2">
              <Microscope className="w-8 h-8 text-purple-600" aria-label="Investigación" />
            </span>
            <h3 className="text-lg font-raleway font-bold text-fyt-dark mb-2">Investigación</h3>
            <p className="text-muted-foreground text-center text-sm mb-4 font-inter">Conoce nuestras investigaciones actuales y resultados científicos.</p>
            <Button onClick={() => navigate('/investigacion')} className="w-full rounded-full px-5 py-2 font-inter shadow bg-fyt-purple text-white hover:bg-fyt-purple/90 transition">Ver Investigación</Button>
          </div>
          {/* Noticias */}
          <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-soft p-8 max-w-xs w-full border border-red-100">
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-2">
              <BookOpen className="w-8 h-8 text-red-600" aria-label="Noticias" />
            </span>
            <h3 className="text-lg font-raleway font-bold text-fyt-dark mb-2">Noticias</h3>
            <p className="text-muted-foreground text-center text-sm mb-4 font-inter">Mantente informado sobre nuestras actividades y logros recientes.</p>
            <Button onClick={() => navigate('/noticias')} className="w-full rounded-full px-5 py-2 font-inter shadow bg-fyt-red text-white hover:bg-fyt-red/90 transition">Ver Noticias</Button>
          </div>
        </section>
      {/* Secciones de investigación, modalidades, actividades y productos, y la tarjeta de inscripción */}
      <About />
        {/* Pharmaceutical Tools Section removida: ahora solo en la página Herramientas */}
      </main>
      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
};

export default Index;
