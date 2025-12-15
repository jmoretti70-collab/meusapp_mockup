import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, AlertTriangle, Navigation, MapPin, Clock } from "lucide-react";

export default function ClimaRota() {
  const [, setLocation] = useLocation();

  const rota = {
    origem: "Curitiba, PR",
    destino: "Florianópolis, SC",
    distancia: 300,
    tempoEstimado: "4h 30min"
  };

  const pontos = [
    {
      local: "Curitiba, PR",
      km: 0,
      hora: "14:00",
      clima: "sol",
      temperatura: 24,
      condicao: "Ensolarado",
      vento: 12,
      chuva: 0
    },
    {
      local: "Garuva, SC",
      km: 100,
      hora: "15:20",
      clima: "nublado",
      temperatura: 22,
      condicao: "Parcialmente Nublado",
      vento: 18,
      chuva: 10
    },
    {
      local: "Joinville, SC",
      km: 150,
      hora: "16:10",
      clima: "chuva",
      temperatura: 19,
      condicao: "Chuva Moderada",
      vento: 25,
      chuva: 70,
      alerta: "Reduza a velocidade devido à chuva"
    },
    {
      local: "Florianópolis, SC",
      km: 300,
      hora: "18:30",
      clima: "sol",
      temperatura: 26,
      condicao: "Ensolarado",
      vento: 15,
      chuva: 0
    },
  ];

  const alertas = [
    {
      tipo: "clima",
      severidade: "media",
      local: "Joinville, SC (km 150)",
      mensagem: "Chuva moderada prevista. Reduza a velocidade e aumente a distância de segurança.",
      hora: "16:10"
    },
    {
      tipo: "trafego",
      severidade: "baixa",
      local: "BR-101 (km 220)",
      mensagem: "Tráfego lento devido a obras. Adicione 15min ao tempo estimado.",
      hora: "17:30"
    }
  ];

  const getClimaIcon = (clima: string) => {
    switch (clima) {
      case "sol": return <Sun className="w-8 h-8 text-yellow-500" />;
      case "nublado": return <Cloud className="w-8 h-8 text-gray-400" />;
      case "chuva": return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Sun className="w-8 h-8" />;
    }
  };

  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case "alta": return "bg-red-50 border-red-200";
      case "media": return "bg-yellow-50 border-yellow-200";
      case "baixa": return "bg-blue-50 border-blue-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  const getSeveridadeIconColor = (severidade: string) => {
    switch (severidade) {
      case "alta": return "text-red-600";
      case "media": return "text-yellow-600";
      case "baixa": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/dashboard")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Cloud className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Clima na Rota</h1>
              <p className="text-sm opacity-90">Previsão e alertas</p>
            </div>
          </div>
        </div>

        {/* Rota Info */}
        <div className="px-6 py-4 bg-card border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">{rota.origem}</span>
            </div>
            <Navigation className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-bold text-foreground">{rota.destino}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{rota.distancia} km</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {rota.tempoEstimado}
            </span>
          </div>
        </div>

        <div className="flex-1  p-4 space-y-4">
          {/* Alertas */}
          {alertas.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Alertas Ativos
              </h3>
              {alertas.map((alerta, idx) => (
                <div key={idx} className={`border rounded-xl p-4 ${getSeveridadeColor(alerta.severidade)}`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getSeveridadeIconColor(alerta.severidade)}`} />
                    <div className="flex-1">
                      <div className="font-bold text-sm text-foreground mb-1">{alerta.local}</div>
                      <div className="text-xs text-foreground/80 mb-2">{alerta.mensagem}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Previsto para {alerta.hora}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Previsão por Pontos */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Previsão ao Longo da Rota</h3>
            <div className="relative">
              {/* Linha de Conexão */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              <div className="space-y-4">
                {pontos.map((ponto, idx) => (
                  <div key={idx} className="relative pl-14">
                    {/* Ícone do Clima */}
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center">
                      {getClimaIcon(ponto.clima)}
                    </div>

                    {/* Card */}
                    <div className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-bold text-foreground">{ponto.local}</div>
                          <div className="text-xs text-muted-foreground">km {ponto.km} • {ponto.hora}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{ponto.temperatura}°</div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground mb-3">{ponto.condicao}</div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-cyan-600" />
                          <span className="text-muted-foreground">Vento: {ponto.vento} km/h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CloudRain className="w-4 h-4 text-blue-600" />
                          <span className="text-muted-foreground">Chuva: {ponto.chuva}%</span>
                        </div>
                      </div>

                      {ponto.alerta && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-start gap-2 text-xs">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                            <span className="text-yellow-700">{ponto.alerta}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
            <h3 className="font-bold mb-3">Resumo da Viagem</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-90">Temperatura média</span>
                <span className="font-bold">23°C</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Probabilidade de chuva</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Vento máximo</span>
                <span className="font-bold">25 km/h</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/30 text-xs opacity-90">
              Última atualização: há 15 minutos
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
