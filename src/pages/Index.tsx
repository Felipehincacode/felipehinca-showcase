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

const Index = () => {
  useScrollAnimation();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background relative">
        <ParticleBackground />
        <div className="relative z-10">
          <Header />
          <ScrollIndicator />
          <HeroSection />
          <div className="fade-in-up">
            <PortfolioSection />
          </div>
          <div id="skills">
            <SkillsSlider />
          </div>
          <div className="fade-in-left">
            <AboutSection />
          </div>
          <div className="fade-in-right">
            <ContactSection />
          </div>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
