import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import FollowToUnlock from "@/components/FollowToUnlock";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@shared/schema";
import { SiSubstack } from "react-icons/si";
import { PenTool, ExternalLink } from "lucide-react";

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
            ) : currentTab === "photography" ? (
              <TabsContent value={currentTab} className="mt-8">
                <div className="space-y-8">
                  {/* Intro Text */}
                  <div className="bg-card/50 border border-border rounded-lg p-6 md:p-8">
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {language === "pt" 
                        ? "Fotos melancólicas com sentido e sentimento. Cada imagem conta uma história de profundidade e emoção. Conheça meu trabalho no Instagram e explore mais sobre a forma como vejo e capto o mundo."
                        : "Melancholic photos with meaning and feeling. Each image tells a story of depth and emotion. Get to know my work on Instagram and explore how I see and capture the world."}
                    </p>
                  </div>

                  {/* Photography Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-photo-collection-1"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <div className="aspect-square overflow-hidden bg-card relative">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                            alt="Melancholic hands"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Silhuetas" : "Silhouettes"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Contrastes de luz e sombra" : "Light and shadow contrasts"}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                            {language === "pt" ? "Ver no Instagram" : "View on Instagram"}
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-photo-collection-2"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <div className="aspect-square overflow-hidden bg-card relative">
                          <img 
                            src="https://images.unsplash.com/photo-1518577915332-23d08d30ad04?w=400&h=400&fit=crop"
                            alt="Mirror reflection"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Auto-retratos" : "Self-Portraits"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Reflexões pessoais e introspectivas" : "Personal and introspective reflections"}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                            {language === "pt" ? "Ver no Instagram" : "View on Instagram"}
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-photo-collection-3"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <div className="aspect-square overflow-hidden bg-card relative">
                          <img 
                            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop"
                            alt="Intimate moments"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Intimidade" : "Intimacy"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Momentos sensíveis e afetuosos" : "Sensitive and affectionate moments"}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                            {language === "pt" ? "Ver no Instagram" : "View on Instagram"}
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-photo-collection-4"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <div className="aspect-square overflow-hidden bg-card relative">
                          <img 
                            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop"
                            alt="Creative workspace"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Criatividade" : "Creativity"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Processos e paixões profissionais" : "Professional processes and passions"}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                            {language === "pt" ? "Ver no Instagram" : "View on Instagram"}
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-photo-collection-5"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <div className="aspect-square overflow-hidden bg-card relative">
                          <img 
                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop"
                            alt="Nature connection"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Natureza" : "Nature"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Conexão com o mundo natural" : "Connection with the natural world"}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                            {language === "pt" ? "Ver no Instagram" : "View on Instagram"}
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-photo-collection-6"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <div className="aspect-square overflow-hidden bg-card relative">
                          <img 
                            src="https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=400&h=400&fit=crop"
                            alt="Poetic nature"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Poesia Visual" : "Visual Poetry"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Detalhes que contam histórias" : "Details that tell stories"}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                            {language === "pt" ? "Ver no Instagram" : "View on Instagram"}
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>
                  </div>
                </div>
              </TabsContent>
            ) : currentTab === "writer" ? (
              <TabsContent value={currentTab} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Substack Card */}
                  <a
                    href="https://slnx.substack.com/?utm_campaign=profile&utm_medium=profile-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-writer-substack"
                  >
                    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full">
                      {/* Background with gradient and icon */}
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-900/20 to-purple-600/10 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-black/20" />
                        <SiSubstack className="h-32 w-32 text-purple-400/30 transition-transform duration-500 group-hover:scale-110" />
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                            Substack
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {language === "pt" 
                            ? "Reflexões sobre superdotação, melancolia, desenvolvimento pessoal e estudos. Desabafos sinceros sobre como vejo a realidade e as complexidades da vida."
                            : "Reflections on giftedness, melancholy, personal development and learning. Honest thoughts on how I see reality and life's complexities."}
                        </p>
                      </div>
                    </Card>
                  </a>

                  {/* Write.as Card (disabled) */}
                  <div
                    className="opacity-60 cursor-not-allowed"
                    title={language === "pt" ? "Em breve" : "Coming soon"}
                    data-testid="button-writer-writeas"
                  >
                    <Card className="overflow-hidden h-full">
                      {/* Background with gradient and icon */}
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-700/20 to-slate-600/10 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-black/40" />
                        <PenTool className="h-32 w-32 text-slate-400/30" />
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold leading-tight text-muted-foreground">
                            Write.as
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed">
                          {language === "pt" 
                            ? "Diários anônimos. Desabafos sinceros, melancolia profunda e reflexões sobre como eu vejo a realidade. Textos pesados sobre histórias de vida, depressão e solidão."
                            : "Anonymous diaries. Honest confessions, deep melancholy and reflections on how I see reality. Heavy texts about life stories, depression and loneliness."}
                        </p>
                      </div>
                    </Card>
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
                ) : currentTab === "agriculture" ? (
                  <div className="space-y-8">
                    {/* Agriculture Stories Info */}
                    <div className="bg-card/50 border border-border rounded-lg p-6 md:p-8">
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {language === "pt" 
                          ? "Acompanhe meus Stories no Instagram (@slx.wav) para conteúdo diário sobre agricultura, técnicas de cultivo, sustentabilidade e a beleza do trabalho com a terra. Histórias que mostram o dia a dia do processo agrícola com uma perspectiva profunda e reflexiva."
                          : "Follow my Instagram Stories (@slx.wav) for daily content about agriculture, cultivation techniques, sustainability and the beauty of working with the land. Stories that show the daily life of the agricultural process with a deep and reflective perspective."}
                      </p>
                    </div>

                    {/* Projects Grid */}
                    {filteredProjects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-testid="grid-content-projects">
                        {filteredProjects.map(project => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16" data-testid="empty-state-content">
                        <p className="text-muted-foreground">
                          {language === "pt" 
                            ? "Mais conteúdo em breve. Acompanhe os Stories!"
                            : "More content coming soon. Follow the Stories!"}
                        </p>
                      </div>
                    )}
                  </div>
                ) : currentTab === "development" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-testid="grid-content-projects">
                    {/* Substack card first */}
                    <a
                      href="https://slnx.substack.com/?utm_campaign=profile&utm_medium=profile-page"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-dev-substack"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full">
                        {/* Background with gradient and icon */}
                        <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-900/20 to-purple-600/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-black/20" />
                          <SiSubstack className="h-32 w-32 text-purple-400/30 transition-transform duration-500 group-hover:scale-110" />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                              <h3 className="text-2xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                                Substack
                              </h3>
                              <Badge
                                variant="outline"
                                className="bg-orange-500/10 text-orange-400 border-orange-500/20"
                              >
                                {language === "pt" ? "Dev Pessoal" : "Personal Dev"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === "pt" 
                              ? "Reflexões sobre superdotação, melancolia, desenvolvimento pessoal e estudos. Desabafos sinceros sobre como vejo a realidade e as complexidades da vida."
                              : "Reflections on giftedness, melancholy, personal development and learning. Honest thoughts on how I see reality and life's complexities."}
                          </p>
                        </div>
                      </Card>
                    </a>

                    {/* Other development projects */}
                    {filteredProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
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
