import { Calendar, MapPin, Users, ArrowRight, Bell } from "lucide-react";
import { Card } from "./ui/card";
import { CardReveal } from "./animations/CardReveal";
import { FadeInUp } from "./animations/FadeInUp";
import { ButtonReveal } from "./animations/ButtonReveal";
import { ImageReveal } from "./animations/ImageReveal";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const News = () => {
  const news = [
    {
      type: "Evento",
      title: "XV Simposio Internacional de Farmacología Clínica",
      date: "2024-11-15",
      location: "Auditorio Principal, Universidad",
      description: "Únete a nosotros en este importante evento académico donde presentaremos los últimos avances en farmacología clínica y medicina personalizada.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=300&fit=crop",
      featured: true,
      category: "Simposio"
    },
    {
      type: "Noticia",
      title: "Publicación en Journal of Clinical Pharmacology",
      date: "2024-10-28",
      description: "Nuestro equipo ha publicado un importante estudio sobre farmacogenómica de warfarina en población latinoamericana.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
      featured: false,
      category: "Publicación"
    },
    {
      type: "Evento",
      title: "Taller de Metodología de Investigación",
      date: "2024-11-30",
      location: "Sala de Conferencias FYT",
      description: "Taller dirigido a estudiantes de pregrado y posgrado sobre metodologías de investigación en farmacología.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=300&fit=crop",
      featured: false,
      category: "Taller"
    },
    {
      type: "Noticia",
      title: "Nuevo Proyecto Financiado por MinCiencias",
      date: "2024-10-15",
      description: "Hemos obtenido financiación para un nuevo proyecto sobre seguridad medicamentosa en población pediátrica.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
      featured: false,
      category: "Financiación"
    },
    {
      type: "Evento",
      title: "Congreso Nacional de Farmacología",
      date: "2024-12-10",
      location: "Centro de Convenciones, Bogotá",
      description: "Presentaremos nuestros últimos hallazgos en el Congreso Nacional de Farmacología 2024.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop",
      featured: false,
      category: "Congreso"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const featuredNews = news.find(item => item.featured);
  const regularNews = news.filter(item => !item.featured);

  return (
    <section id="noticias" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header eliminado para evitar duplicidad de título principal. */}

        {/* Featured News */}
        {featuredNews && (
          <div className="mb-16">
            <CardReveal>
              <Card className="overflow-hidden bg-gradient-card shadow-large hover:shadow-large transition-shadow">
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <ImageReveal>
                    <div className="relative">
                      <img 
                        src={featuredNews.image} 
                        alt={featuredNews.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge 
                          variant="secondary" 
                          className="bg-fyt-red text-white"
                        >
                          Destacado
                        </Badge>
                      </div>
                      {isUpcoming(featuredNews.date) && (
                        <div className="absolute top-4 right-4">
                          <Badge 
                            variant="outline" 
                            className="bg-white/90 border-fyt-blue text-fyt-blue"
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            Próximo
                          </Badge>
                        </div>
                      )}
                    </div>
                  </ImageReveal>

                  {/* Content */}
                  <div className="p-8">
                    <FadeInUp>
                      <div className="mb-4">
                        <Badge variant="outline" className="text-xs mb-3">
                          {featuredNews.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-fyt-dark mb-3">
                          {featuredNews.title}
                        </h3>
                      </div>
                    </FadeInUp>
                    <FadeInUp delay={0.1}>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredNews.description}
                      </p>
                    </FadeInUp>
                    <FadeInUp delay={0.15}>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-fyt-blue" />
                          <span>{formatDate(featuredNews.date)}</span>
                        </div>
                        {featuredNews.location && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-fyt-purple" />
                            <span>{featuredNews.location}</span>
                          </div>
                        )}
                      </div>
                    </FadeInUp>
                    <ButtonReveal delay={0.2}>
                      <Button className="bg-gradient-hero text-white">
                        Más Información
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </ButtonReveal>
                  </div>
                </div>
              </Card>
            </CardReveal>
          </div>
        )}

        {/* Regular News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map((item, index) => (
            <CardReveal key={item.title}>
              <Card key={index} className="overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer">
                {/* Image */}
                <ImageReveal>
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.type === 'Evento' 
                            ? 'bg-fyt-blue text-white' 
                            : 'bg-fyt-purple text-white'
                        }`}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    {item.type === 'Evento' && isUpcoming(item.date) && (
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant="outline" 
                          className="bg-white/90 border-green-500 text-green-600 text-xs"
                        >
                          Próximo
                        </Badge>
                      </div>
                    )}
                  </div>
                </ImageReveal>

                {/* Content */}
                <div className="p-6">
                  <FadeInUp>
                    <h4 className="text-lg font-semibold text-fyt-dark mb-3 group-hover:text-fyt-blue transition-colors">
                      {item.title}
                    </h4>
                  </FadeInUp>
                  <FadeInUp delay={0.1}>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.15}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      {item.location && (
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </FadeInUp>
                </div>
              </Card>
            </CardReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default News;