import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // Animación de scroll suave con efecto de rebote
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Ajuste para el header fijo
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Efecto visual de resaltado en la sección
      element.style.transition = 'all 0.3s ease';
      element.style.transform = 'scale(1.02)';
      element.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.3)';
      
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.boxShadow = 'none';
      }, 300);
    }
  };

  const menuItems = [
    { id: "portfolio", label: t("nav.portfolio") },
    { id: "skills", label: t("nav.skills") },
    { id: "about", label: t("nav.about") },
    { id: "contact", label: t("nav.contact") },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="font-roboto text-muted-foreground hover:text-mint-green transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: 0.1 + index * 0.1 
                }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint-green group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Right side - Language Toggle */}
          <motion.button
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="hidden md:flex items-center space-x-2 text-muted-foreground hover:text-mint-green transition-colors duration-300"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          >
            <Globe className="h-4 w-4" />
            <span className="font-roboto text-sm font-medium">
              {language.toUpperCase()}
            </span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-mint-green transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border/50"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="w-full text-left px-4 py-3 font-roboto text-muted-foreground hover:text-mint-green hover:bg-muted/50 rounded-lg transition-all duration-300"
                    variants={menuItemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={() => setLanguage(language === "es" ? "en" : "es")}
                  className="w-full text-left px-4 py-3 font-roboto text-muted-foreground hover:text-mint-green hover:bg-muted/50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  variants={menuItemVariants}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === "es" ? "English" : "Español"}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;