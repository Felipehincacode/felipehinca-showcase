import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import felipeProfile from "@/assets/felipe-profile.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20 z-0">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} className="border-r border-primary/20"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-0">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content with Photo and Text */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* Photo Section */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-mint-green/30 shadow-2xl">
                  <img
                    src={felipeProfile}
                    alt="Felipe Hincapié"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-mint-green rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-mint-green/60 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 -left-4 w-3 h-3 bg-mint-green/40 rounded-full animate-bounce"></div>
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div 
              className="text-center lg:text-left flex-1"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <motion.h1 
                className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground leading-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {t('hero.title')}
                <br />
                <span className="text-mint-green">{t('hero.subtitle')}</span>
              </motion.h1>
              
              <motion.p 
                className="font-roboto text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
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
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
          <div className="animate-bounce">
              <ArrowDown className="h-8 w-8 text-foreground" />
          </div>
          </motion.div>
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