import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

const skills = [
  // Edición de Video
  {
    id: 1,
    name: "DaVinci Resolve",
    category: "video",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg",
    color: "from-purple-500 to-pink-500",
    description: "Edición profesional, colorización y post-producción",
    details: [
      "Edición multicámara",
      "Colorización avanzada",
      "Efectos visuales",
      "Audio post-producción"
    ]
  },
  {
    id: 2,
    name: "Adobe Premiere Pro",
    category: "video",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    color: "from-blue-500 to-purple-500",
    description: "Edición de video profesional y efectos",
    details: [
      "Edición de timeline",
      "Transiciones avanzadas",
      "Integración con After Effects",
      "Exportación optimizada"
    ]
  },
  {
    id: 3,
    name: "Adobe After Effects",
    category: "video",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
    color: "from-purple-500 to-indigo-500",
    description: "Composición y efectos visuales",
    details: [
      "Motion graphics",
      "Composición avanzada",
      "Expresiones y scripts",
      "Integración 3D"
    ]
  },
  {
    id: 4,
    name: "Adobe Audition",
    category: "video",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Adobe_Audition_CC_icon.svg",
    color: "from-orange-500 to-red-500",
    description: "Edición y mezcla de audio profesional",
    details: [
      "Edición de audio multicanal",
      "Reducción de ruido",
      "Efectos de audio",
      "Masterización"
    ]
  },
  
  // Fotografía
  {
    id: 5,
    name: "Adobe Lightroom",
    category: "photo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg",
    color: "from-blue-500 to-cyan-500",
    description: "Revelado y edición fotográfica",
    details: [
      "Revelado RAW",
      "Corrección de color",
      "Presets personalizados",
      "Organización de catálogos"
    ]
  },
  {
    id: 6,
    name: "Adobe Photoshop",
    category: "photo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    color: "from-blue-500 to-purple-500",
    description: "Edición y manipulación de imágenes",
    details: [
      "Retoque avanzado",
      "Composición de imágenes",
      "Máscaras y capas",
      "Filtros y efectos"
    ]
  },
  {
    id: 7,
    name: "Canva",
    category: "photo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
    color: "from-blue-500 to-teal-500",
    description: "Diseño gráfico y contenido visual",
    details: [
      "Templates profesionales",
      "Diseño de redes sociales",
      "Presentaciones",
      "Branding visual"
    ]
  },
  
  // Inteligencia Artificial
  {
    id: 8,
    name: "ChatGPT",
    category: "ai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    color: "from-green-500 to-emerald-500",
    description: "Asistente de IA para contenido creativo",
    details: [
      "Generación de ideas",
      "Guiones y narrativas",
      "Optimización de contenido",
      "Análisis de audiencia"
    ]
  },
  {
    id: 9,
    name: "Midjourney",
    category: "ai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.svg",
    color: "from-purple-500 to-pink-500",
    description: "Generación de imágenes con IA",
    details: [
      "Concept art",
      "Ilustraciones",
      "Fotografía conceptual",
      "Estilos artísticos"
    ]
  },
  {
    id: 10,
    name: "Runway ML",
    category: "ai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Runway_ML_logo.svg",
    color: "from-indigo-500 to-purple-500",
    description: "Herramientas de IA para video",
    details: [
      "Generación de video",
      "Efectos con IA",
      "Motion tracking",
      "Composición inteligente"
    ]
  },
  
  // Productividad
  {
    id: 11,
    name: "Notion",
    category: "productivity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    color: "from-gray-500 to-black",
    description: "Organización y gestión de proyectos",
    details: [
      "Gestión de proyectos",
      "Documentación",
      "Bases de datos",
      "Colaboración en equipo"
    ]
  },
  {
    id: 12,
    name: "Trello",
    category: "productivity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Trello_logo.svg",
    color: "from-blue-500 to-indigo-500",
    description: "Gestión de tareas y proyectos",
    details: [
      "Kanban boards",
      "Gestión de flujo de trabajo",
      "Integración con equipos",
      "Seguimiento de progreso"
    ]
  }
];

const SkillsSlider = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('video');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { value: "all", label: t('skills.filterAll') },
    { value: "video", label: t('skills.filterVideo') },
    { value: "photo", label: t('skills.filterPhoto') },
    { value: "ai", label: t('skills.filterAI') },
    { value: "productivity", label: t('skills.filterProductivity') }
  ];

  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-mint-green rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-mint-green rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-mint-green rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t('skills.title').split(' ')[0]} <span className="text-mint-green bg-gradient-to-r from-mint-green to-emerald-400 bg-clip-text text-transparent">{t('skills.title').split(' ')[1]}</span>
          </motion.h2>
          <motion.p 
            className="font-roboto text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t('skills.description')}
          </motion.p>
        </div>

        {/* Enhanced Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`group relative px-8 py-4 rounded-2xl font-montserrat font-semibold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-mint-green to-emerald-400 text-background shadow-2xl shadow-mint-green/30'
                  : 'bg-gradient-to-r from-muted/30 to-muted/20 text-muted-foreground hover:from-mint-green/20 hover:to-emerald-400/20 hover:text-mint-green backdrop-blur-sm border border-muted/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <span className="mr-2 text-xl">{category.label}</span>
              {selectedCategory === category.value && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-background rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <Card className="group relative bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-mint-green/50 transition-all duration-500 overflow-hidden cursor-pointer h-64 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-mint-green/20">
                <CardContent className="p-0 h-full relative">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Main content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Logo container with enhanced styling */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-muted/20 to-muted/10 backdrop-blur-sm border border-muted/20 group-hover:border-mint-green/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-12 h-12 object-contain transition-all duration-700 ease-out group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-icon');
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className="fallback-icon text-3xl hidden">🎬</div>
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-mint-green rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                    </div>

                    {/* Title with enhanced typography */}
                    <h3 className="font-montserrat font-bold text-xl mb-3 text-foreground group-hover:text-mint-green transition-all duration-500 group-hover:scale-105">
                      {skill.name}
                    </h3>
                    
                    {/* Category badge with enhanced styling */}
                    <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-mint-green/20 to-emerald-400/20 text-mint-green rounded-full border border-mint-green/30 backdrop-blur-sm">
                      {skill.category}
                    </span>

                    {/* Description that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-sm flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <p className="font-roboto text-sm text-muted-foreground mb-4 leading-relaxed">
                        {skill.description}
                      </p>
                      <ul className="space-y-2">
                        {skill.details.slice(0, 3).map((detail, i) => (
                          <li key={i} className="font-roboto text-xs text-muted-foreground flex items-center">
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-mint-green to-emerald-400 rounded-full mr-2 animate-pulse"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSlider;