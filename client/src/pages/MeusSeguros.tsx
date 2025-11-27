import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, ShieldCheck, Truck, Package, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeusSeguros() {
  const [, setLocation] = useLocation();

  const seguros = [
    { tipo: "Carga", icon: Package, descricao: "Proteção total da carga", valor: "A partir de R$ 150/mês", color: "bg-blue-50 text-blue-600" },
    { tipo: "Veículo", icon: Truck, descricao: "Cobertura completa", valor: "A partir de R$ 280/mês", color: "bg-green-50 text-green-600" },
    { tipo: "Vida", icon: Heart, descricao: "Seguro de vida", valor: "A partir de R$ 45/mês", color: "bg-red-50 text-red-600" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <div className="bg-gradient-to-br from-red-600 to-orange-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Meus Seguros</h1>
              <p className="text-sm opacity-90">Corretora Digital</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-5 text-white">
            <div className="text-sm opacity-90 mb-1">Precificação Inteligente</div>
            <div className="text-lg font-bold mb-2">Baseada no seu Score</div>
            <div className="text-xs opacity-80">Quanto melhor seu score, menores as taxas!</div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-foreground">Tipos de Seguro</h3>
            {seguros.map((seguro, idx) => {
              const Icon = seguro.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl ${seguro.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">{seguro.tipo}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{seguro.descricao}</p>
                      <p className="text-sm font-semibold text-primary">{seguro.valor}</p>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">Cotar Agora</Button>
                </div>
              );
            })}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-bold text-yellow-900 mb-2">💡 Vantagens Exclusivas</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Desconto de até 30% com score alto</li>
              <li>• Cotação em tempo real</li>
              <li>• Contratação 100% digital</li>
              <li>• Suporte 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
