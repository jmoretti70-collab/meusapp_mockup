import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { Crown, TrendingUp, Star, Shield, Clock, Truck, Award, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function MeuScore() {
  const [, setLocation] = useLocation();

  const scoreData = {
    current: 850,
    max: 1000,
    level: "Ouro",
    nextLevel: "Diamante",
    pointsToNext: 50,
  };

  const benefits = [
    { level: "Bronze", points: "0-499", benefits: ["Acesso básico", "Suporte por chat"], color: "bg-amber-700" },
    { level: "Prata", points: "500-699", benefits: ["Prioridade em fretes", "Desconto 5% marketplace"], color: "bg-gray-400" },
    { level: "Ouro", points: "700-899", benefits: ["Antecipação facilitada", "Desconto 10% marketplace", "Suporte prioritário"], color: "bg-amber-500", current: true },
    { level: "Diamante", points: "900-1000", benefits: ["Fretes exclusivos", "Desconto 15%", "Gerente dedicado"], color: "bg-cyan-400" },
  ];

  const history = [
    { action: "Frete concluído no prazo", points: "+15", date: "Hoje" },
    { action: "Avaliação 5 estrelas", points: "+10", date: "Ontem" },
    { action: "Documentação atualizada", points: "+5", date: "12/12" },
    { action: "Curso concluído", points: "+20", date: "10/12" },
    { action: "Indicação aceita", points: "+25", date: "08/12" },
  ];

  const percentage = (scoreData.current / scoreData.max) * 100;

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <PageHeader title="Meu Score" subtitle="Sua pontuação de confiança" backPath="/profile" variant="gradient" />

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 custom-scrollbar">
          {/* Score Card */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Sua Pontuação</p>
                <p className="text-5xl font-bold text-primary">{scoreData.current}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <Crown className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Nível {scoreData.level}</span>
                <span className="text-muted-foreground">{scoreData.pointsToNext} pts para {scoreData.nextLevel}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" style={{ width: `${percentage}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Truck className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">127</p>
                <p className="text-[10px] text-muted-foreground">Fretes</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">4.9</p>
                <p className="text-[10px] text-muted-foreground">Avaliação</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">98%</p>
                <p className="text-[10px] text-muted-foreground">No Prazo</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground mb-3">Níveis e Benefícios</h3>
            <div className="space-y-2">
              {benefits.map((benefit, idx) => (
                <div key={idx} className={cn("app-card flex items-center gap-3", benefit.current && "border-2 border-amber-500")}>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", benefit.color)}>
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">{benefit.level}</p>
                      {benefit.current && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Atual</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{benefit.points} pontos</p>
                  </div>
                  <button onClick={() => toast.info(benefit.level, { description: benefit.benefits.join(", ") })}>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Histórico de Pontos</h3>
              <button className="text-xs text-primary font-medium flex items-center gap-1">Ver tudo <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <div key={idx} className="app-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-600">{item.points}</span>
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
