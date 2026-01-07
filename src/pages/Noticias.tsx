import News from "@/components/News";
import FloatingContact from "@/components/FloatingContact";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";

const Noticias = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-24">
      <Seo
        title="Grupo FyT | Noticias"
        description="Noticias y novedades del Grupo de Investigación en Farmacología y Terapéutica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/noticias"
        openGraph={{ title: "Grupo FyT | Noticias", description: "Actualidad institucional del Grupo FyT", type: "website" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      {/* Título principal eliminado para evitar duplicado, el componente News lo incluye */}
      <News />
      <FloatingContact />
    </div>
  );
};

export default Noticias;
