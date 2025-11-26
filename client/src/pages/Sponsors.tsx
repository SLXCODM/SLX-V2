import { Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sponsors() {
  const { language } = useLanguage();

  const texts = {
    pt: {
      title: "Patrocínios & Parcerias",
      description: "Interessado em patrocinar conteúdo? Veja meu mediakit e entre em contato.",
      mediakitTitle: "Mediakit",
      mediakitDesc: "Visualize meu mediakit completo para conhecer alcance, audiência e formatos disponíveis.",
      viewMediakit: "Ver Mediakit Completo",
      directEmail: "Email Direto",
    },
    en: {
      title: "Sponsorships & Partnerships",
      description: "Interested in sponsoring content? Check out my mediakit and get in touch.",
      mediakitTitle: "Mediakit",
      mediakitDesc: "View my complete mediakit to see reach, audience, and available formats.",
      viewMediakit: "View Full Mediakit",
      directEmail: "Direct Email",
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-sponsors-title">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-sponsors-description">
            {t.description}
          </p>
        </div>

        <div className="space-y-8">
          {/* Direct Email Card - First */}
          <Card className="p-6 space-y-4" data-testid="card-sponsor-email">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" data-testid="text-direct-email-label">
                  {t.directEmail}
                </h3>
                <a
                  href="mailto:slowedbase@gmail.com"
                  className="text-base font-medium hover:text-primary transition-colors duration-300"
                  data-testid="link-sponsor-email"
                >
                  slowedbase@gmail.com
                </a>
              </div>
            </div>
          </Card>

          {/* Mediakit Card */}
          <Card className="overflow-hidden" data-testid="card-mediakit">
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-mediakit-title">
                  {t.mediakitTitle}
                </h2>
                <p className="text-muted-foreground" data-testid="text-mediakit-description">
                  {t.mediakitDesc}
                </p>
              </div>

              {/* Mediakit Embed */}
              <div className="rounded-lg overflow-hidden bg-card border border-border" data-testid="mediakit-embed">
                <iframe
                  src="https://beacons.ai/slx_codm/mediakit"
                  className="w-full h-[600px] md:h-[800px]"
                  title="SLX Mediakit"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="iframe-mediakit"
                />
              </div>

              {/* Fallback Link */}
              <Button
                asChild
                variant="outline"
                className="w-full"
                data-testid="button-mediakit-external"
              >
                <a
                  href="https://beacons.ai/slx_codm/mediakit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  {t.viewMediakit}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
