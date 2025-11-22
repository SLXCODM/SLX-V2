import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@shared/schema";

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Tutorial de Precisão - CODM",
    category: "gaming",
    description: "Guia completo para melhorar sua precisão no Call of Duty Mobile com técnicas profissionais",
    imageUrl: "/attached_assets/precision1.jpg",
    externalUrl: "https://youtube.com/@slx",
    featured: true,
    order: "1",
  },
  {
    id: "2",
    title: "Melhores Loadouts Sniper",
    category: "gaming",
    description: "Configurações otimizadas para snipers com sensibilidade e HUD personalizados",
    imageUrl: "/attached_assets/precision2.jpg",
    externalUrl: "https://youtube.com/@slx",
    featured: true,
    order: "2",
  },
  {
    id: "3",
    title: "Fotografia de Paisagens",
    category: "photography",
    description: "Explorando a melancolia através de paisagens naturais e urbanas",
    imageUrl: "/attached_assets/1000004347.jpg",
    externalUrl: "https://instagram.com/slx",
    featured: false,
    order: "3",
  },
  {
    id: "4",
    title: "Retratos Minimalistas",
    category: "photography",
    description: "Capturando essências através da simplicidade e contraste",
    imageUrl: "/attached_assets/1000004348.jpg",
    externalUrl: "https://instagram.com/slx",
    featured: false,
    order: "4",
  },
  {
    id: "5",
    title: "Agricultura Sustentável",
    category: "agriculture",
    description: "Meu trabalho no campo e conexão com a natureza",
    imageUrl: "/attached_assets/setup1.jpg",
    externalUrl: "https://youtube.com/@slx-agricultura",
    featured: false,
    order: "5",
  },
  {
    id: "6",
    title: "Desenvolvimento Pessoal",
    category: "development",
    description: "Reflexões sobre psicologia, filosofia e autoconhecimento",
    imageUrl: "/attached_assets/setup2.jpg",
    externalUrl: "https://tiktok.com/@slx",
    featured: false,
    order: "6",
  },
];

export default function Content() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  // Check URL params for category filter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category && ["gaming", "photography", "agriculture", "development"].includes(category)) {
      setActiveTab(category);
    }
  }, [location]);

  const filteredProjects = activeTab === "all" 
    ? mockProjects 
    : mockProjects.filter(p => p.category === activeTab);

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
                    Nenhum conteúdo encontrado nesta categoria ainda.
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
