import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageSelectorProps {
  language: "pt" | "en";
  onChange: (lang: "pt" | "en") => void;
}

export default function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex gap-2" data-testid="language-selector">
      <Button
        variant={language === "pt" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("pt")}
        className="gap-2"
        data-testid="button-lang-pt"
      >
        <Globe className="h-4 w-4" />
        PT 🇧🇷
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("en")}
        className="gap-2"
        data-testid="button-lang-en"
      >
        <Globe className="h-4 w-4" />
        EN 🇺🇸
      </Button>
    </div>
  );
}
