import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const skills = [
  {
    name: "DaVinci Resolve",
    category: "Edición & Color",
    description: "Montaje, colorización, data managing",
    icon: "🎬"
  },
  {
    name: "Adobe Premiere Pro",
    category: "Edición",
    description: "Montaje profesional, efectos, exportación",
    icon: "🎞️"
  },
  {
    name: "Adobe Lightroom",
    category: "Fotografía",
    description: "Corrección, retoque, flujos de trabajo",
    icon: "📷"
  },
  {
    name: "Adobe Photoshop",
    category: "Diseño",
    description: "Retoque, matte painting, fotomontajes",
    icon: "🎨"
  },
  {
    name: "HTML/CSS",
    category: "Desarrollo Web",
    description: "Frontend, responsive design",
    icon: "💻"
  },
  {
    name: "JavaScript",
    category: "Desarrollo Web",
    description: "Interactividad, frameworks modernos",
    icon: "⚡"
  },
  {
    name: "Figma",
    category: "Diseño UI/UX",
    description: "Prototipado, diseño de interfaces",
    icon: "🎯"
  },
  {
    name: "Adobe After Effects",
    category: "Motion Graphics",
    description: "Animación, efectos visuales",
    icon: "✨"
  },
  {
    name: "Inteligencia Artificial",
    category: "Herramientas IA",
    description: "ChatGPT, Gemini, Adobe Firefly",
    icon: "🤖"
  },
  {
    name: "Git & GitHub",
    category: "Control de Versiones",
    description: "Colaboración, versionado de código",
    icon: "🔄"
  }
];

const SkillsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = 3;
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
    <section className="py-20 bg-secondary/20">
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
                  className="flex-shrink-0 w-[calc(33.333%-1rem)] bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    
                    <h3 className="font-montserrat font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-orange/20 text-orange rounded-full mb-3">
                      {skill.category}
                    </span>
                    
                    <p className="font-roboto text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
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