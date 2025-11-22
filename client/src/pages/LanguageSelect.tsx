import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import RafflePopup from "@/components/RafflePopup";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectProps {
  onComplete: () => void;
}

export default function LanguageSelect({ onComplete }: LanguageSelectProps) {
  const { setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<"pt" | "en" | null>(null);
  const [showRaffle, setShowRaffle] = useState(false);

  const handleLanguageSelect = (lang: "pt" | "en") => {
    setSelectedLanguage(lang);
    setLanguage(lang);
    
    if (lang === "pt") {
      setShowRaffle(true);
    } else {
      onComplete();
    }
  };

  const handleRaffleClose = () => {
    setShowRaffle(false);
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 overflow-hidden">
      {/* Raffle Popup */}
      {showRaffle && selectedLanguage === "pt" && (
        <RafflePopup onClose={handleRaffleClose} language="pt" />
      )}

      {/* Language Selection */}
      {!showRaffle && (
        <div className="max-w-2xl mx-auto px-4 text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center mb-8">
              <Globe className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              SLX
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Escolha seu idioma • Choose your language
            </p>
          </div>

          {/* Language Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Portuguese */}
            <button
              onClick={() => handleLanguageSelect("pt")}
              className="group relative w-full sm:w-64 p-8 border-2 border-border rounded-lg hover-elevate transition-all duration-300"
              data-testid="button-select-portuguese"
            >
              <div className="space-y-4">
                <div className="text-5xl">🇧🇷</div>
                <h2 className="text-2xl font-bold">Português</h2>
                <p className="text-muted-foreground">
                  Conteúdo em Português Brasileiro
                </p>
                <div className="pt-4 text-primary font-semibold">
                  Selecionar →
                </div>
              </div>
            </button>

            {/* English */}
            <button
              onClick={() => handleLanguageSelect("en")}
              className="group relative w-full sm:w-64 p-8 border-2 border-border rounded-lg hover-elevate transition-all duration-300"
              data-testid="button-select-english"
            >
              <div className="space-y-4">
                <div className="text-5xl">🇺🇸</div>
                <h2 className="text-2xl font-bold">English</h2>
                <p className="text-muted-foreground">
                  English language content
                </p>
                <div className="pt-4 text-primary font-semibold">
                  Select →
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="text-sm text-muted-foreground">
            <p>Estrategista de pensamento • Thought Strategist</p>
          </div>
        </div>
      )}
    </div>
  );
}
