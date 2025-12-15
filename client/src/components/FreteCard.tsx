import { MapPin, Package, Clock, TrendingDown, ChevronRight, Star } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FreteData {
  id: string;
  origem: string;
  destino: string;
  carga: string;
  peso: string;
  valor: string;
  valorOriginal?: string;
  lances?: number;
  tempo?: string;
  distancia?: string;
  status: "aberto" | "em_andamento" | "concluido" | "cancelado";
  avaliacao?: number;
  embarcador?: string;
}

interface FreteCardProps {
  frete: FreteData;
  variant?: "default" | "compact" | "detailed";
  showActions?: boolean;
  onDarLance?: () => void;
}

export default function FreteCard({
  frete,
  variant = "default",
  showActions = true,
  onDarLance,
}: FreteCardProps) {
  const [, setLocation] = useLocation();

  const statusConfig = {
    aberto: { label: "Aberto", color: "bg-green-100 text-green-700" },
    em_andamento: { label: "Em Andamento", color: "bg-blue-100 text-blue-700" },
    concluido: { label: "Concluído", color: "bg-gray-100 text-gray-700" },
    cancelado: { label: "Cancelado", color: "bg-red-100 text-red-700" },
  };

  const status = statusConfig[frete.status];

  if (variant === "compact") {
    return (
      <button
        onClick={() => setLocation(`/fretes/${frete.id}/chat`)}
        className="app-card w-full text-left flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {frete.origem} → {frete.destino}
          </p>
          <p className="text-xs text-muted-foreground">{frete.carga}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-primary">{frete.valor}</p>
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", status.color)}>
            {status.label}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="app-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-foreground">{frete.origem}</span>
          </div>
          <div className="flex items-center gap-2 ml-0.5">
            <div className="w-0.5 h-4 bg-border ml-[3px]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-sm font-semibold text-foreground">{frete.destino}</span>
          </div>
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", status.color)}>
          {status.label}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="w-3.5 h-3.5" />
          <span>{frete.carga} • {frete.peso}</span>
        </div>
        {frete.tempo && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Encerra em {frete.tempo}</span>
          </div>
        )}
        {frete.distancia && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>{frete.distancia}</span>
          </div>
        )}
        {frete.avaliacao && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{frete.avaliacao.toFixed(1)} ({frete.embarcador})</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div>
          <div className="text-xs text-muted-foreground">Valor Atual</div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{frete.valor}</span>
            {frete.valorOriginal && (
              <span className="text-xs text-muted-foreground line-through">{frete.valorOriginal}</span>
            )}
          </div>
          {frete.lances !== undefined && (
            <div className="flex items-center gap-1 text-xs text-green-600 mt-0.5">
              <TrendingDown className="w-3 h-3" />
              <span>{frete.lances} lances</span>
            </div>
          )}
        </div>
        {showActions && frete.status === "aberto" && (
          <Button
            size="sm"
            className="bg-secondary hover:bg-secondary/90"
            onClick={(e) => {
              e.stopPropagation();
              onDarLance?.();
            }}
          >
            Dar Lance
          </Button>
        )}
        {showActions && frete.status !== "aberto" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLocation(`/fretes/${frete.id}/chat`)}
          >
            Detalhes
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
