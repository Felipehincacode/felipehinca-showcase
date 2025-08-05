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
    'portfolio.description': 'Una colección de proyectos que demuestran mi pasión por la comunicación audiovisual y el desarrollo web.',
    'portfolio.viewProject': 'Ver Proyecto',
    'portfolio.filterAll': 'Todos',
    'portfolio.filterAudiovisual': 'Audiovisual',
    'portfolio.filterPhotography': 'Fotografía',
    'portfolio.filterWeb': 'Desarrollo Web',
    
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
    'about.description': 'Mi pasión por la comunicación audiovisual me ha llevado a explorar diferentes facetas de la creación de contenido y el desarrollo tecnológico.',
    'about.academic': 'Formación Académica',
    'about.freelancer': 'Freelancer - Contenido Audiovisual',
    'about.projects': 'Proyectos Destacados',
    'about.languages': 'Idiomas & Herramientas',
    'about.university': 'Universidad de Medellín • 2017-2023',
    'about.degree': 'Comunicación Audiovisual y Lenguajes (pensum finalizado, en proceso de titulación)',
    'about.highschool': 'Bachillerato: IE Colegio Loyola - Honores por mejor ICFES',
    'about.filmmaker': 'Filmmaker para Círculo de Medellín',
    'about.photographer': 'Fotógrafo para eventos sociales',
    'about.collaboration': 'Colaboración con Gilberto Montoya',
    'about.lachaza': '"La Chaza" - Premios Huella',
    'about.imborrable': '"Imborrable" - Video Musical',
    'about.charcos': '"Charcos" - SmartFilms Contest',
    'about.english': 'Inglés B1',
    'about.iaTools': 'IA Tools',
    'about.webDev': 'Web Development',
    
    // Contact
    'contact.title': 'Conectemos Juntos',
    'contact.description': '¿Tienes un proyecto en mente? Me encantaría colaborar contigo y crear algo extraordinario. ¡Hablemos!',
    'contact.email': 'Enviar Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.ready': '¿Listo para tu próximo proyecto?',
    'contact.readyDesc': 'Desde la conceptualización hasta la post-producción, estoy aquí para hacer realidad tu visión audiovisual con la más alta calidad técnica y creativa.',
    'contact.sending': 'Enviando...',
    'contact.send': 'Enviar Mensaje',
    'contact.name': 'Nombre',
    'contact.emailPlaceholder': 'tu@email.com',
    'contact.message': 'Mensaje',
    'contact.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
    
    // Modal
    'modal.loading': 'Cargando contenido...',
    'modal.close': 'Cerrar',
    
    // Footer
    'footer.rights': '© 2024 Felipe Hincapié. Todos los derechos reservados.',
    'footer.madeWith': 'Hecho con ❤️ en Colombia',
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
    'portfolio.description': 'A collection of projects that demonstrate my passion for audiovisual communication and web development.',
    'portfolio.viewProject': 'View Project',
    'portfolio.filterAll': 'All',
    'portfolio.filterAudiovisual': 'Audiovisual',
    'portfolio.filterPhotography': 'Photography',
    'portfolio.filterWeb': 'Web Development',
    
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
    'about.description': 'My passion for audiovisual communication has led me to explore different facets of content creation and technological development.',
    'about.academic': 'Academic Formation',
    'about.freelancer': 'Freelancer - Audiovisual Content',
    'about.projects': 'Featured Projects',
    'about.languages': 'Languages & Tools',
    'about.university': 'Universidad de Medellín • 2017-2023',
    'about.degree': 'Audiovisual Communication and Languages (curriculum completed, in graduation process)',
    'about.highschool': 'High School: IE Colegio Loyola - Honors for best ICFES',
    'about.filmmaker': 'Filmmaker for Círculo de Medellín',
    'about.photographer': 'Photographer for social events',
    'about.collaboration': 'Collaboration with Gilberto Montoya',
    'about.lachaza': '"La Chaza" - Huella Awards',
    'about.imborrable': '"Imborrable" - Music Video',
    'about.charcos': '"Charcos" - SmartFilms Contest',
    'about.english': 'English B1',
    'about.iaTools': 'AI Tools',
    'about.webDev': 'Web Development',
    
    // Contact
    'contact.title': 'Let\'s Connect',
    'contact.description': 'Have a project in mind? I\'d love to collaborate with you and create something extraordinary. Let\'s talk!',
    'contact.email': 'Send Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.ready': 'Ready for your next project?',
    'contact.readyDesc': 'From conceptualization to post-production, I\'m here to bring your audiovisual vision to life with the highest technical and creative quality.',
    'contact.sending': 'Sending...',
    'contact.send': 'Send Message',
    'contact.name': 'Name',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project...',
    
    // Modal
    'modal.loading': 'Loading content...',
    'modal.close': 'Close',
    
    // Footer
    'footer.rights': '© 2024 Felipe Hincapié. All rights reserved.',
    'footer.madeWith': 'Made with ❤️ in Colombia',
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