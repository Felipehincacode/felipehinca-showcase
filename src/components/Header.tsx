import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const felipeProfile = "/lovable-uploads/8535bbb6-e6a8-4ec6-b0d3-aeee6c93c655.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { name: t('nav.portfolio'), href: "#portfolio" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.contact'), href: "#contact" }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={felipeProfile} 
                alt="Felipe Hincapié Murillo" 
                className="w-12 h-12 rounded-full object-cover object-center ring-2 ring-primary shadow-elegant transition-transform hover:scale-105"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-lg md:text-xl text-foreground">
                Felipe Hincapié Murillo
              </h1>
              <p className="font-roboto text-xs md:text-sm text-muted-foreground">
                {t('hero.title')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-roboto text-muted-foreground hover:text-primary transition-colors duration-300 story-link"
              >
                {item.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="ml-4 text-muted-foreground hover:text-primary"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-roboto text-lg text-muted-foreground hover:text-primary transition-colors duration-300 story-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-primary justify-start pl-0"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'es' ? 'English' : 'Español'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;