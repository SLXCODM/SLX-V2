import { Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleResetLanguageSelector = () => {
    localStorage.removeItem("slx_language_selected");
    window.location.reload();
  };

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
              Estrategista de pensamento. Superdotado focado em excelência mental, disciplina e criação de conteúdo profundo que transforma vidas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground" data-testid="text-footer-links-title">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-home">Início</a></li>
              <li><a href="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-sobre">Sobre</a></li>
              <li><a href="/conteudo" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-conteudo">Conteúdo</a></li>
              <li><a href="/projetos" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-projetos">Projetos</a></li>
              <li><a href="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-footer-contato">Contato</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground" data-testid="text-footer-social-title">
              Redes Sociais
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover-elevate active-elevate-2 hover:border-primary transition-colors duration-300"
                    aria-label={social.name}
                    data-testid={social.testId}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <div className="flex justify-center gap-4 text-xs">
            <p className="text-muted-foreground" data-testid="text-footer-copyright">
              © {currentYear} SLX. Todos os direitos reservados.
            </p>
            <button
              onClick={handleResetLanguageSelector}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 underline cursor-pointer"
              data-testid="button-reset-language-selector"
            >
              Resetar Seletor
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
