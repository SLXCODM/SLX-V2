import { X, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RafflePopupProps {
  onClose: () => void;
  language: "pt" | "en";
}

export default function RafflePopup({ onClose, language }: RafflePopupProps) {
  const content = {
    pt: {
      title: "SORTEIO INSANO",
      subtitle: "ASUS ROG PHONE 8 + Cooler Nubia 4 Pro",
      description: "Estou sorteando o melhor smartphone gaming do mercado!",
      greenText: "Participe agora, ganhe prêmios incríveis!",
      specs: [
        "Snapdragon 8 Gen 3",
        "12GB RAM | 256GB Storage",
        "Display 165Hz AMOLED",
        "120fps liso no CODM",
        "Bateria 5500mAh",
        "Cooler Magnético Nubia 4 Pro"
      ],
      ctaSubtext: "A partir de R$ 1,00 por número",
      button: "PARTICIPAR AGORA",
    },
    en: {
      title: "INSANE RAFFLE",
      subtitle: "ASUS ROG PHONE 8 + Nubia 4 Pro Cooler",
      description: "I'm raffling off the best gaming smartphone on the market!",
      greenText: "Participate now, win amazing prizes!",
      specs: [
        "Snapdragon 8 Gen 3",
        "12GB RAM | 256GB Storage",
        "165Hz AMOLED Display",
        "120fps smooth on CODM",
        "5500mAh Battery",
        "Nubia 4 Pro Magnetic Cooler"
      ],
      ctaSubtext: "Starting from $1.00 per number",
      button: "PARTICIPATE NOW",
    }
  };

  const t = content[language];

  const handleParticipate = () => {
    window.open('https://slx.clickrifas.com/rog-phone-8-cooler-nubia-4-pro/', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" data-testid="raffle-popup">
      <div className="max-w-md w-full space-y-6 p-8 bg-card border border-border rounded-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          data-testid="button-close-raffle"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="h-6 w-6 text-purple-500 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{t.title}</h2>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-center text-sm text-foreground">{t.description}</p>

        {/* Green highlight text */}
        <p className="text-center text-sm font-semibold text-green-500">{t.greenText}</p>

        {/* Benefits list */}
        <div className="space-y-2 py-2">
          {t.specs.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{spec}</span>
            </div>
          ))}
        </div>

        {/* CTA Subtext */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">{t.ctaSubtext}</p>
        </div>

        {/* Button */}
        <Button
          onClick={handleParticipate}
          size="lg"
          className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          data-testid="button-participate-raffle"
        >
          <Gift className="h-5 w-5" />
          {t.button}
        </Button>
      </div>
    </div>
  );
}
