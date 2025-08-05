import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";

const HeroSection = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} className="border-r border-primary/20"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground">
            Comunicador{" "}
            <span className="text-foreground">Audiovisual</span>
          </h2>
          
          <p className="font-roboto text-lg md:text-xl lg:text-2xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Comunicador audiovisual apasionado por crear contenido innovador que conecta emocionalmente con las audiencias. 
            Especializado en <span className="text-foreground">fotografía</span>, 
            <span className="text-foreground"> edición de video</span> y 
            <span className="text-foreground"> gradación de color</span>, con dominio de herramientas como DaVinci Resolve y Adobe Suite.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToPortfolio}
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-montserrat font-semibold px-8 py-6 text-lg shadow-elegant transition-all hover:shadow-glow hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Explora mi Portafolio
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-montserrat font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contacto
            </Button>
          </div>
          
          <div className="animate-bounce">
            <ArrowDown className="h-8 w-8 text-foreground mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-foreground/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-foreground/30 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-foreground/20 rounded-full animate-pulse delay-700"></div>
    </section>
  );
};

export default HeroSection;