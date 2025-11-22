import { createContext, useState, useContext, useEffect } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguageSelected: boolean;
  completeLanguageSelection: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  // Check if language was already selected in this session
  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem("slx_language_selected") === "true";
    if (hasSelectedLanguage) {
      setIsLanguageSelected(true);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const completeLanguageSelection = () => {
    localStorage.setItem("slx_language_selected", "true");
    setIsLanguageSelected(true);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isLanguageSelected, completeLanguageSelection }}>
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
