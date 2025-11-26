import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();

  const texts = {
    pt: {
      title: "Contato",
      description: "Entre em contato para colaborações, patrocínios ou apenas para conversar",
      emailLabel: "Email Direto",
      collaborationTitle: "Colaborações & Patrocínios",
      collaborationDesc: "Aberto para parcerias com marcas que se alinham com conteúdo profissional, gaming de alto nível, fotografia ou desenvolvimento pessoal.",
      responseTitle: "Tempo de Resposta",
      responseDesc: "Procuro responder em até 48 horas. Para assuntos urgentes, prefira contato direto via Instagram ou Discord.",
    },
    en: {
      title: "Contact",
      description: "Get in touch for collaborations, sponsorships or just to chat",
      emailLabel: "Direct Email",
      collaborationTitle: "Collaborations & Sponsorships",
      collaborationDesc: "Open for partnerships with brands that align with professional content, high-level gaming, photography or personal development.",
      responseTitle: "Response Time",
      responseDesc: "I aim to respond within 48 hours. For urgent matters, prefer direct contact via Instagram or Discord.",
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-contact-title">
              {t.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed" data-testid="text-contact-description">
              {t.description}
            </p>
          </div>

          {/* Direct Email - First */}
          <Card className="p-6 space-y-4" data-testid="card-direct-contact">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" data-testid="text-email-label">
                  {t.emailLabel}
                </h3>
                <a
                  href="mailto:slowedbase@gmail.com"
                  className="text-base font-medium hover:text-primary transition-colors duration-300"
                  data-testid="link-email-direct"
                >
                  slowedbase@gmail.com
                </a>
              </div>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold" data-testid="text-collaboration-info-title">
                {t.collaborationTitle}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-collaboration-info-description">
                {t.collaborationDesc}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold" data-testid="text-response-info-title">
                {t.responseTitle}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-response-info-description">
                {t.responseDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
