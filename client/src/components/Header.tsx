import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Gamepad2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import RafflePopup from "./RafflePopup";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRafflePopup, setShowRafflePopup] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navItems = [
    { path: "/", label: language === "pt" ? "Início" : "Home" },
    { path: "/conteudo", label: language === "pt" ? "Conteúdo" : "Content" },
    { path: "/redes-sociais", label: language === "pt" ? "Redes Sociais" : "Social" },
    { path: "/doacoes", label: language === "pt" ? "Doações" : "Donate" },
    { path: "/sobre", label: language === "pt" ? "Sobre" : "About" },
  ];

  // CODM ID
  const codmId = "6870254103403626497";

  return (
    <>
      {showRafflePopup && (
        <RafflePopup onClose={() => setShowRafflePopup(false)} language="pt" />
      )}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* CODM ID Bar */}
        <div className="hidden md:flex items-center justify-end gap-2 py-2 border-b border-border/50 text-xs text-muted-foreground" data-testid="codm-id-bar">
          <Gamepad2 className="h-4 w-4" />
          <span>ID: {codmId}</span>
        </div>

        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link href="/" data-testid="link-home-logo">
            <span className="text-2xl md:text-3xl font-bold tracking-tight hover:text-primary transition-colors duration-300" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900 }}>
              SLX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                <span
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md",
                    location === item.path
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button and Language Selector */}
          <div className="flex items-center gap-2" data-testid="mobile-controls">
            {/* Language Selector */}
            <div className="flex gap-1" data-testid="language-selector-header">
              <Button
                variant={language === "pt" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setLanguage("pt");
                  setShowRafflePopup(true);
                }}
                className="text-xs"
                data-testid="button-lang-pt-header"
              >
                PT
              </Button>
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="text-xs"
                data-testid="button-lang-en-header"
              >
                EN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed left-0 right-0 top-16 bottom-0 bg-black z-50 md:hidden"
          data-testid="nav-mobile-overlay"
        >
          <nav className="flex flex-col p-4 gap-2" data-testid="nav-mobile">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
              >
                <button
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-md text-base font-medium transition-all duration-300",
                    "hover-elevate active-elevate-2 min-h-12",
                    location === item.path
                      ? "bg-primary/10 text-foreground border border-primary/20"
                      : "bg-black/40 text-foreground hover:bg-black/50 border border-transparent"
                  )}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
