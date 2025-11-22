import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
  gaming: "Gaming",
  agriculture: "Agricultura",
  photography: "Fotografia",
  development: "Dev Pessoal",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleClick = () => {
    if (project.externalUrl) {
      window.open(project.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300",
        project.externalUrl && "cursor-pointer"
      )}
      onClick={handleClick}
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
          {project.externalUrl && (
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" data-testid={`icon-external-link-${project.id}`} />
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-project-description-${project.id}`}>
          {project.description}
        </p>
      </div>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
