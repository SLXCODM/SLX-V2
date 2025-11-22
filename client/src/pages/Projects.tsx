import { Youtube, Instagram, Music, BookOpen } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FollowToUnlock from "@/components/FollowToUnlock";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Projects() {
  const { language } = useLanguage();

  const projects = [
    {
      id: "classes",
      title: "Classes e Configurações",
      description: "Acesso exclusivo às minhas melhores classes de CODM, sensibilidade, HUD e loadouts otimizados",
      icon: BookOpen,
      color: "text-blue-500",
      stats: "Exclusivo",
      testId: "card-project-classes",
      isExclusive: true,
      externalLinks: [
        { label: "Ver no TikTok", url: "https://www.tiktok.com/@slxcodm_/collection/Configs, loadouts, sensi etc-7510645794769668869?is_from_webapp=1&sender_device=pc" },
        { label: "Ver no YouTube", url: "https://youtube.com/playlist?list=PLNjPit_9myAFwYgp2zNBJs6EzzZ-qs839&si=1nwFMIqFbddx6X0F" },
      ]
    },
    {
      id: "tutorials",
      title: "Tutoriais Profissionais",
      description: "Guias completos sobre CODM, análise de gameplay, dicas avançadas e como melhorar seu desempenho",
      icon: BookOpen,
      color: "text-cyan-500",
      stats: "Exclusivo",
      testId: "card-project-tutorials",
      isExclusive: true,
      externalLinks: [
        { label: "Ver no TikTok", url: "https://www.tiktok.com/@slxcodm_/collection/Dicas e tutoriais-7505787344423766790?is_from_webapp=1&sender_device=pc" },
        { label: "Ver no YouTube", url: "https://youtube.com/playlist?list=PLNjPit_9myAFBhDzh635QGPgzukbXRYLg&si=USW67NX2QODG00eh" },
      ]
    },
    {
      id: "youtube-gaming",
      title: "YouTube - Gaming",
      description: "Canal principal com tutoriais de Call of Duty Mobile, estratégias, HUD e gameplay profissional",
      icon: Youtube,
      color: "text-red-500",
      url: "https://www.youtube.com/@SLXCODM",
      stats: "Tutoriais e Gameplay",
      testId: "card-project-youtube-gaming"
    },
    {
      id: "instagram",
      title: "Instagram",
      description: "Portfólio de fotografia, momentos capturados e exploração da melancolia visual",
      icon: Instagram,
      color: "text-pink-500",
      url: "https://www.instagram.com/slx.wav",
      stats: "Fotografia e Lifestyle",
      testId: "card-project-instagram"
    },
    {
      id: "tiktok",
      title: "TikTok",
      description: "Lives, clipes curtos de gameplay e interação direta com a comunidade",
      icon: SiTiktok,
      color: "text-cyan-400",
      url: "https://www.tiktok.com/@slxcodm_",
      stats: "Lives e Clipes",
      testId: "card-project-tiktok"
    },
    {
      id: "youtube-agriculture",
      title: "YouTube - Agricultura",
      description: "Canal dedicado ao trabalho no campo, desenvolvimento pessoal e conexão com a natureza",
      icon: Youtube,
      color: "text-green-500",
      url: "https://www.youtube.com/@SLNXofc",
      stats: "Trabalho e Dev Pessoal",
      testId: "card-project-youtube-agriculture"
    },
  ];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-projects-title">
              Classes e Canais
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-projects-description">
              Acesse meus conteúdos exclusivos e todos os meus canais nas redes sociais
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" data-testid="grid-projects">
            {projects.map((project) => {
              const Icon = project.icon;
              if (project.isExclusive) {
                return (
                  <div key={project.id} data-testid={project.testId}>
                    <FollowToUnlock contentName={project.title} language={language}>
                      <Card className="p-8 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
                            <Icon className={`h-7 w-7 ${project.color}`} />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{project.title}</h2>
                            <p className="text-sm text-muted-foreground">{project.stats}</p>
                          </div>
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed">{project.description}</p>
                        <div className="space-y-2">
                          {project.externalLinks?.map((link, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(link.url, '_blank')}
                              data-testid={`button-exclusive-link-${project.id}-${idx}`}
                            >
                              {link.label}
                            </Button>
                          ))}
                        </div>
                      </Card>
                    </FollowToUnlock>
                  </div>
                );
              }
              return (
                <Card
                  key={project.id}
                  className="p-8 space-y-6 hover-elevate active-elevate-2 transition-all duration-300"
                  data-testid={project.testId}
                >
                  {/* Icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
                      <Icon className={`h-7 w-7 ${project.color}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted-foreground" data-testid={`text-project-stats-${project.id}`}>
                        {project.stats}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base text-muted-foreground leading-relaxed" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>

                  {/* CTA */}
                  <Button
                    className="w-full"
                    asChild
                    data-testid={`button-visit-${project.id}`}
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visitar
                    </a>
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 p-8 bg-card border border-border rounded-lg space-y-4" data-testid="card-projects-collaboration">
            <h3 className="text-xl font-semibold" data-testid="text-collaboration-title">
              Interessado em colaborar?
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed" data-testid="text-collaboration-description">
              Se você é um patrocinador ou está interessado em parcerias, entre em contato através
              da página de contato ou diretamente pelo email.
            </p>
            <div className="flex gap-4">
              <Button asChild data-testid="button-goto-contact">
                <a href="/contato">Entrar em Contato</a>
              </Button>
              <Button variant="outline" asChild data-testid="button-email-direct">
                <a href="mailto:slowedbase@gmail.com">Email Direto</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
