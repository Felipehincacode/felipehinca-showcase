import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Play, Camera, Palette } from "lucide-react";
import Modal from "./Modal";
import { useLanguage } from "@/hooks/useLanguage";

const portfolioItems = [
  {
    id: 1,
    title: "La Chaza",
    description: "Cortometraje seleccionado para los Premios Huella - Director de Fotografía",
    url: "https://www.youtube.com/watch?v=Bo7TQVL3V2E",
    category: "Cinematografía",
    icon: <Play className="h-6 w-6" />
  },
  {
    id: 2,
    title: "Imborrable",
    description: "Video musical de Chelo Ramírez - Director de Fotografía y Editor",
    url: "https://www.youtube.com/watch?v=txmzrx6uBIE",
    category: "Video Musical",
    icon: <Play className="h-6 w-6" />
  },
  {
    id: 3,
    title: "Charcos",
    description: "Cortometraje propuesta de marca ciudad para SmartFilms - Director de Fotografía",
    url: "https://www.youtube.com/watch?v=IKqixCqaYDw",
    category: "Cinematografía",
    icon: <Play className="h-6 w-6" />
  },
  {
    id: 4,
    title: "Portafolio Fotográfico",
    description: "Colección de trabajos fotográficos en eventos sociales y retratos",
    url: "https://www.canva.com/design/DAGGqCwK48w/TvSg3_kg2jvJfgCIuoHhvQ/view?utm_content=DAGGqCwK48w&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    category: "Fotografía",
    icon: <Camera className="h-6 w-6" />
  },
  {
    id: 5,
    title: "Canal de YouTube",
    description: "Contenido audiovisual y proyectos creativos",
    url: "https://www.youtube.com/channel/UCnOKNo43azXJebnDzsyHzFQ",
    category: "Contenido Digital",
    icon: <Palette className="h-6 w-6" />
  }
];

const PortfolioSection = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            {t('portfolio.title').split(' ')[0]} <span className="text-primary">{t('portfolio.title').split(' ')[1]}</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Card 
              key={item.id}
              className="group cursor-pointer border-border bg-gradient-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden"
              onClick={() => setSelectedProject(item)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-orange/20 text-orange rounded-full mb-2">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-montserrat font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="font-roboto text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('portfolio.viewProject')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          url={selectedProject.url}
          title={selectedProject.title}
        />
      )}
    </section>
  );
};

export default PortfolioSection;