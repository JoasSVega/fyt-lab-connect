import Contact from "@/components/Contact";
import Navbar from "../components/Navbar";
import FloatingContact from "@/components/FloatingContact";
// import ScrollReveal from "@/components/ScrollReveal";

const Contactos = () => (
  <div className="w-full bg-background overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-16">
      <section className="w-full mb-10">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-800 mb-4 text-center">
          Contacto
        </h1>
      </section>
      <Contact />
      {/* ...existing code... */}
    </main>
  </div>
);

export default Contactos;
