import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Camera, Award, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            Acerca de <span className="text-primary">Mí</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi pasión por la comunicación audiovisual me ha llevado a explorar diferentes facetas 
            de la creación de contenido y el desarrollo tecnológico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="font-roboto text-foreground leading-relaxed mb-6">
                Comunicador audiovisual apasionado por crear contenido innovador que conecta con audiencias. 
                He trabajado como freelancer en proyectos de fotografía, edición de video y colorización, 
                utilizando herramientas avanzadas como <span className="text-primary">DaVinci Resolve</span> y 
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
          </div>

          {/* Experience Cards */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                      Formación Académica
                    </h3>
                    <p className="font-roboto text-sm text-muted-foreground mb-2">
                      Universidad de Medellín • 2017-2023
                    </p>
                    <p className="font-roboto text-sm text-foreground">
                      Comunicación Audiovisual y Lenguajes (pensum finalizado, en proceso de titulación)
                    </p>
                    <p className="font-roboto text-xs text-orange mt-2">
                      Bachillerato: IE Colegio Loyola - Honores por mejor ICFES
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange/20 rounded-full">
                    <Camera className="h-6 w-6 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                      Freelancer - Contenido Audiovisual
                    </h3>
                    <p className="font-roboto text-sm text-muted-foreground mb-2">
                      2018 - Presente
                    </p>
                    <ul className="font-roboto text-sm text-foreground space-y-1">
                      <li>• Filmmaker para Círculo de Medellín</li>
                      <li>• Fotógrafo para eventos sociales</li>
                      <li>• Colaboración con Gilberto Montoya</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                      Proyectos Destacados
                    </h3>
                    <p className="font-roboto text-sm text-muted-foreground mb-2">
                      Universidad de Medellín • 2017-2023
                    </p>
                    <ul className="font-roboto text-sm text-foreground space-y-1">
                      <li>• "La Chaza" - Premios Huella</li>
                      <li>• "Imborrable" - Video Musical</li>
                      <li>• "Charcos" - SmartFilms Contest</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange/20 rounded-full">
                    <Globe className="h-6 w-6 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                      Idiomas & Herramientas
                    </h3>
                    <p className="font-roboto text-sm text-foreground">
                      <span className="text-primary">Inglés B1</span> • 
                      <span className="text-orange"> IA Tools</span> • 
                      <span className="text-primary"> Web Development</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;