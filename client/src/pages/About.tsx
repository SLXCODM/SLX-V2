import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import type { AboutContent } from "@shared/schema";

export default function About() {
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
                Sobre o SLX
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-about-subtitle">
                Quem está por trás do nome
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
                    Olá. Sou SLX, estrategista de pensamento, criador de conteúdo técnico e profundo nas áreas de gaming, fotografia, agricultura e desenvolvimento pessoal. Este espaço é onde compartilho minha jornada, experiências e tudo o que aprendi ao longo do caminho.
                  </p>
                </div>

                {/* AdSense Ad */}
                <AdSenseUnit slot="3456789012" format="auto" />

                {/* Journey Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    Minha Jornada
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Cresci enfrentando desafios pessoais significativos. Durante a infância e adolescência, lutei contra pensamentos sombrios e depressão que pareciam ser uma constante na minha vida. O isolamento e a dor emocional marcaram profundamente meus primeiros anos.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Quando estava no meu pior momento, quando pensava que não havia razão para continuar, algo mudou. Uma série de eventos inexplicáveis ocorreu na minha vida, e pela primeira vez em anos, senti um pequeno lampejo de esperança. Esse momento transformou tudo.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Prometi a mim mesmo que não deixaria aquele momento passar. Decidi que viveria uma vida de significado, não para o mundo, mas para mim mesmo. E assim nasceu SLX.
                  </p>
                </div>

                {/* Gaming Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    Call of Duty Mobile
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Sou um jogador apaixonado por Call of Duty Mobile, trazendo o melhor para você através de loadouts de sniper, dicas tryhard, gameplay profissional e tutoriais detalhados. Compartilho todas as minhas configurações e até mesmo momentos de ASMR e criatividade sem filtros.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Se você está aqui para melhorar suas habilidades ou apenas aproveitar boas partidas, este é o lugar certo. Conecte-se comigo através das minhas redes sociais para acompanhar as últimas estratégias e conteúdo exclusivo.
                  </p>
                </div>

                {/* Setup Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    Setup & Equipamentos
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Utilizo equipamentos de qualidade para criar conteúdo profissional:
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li>Smartphone: ASUS ROG Phone 8 (principal para CODM)</li>
                    <li>Cooler: Nubia 4 Pro para manter performance máxima</li>
                    <li>Câmera: [Sua câmera principal para fotografia]</li>
                    <li>Edição: [Seu software de edição preferido]</li>
                  </ul>

                  <p className="text-xs text-muted-foreground italic mt-4">
                    * Setup completo em imagens abaixo
                  </p>
                </div>

                {/* Gallery Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-8">
                  <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">Imagem do Setup (1)</p>
                  </div>
                  <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">Imagem do Setup (2)</p>
                  </div>
                </div>

                {/* Values Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    O que SLX Representa
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    SLX não é apenas um nome. É um símbolo de ressurreição, de encontrar significado nas trevas. Significa estratégia, profundidade, autenticidade. Aqui você encontra conteúdo que não apenas entretém, mas faz você pensar, refletir e crescer.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Não sou um influencer superficial ou um motivador genérico. Sou alguém que trabalha com profundidade, análise e integridade em tudo que faço.
                  </p>
                </div>

                {/* Message Section */}
                <div className="space-y-4 border-t border-border pt-8">
                  <p className="font-semibold text-foreground text-lg">
                    Uma Mensagem Importante
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Se você está passando pelo que eu passei, saiba que não está sozinho. A depressão é real e devastadora, mas também é tratável. Se você precisa de ajuda, peço que procure. Não guarde para si como eu fiz. Cada dia que você atrasa é um dia de sofrimento desnecessário.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    Sua vida tem valor. Você tem valor.
                  </p>
                </div>

                {/* Collaboration Section */}
                <div className="mt-12 p-6 md:p-8 bg-card border border-border rounded-lg space-y-4">
                  <p className="font-semibold text-foreground">
                    Interessado em Colaborar ou Patrocinar?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Se você é uma marca, empresa ou criador interessado em trabalhar comigo, gostaria de ouvir sobre suas ideias. Envie uma mensagem para:
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
