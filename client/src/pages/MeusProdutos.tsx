import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Search, ShoppingCart, Heart, Star, Filter,
  Truck, ChevronRight, Percent
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  discount?: number;
  freeShipping?: boolean;
}

type CategoryType = "todos" | "pneus" | "pecas" | "acessorios" | "eletronicos";

export default function MeusProdutos() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("todos");
  const [cartCount, setCartCount] = useState(2);

  const categories = [
    { id: "todos" as CategoryType, label: "Todos" },
    { id: "pneus" as CategoryType, label: "Pneus" },
    { id: "pecas" as CategoryType, label: "Peças" },
    { id: "acessorios" as CategoryType, label: "Acessórios" },
    { id: "eletronicos" as CategoryType, label: "Eletrônicos" },
  ];

  const products: Product[] = [
    { id: "1", name: "Pneu Bridgestone 295/80R22.5", price: 1890, originalPrice: 2200, rating: 4.8, reviews: 234, image: "🛞", category: "pneus", discount: 14, freeShipping: true },
    { id: "2", name: "Óleo Motor 15W40 20L", price: 389, originalPrice: 450, rating: 4.9, reviews: 567, image: "🛢️", category: "pecas", discount: 13 },
    { id: "3", name: "GPS Garmin Dezl OTR700", price: 2490, rating: 4.7, reviews: 189, image: "📍", category: "eletronicos", freeShipping: true },
    { id: "4", name: "Kit Lâmpadas LED H7", price: 189, originalPrice: 250, rating: 4.5, reviews: 892, image: "💡", category: "acessorios", discount: 24 },
    { id: "5", name: "Filtro de Ar Mann C30850", price: 245, rating: 4.9, reviews: 156, image: "🔧", category: "pecas" },
    { id: "6", name: "Câmera de Ré HD", price: 299, originalPrice: 399, rating: 4.6, reviews: 423, image: "📷", category: "eletronicos", discount: 25 },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const addToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    toast.success("Adicionado ao carrinho!", { description: product.name });
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        <PageHeader 
          title="Meus Produtos"
          subtitle="Marketplace exclusivo"
          backPath="/dashboard"
          variant="gradient"
          rightContent={
            <button className="icon-button-primary relative" onClick={() => toast.info("Carrinho", { description: `${cartCount} itens` })}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
          }
        />

        <div className="px-4 py-3 bg-card border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar produtos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-muted/50 border-0" />
          </div>
        </div>

        <div className="px-4 py-3 border-b border-border/50">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn("px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all", activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-xl p-4 text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Percent className="w-6 h-6" /></div>
            <div className="flex-1"><p className="font-bold">Frete Grátis</p><p className="text-xs opacity-90">Em compras acima de R$ 500</p></div>
            <ChevronRight className="w-5 h-5 opacity-70" />
          </div>
        </div>

        <div className="flex-1  px-4 pb-24 ">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">{filteredProducts.length}</strong> produtos</p>
            <button className="flex items-center gap-1 text-xs text-primary font-medium"><Filter className="w-3 h-3" /> Filtrar</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-md transition-all">
                <div className="relative bg-muted/30 h-28 flex items-center justify-center">
                  <span className="text-4xl">{product.image}</span>
                  {product.discount && <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{product.discount}%</span>}
                  <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500" onClick={() => toast.info("Favoritos")}>
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="mb-2">
                    {product.originalPrice && <p className="text-[10px] text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</p>}
                    <p className="text-sm font-bold text-primary">{formatCurrency(product.price)}</p>
                  </div>
                  {product.freeShipping && <div className="flex items-center gap-1 text-green-600 mb-2"><Truck className="w-3 h-3" /><span className="text-[10px] font-medium">Frete Grátis</span></div>}
                  <Button size="sm" className="w-full text-xs h-8" onClick={() => addToCart(product)}><ShoppingCart className="w-3 h-3 mr-1" />Adicionar</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
