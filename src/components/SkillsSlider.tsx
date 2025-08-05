import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const skills = [
  {
    name: "DaVinci Resolve",
    category: "Producción Audiovisual",
    description: "Montaje: conformado de proyectos, sincronización, keyframes, máscaras, curvas de velocidad",
    details: "Colorización: correcciones primarias/secundarias, powerwindows, tracking, chromakeys, LUTs, interpretar RAW/Logarítmico. Data Managing: arquitectura de datos, transcodificación, proxy",
    icon: "🎬"
  },
  {
    name: "Adobe Premiere Pro",
    category: "Producción Audiovisual", 
    description: "Montaje: conformados, sincronización, keyframes, máscaras",
    details: "Flujo de trabajo con After Effects y Audition, Lumetri, Chromas y efectos, Exportación con Adobe Media Encoder",
    icon: "🎞️"
  },
  {
    name: "Adobe Lightroom",
    category: "Producción Audiovisual",
    description: "Correcciones primarias/secundarias, máscaras, altos flujos de trabajo",
    details: "Exportación optimizada para redes o impresión, plugins de corrección de pieles y filtros con IA",
    icon: "📷"
  },
  {
    name: "Adobe Photoshop",
    category: "Producción Audiovisual",
    description: "Camera Raw, Matte Painting, Retoque avanzado",
    details: "Retoque: pieles, D&B, separación de frecuencias. Fotomontajes y Diseño profesional",
    icon: "🎨"
  },
  {
    name: "Adobe After Effects",
    category: "Producción Audiovisual",
    description: "Motion Graphics y efectos visuales",
    details: "Animación avanzada, composición, efectos visuales complejos",
    icon: "✨"
  },
  {
    name: "Adobe Audition",
    category: "Producción Audiovisual",
    description: "Edición y diseño de sonido profesional",
    details: "Masterización, efectos de audio, sincronización",
    icon: "🎵"
  },
  {
    name: "HTML/CSS",
    category: "Programación y Desarrollo Web",
    description: "Frontend, responsive design, estructuras semánticas",
    details: "Desarrollo de interfaces modernas y accesibles",
    icon: "💻"
  },
  {
    name: "JavaScript",
    category: "Programación y Desarrollo Web",
    description: "Interactividad, frameworks modernos, aplicaciones web",
    details: "Desarrollo frontend avanzado con librerías modernas",
    icon: "⚡"
  },
  {
    name: "Git & GitHub",
    category: "Programación y Desarrollo Web",
    description: "Control de versiones, colaboración en código",
    details: "Gestión de proyectos, workflows y colaboración en equipo",
    icon: "🔄"
  },
  {
    name: "Vibecoding con Cursor",
    category: "Programación y Desarrollo Web",
    description: "Desarrollo asistido por IA",
    details: "Programación eficiente con herramientas de IA",
    icon: "🚀"
  },
  {
    name: "Loveable & Dev 0",
    category: "Programación y Desarrollo Web",
    description: "Plataformas de desarrollo no-code/low-code",
    details: "Desarrollo rápido de aplicaciones web",
    icon: "⚙️"
  },
  {
    name: "Figma",
    category: "Software",
    description: "Prototipado, diseño de interfaces UI/UX",
    details: "Diseño colaborativo, sistemas de diseño",
    icon: "🎯"
  },
  {
    name: "ChatGPT",
    category: "Inteligencias Artificiales",
    description: "Asistente de IA para múltiples tareas",
    details: "Generación de contenido, análisis y automatización",
    icon: "🤖"
  },
  {
    name: "Gemini",
    category: "Inteligencias Artificiales", 
    description: "IA de Google para análisis y generación",
    details: "Procesamiento de datos y contenido multimodal",
    icon: "💎"
  },
  {
    name: "Adobe Firefly",
    category: "Inteligencias Artificiales",
    description: "IA generativa de Adobe para imágenes",
    details: "Generación y edición de imágenes con IA",
    icon: "🔥"
  },
  {
    name: "Scrum",
    category: "Metodologías",
    description: "Gestión ágil de proyectos",
    details: "Metodología para desarrollo colaborativo y eficiente",
    icon: "📋"
  },
  {
    name: "Trello",
    category: "Software",
    description: "Gestión de proyectos y organización",
    details: "Planificación visual y seguimiento de tareas",
    icon: "📊"
  },
  {
    name: "Canva",
    category: "Software",
    description: "Diseño gráfico y presentaciones",
    details: "Creación rápida de contenido visual",
    icon: "🎪"
  }
];

const SkillsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = 2;
  const maxIndex = Math.max(0, skills.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleSkills = skills.slice(currentIndex, currentIndex + itemsPerView);
  
  // Fill remaining slots if at the end
  if (visibleSkills.length < itemsPerView) {
    const remaining = itemsPerView - visibleSkills.length;
    visibleSkills.push(...skills.slice(0, remaining));
  }

  return (
    <section className="py-20 bg-secondary/20 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            Mis <span className="text-primary">Habilidades</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas y tecnologías que domino para crear contenido audiovisual de alta calidad
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-primary text-primary-foreground rounded-full shadow-elegant hover:shadow-glow transition-all hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-primary text-primary-foreground rounded-full shadow-elegant hover:shadow-glow transition-all hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Skills cards */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {skills.map((skill, index) => (
                <Card 
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-[calc(50%-1rem)] bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105 group min-h-[320px]"
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-montserrat font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                      
                      <span className="inline-block px-4 py-2 text-sm font-medium bg-muted/30 text-foreground rounded-full mb-4">
                        {skill.category}
                      </span>
                      
                      <p className="font-roboto text-sm text-muted-foreground leading-relaxed mb-3">
                        {skill.description}
                      </p>
                      
                      {skill.details && (
                        <p className="font-roboto text-xs text-muted-foreground/80 leading-relaxed italic">
                          {skill.details}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary shadow-glow" 
                    : "bg-muted hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSlider;