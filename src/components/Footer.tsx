import { Instagram, Eye, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <Eye className="h-5 w-5" />,
      href: "https://behance.net/felipehinca",
      label: "Behance"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com/caracol_aventurero",
      label: "Instagram"
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/channel/UCnOKNo43azXJebnDzsyHzFQ",
      label: "YouTube"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:felipehinca@gmail.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Logo/Name */}
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">
              Felipe Hincapié Murillo
            </h3>
            <p className="font-roboto text-muted-foreground">
              Comunicador Audiovisual • Creador de Contenido Digital
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 bg-secondary rounded-full text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a 
              href="#portfolio" 
              className="font-roboto text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Portafolio
            </a>
            <a 
              href="#about" 
              className="font-roboto text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Acerca de Mí
            </a>
            <a 
              href="#contact" 
              className="font-roboto text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="font-roboto text-sm text-muted-foreground">
              © {currentYear} Felipe Hincapié Murillo. Todos los derechos reservados.
            </p>
            <p className="font-roboto text-xs text-muted-foreground mt-2">
              Diseñado con pasión para conectar historias con audiencias
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;