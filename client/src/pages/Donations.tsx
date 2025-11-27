import { Heart } from "lucide-react";
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
      description: "Sua contribuição permite que eu continue criando conteúdo, cada vez melhor, inspirando mais pessoas a serem humanas.",
      thankYou: "Muito Obrigado!",
      yourSupport: "Seu apoio significa muito e ajuda diretamente no desenvolvimento do conteúdo.",
      livepixMain: "LivePix",
      livepixDesc: "Principal forma de apoio",
      qrCode: "QR Code",
      qrCodeDesc: "Escaneie para doação rápida",
      otherMethods: "Outras Formas de Apoiar",
      donationMethods: [
        {
          title: "Da Enxada ao CODM",
          description: "Vaquinha principal",
          link: "https://www.vakinha.com.br/vaquinha/da-enxada-ao-call-of-duty-mobile"
        },
        {
          title: "Minha Terapia",
          description: "Vaquinha do LivePix",
          link: "https://livepix.gg/vaquinha/minha-terapia"
        },
        {
          title: "Ajude o H7",
          description: "Estou ajudando meu amigo H7 a consertar sua moto após um acidente grave. O motor trincou e os amortecedores quebraram. Ele está passando por um momento difícil e precisa de nossa ajuda! Meta: R$ 4.000,00 para o conserto.",
          link: "https://www.vakinha.com.br/vaquinha/conserto-da-moto-slx"
        },
        {
          title: "PIX Direto",
          description: "b23a8dc0-c540-4d9b-8aaa-d91800bdb434",
          isPix: true
        }
      ]
    },
    en: {
      title: "Support and Donations",
      subtitle: "Help keep quality content flowing",
      description: "Your contributions allow me to continue creating exclusive content, deep tutorials, and technical analysis.",
      thankYou: "Thank You!",
      yourSupport: "Your support means a lot and directly helps in content development.",
      livepixMain: "Stripe",
      livepixDesc: "Secure payment",
      qrCode: "",
      qrCodeDesc: "",
      otherMethods: "Support Method",
      donationMethods: [
        {
          title: "Donate",
          description: "Secure payment with multiple options",
          link: "https://donate.stripe.com/8wM3dn7Ne4493QY8ww"
        }
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-donations-title">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* Main LivePix Section (Portuguese) or Stripe Section (English) */}
          {language === "pt" && (
            <div className="space-y-8">
              {/* LivePix Button - Centralized and Large */}
              <div className="flex flex-col items-center gap-6">
                <Button
                  size="lg"
                  className="px-16 py-4 text-lg h-auto pulse-glow"
                  onClick={() => window.open('https://livepix.gg/slx', '_blank')}
                  data-testid="button-donate-livepix"
                >
                  Acessar LivePix
                </Button>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center gap-4">
                <iframe
                  src="https://widget.livepix.gg/embed/d625198c-66f5-4197-9a87-d0786dda48ba"
                  width="300"
                  height="400"
                  frameBorder="0"
                  allow="payment"
                  className="rounded-lg border border-border"
                  data-testid="qrcode-livepix-embed"
                />
                <p className="text-xs text-muted-foreground text-center">
                  {t.qrCodeDesc}
                </p>
              </div>
            </div>
          )}

          {/* Stripe for English */}
          {language === "en" && (
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="px-12 py-8 text-lg h-auto"
                onClick={() => window.open('https://donate.stripe.com/8wM3dn7Ne4493QY8ww', '_blank')}
                data-testid="button-donate-stripe"
              >
                {t.livepixMain}
              </Button>
              <p className="text-sm text-muted-foreground">
                {t.livepixDesc}
              </p>
            </div>
          )}

          {/* Other Methods */}
          {t.donationMethods.length > 0 && (
            <div className="space-y-6 border-t border-border pt-12">
              <h2 className="text-2xl font-semibold text-center" data-testid="text-donations-methods">
                {t.otherMethods}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.donationMethods.map((method, index) => (
                  <div
                    key={index}
                    className="space-y-3"
                    data-testid={`donation-option-${method.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>

                    {method && 'isPix' in method && method.isPix ? (
                      <div className="bg-card p-3 rounded border border-border/30 font-mono text-xs text-center break-all">
                        {method.description}
                      </div>
                    ) : method && 'link' in method ? (
                      <Button
                        size="sm"
                        onClick={() => window.open(method.link, '_blank')}
                        data-testid={`button-donate-${method.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full"
                        style={{ backgroundColor: "hsl(195, 85%, 30%)" }}
                      >
                        Abrir
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thank You */}
          <div className="text-center space-y-3 py-12 border-t border-border">
            <h2 className="text-2xl font-semibold text-primary">{t.thankYou}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.yourSupport}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
