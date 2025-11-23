import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectCard from "@/components/ProjectCard";
import FollowToUnlock from "@/components/FollowToUnlock";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@shared/schema";
import { SiSubstack } from "react-icons/si";
import { PenTool } from "lucide-react";

export default function Content() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const { language } = useLanguage();

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

  const tabs = [
    { value: "gaming", label: "Call of Duty Mobile", testId: "tab-gaming" },
    { value: "photography", label: language === "pt" ? "Fotografia" : "Photography", testId: "tab-photography" },
    { value: "agriculture", label: language === "pt" ? "Agricultura" : "Agriculture", testId: "tab-agriculture" },
    { value: "development", label: language === "pt" ? "Dev Pessoal" : "Personal Dev", testId: "tab-development" },
    { value: "writer", label: language === "pt" ? "Escritor" : "Writer", testId: "tab-writer" },
  ];

  const contentTexts = {
    pt: {
      title: "Conteúdo",
      description: "Explore meus projetos, tutoriais e criações em diferentes áreas"
    },
    en: {
      title: "Content",
      description: "Explore my projects, tutorials and creations in different areas"
    }
  };

  const ct = contentTexts[language];

  // Set default tab to gaming
  const defaultTab = "gaming";
  const currentTab = activeTab === "all" ? defaultTab : activeTab;

  const filteredProjects = currentTab === "writer" 
    ? [] 
    : projects.filter(p => p.category === currentTab);

  const contentComponent = (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-content-title">
              {ct.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-content-description">
              {ct.description}
            </p>
          </div>

          {/* Tabs Filter */}
          <Tabs value={currentTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap gap-2 bg-transparent h-auto p-0" data-testid="tabs-content-filter">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md bg-card hover:bg-primary/10 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:bg-primary"
                  data-testid={tab.testId}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {currentTab === "gaming" ? (
              <FollowToUnlock contentName="Call of Duty Mobile" language={language}>
                <TabsContent value={currentTab} className="mt-8">
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
              </FollowToUnlock>
            ) : currentTab === "writer" ? (
              <TabsContent value={currentTab} className="mt-8">
                <div className="flex flex-col items-center justify-center py-16 space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">{language === "pt" ? "Minhas Páginas de Escritor" : "My Writer Pages"}</h2>
                    <p className="text-muted-foreground max-w-2xl">
                      {language === "pt" 
                        ? "Conteúdo escrito em diferentes plataformas"
                        : "Written content on different platforms"}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                    {/* Substack Button */}
                    <a
                      href="https://slnx.substack.com/?utm_campaign=profile&utm_medium=profile-page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid="button-writer-substack"
                    >
                      <div className="flex items-center justify-center gap-3 px-8 py-6 rounded-lg border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover-elevate">
                        <SiSubstack className="h-6 w-6 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold text-foreground">Substack</div>
                          <div className="text-sm text-muted-foreground">{language === "pt" ? "Newsletter semanal" : "Weekly newsletter"}</div>
                        </div>
                      </div>
                    </a>

                    {/* Write.as Button (no link) */}
                    <button
                      disabled
                      className="flex-1 opacity-60 cursor-not-allowed"
                      title={language === "pt" ? "Em breve" : "Coming soon"}
                      data-testid="button-writer-writeas"
                    >
                      <div className="flex items-center justify-center gap-3 px-8 py-6 rounded-lg border-2 border-border bg-card/50 transition-all duration-300">
                        <PenTool className="h-6 w-6 text-muted-foreground" />
                        <div className="text-left">
                          <div className="font-semibold text-muted-foreground">Write.as</div>
                          <div className="text-sm text-muted-foreground/70">{language === "pt" ? "Em breve" : "Coming soon"}</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </TabsContent>
            ) : (
              <TabsContent value={currentTab} className="mt-8">
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
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );

  return contentComponent;
}
