import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RafflePopupProps {
  onClose: () => void;
  language: "pt" | "en";
}

export default function RafflePopup({ onClose, language }: RafflePopupProps) {
  const content = {
    pt: {
      title: "🎮 SORTEIO INSANO 🎮",
      subtitle: "ASUS ROG PHONE 8 + Cooler Nubia 4 Pro",
      description: "Estou sorteando o melhor smartphone gaming do mercado!",
      specs: [
        "✨ Snapdragon 8 Gen 3",
        "✨ 12GB RAM | 256GB Storage",
        "✨ Display 165Hz AMOLED",
        "✨ 120fps liso no CODM",
        "✨ Bateria 5500mAh",
        "❄️ Cooler Magnético Nubia 4 Pro"
      ],
      callToAction: "PARTICIPE DA RIFA",
      ctaSubtext: "A partir de R$ 1,00 por número",
      button: "PARTICIPAR AGORA",
    },
    en: {
      title: "🎮 INSANE RAFFLE 🎮",
      subtitle: "ASUS ROG PHONE 8 + Nubia 4 Pro Cooler",
      description: "I'm raffling off the best gaming smartphone on the market!",
      specs: [
        "✨ Snapdragon 8 Gen 3",
        "✨ 12GB RAM | 256GB Storage",
        "✨ 165Hz AMOLED Display",
        "✨ 120fps smooth on CODM",
        "✨ 5500mAh Battery",
        "❄️ Nubia 4 Pro Magnetic Cooler"
      ],
      callToAction: "JOIN THE RAFFLE",
      ctaSubtext: "Starting from $1.00 per number",
      button: "PARTICIPATE NOW",
    }
  };

  const t = content[language];

  const handleParticipate = () => {
    window.open('https://slx.clickrifas.com/rog-phone-8-cooler-nubia-4-pro/', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="raffle-popup">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          data-testid="button-close-raffle"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Gift className="h-12 w-12 text-primary animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {t.title}
          </h2>
          <p className="text-lg font-semibold text-primary">
            {t.subtitle}
          </p>
        </div>

        <p className="text-center text-muted-foreground">
          {t.description}
        </p>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-border">
          {t.specs.map((spec, index) => (
            <p key={index} className="text-muted-foreground text-sm">
              {spec}
            </p>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-primary">{t.callToAction}</p>
          <p className="text-sm text-muted-foreground mt-1">{t.ctaSubtext}</p>
        </div>

        <Button
          onClick={handleParticipate}
          size="lg"
          className="w-full"
          data-testid="button-participate-raffle"
        >
          {t.button}
        </Button>
      </div>
    </div>
  );
}
