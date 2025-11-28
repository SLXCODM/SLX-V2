import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdSenseUnit } from "@/components/AdSenseUnit";

export default function Contact() {
  const { language } = useLanguage();

  const texts = {
    pt: {
      title: "Contato",
      description: "Entre em contato para colaborações, dúvidas ou sugestões.",
      email: "slowedbase@gmail.com",
      emailLabel: "Email de Contato:"
    },
    en: {
      title: "Contact",
      description: "Get in touch for collaborations, questions or suggestions.",
      email: "slowedbase@gmail.com",
      emailLabel: "Contact Email:"
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="heading-contact-title">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-contact-description">
            {t.description}
          </p>
        </div>

        {/* Advertisement */}
        <div className="mb-12">
          <AdSenseUnit slot="4567890123" format="auto" />
        </div>

        {/* Email Card */}
        <div className="border border-border rounded-lg bg-card p-8 md:p-12 space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-primary mt-1 flex-shrink-0" data-testid="icon-contact-email" />
            <div className="space-y-2 flex-1">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" data-testid="text-contact-email-label">
                {t.emailLabel}
              </p>
              <a
                href="mailto:slowedbase@gmail.com"
                className="text-2xl md:text-3xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 break-all"
                data-testid="link-contact-email"
              >
                slowedbase@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
