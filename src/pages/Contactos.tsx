import ContactPremium from "@/components/ContactPremium";
import { usePageReady } from "@/hooks/usePageReady";

const Contactos = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col pt-16">
      <ContactPremium />
    </div>
  );
};

export default Contactos;
