import { Lock, Instagram, Check } from "lucide-react";
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
      subtitle: `Siga @slx_codm no Instagram para acessar ${contentName}`,
      followButton: "Seguir no Instagram",
      checkButton: "Já Segui - Verificar",
      checking: "Verificando...",
      unlocked: "Desbloqueado! ✨",
    },
    en: {
      title: "Exclusive Content",
      subtitle: `Follow @slx_codm on Instagram to access ${contentName}`,
      followButton: "Follow on Instagram",
      checkButton: "Already Followed - Check",
      checking: "Checking...",
      unlocked: "Unlocked! ✨",
    }
  };

  const t = texts[language];

  useEffect(() => {
    const unlockKey = `slx_unlocked_${contentName.toLowerCase().replace(/\s+/g, '_')}`;
    const isAlreadyUnlocked = localStorage.getItem(unlockKey) === 'true';
    if (isAlreadyUnlocked) {
      setIsUnlocked(true);
    }
  }, [contentName]);

  const handleFollowCheck = async () => {
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const unlockKey = `slx_unlocked_${contentName.toLowerCase().replace(/\s+/g, '_')}`;
    localStorage.setItem(unlockKey, 'true');
    setIsUnlocked(true);
    setIsChecking(false);
  };

  const handleFollowClick = () => {
    window.open('https://www.instagram.com/slx_codm', '_blank');
  };

  if (isUnlocked) {
    return (
      <div className="space-y-4" data-testid="content-unlocked">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Check className="h-5 w-5" />
          {t.unlocked}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center" data-testid="follow-to-unlock-prompt">
      <div className="max-w-md mx-auto text-center space-y-6 p-8 bg-card border border-border rounded-lg">
        <div className="relative w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
          <Lock className="h-10 w-10 text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleFollowClick}
            size="lg"
            className="w-full gap-2"
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
      </div>
    </div>
  );
}
