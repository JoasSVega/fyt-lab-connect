import Team from "@/components/Team";
import Navbar from "../components/Navbar";
import FloatingContact from "@/components/FloatingContact";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { CardReveal } from "@/components/animations/CardReveal";

const Equipo = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
  <main className="flex-1 w-full pt-24">
      <FadeInUp>
        <CardReveal>
          <Team />
        </CardReveal>
      </FadeInUp>
    </main>
    <FloatingContact />
  </div>
);

export default Equipo;
