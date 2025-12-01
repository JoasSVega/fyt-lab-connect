import News from "@/components/News";
import FloatingContact from "@/components/FloatingContact";
import { usePageReady } from "@/hooks/usePageReady";

const Noticias = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-24">
      {/* Título principal eliminado para evitar duplicado, el componente News lo incluye */}
      <News />
      <FloatingContact />
    </div>
  );
};

export default Noticias;
