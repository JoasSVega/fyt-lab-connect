import Contact from "@/components/Contact";
import Navbar from "../components/Navbar";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const Contactos = () => (
  <div className="w-full bg-background overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-16">
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </main>
  </div>
);

export default Contactos;
