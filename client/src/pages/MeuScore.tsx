import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, TrendingUp, Shield, FileCheck, Truck, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MeuScore() {
  const [, setLocation] = useLocation();

  const scores = [
    { label: "Document Score", value: 95, color: "bg-blue-500", icon: FileCheck },
    { label: "Crime Score", value: 100, color: "bg-green-500", icon: Shield },
    { label: "Logistics Score", value: 88, color: "bg-orange-500", icon: Truck },
    { label: "Commercial Score", value: 75, color: "bg-purple-500", icon: DollarSign },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Meu Score</h1>
          <p className="text-sm opacity-80 mt-1">Pontuação Multi-Dimensional</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground text-center">
            <div className="text-sm opacity-80 uppercase font-bold mb-2">Score Geral</div>
            <div className="text-6xl font-bold mb-2">850</div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+15 pontos este mês</span>
            </div>
            <div className="mt-4 bg-white/20 px-4 py-2 rounded-full inline-block">
              <span className="font-bold">Nível: OURO 👑</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Detalhamento por Categoria</h3>
            {scores.map((score, idx) => {
              const Icon = score.icon;
              return (
                <div key={idx} className="bg-card p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold text-sm text-foreground">{score.label}</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{score.value}</span>
                  </div>
                  <Progress value={score.value} className="h-2" />
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-bold text-blue-900 mb-2">💡 Como melhorar seu score?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Complete seu cadastro (CNH, RNTRC)</li>
              <li>• Mantenha documentos atualizados</li>
              <li>• Finalize fretes no prazo</li>
              <li>• Participe da comunidade</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
