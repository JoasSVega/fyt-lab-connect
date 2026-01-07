import { Clock } from "lucide-react";
import { CardReveal } from "./animations/CardReveal";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center py-16">
      <CardReveal>
        <div className="bg-white shadow-lg rounded-xl px-8 py-12 flex flex-col items-center justify-center min-h-[300px]">
          <Clock className="w-12 h-12 text-fyt-blue mb-4" style={{ filter: 'drop-shadow(0 2px 8px rgba(59,185,255,0.2))' }} />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Noticias del Grupo de Investigación FyT</h2>
          <div className="text-center max-w-2xl text-slate-700 leading-relaxed space-y-4">
            <p>
              Esta sección reunirá comunicaciones institucionales del <span className="font-semibold text-fyt-blue">Grupo de Investigación en Farmacología y Terapéutica (FyT)</span>.
            </p>
            <p>
              Publicaremos: eventos organizados por el grupo, la participación de nuestros integrantes en actividades académicas, y anuncios sobre publicaciones, herramientas y recursos desarrollados por FyT.
            </p>
            <p className="text-sm text-slate-600 italic">
              Mientras preparamos los primeros comunicados, te invitamos a explorar <Link to="/investigacion" className="text-fyt-blue hover:underline">Investigación</Link> y <Link to="/divulgacion" className="text-fyt-blue hover:underline">Divulgación Científica</Link>.
            </p>
          </div>
        </div>
      </CardReveal>
    </section>
  );
};

export default News;