import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Instagram, Eye, Youtube } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "felipehinca@gmail.com",
      href: "mailto:felipehinca@gmail.com",
      color: "primary"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Teléfono",
      content: "+57 302 244 1587",
      href: "tel:+573022441587",
      color: "orange"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Behance",
      content: "behance.net/felipehinca",
      href: "https://behance.net/felipehinca",
      color: "primary"
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      title: "Instagram",
      content: "@caracol_aventurero",
      href: "https://instagram.com/caracol_aventurero",
      color: "orange"
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      title: "YouTube",
      content: "Canal de Felipe",
      href: "https://www.youtube.com/channel/UCnOKNo43azXJebnDzsyHzFQ",
      color: "primary"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-foreground">
            Conectemos <span className="text-primary">Juntos</span>
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría colaborar contigo y crear 
            algo extraordinario. ¡Hablemos!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className="group cursor-pointer border-border bg-gradient-card hover:shadow-elegant transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <a 
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <div className={`p-3 bg-${method.color}/20 rounded-full inline-flex mb-4 group-hover:bg-${method.color} group-hover:text-${method.color}-foreground transition-colors`}>
                      {method.icon}
                    </div>
                    
                    <h3 className={`font-montserrat font-semibold text-lg mb-2 text-foreground group-hover:text-${method.color} transition-colors`}>
                      {method.title}
                    </h3>
                    
                    <p className="font-roboto text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {method.content}
                    </p>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-card rounded-2xl p-8 border border-border">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4 text-foreground">
              ¿Listo para tu próximo proyecto?
            </h3>
            <p className="font-roboto text-muted-foreground mb-6 max-w-2xl mx-auto">
              Desde la conceptualización hasta la post-producción, estoy aquí para hacer realidad 
              tu visión audiovisual con la más alta calidad técnica y creativa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-montserrat font-semibold px-8 py-6 text-lg shadow-elegant transition-all hover:shadow-glow hover:scale-105"
                onClick={() => window.location.href = 'mailto:felipehinca@gmail.com'}
              >
                <Mail className="mr-2 h-5 w-5" />
                Enviar Email
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-orange text-orange hover:bg-orange hover:text-orange-foreground font-montserrat font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
                onClick={() => window.open('https://wa.me/573022441587', '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;