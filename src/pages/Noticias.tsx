import News from "@/components/News";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import FloatingContact from "@/components/FloatingContact";

const Noticias = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
  <main className="flex-1 w-full pt-24">
      <ScrollReveal>
        <News />
      </ScrollReveal>
    </main>
    <FloatingContact />
  </div>
);

export default Noticias;
