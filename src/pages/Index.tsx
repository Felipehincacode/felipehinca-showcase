import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Suspense, lazy } from "react";
const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const SkillsSlider = lazy(() => import("@/components/SkillsSlider"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { LanguageProvider } from "@/hooks/useLanguage";
import ScrollIndicator from "@/components/ScrollIndicator";
import { motion } from "framer-motion";

const Index = () => {
  useScrollAnimation();

  const popVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
        duration: 0.4 // Más rápido
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Más rápido: 0.1s → 0.05s
        delayChildren: 0.1 // Menos delay: 0.2s → 0.1s
      }
    }
  };

  return (
    <LanguageProvider>
      <motion.div 
        className="min-h-screen bg-background relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
        <div className="relative z-10">
          <motion.div variants={popVariants}>
            <Header />
          </motion.div>
          <motion.div variants={popVariants}>
            <ScrollIndicator />
          </motion.div>
          <motion.div variants={popVariants}>
            <HeroSection />
          </motion.div>
          <Suspense fallback={null}>
            <motion.div variants={popVariants} className="fade-in-up">
              <PortfolioSection />
            </motion.div>
          </Suspense>
          <Suspense fallback={null}>
            <motion.div variants={popVariants} id="skills">
              <SkillsSlider />
            </motion.div>
          </Suspense>
          <Suspense fallback={null}>
            <motion.div variants={popVariants} className="fade-in-left">
              <AboutSection />
            </motion.div>
          </Suspense>
          <Suspense fallback={null}>
            <motion.div variants={popVariants} className="fade-in-right">
              <ContactSection />
            </motion.div>
          </Suspense>
          <Suspense fallback={null}>
            <motion.div variants={popVariants}>
              <Footer />
            </motion.div>
          </Suspense>
        </div>
      </motion.div>
    </LanguageProvider>
  );
};

export default Index;
