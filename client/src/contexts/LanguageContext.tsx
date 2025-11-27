import { createContext, useState, useContext, useEffect } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguageSelected: boolean;
  completeLanguageSelection: () => void;
  showRaffle: boolean;
  setShowRaffle: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Load language from localStorage on initial load
    const saved = localStorage.getItem("slx_language");
    return (saved as Language) || "pt";
  });
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [showRaffle, setShowRaffle] = useState(false);

  // Check if language was already selected in this session
  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem("slx_language_selected") === "true";
    if (hasSelectedLanguage) {
      setIsLanguageSelected(true);
    }
  }, []);

  // Show raffle on every page load if language is Portuguese
  useEffect(() => {
    if (language === "pt" && isLanguageSelected) {
      setShowRaffle(true);
    } else {
      setShowRaffle(false);
    }
  }, [language, isLanguageSelected]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // Save language to localStorage
    localStorage.setItem("slx_language", lang);
  };

  const completeLanguageSelection = () => {
    localStorage.setItem("slx_language_selected", "true");
    setIsLanguageSelected(true);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isLanguageSelected, completeLanguageSelection, showRaffle, setShowRaffle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
