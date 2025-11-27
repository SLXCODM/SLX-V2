import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Shop() {
  const { language } = useLanguage();
  
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const formatPrice = (price: string) => {
    const cents = parseInt(price);
    const reais = cents / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(reais);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <div className="h-12 bg-card border border-border rounded-md animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-card border border-border rounded-md animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-shop-title">
            {language === "pt" ? "Loja SLX" : "SLX Shop"}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl" data-testid="text-shop-subtitle">
            {language === "pt" 
              ? "Cursos exclusivos, presets fotográficos e sessões de mentoria para elevar seu nível"
              : "Exclusive courses, photography presets and mentoring sessions to level up"}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-testid="grid-shop-products">
            {products.map(product => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 flex flex-col"
                data-testid={`card-product-${product.id}`}
              >
                {/* Image */}
                {product.imageUrl && (
                  <div className="aspect-video overflow-hidden bg-card">
                    <img 
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                        {product.category}
                      </p>
                      <h3 className="text-xl font-bold line-clamp-2" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-4 mt-6 border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                        {formatPrice(product.price)}
                      </span>
                      {product.featured && (
                        <span className="text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-1 rounded">
                          {language === "pt" ? "Destaque" : "Featured"}
                        </span>
                      )}
                    </div>

                    <Button 
                      className="w-full gap-2" 
                      data-testid={`button-buy-product-${product.id}`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {language === "pt" ? "Comprar Agora" : "Buy Now"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground" data-testid="text-shop-empty">
              {language === "pt" 
                ? "Nenhum produto disponível no momento"
                : "No products available at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
