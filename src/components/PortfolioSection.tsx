import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Play, Camera, Palette } from "lucide-react";
import Modal from "./Modal";
import { useLanguage } from "@/hooks/useLanguage";

const portfolioItems = [
  // Audiovisual Projects
  {
    id: 1,
    title: "La Chaza",
    description: "Cortometraje seleccionado para los Premios Huella - Director de Fotografía",
    url: "https://www.youtube.com/watch?v=Bo7TQVL3V2E",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Play className="h-6 w-6" />
  },
  {
    id: 2,
    title: "Imborrable",
    description: "Video musical de Chelo Ramírez - Director de Fotografía y Editor",
    url: "https://www.youtube.com/watch?v=txmzrx6uBIE",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Play className="h-6 w-6" />
  },
  {
    id: 3,
    title: "Charcos",
    description: "Cortometraje propuesta de marca ciudad para SmartFilms - Director de Fotografía",
    url: "https://www.youtube.com/watch?v=IKqixCqaYDw",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Play className="h-6 w-6" />
  },
  {
    id: 4,
    title: "Canal de YouTube",
    description: "Contenido audiovisual y proyectos creativos",
    url: "https://www.youtube.com/channel/UCnOKNo43azXJebnDzsyHzFQ",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Palette className="h-6 w-6" />
  },
  
  // Photography Projects
  {
    id: 5,
    title: "Portafolio Fotográfico",
    description: "Colección de trabajos fotográficos en eventos sociales y retratos profesionales",
    url: "https://www.canva.com/design/DAGGqCwK48w/TvSg3_kg2jvJfgCIuoHhvQ/view?utm_content=DAGGqCwK48w&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    category: "photography",
    categoryName: { es: "Fotografía", en: "Photography" },
    icon: <Camera className="h-6 w-6" />
  },
  
  // Web Development Projects
  {
    id: 6,
    title: "Ikigai App",
    description: "Aplicación web interactiva para descubrir tu propósito de vida",
    url: "https://ikigai-mocha.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />
  },
  {
    id: 7,
    title: "Plataforma de Entrenamiento",
    description: "Sistema de gestión de entrenamientos y seguimiento de progreso",
    url: "https://entrenamiento-m2-s3.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />
  },
  {
    id: 8,
    title: "Cotizador de Lociones",
    description: "Herramienta para cotización automática de productos de belleza",
    url: "https://cotizacion-lociones-cbz85nlxp-felipehincacodes-projects.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />
  },
  {
    id: 9,
    title: "Sistema de Cuentas de Cobro",
    description: "Generador automático de facturas y cuentas de cobro",
    url: "https://cuenta-de-cobro-v3.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />
  },
  {
    id: 10,
    title: "Café La Loma",
    description: "Sitio web para cafetería con sistema de pedidos online",
    url: "https://caf-la-loma.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />
  }
];

const PortfolioSection = () => {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('audiovisual');

  const filters = [
    { id: 'audiovisual', label: { es: 'Audiovisual', en: 'Audiovisual' } },
    { id: 'photography', label: { es: 'Fotografía', en: 'Photography' } },
    { id: 'web', label: { es: 'Desarrollo Web', en: 'Web Development' } }
  ];

  const filteredProjects = portfolioItems.filter(item => item.category === selectedFilter);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            {t('portfolio.title').split(' ')[0]} <span className="text-primary">{t('portfolio.title').split(' ')[1]}</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('portfolio.description')}
          </p>
          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted/30 text-muted-foreground hover:bg-primary/20 hover:text-primary'
                }`}
              >
                {filter.label[language]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((item) => (
            <Card 
              key={item.id}
              className="group cursor-pointer border-border bg-gradient-card hover:shadow-elegant transition-all duration-500 hover:scale-105 overflow-hidden"
              onClick={() => setSelectedProject(item)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-orange/20 text-orange rounded-full mb-2">
                      {item.categoryName[language]}
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