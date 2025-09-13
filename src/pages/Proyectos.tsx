import Projects from "@/components/Projects";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { CardReveal } from "@/components/animations/CardReveal";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";

const Proyectos = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
  <main className="flex-1 w-full pt-24">
      <FadeInUp>
        <CardReveal>
          <Projects />
        </CardReveal>
      </FadeInUp>
    </main>
    <FloatingContact />
  </div>
);

export default Proyectos;
