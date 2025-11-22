import { ArrowDown, Gamepad2, Camera, Sprout, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import RafflePopup from "@/components/RafflePopup";
import SocialLinks from "@/components/SocialLinks";
import { useLanguage } from "@/contexts/LanguageContext";
import codmBgImage from "@assets/Picsart_25-01-08_09-25-56-556_1763836943841.jpg";
import photoBgImage from "@assets/IMG_20250719_145627~2_1763837256708.jpg";
import agricultureBgImage from "@assets/IMG_20250627_135015_1_1763837432932.jpg";
import devIcon from "@assets/generated_images/personal_development_icon.png";

export default function Home() {
  const { language } = useLanguage();
  const [showRaffle, setShowRaffle] = useState(false);

  useEffect(() => {
    // Show raffle popup when Home page loads and language is Portuguese
    if (language === "pt") {
      setShowRaffle(true);
    }
  }, []);
  const categories = [
    {
      id: "gaming",
      titlePt: "Call Of Duty Mobile",
      titleEn: "Call Of Duty Mobile",
      icon: Gamepad2,
      descriptionPt: "Tutoriais, Classes, HUD, Sensibilidade e etc.",
      descriptionEn: "Tutorials, Loadouts, HUD, Sensitivity and more.",
      imageUrl: codmBgImage,
      link: "/conteudo?category=gaming",
      testId: "card-category-gaming"
    },
    {
      id: "photography",
      titlePt: "Fotografia",
      titleEn: "Photography",
      icon: Camera,
      descriptionPt: "Capturando momentos, escritor, amante da melancolia",
      descriptionEn: "Capturing moments, writer, lover of melancholy",
      imageUrl: photoBgImage,
      link: "/conteudo?category=photography",
      testId: "card-category-photography"
    },
    {
      id: "agriculture",
      titlePt: "Agricultura",
      titleEn: "Agriculture",
      icon: Sprout,
      descriptionPt: "Meu trabalho, desenvolvimento pessoal e conexão com a natureza",
      descriptionEn: "My work, personal development and connection with nature",
      imageUrl: agricultureBgImage,
      link: "/conteudo?category=agriculture",
      testId: "card-category-agriculture"
    },
    {
      id: "development",
      titlePt: "Dev Pessoal",
      titleEn: "Personal Development",
      icon: Brain,
      descriptionPt: "Psicologia, filosofia, neurociência e autoconhecimento",
      descriptionEn: "Psychology, philosophy, neuroscience and self-knowledge",
      imageUrl: devIcon,
      link: null,
      testId: "card-category-development"
    },
  ];

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  const texts = {
    pt: {
      tagline: "Estrategista mental. Criando minha autenticidade.",
      description: "Perfil analítico com foco em performance mental, disciplina e conteúdo profundo.\nGaming, Fotografia, Agricultura e Desenvolvimento Pessoal.",
      explore: "Explorar Conteúdo",
      donate: "Apoiar",
      contact: "Contato",
      categories: "Áreas de Conteúdo",
      categoriesDesc: "Descubra meus projetos e conteúdos",
    },
    en: {
      tagline: "Mental strategist. Creating my authenticity.",
      description: "Analytical profile focused on mental performance, discipline and deep content.\nGaming, Photography, Agriculture and Personal Development.",
      explore: "Explore Content",
      donate: "Support",
      contact: "Contact",
      categories: "Content Areas",
      categoriesDesc: "Discover my projects and content",
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen">
      {/* Raffle Popup */}
      {showRaffle && language === "pt" && (
        <RafflePopup onClose={() => setShowRaffle(false)} language={language} />
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
          <div className="space-y-8 md:space-y-12">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none" 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                data-testid="text-hero-title"
              >
                SLX
              </h1>
              <p 
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" 
                data-testid="text-hero-tagline"
              >
                {t.tagline}
              </p>
            </div>

            {/* Description */}
            <p 
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed whitespace-pre-line" 
              data-testid="text-hero-description"
            >
              {t.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToCategories}
                size="lg"
                className="px-8 py-6 text-base"
                data-testid="button-hero-explore"
              >
                {t.explore}
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base"
                asChild
                data-testid="button-hero-donate"
              >
                <a href="/doacoes">{t.donate}</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-border/30">
              <SocialLinks language={language} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToCategories}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 animate-bounce"
          aria-label="Scroll para categorias"
          data-testid="button-scroll-indicator"
        >
          <ArrowDown className="h-8 w-8" />
        </button>
      </section>

      {/* Categories Section */}
      <section 
        id="categories" 
        className="py-16 md:py-24 bg-card" 
        data-testid="section-categories"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }} data-testid="text-categories-title">
                {t.categories}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-categories-description">
                {t.categoriesDesc}
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                const title = language === "pt" ? category.titlePt : category.titleEn;
                const description = language === "pt" ? category.descriptionPt : category.descriptionEn;
                const CardContent = (
                  <Card className={`relative overflow-hidden h-80 hover-elevate active-elevate-2 transition-all duration-300 ${!category.link ? 'opacity-60 cursor-not-allowed' : ''}`}>
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={category.imageUrl}
                          alt={title}
                          className="w-full h-full transition-transform duration-500 group-hover:scale-105 object-cover"
                          style={
                            category.id === "gaming"
                              ? { objectPosition: "85% 90%" }
                              : undefined
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                        <div className="space-y-3">
                          <Icon className="h-8 w-8 text-primary" />
                          <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                            {title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    </Card>
                );
                
                return category.link ? (
                  <a
                    key={category.id}
                    href={category.link}
                    className="group"
                    data-testid={category.testId}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div
                    key={category.id}
                    className="group"
                    data-testid={category.testId}
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
