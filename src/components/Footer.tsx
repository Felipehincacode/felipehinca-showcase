import { Github, Mail, Phone, Linkedin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      href: "https://github.com/felipehinca",
      icon: Github,
      label: "GitHub"
    },
    {
      href: "mailto:felipehinca@gmail.com",
      icon: Mail,
      label: "Email"
    },
    {
      href: "https://wa.me/573001234567",
      icon: Phone,
      label: "WhatsApp"
    },
    {
      href: "https://linkedin.com/in/felipehinca",
      icon: Linkedin,
      label: "LinkedIn"
    }
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-green rounded-full flex items-center justify-center">
                <span className="text-background font-bold text-lg">F</span>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg text-foreground">Felipe Hincapié</h3>
                <p className="font-roboto text-sm text-muted-foreground">Comunicador Audiovisual</p>
              </div>
            </div>
            
            <p className="font-roboto text-sm text-muted-foreground">
              Creando contenido visual que conecta y emociona. Especializado en cinematografía, 
              edición y desarrollo web moderno.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-foreground">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <a 
                href="#portfolio" 
                className="font-roboto text-muted-foreground hover:text-mint-green transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Portafolio
              </a>
              <br />
              <a 
                href="#about" 
                className="font-roboto text-muted-foreground hover:text-mint-green transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Acerca de Mí
              </a>
              <br />
              <a 
                href="#contact" 
                className="font-roboto text-muted-foreground hover:text-mint-green transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-foreground">Conecta</h4>
            <div className="flex space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 bg-secondary rounded-full text-muted-foreground hover:text-mint-green hover:bg-mint-green/20 transition-all duration-300 hover:scale-110 group"
                    aria-label={link.label}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="font-roboto text-sm text-muted-foreground">
            {t('footer.rights')}
          </p>
          <p className="font-roboto text-xs text-muted-foreground mt-2">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;