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
import photoSilhouettes from "@assets/photo-silhouettes.jpg";
import photoSelfPortrait from "@assets/photo-selfportrait.jpg";
import photoIntimacy from "@assets/photo-intimacy.jpg";
import photoCreativity from "@assets/photo-creativity.jpg";
import photoNature from "@assets/photo-nature.jpg";
import photoPoetry from "@assets/photo-poetry.jpg";

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
                            src={photoSilhouettes}
                            alt="Melancholic hands"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Melancolia Visual" : "Visual Melancholy"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Imagens escuras com sentimento. Meu modo de ver a realidade — triste, melancólica, profunda." : "Dark images with feeling. My way of seeing reality — sad, melancholic, profound."}
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
                            src={photoSelfPortrait}
                            alt="Mirror reflection"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Mistério" : "Mystery"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Fragmentos de um rosto que poucos conhecem. Você quer me ver, mas deixo apenas pistas." : "Fragments of a face few know. You want to see me, but I leave only clues."}
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
                            src={photoIntimacy}
                            alt="Intimate moments"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Gatinhos" : "Kittens"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Momentos com meu gato. Pequenas cenas de afeto e companhia nos dias cinzentos." : "Moments with my cat. Little scenes of affection and company on grey days."}
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
                            src={photoCreativity}
                            alt="Creative workspace"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Criação" : "Creation"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Meu gato observando enquanto edito vídeos, programo sites e mexo com coisas inteligentes. Companhia nos processos criativos." : "My cat watching while I edit videos, code websites and work with smart things. Companionship in creative processes."}
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
                            src={photoNature}
                            alt="Nature connection"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                              {language === "pt" ? "Esforço" : "Effort"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {language === "pt" ? "Minha mão na terra. O esforço real do trabalho agrícola — não é fácil, mas é genuíno." : "My hand in the earth. The real effort of agricultural work — it's not easy, but it's genuine."}
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
                            src={photoPoetry}
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
                              {language === "pt" ? "Pequenos detalhes de um mundo difícil de ser notado. Meu modo de ver a natureza — poética, sensível, quase invisível." : "Small details of a world hard to notice. My way of seeing nature — poetic, sensitive, almost invisible."}
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
                    {/* Agriculture Stories Card */}
                    <a
                      href="https://www.instagram.com/slx.wav"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-agriculture-stories"
                    >
                      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                          {/* Image */}
                          <div className="aspect-square overflow-hidden bg-card relative order-2 md:order-1">
                            <img 
                              src={photoNature}
                              alt="Agriculture work"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          {/* Content */}
                          <div className="p-6 md:p-8 flex flex-col justify-center order-1 md:order-2">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                                  {language === "pt" ? "Meu Trabalho" : "My Work"}
                                </h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                                  {language === "pt" ? "Stories do Instagram" : "Instagram Stories"}
                                </p>
                              </div>
                              <p className="text-base text-muted-foreground leading-relaxed">
                                {language === "pt" 
                                  ? "No Instagram (@slx.wav) eu mostro o dia a dia no campo, a rotina na agricultura e o trabalho com a terra, do jeito que ele realmente é. Tenho certeza que você irá gostar."
                                  : "Follow my Instagram Stories (@slx.wav) for daily content about agriculture, cultivation techniques, sustainability and the beauty of working with the land. Stories that show the daily life of the agricultural process with a deep and reflective perspective."}
                              </p>
                              <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                                {language === "pt" ? "Ver Stories" : "View Stories"}
                                <ExternalLink className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </a>

                    {/* Projects Grid */}
                    {filteredProjects.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-6" data-testid="text-agriculture-projects">
                          {language === "pt" ? "Mais Conteúdo" : "More Content"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-testid="grid-content-projects">
                          {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                          ))}
                        </div>
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
