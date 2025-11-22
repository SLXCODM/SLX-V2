import { Heart, Heart as HeartIcon, Zap, Gift, Coffee } from "lucide-react";
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
      stripeButton: "Fazer Doação via Stripe",
      stripeDescription: "Seguro, rápido e com várias opções de pagamento",
      thankYou: "Muito Obrigado! 💙",
      yourSupport: "Seu apoio significa muito e ajuda diretamente no desenvolvimento do conteúdo.",
      options: [
        { icon: "☕", name: "Um Café", desc: "Pequena contribuição" },
        { icon: "🎮", name: "Sessão de Gaming", desc: "Acesso a Lives extras" },
        { icon: "📚", name: "Conteúdo Premium", desc: "Tutoriais exclusivos" },
        { icon: "⭐", name: "Membro VIP", desc: "Acesso ilimitado" },
      ]
    },
    en: {
      title: "Support and Donations",
      subtitle: "Help keep quality content flowing",
      description: "Your contributions allow me to continue creating exclusive content, deep tutorials, and technical analysis.",
      stripeButton: "Donate via Stripe",
      stripeDescription: "Secure, fast, and with multiple payment options",
      thankYou: "Thank You! 💙",
      yourSupport: "Your support means a lot and directly helps in content development.",
      options: [
        { icon: "☕", name: "A Coffee", desc: "Small contribution" },
        { icon: "🎮", name: "Gaming Session", desc: "Extra live access" },
        { icon: "📚", name: "Premium Content", desc: "Exclusive tutorials" },
        { icon: "⭐", name: "VIP Member", desc: "Unlimited access" },
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
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

          {/* Donation Button */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="px-8 py-6 text-base gap-2"
              onClick={() => window.open('https://donate.stripe.com/8wM3dn7Ne4493QY8ww', '_blank')}
              data-testid="button-donate-stripe"
            >
              <HeartIcon className="h-5 w-5" />
              {t.stripeButton}
            </Button>
            <p className="text-sm text-muted-foreground">
              {t.stripeDescription}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.options.map((option, index) => (
              <Card key={index} className="p-6 text-center space-y-3 hover-elevate active-elevate-2 transition-all">
                <div className="text-4xl">{option.icon}</div>
                <h3 className="font-semibold text-lg text-foreground">{option.name}</h3>
                <p className="text-sm text-muted-foreground">{option.desc}</p>
              </Card>
            ))}
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
