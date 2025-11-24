import { useState } from "react";
import { Mail, Send, ExternalLink } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";
import type { InsertContact } from "@shared/schema";

export default function Sponsors() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Patrocínio / Sponsorship",
    message: "",
    honeypot: "",
  });

  const texts = {
    pt: {
      title: "Patrocínios & Parcerias",
      description: "Interessado em patrocinar conteúdo? Veja meu mediakit e entre em contato.",
      mediakitTitle: "Mediakit",
      mediakitDesc: "Visualize meu mediakit completo para conhecer alcance, audiência e formatos disponíveis.",
      viewMediakit: "Ver Mediakit Completo",
      formTitle: "Solicite um Patrocínio",
      nameLabel: "Nome da Empresa",
      namePlaceholder: "Sua empresa",
      emailLabel: "Email",
      emailPlaceholder: "seu@empresa.com",
      subjectLabel: "Assunto",
      messageLabel: "Mensagem",
      messagePlaceholder: "Descreva sua proposta de patrocínio...",
      sendButton: "Enviar Proposta",
      successTitle: "Proposta enviada!",
      successDesc: "Obrigado pelo interesse. Responderei em breve.",
      errorTitle: "Erro ao enviar",
      errorDesc: "Ocorreu um erro. Tente novamente.",
      directEmail: "Email Direto",
    },
    en: {
      title: "Sponsorships & Partnerships",
      description: "Interested in sponsoring content? Check out my mediakit and get in touch.",
      mediakitTitle: "Mediakit",
      mediakitDesc: "View my complete mediakit to see reach, audience, and available formats.",
      viewMediakit: "View Full Mediakit",
      formTitle: "Request a Sponsorship",
      nameLabel: "Company Name",
      namePlaceholder: "Your company",
      emailLabel: "Email",
      emailPlaceholder: "your@company.com",
      subjectLabel: "Subject",
      messageLabel: "Message",
      messagePlaceholder: "Describe your sponsorship proposal...",
      sendButton: "Send Proposal",
      successTitle: "Proposal sent!",
      successDesc: "Thank you for your interest. I'll respond soon.",
      errorTitle: "Error sending",
      errorDesc: "An error occurred. Please try again.",
      directEmail: "Direct Email",
    }
  };

  const t = texts[language];

  const sponsorMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: t.successTitle,
        description: t.successDesc,
      });
      setFormData({ name: "", email: "", subject: "Patrocínio / Sponsorship", message: "", honeypot: "" });
    },
    onError: (error: Error) => {
      toast({
        title: t.errorTitle,
        description: error.message || t.errorDesc,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sponsorMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="space-y-4 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-sponsors-title">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-sponsors-description">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Mediakit Card */}
          <Card className="lg:col-span-2 overflow-hidden" data-testid="card-mediakit">
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-mediakit-title">
                  {t.mediakitTitle}
                </h2>
                <p className="text-muted-foreground" data-testid="text-mediakit-description">
                  {t.mediakitDesc}
                </p>
              </div>

              {/* Mediakit Embed */}
              <div className="rounded-lg overflow-hidden bg-card border border-border" data-testid="mediakit-embed">
                <iframe
                  src="https://beacons.ai/slx_codm/mediakit"
                  className="w-full h-[600px] md:h-[800px]"
                  title="SLX Mediakit"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="iframe-mediakit"
                />
              </div>

              {/* Fallback Link */}
              <Button
                asChild
                variant="outline"
                className="w-full"
                data-testid="button-mediakit-external"
              >
                <a
                  href="https://beacons.ai/slx_codm/mediakit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  {t.viewMediakit}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>

          {/* Sidebar - Direct Contact & Form */}
          <div className="space-y-6">
            {/* Direct Email Card */}
            <Card className="p-6 space-y-4" data-testid="card-sponsor-email">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" data-testid="text-direct-email-label">
                    {t.directEmail}
                  </h3>
                  <a
                    href="mailto:slowedbase@gmail.com"
                    className="text-sm font-medium hover:text-primary transition-colors duration-300"
                    data-testid="link-sponsor-email"
                  >
                    slowedbase@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Contact Form Card */}
            <Card className="p-6" data-testid="card-sponsor-form">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="sponsor-name" className="text-sm" data-testid="label-sponsor-name">
                    {t.nameLabel} *
                  </Label>
                  <Input
                    id="sponsor-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.namePlaceholder}
                    className="bg-background text-sm"
                    data-testid="input-sponsor-name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="sponsor-email" className="text-sm" data-testid="label-sponsor-email">
                    {t.emailLabel} *
                  </Label>
                  <Input
                    id="sponsor-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.emailPlaceholder}
                    className="bg-background text-sm"
                    data-testid="input-sponsor-email"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="sponsor-message" className="text-sm" data-testid="label-sponsor-message">
                    {t.messageLabel} *
                  </Label>
                  <Textarea
                    id="sponsor-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    className="bg-background resize-none text-sm"
                    data-testid="input-sponsor-message"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full text-sm"
                  disabled={sponsorMutation.isPending}
                  data-testid="button-submit-sponsor"
                >
                  {sponsorMutation.isPending ? (
                    language === "pt" ? "Enviando..." : "Sending..."
                  ) : (
                    <>
                      {t.sendButton}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
