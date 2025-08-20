import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Camera, Award, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

const felipeProfile = "/lovable-uploads/8535bbb6-e6a8-4ec6-b0d3-aeee6c93c655.png";

const AboutSection = () => {
  const { t } = useLanguage();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            {t('about.title').split(' ')[0]} <span className="text-mint-green">{t('about.title').split(' ')[1]}</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section with Photo */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Profile Photo */}
            <div className="flex justify-center mb-8">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img 
                  src={felipeProfile} 
                  alt="Felipe Hincapié Murillo" 
                  className="w-64 h-64 rounded-full object-cover object-center ring-4 ring-mint-green/30 shadow-2xl shadow-mint-green/20 transition-all duration-500"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-mint-green rounded-full border-4 border-background shadow-lg"></div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-400 rounded-full border-4 border-background shadow-lg animate-pulse"></div>
              </motion.div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="font-roboto text-foreground leading-relaxed mb-6">
                Comunicador audiovisual apasionado por crear contenido innovador que conecta con audiencias. 
                He trabajado como freelancer en proyectos de fotografía, edición de video y colorización, 
                utilizando herramientas avanzadas como <span className="text-mint-green">DaVinci Resolve</span> y 
                <span className="text-orange"> Adobe Suite</span>.
              </p>
              
              <p className="font-roboto text-muted-foreground leading-relaxed mb-6">
                Mi enfoque está en resolver necesidades visuales y narrativas mediante la combinación 
                de técnica, creatividad y compromiso con la calidad. Busco formar parte de proyectos 
                donde la innovación y el desarrollo visual sean clave para generar impacto.
              </p>
              
              <p className="font-roboto text-foreground leading-relaxed">
                Además de mi formación en comunicación audiovisual, he desarrollado habilidades en 
                programación web y manejo de inteligencias artificiales, lo que me permite ofrecer 
                soluciones integrales en el mundo digital.
              </p>
            </div>
          </motion.div>

          {/* Experience Cards */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:border-mint-green/30">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-mint-green/20 rounded-full">
                      <GraduationCap className="h-6 w-6 text-mint-green" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                        {t('about.academic')}
                      </h3>
                      <p className="font-roboto text-sm text-muted-foreground mb-2">
                        {t('about.university')}
                      </p>
                      <p className="font-roboto text-sm text-foreground">
                        {t('about.degree')}
                      </p>
                      <p className="font-roboto text-xs text-orange mt-2">
                        {t('about.highschool')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:border-mint-green/30">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange/20 rounded-full">
                      <Camera className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                        {t('about.freelancer')}
                      </h3>
                      <p className="font-roboto text-sm text-muted-foreground mb-2">
                        2018 - Presente
                      </p>
                      <ul className="font-roboto text-sm text-foreground space-y-1">
                        <li>• {t('about.filmmaker')}</li>
                        <li>• {t('about.photographer')}</li>
                        <li>• {t('about.collaboration')}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:border-mint-green/30">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-mint-green/20 rounded-full">
                      <Award className="h-6 w-6 text-mint-green" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                        {t('about.projects')}
                      </h3>
                      <p className="font-roboto text-sm text-muted-foreground mb-2">
                        {t('about.university')}
                      </p>
                      <ul className="font-roboto text-sm text-foreground space-y-1">
                        <li>• {t('about.lachaza')}</li>
                        <li>• {t('about.imborrable')}</li>
                        <li>• {t('about.charcos')}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:border-mint-green/30">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange/20 rounded-full">
                      <Globe className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                        {t('about.languages')}
                      </h3>
                      <p className="font-roboto text-sm text-foreground">
                        <span className="text-mint-green">{t('about.english')}</span> • 
                        <span className="text-orange"> {t('about.iaTools')}</span> • 
                        <span className="text-mint-green"> {t('about.webDev')}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;