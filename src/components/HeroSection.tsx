import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();
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
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground leading-tight">
            Felipe Hincapié
            <br />
            <span className="text-mint-green">{t('hero.title')}</span>
          </h1>
          
          <p className="font-roboto text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            {t('hero.subtitle')}. {t('hero.description')}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToPortfolio}
              size="lg" 
              className="bg-mint-green text-background hover:bg-mint-green/90 font-montserrat font-semibold px-8 py-6 text-lg shadow-elegant transition-all hover:shadow-glow hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('hero.cta')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-montserrat font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('nav.contact')}
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

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-2 h-2 bg-mint-green/30 rounded-full animate-ping"></div>
              <div className="absolute top-40 right-32 w-1 h-1 bg-mint-green/40 rounded-full animate-pulse"></div>
              <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-mint-green/20 rounded-full animate-bounce"></div>
              
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border-r border-mint-green/20"></div>
                ))}
              </div>
            </div>
    </section>
  );
};

export default HeroSection;