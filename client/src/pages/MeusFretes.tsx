import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, MapPin, Package, Clock, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MeusFretes() {
  const [, setLocation] = useLocation();

  const fretes = [
    { origem: "São Paulo - SP", destino: "Rio de Janeiro - RJ", carga: "Eletrônicos", peso: "15 ton", valor: "R$ 4.500", lances: 3, tempo: "2h" },
    { origem: "Curitiba - PR", destino: "Florianópolis - SC", carga: "Alimentos", peso: "10 ton", valor: "R$ 2.800", lances: 7, tempo: "45min" },
    { origem: "Belo Horizonte - MG", destino: "Brasília - DF", carga: "Móveis", peso: "8 ton", valor: "R$ 3.200", lances: 2, tempo: "1h" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setLocation("/dashboard")}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Meus Fretes</h1>
              <p className="text-sm opacity-80">Leilão Reverso ANTT</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {fretes.map((frete, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold text-foreground">{frete.origem}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold text-foreground">{frete.destino}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Aberto</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Package className="w-3 h-3" />
                  <span>{frete.carga} • {frete.peso}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Encerra em {frete.tempo}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Valor Atual</div>
                  <div className="text-xl font-bold text-primary">{frete.valor}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingDown className="w-3 h-3" />
                    <span>{frete.lances} lances</span>
                  </div>
                </div>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                  Dar Lance
                </Button>
              </div>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
