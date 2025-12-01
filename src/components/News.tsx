import { Clock } from "lucide-react";
import { CardReveal } from "./animations/CardReveal";

const News = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center py-16">
      <CardReveal>
        <div className="bg-white shadow-lg rounded-xl px-8 py-12 flex flex-col items-center justify-center">
          <Clock className="w-12 h-12 text-fyt-blue mb-4" style={{ filter: 'drop-shadow(0 2px 8px rgba(59,185,255,0.2))' }} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Próximamente</h2>
          <p className="text-slate-600 text-center">La sección de noticias estará disponible muy pronto.</p>
        </div>
      </CardReveal>
    </section>
  );
};

export default News;