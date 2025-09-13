import Team from "@/components/Team";
import Navbar from "../components/Navbar";
import FloatingContact from "@/components/FloatingContact";
import ScrollReveal from "@/components/ScrollReveal";

const Equipo = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
  <main className="flex-1 w-full pt-24">
      <ScrollReveal>
        <Team />
      </ScrollReveal>
    </main>
    <FloatingContact />
  </div>
);

export default Equipo;
