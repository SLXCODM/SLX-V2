import { Heart, Heart as HeartIcon, Zap, Gift, Coffee, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DonationsProps {
  language: "pt" | "en";
}

export default function Donations({ language }: DonationsProps) {
  const texts = {
    pt: {
      title: "Suporte e Doações",
      subtitle: "Ajude a manter o conteúdo de qualidade em funcionamento",
      description: "Suas contribuições permitem que eu continue criando conteúdo exclusivo, tutoriais profundos e análises técnicas.",
      thankYou: "Muito Obrigado! 💙",
      yourSupport: "Seu apoio significa muito e ajuda diretamente no desenvolvimento do conteúdo.",
      donationOptions: "Formas de Apoiar",
      donationMethods: [
        {
          title: "LivePix",
          description: "Doação via LivePix",
          link: "https://livepix.gg/slx",
          icon: "💳"
        },
        {
          title: "Doe Rapidamente",
          description: "Vakinha para doações rápidas",
          link: "https://vakinha.bio/5344505",
          icon: "⚡"
        },
        {
          title: "Da Enxada ao CODM",
          description: "Vaquinha principal",
          link: "https://www.vakinha.com.br/vaquinha/da-enxada-ao-call-of-duty-mobile",
          icon: "🌾"
        },
        {
          title: "Minha Terapia",
          description: "Vaquinha do LivePix",
          link: "https://livepix.gg/vaquinha/minha-terapia",
          icon: "🎨"
        },
        {
          title: "Ajude o H7",
          description: "Conserto da moto",
          link: "https://www.vakinha.com.br/vaquinha/conserto-da-moto-slx",
          icon: "🏍️"
        },
        {
          title: "PIX Direto",
          description: "b23a8dc0-c540-4d9b-8aaa-d91800bdb434",
          icon: "🔑",
          isPix: true
        },
        {
          title: "QR Code LivePix",
          description: "Escaneie para doar",
          link: "https://widget.livepix.gg/embed/d625198c-66f5-4197-9a87-d0786dda48ba",
          icon: "📱"
        }
      ]
    },
    en: {
      title: "Support and Donations",
      subtitle: "Help keep quality content flowing",
      description: "Your contributions allow me to continue creating exclusive content, deep tutorials, and technical analysis.",
      thankYou: "Thank You! 💙",
      yourSupport: "Your support means a lot and directly helps in content development.",
      donationOptions: "Support Methods",
      donationMethods: [
        {
          title: "Stripe",
          description: "Secure payment with multiple options",
          link: "https://donate.stripe.com/8wM3dn7Ne4493QY8ww",
          icon: "💳"
        }
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-destructive animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-donations-title">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.description}
            </p>
            <p className="text-base text-muted-foreground">
              {t.yourSupport}
            </p>
          </div>

          {/* Donation Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center" data-testid="text-donations-methods">
              {t.donationOptions}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.donationMethods.map((method, index) => (
                <Card
                  key={index}
                  className="p-6 space-y-4 hover-elevate active-elevate-2 transition-all flex flex-col justify-between"
                  data-testid={`donation-option-${method.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="space-y-3">
                    <div className="text-4xl">{method.icon}</div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>

                  {method && 'isPix' in method && method.isPix ? (
                    <div className="bg-background/50 p-3 rounded border border-border/30 font-mono text-xs text-center break-all">
                      {method.description}
                    </div>
                  ) : method && 'link' in method ? (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => window.open(method.link, '_blank')}
                      data-testid={`button-donate-${method.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      Abrir
                    </Button>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>

          {/* Thank You */}
          <div className="text-center space-y-4 py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-primary">{t.thankYou}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.yourSupport}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
