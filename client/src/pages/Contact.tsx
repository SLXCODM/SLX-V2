import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Mensagem enviada!",
      description: "Obrigado por entrar em contato. Responderei em breve.",
    });

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
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
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-contact-title">
                Contato
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed" data-testid="text-contact-description">
                Entre em contato para colaborações, patrocínios ou apenas para conversar
              </p>
            </div>

            {/* Direct Contact */}
            <Card className="p-6 space-y-4" data-testid="card-direct-contact">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" data-testid="text-email-label">
                    Email Direto
                  </h3>
                  <a
                    href="mailto:slowedbase@gmail.com"
                    className="text-base font-medium hover:text-primary transition-colors duration-300"
                    data-testid="link-email-direct"
                  >
                    slowedbase@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold" data-testid="text-collaboration-info-title">
                  Colaborações & Patrocínios
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-collaboration-info-description">
                  Aberto para parcerias com marcas que se alinham com conteúdo
                  profissional, gaming de alto nível, fotografia ou desenvolvimento pessoal.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold" data-testid="text-response-info-title">
                  Tempo de Resposta
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-response-info-description">
                  Normalmente respondo em 1-3 dias úteis. Mensagens urgentes podem
                  ser enviadas diretamente para o email acima.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <Card className="p-6 md:p-8" data-testid="card-contact-form">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" data-testid="label-name">
                    Nome *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                    className="bg-background"
                    data-testid="input-name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" data-testid="label-email">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="bg-background"
                    data-testid="input-email"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" data-testid="label-subject">
                    Assunto *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Sobre o que você quer falar?"
                    className="bg-background"
                    data-testid="input-subject"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" data-testid="label-message">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Escreva sua mensagem aqui..."
                    rows={6}
                    className="bg-background resize-none"
                    data-testid="input-message"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem
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
