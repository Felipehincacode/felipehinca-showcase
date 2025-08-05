import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'nav.portfolio': 'Portafolio',
    'nav.skills': 'Habilidades',
    'nav.about': 'Acerca de Mí',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'Comunicador Audiovisual',
    'hero.subtitle': 'Creando contenido visual que conecta y emociona',
    'hero.description': 'Especializado en cinematografía, edición, gradación de color y desarrollo web moderno. Transformo ideas en experiencias visuales memorables que impactan y generan resultados',
    'hero.cta': 'Explora mi Portafolio',
    
    // Portfolio
    'portfolio.title': 'Mi Portafolio',
    'portfolio.description': 'Una selección de proyectos que demuestran mi pasión por la creación audiovisual y mi compromiso con la calidad técnica y narrativa.',
    'portfolio.viewProject': 'Ver Proyecto',
    
    // Skills
    'skills.title': 'Mis Habilidades',
    'skills.description': 'Herramientas y tecnologías que domino para crear contenido audiovisual de alta calidad',
    'skills.filterAll': 'Todas',
    'skills.filterVideo': 'Edición de Video',
    'skills.filterPhoto': 'Fotografía',
    'skills.filterWeb': 'Desarrollo Web',
    'skills.filterAI': 'Inteligencia Artificial',
    'skills.filterProductivity': 'Productividad',
    
    // About
    'about.title': 'Acerca de Mí',
    'about.subtitle': 'Comunicador audiovisual apasionado por crear contenido innovador',
    
    // Contact
    'contact.title': 'Conectemos Juntos',
    'contact.description': '¿Tienes un proyecto en mente? Me encantaría colaborar contigo y crear algo extraordinario. ¡Hablemos!',
    'contact.email': 'Enviar Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.ready': '¿Listo para tu próximo proyecto?',
    'contact.readyDesc': 'Desde la conceptualización hasta la post-producción, estoy aquí para hacer realidad tu visión audiovisual con la más alta calidad técnica y creativa.',
    'modal.loading': 'Cargando contenido...',
  },
  en: {
    // Header
    'nav.portfolio': 'Portfolio',
    'nav.skills': 'Skills',
    'nav.about': 'About Me',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Audiovisual Communicator',
    'hero.subtitle': 'Creating visual content that connects and inspires',
    'hero.description': 'Specialized in cinematography, editing, color grading and modern web development. I transform ideas into memorable visual experiences that impact and deliver results',
    'hero.cta': 'Explore my Portfolio',
    
    // Portfolio
    'portfolio.title': 'My Portfolio',
    'portfolio.description': 'A selection of projects that demonstrate my passion for audiovisual creation and my commitment to technical and narrative quality.',
    'portfolio.viewProject': 'View Project',
    
    // Skills
    'skills.title': 'My Skills',
    'skills.description': 'Tools and technologies I master to create high-quality audiovisual content',
    'skills.filterAll': 'All',
    'skills.filterVideo': 'Video Editing',
    'skills.filterPhoto': 'Photography',
    'skills.filterWeb': 'Web Development',
    'skills.filterAI': 'Artificial Intelligence',
    'skills.filterProductivity': 'Productivity',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'Audiovisual communicator passionate about creating innovative content',
    
    // Contact
    'contact.title': 'Let\'s Connect',
    'contact.description': 'Have a project in mind? I\'d love to collaborate with you and create something extraordinary. Let\'s talk!',
    'contact.email': 'Send Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.ready': 'Ready for your next project?',
    'contact.readyDesc': 'From conceptualization to post-production, I\'m here to bring your audiovisual vision to life with the highest technical and creative quality.',
    'modal.loading': 'Loading content...',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};