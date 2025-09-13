import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";

const Proyectos = () => (
  <div className="w-full bg-background overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-16">
      <Projects />
    </main>
    <FloatingContact />
  </div>
);

export default Proyectos;
