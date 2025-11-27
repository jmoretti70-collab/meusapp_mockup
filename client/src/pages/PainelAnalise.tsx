import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Truck, Fuel, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PainelAnalise() {
  const [, setLocation] = useLocation();
  const [periodo, setPeriodo] = useState("mes");

  const stats = {
    fretesRealizados: 42,
    receitaTotal: 156800,
    mediaFrete: 3733,
    consumoMedio: 2.4,
    kmRodados: 18500,
    rotaMaisLucrativa: "SP → RJ"
  };

  const fretesChart = [
    { mes: "Jan", fretes: 28, receita: 98000 },
    { mes: "Fev", fretes: 35, receita: 125000 },
    { mes: "Mar", fretes: 42, receita: 156800 },
  ];

  const rotasTop = [
    { rota: "São Paulo → Rio de Janeiro", fretes: 12, receita: 42000, lucro: 15400 },
    { rota: "Curitiba → Florianópolis", fretes: 8, receita: 22400, lucro: 8200 },
    { rota: "Belo Horizonte → Brasília", fretes: 6, receita: 25200, lucro: 9100 },
    { rota: "Porto Alegre → São Paulo", fretes: 5, receita: 32500, lucro: 11800 },
  ];

  const maxReceita = Math.max(...fretesChart.map(f => f.receita));

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Painel de Análise</h1>
              <p className="text-sm opacity-90">Seu desempenho em números</p>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex gap-2">
            {[
              { value: "semana", label: "Semana" },
              { value: "mes", label: "Mês" },
              { value: "trimestre", label: "Trimestre" },
              { value: "ano", label: "Ano" }
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriodo(p.value)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  periodo === p.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5" />
                <span className="text-xs opacity-90">Fretes</span>
              </div>
              <div className="text-3xl font-bold">{stats.fretesRealizados}</div>
              <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+20% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-xs opacity-90">Receita</span>
              </div>
              <div className="text-2xl font-bold">R$ {(stats.receitaTotal / 1000).toFixed(0)}k</div>
              <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+27% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span className="text-xs text-muted-foreground">Média/Frete</span>
              </div>
              <div className="text-2xl font-bold text-foreground">R$ {stats.mediaFrete.toLocaleString()}</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-5 h-5 text-orange-600" />
                <span className="text-xs text-muted-foreground">Consumo</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.consumoMedio} km/l</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Evolução de Receita
            </h3>
            
            <div className="space-y-3">
              {fretesChart.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-foreground">{item.mes}</span>
                    <span className="text-muted-foreground">R$ {(item.receita / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${(item.receita / maxReceita) * 100}%` }}
                    >
                      <span className="text-white text-xs font-bold">{item.fretes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Routes */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Rotas Mais Lucrativas
            </h3>
            
            <div className="space-y-3">
              {rotasTop.map((rota, idx) => (
                <div key={idx} className="border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-sm text-foreground">{rota.rota}</div>
                      <div className="text-xs text-muted-foreground">{rota.fretes} fretes realizados</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">+R$ {(rota.lucro / 1000).toFixed(1)}k</div>
                      <div className="text-xs text-muted-foreground">lucro</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(rota.lucro / rota.receita) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-muted-foreground w-12 text-right">
                      {((rota.lucro / rota.receita) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs opacity-90">Total Rodado</div>
                <div className="text-3xl font-bold">{(stats.kmRodados / 1000).toFixed(1)}k km</div>
              </div>
              <MapPin className="w-12 h-12 opacity-20" />
            </div>
            <div className="text-xs opacity-90">
              Equivalente a {(stats.kmRodados / 40075).toFixed(1)} voltas ao redor da Terra
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
