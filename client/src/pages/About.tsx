import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
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

          {/* Content */}
          <div className="space-y-6">
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

            {/* Full Bio Section */}
            <div className="space-y-4 border-t border-border pt-8">
              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "SLX é um criador de conteúdo e pensador independente que trabalha com jogos, filosofia prática e desenvolvimento mental. Identificado com altas habilidades cognitivas (superdotação), desenvolveu desde cedo uma percepção aguçada de padrões de comportamento, tomada de decisão e controle emocional."
                  : "SLX is an independent content creator and thinker who works with games, practical philosophy and personal development. Identified with high cognitive abilities (giftedness), developed early on a sharp perception of behavioral patterns, decision making and emotional control."}
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Fora do ambiente digital, mantém uma rotina física e mentalmente exigente. Mora no interior do Rio Grande do Sul, onde trabalha com atividades rurais, o que construiu uma base sólida de disciplina, resistência mental e convivência com o silêncio e o isolamento. Esse contraste entre o trabalho físico e o ambiente digital moldou seu estilo de pensamento: prático, direto e pouco influenciado por tendências superficiais."
                  : "Outside the digital environment, he maintains a physically and mentally demanding routine. He lives in the interior of Rio Grande do Sul, where he works with rural activities, which built a solid foundation of discipline, mental resilience and coexistence with silence and isolation. This contrast between physical work and the digital environment shaped his thinking style: practical, direct and little influenced by superficial trends."}
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Sua rotina inclui treinos, estudo contínuo e períodos prolongados de introspecção. Estuda por interesse próprio áreas como neurociência, psicologia, filosofia e comportamento humano, utilizando o conhecimento como ferramenta para compreender a si mesmo e a realidade ao seu redor."
                  : "His routine includes training, continuous study and prolonged periods of introspection. He studies areas such as neuroscience, psychology, philosophy and human behavior out of personal interest, using knowledge as a tool to understand himself and the reality around him."}
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Seu trabalho não se baseia em entretenimento vazio, mas em estratégia, mentalidade e construção de identidade própria. Prefere manter sua vida pessoal distante de romantizações e de exposição excessiva. Sua identidade não é construída para agradar públicos, mas como uma extensão natural do que vive diariamente. Seus projetos são guiados por autonomia, autenticidade e pela necessidade de construir algo sólido no longo prazo."
                  : "His work is not based on empty entertainment, but on strategy, mentality and building his own identity. He prefers to keep his personal life away from romanticization and excessive exposure. His identity is not built to please audiences, but as a natural extension of what he lives daily. His projects are guided by autonomy, authenticity and the need to build something solid in the long term."}
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Desde criança, a tristeza, a depressão profunda e a solidão emocional e cognitiva moldaram sua forma de enxergar a realidade. Com uma mente acelerada, encontrou no caos uma forma de organizar pensamentos, regular emoções e lidar com a ansiedade, o estresse diário é o que dá sentido a vida."
                  : "Since childhood, sadness, deep depression and emotional and cognitive loneliness have shaped how he sees reality. With an accelerated mind, he found in chaos a way to organize thoughts, regulate emotions and deal with anxiety, daily stress is what gives life meaning."}
              </p>
            </div>

            {/* Why SLX Section */}
            <div className="space-y-4 border-t border-border pt-8">
              <p className="font-semibold text-foreground text-lg">
                {language === "pt" ? "Por que SLX?" : "Why SLX?"}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "SLX vem de six (seis em inglês), desde criança vivi com planejamento de acabar com a minha vida aos 18 anos, mas 6 dias antes de cometer, coisas inexplicáveis aconteceram comigo e que mudaram minha visão sobre eu mesmo, hoje em dia ainda luto diariamente contra esse desejo, mas deixo escondido porque não quero mostrar para ninguém minha dor, minha forma de camuflar isso foi escrevendo SLX ao invés de six."
                  : "SLX comes from six (six in English), since childhood I lived with the plan to end my life at 18 years old, but 6 days before attempting it, inexplicable things happened to me that changed my view of myself, nowadays I still struggle daily against this desire, but I keep it hidden because I don't want to show anyone my pain, my way of disguising this was writing SLX instead of six."}
              </p>
            </div>

            {/* Message Section */}
            <div className="space-y-4 border-t border-border pt-8">
              <p className="font-semibold text-foreground text-lg">
                {language === "pt" ? "Minha Mensagem" : "My Message"}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Meu objetivo com este texto (caso alguém leia um dia) é apenas mostrar que não é o fim, a depressão pode ser curada e se você precisar de ajuda, não faça como eu mantendo para mim mesmo, vá e procure ajuda porque os sintomas vão piorar a cada dia que passa que você ignora isso."
                  : "My goal with this text (if anyone reads it someday) is just to show that it's not the end, depression can be cured and if you need help, don't do like I did by keeping it to myself, go and seek help because symptoms will worsen every day you ignore it."}
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Você pode entrar em contato comigo para conversar caso você esteja passando por problemas difíceis, acesse a aba de redes sociais."
                  : "You can contact me to talk if you are going through difficult problems, access the social media tab."}
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
        </div>
      </div>
    </div>
  );
}
