import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const skills = [
  // Video Editing
  {
    name: "DaVinci Resolve",
    category: "video",
    categoryName: { es: "Edición de Video", en: "Video Editing" },
    description: { 
      es: "Montaje profesional y gradación de color", 
      en: "Professional editing and color grading" 
    },
    details: { 
      es: ["Conformado de proyectos", "Sincronización y keyframes", "Colorización avanzada", "Data Managing"],
      en: ["Project conforming", "Sync and keyframes", "Advanced color grading", "Data Managing"]
    },
    icon: "🎬",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Adobe Premiere Pro",
    category: "video",
    categoryName: { es: "Edición de Video", en: "Video Editing" },
    description: { 
      es: "Montaje y flujo de trabajo profesional", 
      en: "Professional editing and workflow" 
    },
    details: { 
      es: ["Conformados y sincronización", "Integración con After Effects", "Lumetri y efectos", "Adobe Media Encoder"],
      en: ["Conforming and sync", "After Effects integration", "Lumetri and effects", "Adobe Media Encoder"]
    },
    icon: "🎞️",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Adobe After Effects",
    category: "video",
    categoryName: { es: "Edición de Video", en: "Video Editing" },
    description: { 
      es: "Motion Graphics y efectos visuales", 
      en: "Motion Graphics and VFX" 
    },
    details: { 
      es: ["Animación avanzada", "Composición", "Efectos visuales", "Integración con Premiere"],
      en: ["Advanced animation", "Compositing", "Visual effects", "Premiere integration"]
    },
    icon: "✨",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Adobe Audition",
    category: "video",
    categoryName: { es: "Edición de Video", en: "Video Editing" },
    description: { 
      es: "Edición y diseño de sonido", 
      en: "Audio editing and sound design" 
    },
    details: { 
      es: ["Masterización", "Efectos de audio", "Sincronización", "Limpieza de audio"],
      en: ["Mastering", "Audio effects", "Synchronization", "Audio cleanup"]
    },
    icon: "🎵",
    image: "/api/placeholder/80/80"
  },

  // Photography
  {
    name: "Adobe Lightroom",
    category: "photography",
    categoryName: { es: "Fotografía", en: "Photography" },
    description: { 
      es: "Edición y gestión fotográfica", 
      en: "Photo editing and management" 
    },
    details: { 
      es: ["Correcciones primarias", "Máscaras avanzadas", "Flujos de trabajo", "Plugins con IA"],
      en: ["Primary corrections", "Advanced masks", "Workflows", "AI plugins"]
    },
    icon: "📷",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Adobe Photoshop",
    category: "photography",
    categoryName: { es: "Fotografía", en: "Photography" },
    description: { 
      es: "Retoque avanzado y composición", 
      en: "Advanced retouching and compositing" 
    },
    details: { 
      es: ["Camera Raw", "Matte Painting", "Retoque de pieles", "Fotomontajes"],
      en: ["Camera Raw", "Matte Painting", "Skin retouching", "Photo compositing"]
    },
    icon: "🎨",
    image: "/api/placeholder/80/80"
  },

  // Web Development
  {
    name: "HTML/CSS",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    description: { 
      es: "Frontend y diseño responsivo", 
      en: "Frontend and responsive design" 
    },
    details: { 
      es: ["Estructuras semánticas", "Responsive design", "CSS Grid/Flexbox", "Animaciones CSS"],
      en: ["Semantic structures", "Responsive design", "CSS Grid/Flexbox", "CSS animations"]
    },
    icon: "💻",
    image: "/api/placeholder/80/80"
  },
  {
    name: "JavaScript",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    description: { 
      es: "Desarrollo frontend interactivo", 
      en: "Interactive frontend development" 
    },
    details: { 
      es: ["ES6+ moderno", "Frameworks React", "APIs y fetch", "DOM manipulation"],
      en: ["Modern ES6+", "React frameworks", "APIs and fetch", "DOM manipulation"]
    },
    icon: "⚡",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Git & GitHub",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    description: { 
      es: "Control de versiones", 
      en: "Version control" 
    },
    details: { 
      es: ["Gestión de repositorios", "Colaboración en equipo", "Workflows", "Branching strategies"],
      en: ["Repository management", "Team collaboration", "Workflows", "Branching strategies"]
    },
    icon: "🔄",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Cursor IDE",
    category: "web",
    categoryName: { es: "Desarrollo Web", en: "Web Development" },
    description: { 
      es: "Desarrollo asistido por IA", 
      en: "AI-assisted development" 
    },
    details: { 
      es: ["Vibecoding", "Programación eficiente", "AI pair programming", "Code generation"],
      en: ["Vibecoding", "Efficient programming", "AI pair programming", "Code generation"]
    },
    icon: "🚀",
    image: "/api/placeholder/80/80"
  },

  // AI Tools
  {
    name: "ChatGPT",
    category: "ai",
    categoryName: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: { 
      es: "Asistente de IA multitarea", 
      en: "Multitask AI assistant" 
    },
    details: { 
      es: ["Generación de contenido", "Análisis de datos", "Automatización", "Problem solving"],
      en: ["Content generation", "Data analysis", "Automation", "Problem solving"]
    },
    icon: "🤖",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Adobe Firefly",
    category: "ai",
    categoryName: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: { 
      es: "IA generativa para imágenes", 
      en: "Generative AI for images" 
    },
    details: { 
      es: ["Generación de imágenes", "Edición con IA", "Text to image", "Style transfer"],
      en: ["Image generation", "AI editing", "Text to image", "Style transfer"]
    },
    icon: "🔥",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Gemini",
    category: "ai",
    categoryName: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: { 
      es: "IA de Google multimodal", 
      en: "Google's multimodal AI" 
    },
    details: { 
      es: ["Análisis multimodal", "Procesamiento de datos", "Code analysis", "Research assistance"],
      en: ["Multimodal analysis", "Data processing", "Code analysis", "Research assistance"]
    },
    icon: "💎",
    image: "/api/placeholder/80/80"
  },

  // Productivity
  {
    name: "Figma",
    category: "productivity",
    categoryName: { es: "Productividad", en: "Productivity" },
    description: { 
      es: "Diseño UI/UX colaborativo", 
      en: "Collaborative UI/UX design" 
    },
    details: { 
      es: ["Prototipado", "Sistemas de diseño", "Colaboración en tiempo real", "Wireframing"],
      en: ["Prototyping", "Design systems", "Real-time collaboration", "Wireframing"]
    },
    icon: "🎯",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Trello",
    category: "productivity",
    categoryName: { es: "Productividad", en: "Productivity" },
    description: { 
      es: "Gestión de proyectos Kanban", 
      en: "Kanban project management" 
    },
    details: { 
      es: ["Tableros Kanban", "Seguimiento de tareas", "Colaboración en equipo", "Automatizaciones"],
      en: ["Kanban boards", "Task tracking", "Team collaboration", "Automations"]
    },
    icon: "📊",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Scrum",
    category: "productivity",
    categoryName: { es: "Productividad", en: "Productivity" },
    description: { 
      es: "Metodología ágil", 
      en: "Agile methodology" 
    },
    details: { 
      es: ["Sprints", "Daily standups", "Sprint planning", "Retrospectives"],
      en: ["Sprints", "Daily standups", "Sprint planning", "Retrospectives"]
    },
    icon: "📋",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Canva",
    category: "productivity",
    categoryName: { es: "Productividad", en: "Productivity" },
    description: { 
      es: "Diseño gráfico rápido", 
      en: "Quick graphic design" 
    },
    details: { 
      es: ["Templates", "Diseño colaborativo", "Brand kits", "Social media assets"],
      en: ["Templates", "Collaborative design", "Brand kits", "Social media assets"]
    },
    icon: "🎪",
    image: "/api/placeholder/80/80"
  }
];

const SkillsSlider = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('video');

  const categories = [
    { id: 'video', label: t('skills.filterVideo') },
    { id: 'photography', label: t('skills.filterPhoto') },
    { id: 'web', label: t('skills.filterWeb') },
    { id: 'ai', label: t('skills.filterAI') },
    { id: 'productivity', label: t('skills.filterProductivity') }
  ];

  const filteredSkills = skills.filter(skill => skill.category === selectedCategory);

  return (
    <section className="py-20 bg-secondary/20 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            {t('skills.title').split(' ')[0]} <span className="text-primary">{t('skills.title').split(' ')[1]}</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('skills.description')}
          </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-glow scale-105'
                  : 'bg-muted/30 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:scale-105'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <Card 
              key={`${skill.name}-${index}`}
              className="group bg-gradient-card border-border hover:shadow-elegant transition-all duration-500 overflow-hidden cursor-pointer h-48 hover:h-64"
            >
              <CardContent className="p-0 h-full">
                {/* Square view (default) */}
                <div className="group-hover:hidden h-full flex flex-col items-center justify-center p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-center text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-muted/30 text-foreground rounded-full mt-2">
                    {skill.categoryName[language]}
                  </span>
                </div>

                {/* Rectangular view (hover) */}
                <div className="hidden group-hover:flex h-full">
                  <div className="w-1/3 flex items-center justify-center bg-primary/10">
                    <div className="text-4xl">
                      {skill.icon}
                    </div>
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                    <h3 className="font-montserrat font-bold text-lg mb-2 text-primary">
                      {skill.name}
                    </h3>
                    <p className="font-roboto text-sm text-muted-foreground mb-3">
                      {skill.description[language]}
                    </p>
                    <ul className="space-y-1">
                      {skill.details[language].slice(0, 3).map((detail, i) => (
                        <li key={i} className="font-roboto text-xs text-muted-foreground flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSlider;