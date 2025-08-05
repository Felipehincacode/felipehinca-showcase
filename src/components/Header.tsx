import felipeProfile from "@/assets/felipe-profile.jpg";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center md:justify-start space-x-4">
          <div className="relative">
            <img 
              src={felipeProfile} 
              alt="Felipe Hincapié Murillo" 
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary shadow-elegant transition-transform hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h1 className="font-montserrat font-bold text-xl md:text-2xl text-foreground">
              Felipe Hincapié Murillo
            </h1>
            <p className="font-roboto text-sm md:text-base text-muted-foreground">
              Comunicación y Lenguajes Audiovisuales, Universidad de Medellín
            </p>
            <p className="font-roboto text-xs text-primary">
              Egresado no titulado
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;