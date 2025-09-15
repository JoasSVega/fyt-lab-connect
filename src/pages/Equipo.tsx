import Team from "@/components/Team";
import Navbar from "../components/Navbar";
import FloatingContact from "@/components/FloatingContact";

const Equipo = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-24">
      <section className="w-full mb-10">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-800 mb-4 text-center">
          Nuestro Equipo
        </h1>
      </section>
      <Team />
    </main>
    <FloatingContact />
  </div>
);

export default Equipo;
