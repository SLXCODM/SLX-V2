import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Gamepad2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navItems = [
    { path: "/", label: "Início" },
    { path: "/conteudo", label: "Conteúdo" },
    { path: "/projetos", label: "Classes" },
    { path: "/doacoes", label: "Doações" },
    { path: "/sobre", label: "Sobre" },
  ];

  // CODM ID
  const codmId = "6870254103403626497";

  return (
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
          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                <span
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-primary relative",
                    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
                    location === item.path
                      ? "text-primary after:w-full"
                      : "text-muted-foreground after:w-0 hover:after:w-full"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="flex gap-1" data-testid="language-selector-header">
            <Button
              variant={language === "pt" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("pt")}
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

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-background z-40 md:hidden"
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
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-foreground hover:bg-card border border-transparent"
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
  );
}
