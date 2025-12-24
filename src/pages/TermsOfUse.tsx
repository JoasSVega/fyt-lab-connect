import React from "react";
import Seo from "@/components/Seo";
import { usePageReady } from "@/hooks/usePageReady";
import { sanitizeURL } from "@/lib/sanitize";

const TermsOfUse = () => {
  usePageReady(); // Sincronización con TransitionProvider
  return (
    <div className="w-full bg-background pt-24">{/* Patrón de páginas principales */}
      <Seo
        title="Grupo FyT | Términos de Uso"
        description="Condiciones de uso del sitio del Grupo de Investigación en Farmacología y Terapéutica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/terminos-de-uso"
        openGraph={{ title: "Grupo FyT | Términos de Uso", description: "Condiciones y responsabilidades", type: "article" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900 mb-8 text-center">Términos de Uso – Grupo de Investigación en Farmacología y Terapéutica</h1>
      <p className="text-slate-700 text-base mb-2">Universidad de Cartagena</p>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">1. Aceptación de los términos</h2>
        <p className="text-slate-700 text-base leading-relaxed">Al acceder y utilizar los recursos, materiales y plataformas digitales del Grupo de Investigación en Farmacología y Terapéutica (GIFT) de la Universidad de Cartagena, el usuario acepta cumplir estos Términos de Uso, junto con las políticas institucionales y la normatividad vigente en Colombia.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">2. Objetivo del sitio y materiales</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Divulgar información científica, académica y de extensión en el campo de la farmacología y la terapéutica.</li>
          <li>Promover actividades de formación e investigación.</li>
          <li>Facilitar el acceso a documentos, publicaciones y recursos generados por el grupo.</li>
        </ul>
        <p className="text-slate-700 text-base leading-relaxed mt-2"><span className="font-bold">⚠️ La información aquí publicada es de carácter académico y científico. No sustituye la consulta médica, farmacéutica o clínica.</span></p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">3. Propiedad intelectual</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Todos los contenidos (textos, gráficos, bases de datos, presentaciones, materiales descargables) son propiedad del Grupo o cuentan con autorización de uso bajo licencias correspondientes.</li>
          <li>Se prohíbe la reproducción, modificación o distribución con fines comerciales sin autorización previa.</li>
          <li>Las publicaciones científicas mantienen sus derechos conforme a las revistas o entidades editoriales correspondientes.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">4. Uso adecuado</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Utilizar los recursos solo con fines académicos, científicos o institucionales.</li>
          <li>No difundir información falsa o malintencionada.</li>
          <li>No vulnerar derechos de autor, de propiedad intelectual ni de confidencialidad en proyectos de investigación.</li>
          <li>Respetar las normativas nacionales e internacionales en farmacovigilancia, tecnovigilancia y ética en investigación biomédica.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">5. Limitación de responsabilidad</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>El Grupo no será responsable por interpretaciones erróneas de los contenidos publicados.</li>
          <li>Daños derivados del uso indebido de la información.</li>
          <li>Enlaces externos de terceros, sobre los cuales no tiene control.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">6. Confidencialidad y ética en investigación</h2>
        <p className="text-slate-700 text-base leading-relaxed">Los datos clínicos y personales compartidos en el marco de proyectos de investigación son tratados con confidencialidad y bajo las normas éticas del Comité de Ética en Investigación de la Universidad de Cartagena.</p>
        <p className="text-slate-700 text-base leading-relaxed mt-2">El uso de plataformas de reporte de eventos adversos o incidentes con medicamentos/dispositivos médicos se realiza en línea con el INVIMA y la normativa de farmacovigilancia vigente.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">7. Actualizaciones</h2>
        <p className="text-slate-700 text-base leading-relaxed">Estos Términos podrán modificarse en cualquier momento para ajustarse a nuevas disposiciones legales, institucionales o académicas.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">8. Contacto</h2>
        <p className="text-slate-700 text-base leading-relaxed">Para inquietudes sobre el uso del sitio o los materiales, puede contactarnos:</p>
        <ul className="list-none pl-0 text-slate-700 text-base leading-relaxed">
          <li>📧 <a href={sanitizeURL("mailto:farmacologiayterapeutica.gi@gmail.com") || "mailto:farmacologiayterapeutica.gi@gmail.com"} className="text-fyt-blue underline">farmacologiayterapeutica.gi@gmail.com</a></li>
          <li>📍 Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Provincia de Cartagena, Bolívar.</li>
        </ul>
      </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
