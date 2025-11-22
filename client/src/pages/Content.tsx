import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@shared/schema";

export default function Content() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  // Fetch projects from API
  const { data: projects = [], isLoading, isError, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Check URL params for category filter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category && ["gaming", "photography", "agriculture", "development"].includes(category)) {
      setActiveTab(category);
    }
  }, [location]);

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const tabs = [
    { value: "all", label: "Tudo", testId: "tab-all" },
    { value: "gaming", label: "Gaming", testId: "tab-gaming" },
    { value: "photography", label: "Fotografia", testId: "tab-photography" },
    { value: "agriculture", label: "Agricultura", testId: "tab-agriculture" },
    { value: "development", label: "Dev Pessoal", testId: "tab-development" },
  ];

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-content-title">
              Conteúdo
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-content-description">
              Explore meus projetos, tutoriais e criações em diferentes áreas
            </p>
          </div>

          {/* Tabs Filter */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap gap-2 bg-transparent h-auto p-0" data-testid="tabs-content-filter">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={tab.testId}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-8">
              {/* Error State */}
              {isError ? (
                <div className="text-center py-16 space-y-4" data-testid="error-state-content">
                  <p className="text-destructive font-medium">
                    Erro ao carregar projetos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : "Tente novamente mais tarde"}
                  </p>
                </div>
              ) : isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-testid="loading-content-projects">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-96 bg-card border border-border rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-testid="grid-content-projects">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16" data-testid="empty-state-content">
                  <p className="text-muted-foreground">
                    {projects.length === 0 
                      ? "Nenhum projeto disponível no momento." 
                      : "Nenhum conteúdo encontrado nesta categoria ainda."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
