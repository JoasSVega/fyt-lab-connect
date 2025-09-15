import React from "react";
import BaseLayout from "@/components/BaseLayout";

const PrivacyPolicy = () => (
  <BaseLayout>
    <main className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-800">Política de Privacidad del Grupo de Investigación en Farmacología y Terapéutica</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">1. Introducción</h2>
        <p className="text-slate-700 text-base leading-relaxed">El Grupo de Investigación en Farmacología y Terapéutica de la Universidad de Cartagena reconoce la importancia de la privacidad y la protección de los datos personales de los participantes, colaboradores y usuarios de nuestras plataformas. Esta Política establece los lineamientos para el manejo responsable de la información, en cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013, la Ley 1266 de 2008 y demás disposiciones aplicables en materia de Habeas Data y protección de información en Colombia.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">2. Alcance</h2>
        <p className="text-slate-700 text-base leading-relaxed">Esta Política aplica a todos los procesos de recolección, almacenamiento, uso, circulación y supresión de datos personales gestionados en el marco de nuestras actividades de investigación, docencia, extensión y divulgación científica.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">3. Tipos de información que recopilamos</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Datos de identificación y contacto: nombres, apellidos, documento de identidad, correo electrónico, teléfono.</li>
          <li>Datos relacionados con la investigación: información clínica, farmacológica o terapéutica, cuando el participante otorgue consentimiento informado.</li>
          <li>Datos académicos y profesionales: formación, publicaciones, filiación institucional, experiencia investigativa.</li>
          <li>Datos técnicos: dirección IP, navegador y comportamiento de navegación en nuestras plataformas digitales.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">4. Finalidad del tratamiento de datos</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Desarrollo de proyectos de investigación en farmacología y terapéutica.</li>
          <li>Procesamiento y análisis de información con fines científicos, académicos o regulatorios.</li>
          <li>Cumplimiento de requisitos éticos y legales en investigación biomédica.</li>
          <li>Divulgación de resultados de investigación de manera anonimizada.</li>
          <li>Contacto con los titulares para comunicaciones relacionadas con los estudios o actividades del Grupo.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">5. Principios rectores</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Legalidad y finalidad: conforme a la ley y con propósitos legítimos.</li>
          <li>Libertad y consentimiento informado: previo, expreso e informado.</li>
          <li>Veracidad y calidad: datos actualizados, completos y verificables.</li>
          <li>Seguridad: medidas técnicas y administrativas para evitar pérdida, alteración o acceso no autorizado.</li>
          <li>Confidencialidad: especialmente en información sensible y clínica.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">6. Derechos de los titulares</h2>
        <ul className="list-disc pl-6 text-slate-700 text-base leading-relaxed mb-2">
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Revocar la autorización otorgada para el tratamiento de datos.</li>
          <li>Solicitar la eliminación de información en los casos en que proceda.</li>
          <li>Ser informados sobre el uso de sus datos.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">7. Medidas de seguridad</h2>
        <p className="text-slate-700 text-base leading-relaxed">El Grupo adopta protocolos técnicos, administrativos y éticos para garantizar la seguridad de la información, incluyendo el acceso restringido, la anonimización de datos sensibles y la capacitación constante en Buenas Prácticas Clínicas y normativas de protección de datos.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">8. Transferencia y transmisión de datos</h2>
        <p className="text-slate-700 text-base leading-relaxed">Los datos personales podrán ser compartidos con entidades académicas, científicas o regulatorias únicamente en el marco de proyectos aprobados por Comités de Ética en Investigación, y siempre bajo acuerdos de confidencialidad y protección de datos.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">9. Vigencia y actualizaciones</h2>
        <p className="text-slate-700 text-base leading-relaxed">Esta Política entra en vigencia a partir de su publicación y podrá ser modificada para ajustarse a nuevas disposiciones normativas o necesidades del Grupo de Investigación.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-700">10. Contacto</h2>
  <p className="text-slate-700 text-base leading-relaxed">Para ejercer sus derechos, los titulares podrán enviar sus solicitudes al correo: <a href="mailto:farmacologiayterapeutica.gi@gmail.com" className="text-fyt-blue underline">farmacologiayterapeutica.gi@gmail.com</a> o dirigirse a la sede administrativa del Grupo de Investigación en Cra. 50 #24120, Zaragocilla, Cartagena de Indias, Provincia de Cartagena, Bolívar.</p>
      </section>
    </main>
  </BaseLayout>
);

export default PrivacyPolicy;
