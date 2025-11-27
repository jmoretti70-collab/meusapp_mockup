import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Send, Mic, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MinhaIA() {
  const [, setLocation] = useLocation();
  const [mensagem, setMensagem] = useState("");

  const conversas = [
    { tipo: "bot", texto: "Olá! Sou a LogIA, sua assistente pessoal. Como posso ajudar você hoje?" },
    { tipo: "user", texto: "Qual a melhor rota de SP para RJ?" },
    { tipo: "bot", texto: "Analisando condições de tráfego em tempo real... 🚛\n\nRecomendo a Via Dutra (BR-116):\n• Distância: 429 km\n• Tempo estimado: 5h30min\n• Sem pedágios com problema\n• Condições boas\n\nAlternativa: BR-101 (mais 45min, mas menos tráfego)" },
    { tipo: "user", texto: "Quanto vou gastar de combustível?" },
    { tipo: "bot", texto: "Com base no seu Scania R450:\n\n💰 Estimativa de Combustível:\n• Consumo médio: 2.8 km/L\n• Litros necessários: ~153L\n• Custo estimado: R$ 901,50\n\n📊 Dica: Abasteça no Posto Graal (km 245) - R$ 0,15 mais barato!" },
  ];

  const sugestoes = [
    "🗺️ Melhor rota para...",
    "⛽ Postos mais baratos",
    "🏨 Hotéis próximos",
    "🔧 Oficinas 24h",
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">LogIA</h1>
              <p className="text-sm opacity-90">Assistente Inteligente</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversas.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.tipo === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.tipo === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-bl-sm"
                }`}
              >
                {msg.tipo === "bot" && (
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold">LogIA</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{msg.texto}</p>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <p className="text-xs text-muted-foreground text-center mb-3">Sugestões rápidas:</p>
            <div className="grid grid-cols-2 gap-2">
              {sugestoes.map((sug, idx) => (
                <button
                  key={idx}
                  className="bg-card border border-border rounded-lg px-3 py-2 text-xs font-semibold text-foreground hover:bg-primary/10 transition"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-background border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Digite sua pergunta..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" variant="outline">
              <Mic className="w-5 h-5" />
            </Button>
            <Button size="icon" className="bg-primary">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
