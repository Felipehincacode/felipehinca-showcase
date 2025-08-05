import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Camera, Code, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Modal from "./Modal";
import { motion } from "framer-motion";

// Función para generar screenshot automático con servicio más confiable
const generateScreenshot = (url: string, width: number = 400, height: number = 300) => {
  // Usando api.apiflash.com como servicio de screenshot más confiable
  const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=YOUR_API_KEY&url=${encodeURIComponent(url)}&width=${width}&height=${height}&format=png&quality=85&response_type=image`;
  
  // Fallback a un servicio gratuito si no hay API key
  const fallbackUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`;
  
  return fallbackUrl;
};

const portfolioItems = [
  // Audiovisual Projects
  {
    id: 1,
    title: "La Chaza",
    description: "Cortometraje seleccionado para los Premios Huella - Director de Fotografía",
    url: "https://www.youtube.com/embed/Bo7TQVL3V2E?si=DE0rU6A2GYdQ9EGC",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Play className="h-6 w-6" />,
    thumbnail: "https://img.youtube.com/vi/Bo7TQVL3V2E/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Imborrable",
    description: "Video musical de Chelo Ramírez - Director de Fotografía y Editor",
    url: "https://www.youtube.com/embed/txmzrx6uBIE?si=w0jfmS7m92if8QCR",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Play className="h-6 w-6" />,
    thumbnail: "https://img.youtube.com/vi/txmzrx6uBIE/maxresdefault.jpg"
  },
  {
    id: 3,
    title: "Charcos",
    description: "Cortometraje propuesta de marca ciudad para SmartFilms - Director de Fotografía",
    url: "https://www.youtube.com/embed/IKqixCqaYDw?si=8yYcJZOYpBwPhyF6",
    category: "audiovisual",
    categoryName: { es: "Audiovisual", en: "Audiovisual" },
    icon: <Play className="h-6 w-6" />,
    thumbnail: "https://img.youtube.com/vi/IKqixCqaYDw/maxresdefault.jpg"
  },
  
  // Photography Projects
  {
    id: 4,
    title: "Portafolio Fotográfico",
    description: "Colección de trabajos fotográficos en eventos sociales y retratos profesionales",
    url: "https://www.canva.com/design/DAGGqCwK48w/kqqPi10GlQUSLUO0eUyrjw/view?embed",
    category: "photography",
    categoryName: { es: "Fotografía", en: "Photography" },
    icon: <Camera className="h-6 w-6" />,
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxYTFhMWEiLz4KICAKICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMyIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmlkKSIvPgogIAogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwgMTUwKSI+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iNDAiIGZpbGw9IiMzMzMiIG9wYWNpdHk9IjAuNSIvPgogICAgCiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIsIC04KSI+CiAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IiM2NjYiLz4KICAgICAgPGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI2IiBmaWxsPSIjNjY2Ii8+CiAgICAgIDxyZWN0IHg9IjIwIiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0iIzY2NiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+"
  },
  {
    id: 5,
    title: "Fotografía de Producto",
    description: "Portafolio especializado en fotografía comercial y de producto",
    url: "https://www.canva.com/design/DAGe0KudJKM/V694gyQw_ReAi6oGaAPYXw/view?embed",
    category: "photography",
    categoryName: { es: "Fotografía", en: "Photography" },
    icon: <Camera className="h-6 w-6" />,
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxYTFhMWEiLz4KICAKICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMyIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmlkKSIvPgogIAogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwgMTUwKSI+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iNDAiIGZpbGw9IiMzMzMiIG9wYWNpdHk9IjAuNSIvPgogICAgCiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIsIC04KSI+CiAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IiM2NjYiLz4KICAgICAgPGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI2IiBmaWxsPSIjNjY2Ii8+CiAgICAgIDxyZWN0IHg9IjIwIiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0iIzY2NiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+"
  },
  
  // Web Development Projects
  {
    id: 6,
    title: "Ikigai App",
    description: "Aplicación web interactiva para descubrir tu propósito de vida",
    url: "https://ikigai-mocha.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />,
    thumbnail: generateScreenshot("https://ikigai-mocha.vercel.app/")
  },
  {
    id: 7,
    title: "Plataforma de Entrenamiento",
    description: "Sistema de gestión de entrenamientos y seguimiento de progreso",
    url: "https://entrenamiento-m2-s3.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />,
    thumbnail: generateScreenshot("https://entrenamiento-m2-s3.vercel.app/")
  },
  {
    id: 8,
    title: "Cotizador de Lociones",
    description: "Herramienta para cotización automática de productos de belleza",
    url: "https://cotizacion-lociones-cbz85nlxp-felipehincacodes-projects.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />,
    thumbnail: generateScreenshot("https://cotizacion-lociones-cbz85nlxp-felipehincacodes-projects.vercel.app/")
  },
  {
    id: 9,
    title: "Sistema de Cuentas de Cobro",
    description: "Generador automático de facturas y cuentas de cobro",
    url: "https://cuenta-de-cobro-v3.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />,
    thumbnail: generateScreenshot("https://cuenta-de-cobro-v3.vercel.app/")
  },
  {
    id: 10,
    title: "Café La Loma",
    description: "Sitio web para cafetería con sistema de pedidos online",
    url: "https://caf-la-loma.vercel.app/",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    icon: <ExternalLink className="h-6 w-6" />,
    thumbnail: generateScreenshot("https://caf-la-loma.vercel.app/")
  }
];

const PortfolioSection = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("audiovisual");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  const categories = [
    { value: "audiovisual", label: t('portfolio.filterAudiovisual') },
    { value: "photography", label: t('portfolio.filterPhotography') },
    { value: "web", label: t('portfolio.filterWeb') }
  ];

  const filteredProjects = portfolioItems.filter(item => item.category === selectedCategory);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            {t('portfolio.title').split(' ')[0]} <span className="text-mint-green">{t('portfolio.title').split(' ')[1]}</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-roboto font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-mint-green text-background shadow-lg shadow-mint-green/25"
                  : "bg-muted/20 text-muted-foreground hover:bg-mint-green/20 hover:text-mint-green border border-transparent hover:border-mint-green/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="group relative bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-mint-green/30 transition-all duration-300 overflow-hidden cursor-pointer h-80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-mint-green/20">
                <CardContent className="p-0 h-full relative">
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTYxNjE2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyMDIwMjAiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI0MCIgZmlsbD0iIzQwNDA0MCIvPgo8cGF0aCBkPSJNMTgwIDEzMEwyMjAgMTUwTDE4MCAxNzBWMzAwSDIyMFYxNzBMMTgwIDEzMFoiIGZpbGw9IiM0MDQwNDAiLz4KPC9zdmc+";
                      }}
                    />
                    
                    {/* Overlay with icon */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-mint-green/90 text-background rounded-full flex items-center justify-center">
                        {project.category === "audiovisual" && <Play className="w-8 h-8 ml-1" />}
                        {project.category === "photography" && <Camera className="w-8 h-8" />}
                        {project.category === "web" && <Code className="w-8 h-8" />}
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-mint-green/90 text-background border-0">
                        {project.categoryName[language]}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <CardTitle className="font-montserrat font-bold text-xl mb-3 text-foreground group-hover:text-mint-green transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <p className="font-roboto text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {/* Assuming technologies are part of the portfolio item or passed as a prop */}
                        {/* For now, we'll just show a placeholder or remove if not needed */}
                        {/* <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge> */}
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="group-hover:bg-mint-green group-hover:text-background transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
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