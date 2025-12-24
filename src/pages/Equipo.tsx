import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";

const Equipo = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-24">
      <Seo
        title="Grupo FyT | Equipo"
        description="Integrantes y miembros del Grupo de Investigación en Farmacología y Terapéutica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/equipo"
        openGraph={{ title: "Grupo FyT | Equipo", description: "Integrantes del Grupo FyT", type: "website" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      {/* Título principal eliminado para evitar duplicado, el componente Team lo incluye */}
      <Team />
      <FloatingContact />
    </div>
  );
};

export default Equipo;
