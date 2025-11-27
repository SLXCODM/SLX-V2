import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import type { AboutContent } from "@shared/schema";

import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { language } = useLanguage();
  // Try to fetch dynamic about content from API
  const { data: aboutContent, isLoading, isError, error } = useQuery<AboutContent>({
    queryKey: ["/api/about"],
    retry: false,
  });

  // Render plain text content safely (no HTML injection risk)
  const renderPlainTextContent = (content: string) => {
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      // Detect section headers (short lines with specific keywords)
      const isHeader = (
        trimmed.length < 50 && 
        (trimmed.includes('?') || 
         trimmed.includes('Por que') || 
         trimmed.includes('Minha mensagem') ||
         trimmed.includes('Como está'))
      );
      
      if (isHeader) {
        return (
          <p key={index} className="font-semibold text-foreground" data-testid={`text-about-header-${index}`}>
            {trimmed}
          </p>
        );
      }
      
      // Email link detection
      if (trimmed.includes('slowedbase@gmail.com')) {
        return (
          <div key={index} className="mt-12 p-6 md:p-8 bg-card border border-border rounded-lg space-y-4" data-testid="card-about-contact">
            <p className="text-sm text-muted-foreground">{trimmed.split(':')[0]}:</p>
            <Button variant="outline" className="gap-2" asChild data-testid="button-email-contact">
              <a href="mailto:slowedbase@gmail.com">
                <Mail className="h-4 w-4" />
                slowedbase@gmail.com
              </a>
            </Button>
          </div>
        );
      }
      
      return (
        <p key={index} className="text-base leading-relaxed text-muted-foreground" data-testid={`text-about-paragraph-${index}`}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {isLoading ? (
          <div className="space-y-8" data-testid="loading-about">
            <div className="h-12 bg-card border border-border rounded-md animate-pulse" />
            <div className="h-8 bg-card border border-border rounded-md animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-24 bg-card border border-border rounded-md animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-about-title">
                {language === "pt" ? "Sobre o SLX" : "About SLX"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-about-subtitle">
                {language === "pt" ? "Quem está por trás do nome" : "Who's behind the name"}
              </p>
            </div>

            {/* Content - Always render safely (no HTML injection) */}
            {isError ? (
              <div className="text-center py-16 space-y-4" data-testid="error-state-about">
                <p className="text-destructive font-medium">
                  Erro ao carregar conteúdo
                </p>
                <p className="text-sm text-muted-foreground">
                  {error instanceof Error ? error.message : "Tente novamente mais tarde"}
                </p>
              </div>
            ) : aboutContent ? (
              <div className="space-y-6" data-testid="content-about-dynamic">
                {renderPlainTextContent(aboutContent.content)}
                <AdSenseUnit slot="3456789012" format="auto" />
              </div>
            ) : (
              <div className="space-y-6" data-testid="content-about-static">
                {/* Bio Section */}
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-foreground">
                    {language === "pt" 
                      ? "Olá. Sou SLX, estrategista de pensamento, criador de conteúdo técnico e profundo nas áreas de gaming, fotografia, agricultura e desenvolvimento pessoal. Este espaço é onde compartilho minha jornada, experiências e tudo o que aprendi ao longo do caminho."
                      : "Hi. I'm SLX, a mental strategist, creator of technical and deep content in gaming, photography, agriculture and personal development. This space is where I share my journey, experiences and everything I've learned along the way."}
                  </p>
                </div>

                {/* AdSense Ad */}
                <AdSenseUnit slot="3456789012" format="auto" />

                {/* Journey Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    {language === "pt" ? "Minha Jornada" : "My Journey"}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Cresci enfrentando desafios pessoais significativos. Durante a infância e adolescência, lutei contra pensamentos sombrios e depressão que pareciam ser uma constante na minha vida. O isolamento e a dor emocional marcaram profundamente meus primeiros anos."
                      : "I grew up facing significant personal challenges. During childhood and adolescence, I struggled with dark thoughts and depression that seemed constant in my life. Isolation and emotional pain deeply marked my early years."}
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Quando estava no meu pior momento, quando pensava que não havia razão para continuar, algo mudou. Uma série de eventos inexplicáveis ocorreu na minha vida, e pela primeira vez em anos, senti um pequeno lampejo de esperança. Esse momento transformou tudo."
                      : "When I was at my worst, when I thought there was no reason to go on, something changed. A series of unexplainable events happened in my life, and for the first time in years, I felt a small glimmer of hope. That moment changed everything."}
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Prometi a mim mesmo que não deixaria aquele momento passar. Decidi que viveria uma vida de significado, não para o mundo, mas para mim mesmo. E assim nasceu SLX."
                      : "I promised myself I wouldn't let that moment pass. I decided I would live a life of meaning, not for the world, but for myself. And so SLX was born."}
                  </p>
                </div>

                {/* Gaming Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    Call of Duty Mobile
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Sou um jogador apaixonado por Call of Duty Mobile, trazendo o melhor para você através de loadouts de sniper, dicas tryhard, gameplay profissional e tutoriais detalhados. Compartilho todas as minhas configurações e até mesmo momentos de ASMR e criatividade sem filtros."
                      : "I'm a passionate Call of Duty Mobile player, bringing the best for you through sniper loadouts, tryhard tips, professional gameplay and detailed tutorials. I share all my configurations and even ASMR moments and unfiltered creativity."}
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Se você está aqui para melhorar suas habilidades ou apenas aproveitar boas partidas, este é o lugar certo. Conecte-se comigo através das minhas redes sociais para acompanhar as últimas estratégias e conteúdo exclusivo."
                      : "If you're here to improve your skills or just enjoy good matches, this is the right place. Connect with me through my social media to follow the latest strategies and exclusive content."}
                  </p>
                </div>

                {/* Setup Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    {language === "pt" ? "Setup & Equipamentos" : "Setup & Equipment"}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Utilizo equipamentos de qualidade para criar conteúdo profissional:"
                      : "I use quality equipment to create professional content:"}
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li>{language === "pt" ? "Smartphone: ASUS ROG Phone 8 (principal para CODM)" : "Smartphone: ASUS ROG Phone 8 (main for CODM)"}</li>
                    <li>{language === "pt" ? "Cooler: Nubia 4 Pro para manter performance máxima" : "Cooler: Nubia 4 Pro to maintain maximum performance"}</li>
                    <li>{language === "pt" ? "Câmera: [Sua câmera principal para fotografia]" : "Camera: [Your main camera for photography]"}</li>
                    <li>{language === "pt" ? "Edição: [Seu software de edição preferido]" : "Editing: [Your preferred editing software]"}</li>
                  </ul>

                  <p className="text-xs text-muted-foreground italic mt-4">
                    {language === "pt" ? "* Setup completo em imagens abaixo" : "* Complete setup in images below"}
                  </p>
                </div>

                {/* Gallery Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-8">
                  <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">{language === "pt" ? "Imagem do Setup (1)" : "Setup Image (1)"}</p>
                  </div>
                  <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">{language === "pt" ? "Imagem do Setup (2)" : "Setup Image (2)"}</p>
                  </div>
                </div>

                {/* Values Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    {language === "pt" ? "O que SLX Representa" : "What SLX Represents"}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "SLX não é apenas um nome. É um símbolo de ressurreição, de encontrar significado nas trevas. Significa estratégia, profundidade, autenticidade. Aqui você encontra conteúdo que não apenas entretém, mas faz você pensar, refletir e crescer."
                      : "SLX is not just a name. It's a symbol of resurrection, of finding meaning in darkness. It means strategy, depth, authenticity. Here you find content that not only entertains, but makes you think, reflect and grow."}
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Não sou um influencer superficial ou um motivador genérico. Sou alguém que trabalha com profundidade, análise e integridade em tudo que faço."
                      : "I'm not a superficial influencer or a generic motivator. I'm someone who works with depth, analysis and integrity in everything I do."}
                  </p>
                </div>

                {/* Message Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    {language === "pt" ? "Uma Mensagem Importante" : "An Important Message"}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Se você está passando pelo que eu passei, saiba que não está sozinho. A depressão é real e devastadora, mas também é tratável. Se você precisa de ajuda, peço que procure. Não guarde para si como eu fiz. Cada dia que você atrasa é um dia de sofrimento desnecessário."
                      : "If you're going through what I went through, know that you're not alone. Depression is real and devastating, but it's also treatable. If you need help, I ask that you seek it. Don't keep it to yourself like I did. Every day you delay is a day of unnecessary suffering."}
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {language === "pt" 
                      ? "Sua vida tem valor. Você tem valor."
                      : "Your life has value. You have value."}
                  </p>
                </div>

                {/* Collaboration Section */}
                <div className="mt-12 p-6 md:p-8 bg-card border border-border rounded-lg space-y-4">
                  <p className="font-semibold text-foreground">
                    {language === "pt" ? "Interessado em Colaborar ou Patrocinar?" : "Interested in Collaborating or Sponsoring?"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "pt" 
                      ? "Se você é uma marca, empresa ou criador interessado em trabalhar comigo, gostaria de ouvir sobre suas ideias. Envie uma mensagem para:"
                      : "If you're a brand, company or creator interested in working with me, I'd love to hear about your ideas. Send a message to:"}
                  </p>
                  <Button variant="outline" className="gap-2" asChild data-testid="button-email-contact">
                    <a href="mailto:slowedbase@gmail.com">
                      <Mail className="h-4 w-4" />
                      slowedbase@gmail.com
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
