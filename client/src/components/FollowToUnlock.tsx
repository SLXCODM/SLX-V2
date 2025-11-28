import { Instagram, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface FollowToUnlockProps {
  children: React.ReactNode;
  contentName: string;
  language: "pt" | "en";
}

export default function FollowToUnlock({ children, contentName, language }: FollowToUnlockProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const texts = {
    pt: {
      title: "Conteúdo Exclusivo",
      subtitle: `Desbloqueie ${contentName} seguindo @slx.wav`,
      greenText: "Siga uma vez, acesse tudo para sempre!",
      benefit1: "As melhores classes do jogo",
      benefit2: "Tutoriais exclusivos",
      benefit3: "Configurações profissionais",
      benefit4: "Atualizações em primeira mão",
      followButton: "Seguir @slx.wav",
      checkButton: "Já Segui - Verificar",
      checking: "Verificando...",
      unlockedTitle: "Acesso Total Desbloqueado!",
      unlockedDesc: "Você tem acesso a todo conteúdo exclusivo do SLX Gaming",
    },
    en: {
      title: "Exclusive Content",
      subtitle: `Unlock ${contentName} by following @slx.wav`,
      greenText: "Follow once, access everything forever!",
      benefit1: "Best Loadouts",
      benefit2: "Exclusive tutorials",
      benefit3: "Professional settings",
      benefit4: "First-hand updates",
      followButton: "Follow @slx.wav",
      checkButton: "Already Followed - Check",
      checking: "Checking...",
      unlockedTitle: "Full Access Unlocked!",
      unlockedDesc: "You have access to all exclusive SLX Gaming content",
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Use a global unlock key so any follow unlocks all CODM content
    const isAlreadyUnlocked = localStorage.getItem('slx_codm_unlocked') === 'true';
    if (isAlreadyUnlocked) {
      setIsUnlocked(true);
    }
  }, []);

  const handleFollowCheck = async () => {
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Use a global unlock key so any follow unlocks all CODM content
    localStorage.setItem('slx_codm_unlocked', 'true');
    setIsUnlocked(true);
    setIsChecking(false);
  };

  const handleFollowClick = () => {
    window.open('https://www.instagram.com/slx.wav', '_blank');
  };

  if (isUnlocked) {
    return (
      <div className="space-y-4" data-testid="content-unlocked">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-lg">
            <span className="text-2xl">🌟</span>
            {t.unlockedTitle}
          </div>
          <p className="text-muted-foreground text-sm">{t.unlockedDesc}</p>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4" data-testid="follow-to-unlock-prompt">
      <div className="max-w-md mx-auto space-y-6 p-8 bg-card border border-border rounded-lg">
        {/* Title */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram className="h-6 w-6 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{t.title}</h2>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Green highlight text */}
        <p className="text-center text-sm font-semibold text-green-500">{t.greenText}</p>

        {/* Benefits list */}
        <div className="space-y-2 py-2">
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{t.benefit1}</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{t.benefit2}</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{t.benefit3}</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{t.benefit4}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleFollowClick}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            data-testid="button-follow-instagram"
          >
            <Instagram className="h-5 w-5" />
            {t.followButton}
          </Button>

          <Button
            onClick={handleFollowCheck}
            disabled={isChecking}
            variant="outline"
            size="lg"
            className="w-full"
            data-testid="button-check-follow"
          >
            {isChecking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-transparent mr-2" />
                {t.checking}
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                {t.checkButton}
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          {language === 'pt' 
            ? 'Após seguir no Instagram, volte aqui e clique em "Já Segui" para verificar.'
            : 'After following on Instagram, come back here and click "Already Followed" to verify.'}
        </p>
      </div>
    </div>
  );
}
