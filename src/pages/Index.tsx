import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import SkillsSlider from "@/components/SkillsSlider";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { LanguageProvider } from "@/hooks/useLanguage";
import ScrollIndicator from "@/components/ScrollIndicator";
import { motion } from "framer-motion";

const Index = () => {
  useScrollAnimation();

  const popVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.6
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        <ParticleBackground />
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
          <motion.div variants={popVariants} className="fade-in-up">
            <PortfolioSection />
          </motion.div>
          <motion.div variants={popVariants} id="skills">
            <SkillsSlider />
          </motion.div>
          <motion.div variants={popVariants} className="fade-in-left">
            <AboutSection />
          </motion.div>
          <motion.div variants={popVariants} className="fade-in-right">
            <ContactSection />
          </motion.div>
          <motion.div variants={popVariants}>
            <Footer />
          </motion.div>
        </div>
      </motion.div>
    </LanguageProvider>
  );
};

export default Index;
