import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import { baseUrl } from "@/utils/seoSchemas";

const Equipo = () => {
  usePageReady();
  
  // Organization schema con team members (Organization members array)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/equipo`,
    name: 'Grupo FyT - Equipo de Investigación',
    description: 'Equipo de investigación en Farmacología y Terapéutica de la Universidad de Cartagena',
    url: `${baseUrl}/equipo`,
    image: `${baseUrl}/logo-fyt.png`,
    organization: {
      '@type': 'Organization',
      name: 'Grupo FyT - Universidad de Cartagena',
      url: `${baseUrl}`,
      image: `${baseUrl}/logo-fyt.png`,
    },
  };
  
  return (
    <div className="w-full bg-background flex flex-col pt-24">
      <Seo
        title="Investigadores: Grupo FyT"
        description="Conoce nuestro equipo de investigadores y semilleristas en Farmacología, Toxicología, Toxicología y Salud Pública de la Universidad de Cartagena."
        keywords={["Investigadores UdeC", "Químicos Farmacéuticos", "Equipo FyT", "Semillero de investigación", "Científicos Cartagena"]}
        author="Grupo FyT"
        robots="index, follow"
        canonical={`${baseUrl}/equipo`}
        openGraph={{
          title: "Nuestro Equipo de Investigadores | Grupo FyT",
          description: "Conoce al equipo de la Universidad de Cartagena. Investigadores y semilleristas comprometidos con el rigor científico en Farmacología, Toxicología y Salud Pública.",
          type: "website",
          url: `${baseUrl}/equipo`,
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{
          card: "summary_large_image",
          site: "@fytlab",
        }}
        schema={schema}
      />
      <h1 className="sr-only">Equipo de Investigadores Farmacéuticos - Grupo FyT</h1>
      <Team />
      <FloatingContact />
    </div>
  );
};

export default Equipo;
