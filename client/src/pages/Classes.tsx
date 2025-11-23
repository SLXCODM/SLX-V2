import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { weaponsData, type Weapon } from "@shared/weaponsData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { language } = useLanguage();

  const classesTexts = {
    pt: {
      title: "Classes de Armas SLX",
      description: "Encontre as melhores configurações e código de armas para melhorar sua gameplay",
      searchPlaceholder: "Pesquise pelo nome da arma (ex: XM4, AK, Sniper...)...",
      allWeapons: "Todas"
    },
    en: {
      title: "SLX Weapon Classes",
      description: "Find the best weapon configurations and codes to improve your gameplay",
      searchPlaceholder: "Search by weapon name (e.g., XM4, AK, Sniper...)...",
      allWeapons: "All"
    }
  };

  const ct = classesTexts[language];

  // Fuzzy search helper
  const fuzzyMatch = (searchStr: string, target: string): number => {
    const search = searchStr.toLowerCase();
    const text = target.toLowerCase();
    let searchIdx = 0;
    let score = 0;

    for (let i = 0; i < text.length; i++) {
      if (search[searchIdx] === text[i]) {
        score += 1;
        searchIdx++;
        if (searchIdx === search.length) break;
      }
    }

    return searchIdx === search.length ? score : -1;
  };

  // Filter and search
  const filteredWeapons = useMemo(() => {
    return weaponsData
      .filter(weapon => {
        const typeMatch = !selectedType || weapon.type === selectedType;
        const searchMatch =
          !searchTerm ||
          fuzzyMatch(searchTerm, weapon.name) > -1 ||
          fuzzyMatch(searchTerm, weapon.description) > -1;
        return typeMatch && searchMatch;
      })
      .sort((a, b) => {
        if (!searchTerm) return 0;
        const scoreA = fuzzyMatch(searchTerm, a.name);
        const scoreB = fuzzyMatch(searchTerm, b.name);
        return scoreB - scoreA;
      });
  }, [searchTerm, selectedType]);

  const weaponTypes = Array.from(new Set(weaponsData.map(w => w.type)));

  const typeColors: Record<string, string> = {
    "Assault Rifle": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Sniper": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "SMG": "bg-green-500/10 text-green-400 border-green-500/20",
    "Shotgun": "bg-red-500/10 text-red-400 border-red-500/20",
    "LMG": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Marksman": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Pistol": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <div className="min-h-screen py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="space-y-8 mb-12">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-classes-title">
              {ct.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-classes-description">
              {ct.description}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative" data-testid="search-weapons">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={ct.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-base"
                data-testid="input-search-weapons"
              />
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2" data-testid="filter-weapon-types">
              <Button
                variant={!selectedType ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
                data-testid="filter-all-weapons"
              >
                <Filter className="h-4 w-4 mr-2" />
                {ct.allWeapons}
              </Button>
              {weaponTypes.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  data-testid={`filter-type-${type.toLowerCase().replace(" ", "-")}`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground" data-testid="text-results-count">
            {filteredWeapons.length} {filteredWeapons.length === 1 ? "arma encontrada" : "armas encontradas"}
          </p>
        </div>

        {/* Weapons Grid */}
        {filteredWeapons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-weapons">
            {filteredWeapons.map(weapon => (
              <Card
                key={weapon.id}
                className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
                data-testid={`card-weapon-${weapon.id}`}
              >
                {/* Weapon Image */}
                {weapon.image && (
                  <div className="aspect-video overflow-hidden bg-card">
                    <img
                      src={weapon.image}
                      alt={weapon.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-weapon-${weapon.id}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title and Type */}
                  <div className="space-y-2">
                    <h3
                      className="text-xl font-bold text-foreground group-hover:text-primary transition-colors"
                      data-testid={`text-weapon-name-${weapon.id}`}
                    >
                      {weapon.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        typeColors[weapon.type] ||
                        "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }`}
                      data-testid={`badge-weapon-type-${weapon.id}`}
                    >
                      {weapon.type}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    data-testid={`text-weapon-description-${weapon.id}`}
                  >
                    {weapon.description}
                  </p>

                  {/* Code Section */}
                  <div className="bg-muted/50 rounded p-3 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Código da Classe
                    </p>
                    <code
                      className="text-sm font-mono text-primary block break-all"
                      data-testid={`text-weapon-code-${weapon.id}`}
                    >
                      {weapon.code}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(weapon.code);
                      }}
                      data-testid={`button-copy-code-${weapon.id}`}
                    >
                      Copiar Código
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="empty-state-weapons">
            <p className="text-lg text-muted-foreground">
              Nenhuma arma encontrada com "{searchTerm}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Tente outro termo de busca ou ajuste os filtros
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
