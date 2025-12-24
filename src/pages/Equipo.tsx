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
        title="Equipo | Investigadores Farmacéuticos | Grupo FyT"
        description="Conoce al equipo del Grupo FyT: investigadores, docentes y estudiantes en Farmacología, Farmacovigilancia, Farmacoecoeconomía y más."
        keywords="investigadores farmacéuticos, equipo FyT, farmacología, farmacovigilancia, Universidad Cartagena, farmacoecoeconomía"
        author="Grupo FyT"
        robots="index, follow"
        canonical={`${baseUrl}/equipo`}
        openGraph={{
          title: "Equipo Investigador | Grupo FyT",
          description: "Profesionales dedicados a la investigación farmacéutica en Cartagena",
          type: "website",
          url: `${baseUrl}/equipo`,
          image: `${baseUrl}/logo-fyt.png`,
        }}
        twitter={{
          card: "summary",
          site: "@fytlab",
          image: `${baseUrl}/logo-fyt.png`,
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
