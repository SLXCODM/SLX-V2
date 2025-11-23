import { ExternalLink, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const categoryColors: Record<string, string> = {
  gaming: "bg-[hsl(195,85%,35%)]/10 text-[hsl(195,85%,45%)] border-[hsl(195,85%,35%)]/20",
  agriculture: "bg-green-500/10 text-green-400 border-green-500/20",
  photography: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  development: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const categoryLabels: Record<string, string> = {
  gaming: "Call of Duty Mobile",
  agriculture: "Agricultura",
  photography: "Fotografia",
  development: "Dev Pessoal",
};

interface ParsedUrl {
  isLocked?: boolean;
  links?: Array<{ label: string; url: string }>;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);

  useEffect(() => {
    const globalUnlockKey = 'slx_site_unlocked';
    const isAlreadyUnlocked = localStorage.getItem(globalUnlockKey) === 'true';
    setIsUnlocked(isAlreadyUnlocked);

    if (project.externalUrl) {
      try {
        const parsed = JSON.parse(project.externalUrl);
        setParsedUrl(parsed);
      } catch {
        setParsedUrl(null);
      }
    }
  }, [project.externalUrl]);

  const handleClick = () => {
    if (!parsedUrl?.isLocked && project.externalUrl && !parsedUrl?.links) {
      window.open(project.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleFollowClick = () => {
    window.open('https://www.instagram.com/slx.wav', '_blank');
  };

  const handleFollowCheck = async () => {
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const globalUnlockKey = 'slx_site_unlocked';
    localStorage.setItem(globalUnlockKey, 'true');
    setIsUnlocked(true);
    setIsChecking(false);
  };

  if (parsedUrl?.isLocked && !isUnlocked) {
    return (
      <Card className="relative overflow-hidden flex items-center justify-center min-h-[300px]" data-testid={`card-project-${project.id}`}>
        {project.imageUrl && (
          <div className="absolute inset-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              data-testid={`img-project-${project.id}`}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
        <div className="relative z-10 text-center space-y-4 p-4">
          <Lock className="h-10 w-10 text-primary mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-white/80 mb-4">Siga para desbloquear</p>
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleFollowClick}
              size="sm"
              className="w-full"
              data-testid="button-follow-instagram"
            >
              Seguir no Instagram
            </Button>
            <Button
              onClick={handleFollowCheck}
              disabled={isChecking}
              variant="outline"
              size="sm"
              className="w-full"
              data-testid="button-check-follow"
            >
              {isChecking ? "Verificando..." : "Já Segui"}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const hasMultipleLinks = parsedUrl?.links && parsedUrl.links.length > 1;

  return (
    <Card
      className={cn(
        "group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300",
        !hasMultipleLinks && project.externalUrl ? "cursor-pointer" : ""
      )}
      onClick={!hasMultipleLinks ? handleClick : undefined}
      data-testid={`card-project-${project.id}`}
    >
      {/* Image */}
      {project.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-testid={`img-project-${project.id}`}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300" data-testid={`text-project-title-${project.id}`}>
              {project.title}
            </h3>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                categoryColors[project.category] || categoryColors.development
              )}
              data-testid={`badge-project-category-${project.id}`}
            >
              {categoryLabels[project.category] || project.category}
            </Badge>
          </div>
          {!hasMultipleLinks && project.externalUrl && (
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" data-testid={`icon-external-link-${project.id}`} />
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-project-description-${project.id}`}>
          {project.description}
        </p>

        {/* Multiple Links */}
        {hasMultipleLinks && parsedUrl?.links && (
          <div className="flex gap-2 pt-2">
            {parsedUrl.links.map((link, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="outline"
                onClick={() => window.open(link.url, '_blank')}
                className="flex-1 text-xs"
                data-testid={`button-project-link-${project.id}-${idx}`}
              >
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
