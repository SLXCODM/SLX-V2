import { Youtube, Instagram, Music, Gift, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  language: "pt" | "en";
}

export default function SocialLinks({ language }: SocialLinksProps) {
  const texts = {
    pt: {
      youtube: "YouTube",
      instagram: "Instagram",
      tiktok: "TikTok",
      discord: "Discord",
      donate: "Doações",
      live: "Live",
    },
    en: {
      youtube: "YouTube",
      instagram: "Instagram",
      tiktok: "TikTok",
      discord: "Discord",
      donate: "Donate",
      live: "Live",
    }
  };

  const t = texts[language];

  const links = [
    { icon: Youtube, label: t.youtube, url: "https://www.youtube.com/@SLXCODM", testId: "link-youtube" },
    { icon: Instagram, label: t.instagram, url: "https://www.instagram.com/slx.wav", testId: "link-instagram" },
    { icon: Music, label: t.tiktok, url: "https://www.tiktok.com/@slxcodm_", testId: "link-tiktok" },
    { icon: MessageCircle, label: t.discord, url: "https://discord.com/invite/RyMuC8wwCt", testId: "link-discord" },
    { icon: Heart, label: t.donate, url: "/doacoes", testId: "link-donate", internal: true },
    { icon: Gift, label: t.live, url: "https://vm.tiktok.com/ZMSs91c6U/", testId: "link-live" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3" data-testid="social-links">
      {links.map((link) => {
        const Icon = link.icon;
        const isInternal = link.internal;

        return isInternal ? (
          <a
            key={link.testId}
            href={link.url}
            className="flex items-center justify-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2 flex-1"
              data-testid={link.testId}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{link.label}</span>
            </Button>
          </a>
        ) : (
          <Button
            key={link.testId}
            variant="outline"
            size="sm"
            className="gap-2 w-full"
            onClick={() => window.open(link.url, '_blank')}
            data-testid={link.testId}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">{link.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
