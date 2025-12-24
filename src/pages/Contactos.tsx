import ContactPremium from "@/components/ContactPremium";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";

const Contactos = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-16">
      <Seo
        title="Grupo FyT | Contactos"
        description="Canales de contacto del Grupo de Investigación en Farmacología y Terapéutica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/contactos"
        openGraph={{ title: "Grupo FyT | Contactos", description: "Información de contacto del Grupo FyT", type: "website" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      <ContactPremium />
    </div>
  );
};

export default Contactos;
