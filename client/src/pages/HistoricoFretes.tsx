import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Clock, CheckCircle2, XCircle, TrendingUp, MapPin, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoricoFretes() {
  const [, setLocation] = useLocation();
  const [filtro, setFiltro] = useState("todos");

  const fretes = [
    {
      id: 1,
      origem: "São Paulo, SP",
      destino: "Rio de Janeiro, RJ",
      distancia: "450 km",
      valor: 3500,
      data: "15/03/2025",
      status: "concluido",
      avaliacao: 5
    },
    {
      id: 2,
      origem: "Curitiba, PR",
      destino: "Florianópolis, SC",
      distancia: "300 km",
      valor: 2800,
      data: "18/03/2025",
      status: "em_andamento",
      progresso: 65
    },
    {
      id: 3,
      origem: "Belo Horizonte, MG",
      destino: "Brasília, DF",
      distancia: "740 km",
      valor: 4200,
      data: "20/03/2025",
      status: "em_andamento",
      progresso: 30
    },
    {
      id: 4,
      origem: "Porto Alegre, RS",
      destino: "São Paulo, SP",
      distancia: "1100 km",
      valor: 6500,
      data: "10/03/2025",
      status: "concluido",
      avaliacao: 5
    },
    {
      id: 5,
      origem: "Salvador, BA",
      destino: "Recife, PE",
      distancia: "800 km",
      valor: 4800,
      data: "05/03/2025",
      status: "cancelado",
      motivo: "Problema mecânico"
    },
    {
      id: 6,
      origem: "Manaus, AM",
      destino: "Belém, PA",
      distancia: "1300 km",
      valor: 7200,
      data: "01/03/2025",
      status: "concluido",
      avaliacao: 4
    },
  ];

  const fretesFiltrados = fretes.filter(f => {
    if (filtro === "todos") return true;
    return f.status === filtro;
  });

  const stats = {
    total: fretes.length,
    concluidos: fretes.filter(f => f.status === "concluido").length,
    emAndamento: fretes.filter(f => f.status === "em_andamento").length,
    cancelados: fretes.filter(f => f.status === "cancelado").length,
    faturamento: fretes.filter(f => f.status === "concluido").reduce((acc, f) => acc + f.valor, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido": return "bg-green-100 text-green-700 border-green-200";
      case "em_andamento": return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelado": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido": return <CheckCircle2 className="w-4 h-4" />;
      case "em_andamento": return <Clock className="w-4 h-4" />;
      case "cancelado": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "concluido": return "Concluído";
      case "em_andamento": return "Em Andamento";
      case "cancelado": return "Cancelado";
      default: return status;
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Clock className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Histórico de Fretes</h1>
              <p className="text-sm opacity-90">{stats.total} fretes registrados</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-700">{stats.concluidos}</div>
            <div className="text-[10px] text-green-600 font-bold">Concluídos</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{stats.emAndamento}</div>
            <div className="text-[10px] text-blue-600 font-bold">Em Andamento</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-purple-700">R$ {(stats.faturamento / 1000).toFixed(1)}k</div>
            <div className="text-[10px] text-purple-600 font-bold">Faturamento</div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {[
              { value: "todos", label: "Todos" },
              { value: "em_andamento", label: "Em Andamento" },
              { value: "concluido", label: "Concluídos" },
              { value: "cancelado", label: "Cancelados" }
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFiltro(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  filtro === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1  px-4 pb-4">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-4">
              {fretesFiltrados.map((frete, idx) => (
                <div key={frete.id} className="relative pl-12">
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${
                    frete.status === "concluido" ? "bg-green-500" :
                    frete.status === "em_andamento" ? "bg-blue-500" : "bg-red-500"
                  }`}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Card */}
                  <div 
                    className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition"
                    onClick={() => frete.status === "em_andamento" && setLocation(`/rastreamento/${frete.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-bold text-sm text-foreground">{frete.origem}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="font-bold text-sm text-foreground">{frete.destino}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 ${getStatusColor(frete.status)}`}>
                        {getStatusIcon(frete.status)}
                        {getStatusLabel(frete.status)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{frete.distancia}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{frete.data}</span>
                      </div>
                    </div>

                    {frete.status === "em_andamento" && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-bold text-foreground">{frete.progresso}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${frete.progresso}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {frete.status === "cancelado" && (
                      <div className="text-xs text-red-600 bg-red-50 rounded p-2">
                        Motivo: {frete.motivo}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">Valor</span>
                      <span className="text-lg font-bold text-primary">R$ {frete.valor.toLocaleString()}</span>
                    </div>

                    {frete.status === "concluido" && frete.avaliacao && (
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < frete.avaliacao ? "text-yellow-400" : "text-gray-300"}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
