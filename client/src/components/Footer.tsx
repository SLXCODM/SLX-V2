import { Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  const handleResetLanguageSelector = () => {
    localStorage.removeItem("slx_language_selected");
    window.location.reload();
  };

  const texts = {
    pt: {
      tagline: "Estrategista de pensamento. Superdotado focado em excelência mental, disciplina e criação de conteúdo profundo que transforma ideias.",
      navigation: "Navegação",
      home: "Início",
      about: "Sobre",
      content: "Conteúdo",
      projects: "Projetos",
      contact: "Contato",
      social: "Redes Sociais",
      copyright: `© ${currentYear} SLX. Todos os direitos reservados.`,
      resetSelector: "Resetar Seletor"
    },
    en: {
      tagline: "Mental strategist. Gifted focused on mental excellence, discipline and deep content creation that transforms ideas.",
      navigation: "Navigation",
      home: "Home",
      about: "About",
      content: "Content",
      projects: "Projects",
      contact: "Contact",
      social: "Social Media",
      copyright: `© ${currentYear} SLX. All rights reserved.`,
      resetSelector: "Reset Language"
    }
  };

  const t = texts[language];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/slx.wav",
      icon: Instagram,
      testId: "link-social-instagram"
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@slxcodm_",
      icon: SiTiktok,
      testId: "link-social-tiktok"
    },
    {
      name: "YouTube Gaming",
      url: "https://www.youtube.com/@SLXCODM",
      icon: Youtube,
      testId: "link-social-youtube-gaming"
    },
  ];

  return (
    <footer className="border-t border-border bg-card" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight" data-testid="text-footer-brand">
              SLX
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm" data-testid="text-footer-tagline">
              {t.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground" data-testid="text-footer-links-title">
              {t.navigation}
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-home">{t.home}</a></li>
              <li><a href="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-sobre">{t.about}</a></li>
              <li><a href="/conteudo" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-conteudo">{t.content}</a></li>
              <li><a href="/projetos" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-projetos">{t.projects}</a></li>
              <li><a href="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-contato">{t.contact}</a></li>
            </ul>
          </div>

          {/* Social Media - Hidden, only shown on home */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <div className="flex justify-center gap-4 text-xs">
            <p className="text-muted-foreground" data-testid="text-footer-copyright">
              {t.copyright}
            </p>
            <button
              onClick={handleResetLanguageSelector}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 underline cursor-pointer"
              data-testid="button-reset-language-selector"
            >
              {t.resetSelector}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
