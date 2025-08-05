import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import SkillsSlider from "@/components/SkillsSlider";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PortfolioSection />
      <SkillsSlider />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
