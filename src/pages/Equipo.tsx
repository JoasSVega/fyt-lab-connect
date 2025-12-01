import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";

const Equipo = () => (
  <div className="w-full bg-background flex flex-col pt-24">
    {/* Título principal eliminado para evitar duplicado, el componente Team lo incluye */}
    <Team />
    <FloatingContact />
  </div>
);

export default Equipo;
