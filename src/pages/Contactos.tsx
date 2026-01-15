import ContactPremium from "@/components/ContactPremium";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";

const Contactos = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-16">
      <Seo
        title="Contacta con Grupo FyT"
        description="Contacto para colaboraciones científicas, alianzas en investigación y pasantías en Farmacología. Universidad de Cartagena."
        keywords={["Contacto FyT", "Alianzas investigación", "Consultoría farmacéutica", "Pasantías Cartagena"]}
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/contactos"
        openGraph={{ 
          title: "Contacto y Alianzas Estratégicas | Grupo FyT", 
          description: "Contacta al Grupo FyT para colaboración científica y alianzas en investigación", 
          type: "website",
          url: "https://fyt-research.org/contactos",
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{ card: "summary_large_image", site: "@fytlab" }}
      />
      <ContactPremium />
    </div>
  );
};

export default Contactos;
