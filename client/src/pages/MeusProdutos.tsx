import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MeusProdutos() {
  const [, setLocation] = useLocation();

  const produtos = [
    { nome: "Pneu Pirelli 275/80 R22.5", preco: "R$ 1.450", desconto: "15% OFF", rating: 4.8, img: "🚛" },
    { nome: "Óleo Lubrificante 15W40 20L", preco: "R$ 285", desconto: "10% OFF", rating: 4.9, img: "🛢️" },
    { nome: "Filtro de Ar Scania", preco: "R$ 120", desconto: "", rating: 4.7, img: "🔧" },
    { nome: "Bateria 150Ah Moura", preco: "R$ 680", desconto: "20% OFF", rating: 4.6, img: "🔋" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <button onClick={() => setLocation("/dashboard")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Meus Produtos</h1>
          <p className="text-sm opacity-80">Marketplace Especializado</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-background sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar peças e produtos..." className="pl-10" />
            </div>
          </div>

          <div className="px-4 pb-4 grid grid-cols-2 gap-3">
            {produtos.map((p, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition">
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                  {p.img}
                </div>
                <div className="p-3">
                  {p.desconto && (
                    <div className="text-xs font-bold text-secondary mb-1">{p.desconto}</div>
                  )}
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">{p.nome}</h3>
                  <div className="flex items-center gap-1 text-xs text-yellow-600 mb-2">
                    <Star className="w-3 h-3 fill-yellow-500" />
                    <span>{p.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-primary mb-2">{p.preco}</div>
                  <Button size="sm" className="w-full text-xs">Comprar</Button>
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
