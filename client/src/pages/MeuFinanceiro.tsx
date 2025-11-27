import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeuFinanceiro() {
  const [, setLocation] = useLocation();

  const transacoes = [
    { tipo: "entrada", desc: "Frete SP-RJ", valor: "+R$ 4.500", data: "Hoje, 14:30", icon: TrendingUp, color: "text-green-600" },
    { tipo: "saida", desc: "Combustível", valor: "-R$ 850", data: "Ontem, 09:15", icon: TrendingDown, color: "text-red-600" },
    { tipo: "entrada", desc: "Frete BH-DF", valor: "+R$ 3.200", data: "23/11, 16:45", icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <button onClick={() => setLocation("/dashboard")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Meu Financeiro</h1>
          <p className="text-sm opacity-80">Conta Digital Gratuita</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm opacity-80">Saldo Disponível</span>
            </div>
            <div className="text-4xl font-bold mb-4">R$ 12.850,75</div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                <CreditCard className="w-4 h-4 mr-2" /> Pix
              </Button>
              <Button variant="secondary" size="sm" className="bg-secondary hover:bg-secondary/90">
                <Zap className="w-4 h-4 mr-2" /> Antecipar
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-bold text-foreground mb-3">Antecipação de Recebíveis</h3>
            <div className="text-sm text-muted-foreground mb-2">Disponível para antecipar</div>
            <div className="text-2xl font-bold text-foreground mb-3">R$ 8.200,00</div>
            <div className="text-xs text-green-600 mb-3">Taxa: 1,5% a.m. • Receba em 1h</div>
            <Button className="w-full" variant="outline">Simular Antecipação</Button>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-3">Últimas Transações</h3>
            <div className="space-y-2">
              {transacoes.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <div key={idx} className="bg-card rounded-xl p-3 border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${t.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{t.desc}</div>
                        <div className="text-xs text-muted-foreground">{t.data}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${t.color}`}>{t.valor}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
