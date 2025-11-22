import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-about-title">
              Sobre SLX
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-about-subtitle">
              Quem está por trás do nome
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-foreground" data-testid="text-about-intro">
              Uma breve descrição do que você pode gostar de saber sobre este nictófilo:
            </p>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p data-testid="text-about-paragraph-1">
                À primeira vista, este texto pode parecer desnecessário, mas recentemente, tenho refletido sobre meu passado,
                percebendo que durante toda a minha infância, pensamentos de suicídio me consumiam.
              </p>

              <p data-testid="text-about-paragraph-2">
                Praticamente 7 anos se passaram desde que percebi que meu mundo estava desmoronando. Em toda a minha vida
                ou praticamente toda a minha infância, todos os dias de todos os meses de todos os anos... Como eu era apenas
                um adolescente, não percebi o que estava acontecendo.
              </p>

              <p data-testid="text-about-paragraph-3">
                Depois de um tempo solitário, acabei me apaixonando por alguém. Consegui me apaixonar, e como acontece com
                quase todas as pessoas, esse amor me destruiu. Mas isso foi bom; me fez uma pessoa não dependente emocionalmente.
              </p>

              <p className="font-semibold text-foreground" data-testid="text-about-why-slx">
                Por que SLX?
              </p>

              <p data-testid="text-about-paragraph-4">
                Com 6 dias restantes para cometer o ato que esperei minha vida toda, minha vida passou por mudanças profundas,
                coisas inexplicáveis aconteceram e finalmente, pela primeira vez, senti o desejo de viver... Finalmente um
                momento sem ansiedade, apenas a emoção de ser um ser humano feliz.
              </p>

              <p data-testid="text-about-paragraph-5">
                A partir de então, prometi a mim mesmo que mudaria o rumo da minha vida, seria alguém importante, pelo menos
                para mim. Não posso dizer que me senti curado depois daquele dia, mas de alguma forma uma faísca se acendeu
                em uma janela de luz de pensamento que me fez lembrar quem sou e a importância de ser eu mesmo.
              </p>

              <p data-testid="text-about-paragraph-6">
                SLX foi um nome apenas para não deixar claro que o significado é seis, para mostrar que não queria expor o
                que aconteceu comigo, eu era apenas uma das milhares de crianças que passaram toda a vida com depressão, e
                piorando a cada dia que passava.
              </p>

              <p className="font-semibold text-foreground" data-testid="text-about-message-title">
                Minha mensagem:
              </p>

              <p data-testid="text-about-paragraph-7">
                Meu objetivo com este texto (caso alguém leia um dia) é apenas mostrar que não é o fim, a depressão pode
                ser curada e se você precisar de ajuda, não faça como eu mantendo para mim mesmo, vá e procure ajuda porque
                os sintomas vão piorar a cada dia que passa e você ignora isso.
              </p>

              <p data-testid="text-about-paragraph-8">
                Para SLX, peça ajuda.
              </p>
            </div>

            {/* Contact Card */}
            <div className="mt-12 p-6 md:p-8 bg-card border border-border rounded-lg space-y-4" data-testid="card-about-contact">
              <p className="text-sm text-muted-foreground" data-testid="text-about-rare-reader">
                Se você leu até aqui, você é uma pessoa rara. Por favor, certifique-se de me avisar:
              </p>
              <Button
                variant="outline"
                className="gap-2"
                asChild
                data-testid="button-email-contact"
              >
                <a href="mailto:slowedbase@gmail.com">
                  <Mail className="h-4 w-4" />
                  slowedbase@gmail.com
                </a>
              </Button>
            </div>

            {/* Current State */}
            <div className="mt-12 space-y-4">
              <p className="font-semibold text-foreground" data-testid="text-about-current-title">
                Como está o SLX hoje em dia?
              </p>
              <p className="text-base leading-relaxed text-muted-foreground" data-testid="text-about-current-description">
                Bem, eu... não consigo pensar direito, não consigo falar muito, meu trabalho me cansa e me sinto pior a
                cada dia por essa razão... Estou aproveitando o tempo que me resta para conhecer pessoas e me divertir
                um pouco em um jogo estranho...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
