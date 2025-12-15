import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import FreteCard, { FreteData } from "@/components/FreteCard";
import { 
  Search, Filter, MapPin, SlidersHorizontal, 
  TrendingUp, Clock, DollarSign, ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type FilterType = "todos" | "proximos" | "melhor_valor" | "urgentes";

export default function MeusFretes() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");
  const [showFilters, setShowFilters] = useState(false);

  const fretes: FreteData[] = [
    { 
      id: "1",
      origem: "São Paulo - SP", 
      destino: "Rio de Janeiro - RJ", 
      carga: "Eletrônicos", 
      peso: "15 ton", 
      valor: "R$ 4.500",
      valorOriginal: "R$ 5.200",
      lances: 3, 
      tempo: "2h",
      distancia: "430 km",
      status: "aberto",
      avaliacao: 4.8,
      embarcador: "Tech Corp"
    },
    { 
      id: "2",
      origem: "Curitiba - PR", 
      destino: "Florianópolis - SC", 
      carga: "Alimentos", 
      peso: "10 ton", 
      valor: "R$ 2.800",
      valorOriginal: "R$ 3.100",
      lances: 7, 
      tempo: "45min",
      distancia: "300 km",
      status: "aberto",
      avaliacao: 4.5,
      embarcador: "Alimentos SA"
    },
    { 
      id: "3",
      origem: "Belo Horizonte - MG", 
      destino: "Brasília - DF", 
      carga: "Móveis", 
      peso: "8 ton", 
      valor: "R$ 3.200",
      valorOriginal: "R$ 3.800",
      lances: 2, 
      tempo: "1h",
      distancia: "740 km",
      status: "aberto",
      avaliacao: 4.9,
      embarcador: "Móveis Express"
    },
    { 
      id: "4",
      origem: "Porto Alegre - RS", 
      destino: "São Paulo - SP", 
      carga: "Grãos", 
      peso: "25 ton", 
      valor: "R$ 6.800",
      lances: 5, 
      tempo: "3h",
      distancia: "1.100 km",
      status: "aberto",
      avaliacao: 4.7,
      embarcador: "AgroBrasil"
    },
    { 
      id: "5",
      origem: "Campinas - SP", 
      destino: "Ribeirão Preto - SP", 
      carga: "Bebidas", 
      peso: "12 ton", 
      valor: "R$ 1.900",
      lances: 4, 
      tempo: "30min",
      distancia: "220 km",
      status: "aberto",
      avaliacao: 4.6,
      embarcador: "Bebidas Premium"
    },
  ];

  const filters = [
    { id: "todos" as FilterType, label: "Todos", icon: SlidersHorizontal },
    { id: "proximos" as FilterType, label: "Próximos", icon: MapPin },
    { id: "melhor_valor" as FilterType, label: "Melhor Valor", icon: DollarSign },
    { id: "urgentes" as FilterType, label: "Urgentes", icon: Clock },
  ];

  const filteredFretes = fretes.filter(frete => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        frete.origem.toLowerCase().includes(query) ||
        frete.destino.toLowerCase().includes(query) ||
        frete.carga.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleDarLance = (freteId: string) => {
    toast.success("Lance registrado!", {
      description: "Você receberá uma notificação sobre o resultado.",
    });
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <PageHeader 
          title="Meus Fretes"
          subtitle="Leilão Reverso ANTT"
          backPath="/dashboard"
          variant="gradient"
          rightContent={
            <button 
              className="icon-button-primary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </button>
          }
        />

        {/* Search & Filters */}
        <div className="px-4 py-3 space-y-3 bg-card border-b border-border/50">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cidade ou carga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-0"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              <strong className="text-foreground">{filteredFretes.length}</strong> fretes disponíveis
            </span>
            <button className="flex items-center gap-1 text-primary font-medium">
              Ordenar <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Fretes List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-24 space-y-3 custom-scrollbar">
          {filteredFretes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Nenhum frete encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Tente ajustar os filtros ou buscar por outra cidade
              </p>
            </div>
          ) : (
            filteredFretes.map((frete) => (
              <FreteCard 
                key={frete.id} 
                frete={frete}
                onDarLance={() => handleDarLance(frete.id)}
              />
            ))
          )}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setLocation("/calculadora")}
          className="absolute bottom-24 right-4 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95"
          aria-label="Calculadora de Frete"
        >
          <TrendingUp className="w-6 h-6" />
        </button>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
