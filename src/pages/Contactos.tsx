import Contact from "@/components/Contact";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";

const Contactos = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-16">
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </div>
  );
};

export default Contactos;
