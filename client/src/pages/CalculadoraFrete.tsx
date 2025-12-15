import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Calculator, MapPin, Fuel, Truck, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CalculadoraFrete() {
  const [, setLocation] = useLocation();
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState("");
  const [consumo, setConsumo] = useState("2.5");
  const [precoDiesel, setPrecoDiesel] = useState("6.20");
  const [pedagios, setPedagios] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    if (!origem || !destino || !distancia) {
      toast.error("Preencha origem, destino e distância");
      return;
    }

    const dist = parseFloat(distancia);
    const cons = parseFloat(consumo);
    const preco = parseFloat(precoDiesel);
    const ped = parseFloat(pedagios) || 0;

    // Cálculos
    const litrosNecessarios = dist / cons;
    const custoCombustivel = litrosNecessarios * preco;
    const custoTotal = custoCombustivel + ped;
    
    // Estimativas adicionais (10% manutenção, 5% pneus)
    const custoManutencao = custoTotal * 0.10;
    const custoPneus = custoTotal * 0.05;
    const custoOperacional = custoTotal + custoManutencao + custoPneus;
    
    // Sugestão de preço (margem de 30%)
    const precoSugerido = custoOperacional * 1.30;

    setResultado({
      litros: litrosNecessarios.toFixed(1),
      combustivel: custoCombustivel.toFixed(2),
      pedagios: ped.toFixed(2),
      manutencao: custoManutencao.toFixed(2),
      pneus: custoPneus.toFixed(2),
      total: custoOperacional.toFixed(2),
      sugerido: precoSugerido.toFixed(2),
      lucro: (precoSugerido - custoOperacional).toFixed(2)
    });
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/dashboard")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Calculator className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Calculadora de Frete</h1>
              <p className="text-sm opacity-90">Estime seus custos e lucro</p>
            </div>
          </div>
        </div>

        <div className="flex-1  p-6 space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Rota
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Origem</label>
                <Input
                  placeholder="Ex: São Paulo, SP"
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Destino</label>
                <Input
                  placeholder="Ex: Rio de Janeiro, RJ"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Distância (km)</label>
                <Input
                  type="number"
                  placeholder="450"
                  value={distancia}
                  onChange={(e) => setDistancia(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Veículo
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Consumo Médio (km/l)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={consumo}
                  onChange={(e) => setConsumo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Custos
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Preço do Diesel (R$/l)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="6.20"
                  value={precoDiesel}
                  onChange={(e) => setPrecoDiesel(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Pedágios (R$)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="150.00"
                  value={pedagios}
                  onChange={(e) => setPedagios(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button className="w-full h-12 font-bold" onClick={calcular}>
            <Calculator className="w-5 h-5 mr-2" />
            Calcular
          </Button>

          {resultado && (
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Resultado
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Combustível ({resultado.litros}L)</span>
                  <span className="font-bold">R$ {resultado.combustivel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Pedágios</span>
                  <span className="font-bold">R$ {resultado.pedagios}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Manutenção (10%)</span>
                  <span className="font-bold">R$ {resultado.manutencao}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Pneus (5%)</span>
                  <span className="font-bold">R$ {resultado.pneus}</span>
                </div>
                
                <div className="border-t border-white/30 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Custo Total</span>
                    <span className="text-lg">R$ {resultado.total}</span>
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-3 mt-4">
                  <div className="text-xs opacity-90 mb-1">Preço Sugerido (30% margem)</div>
                  <div className="text-2xl font-bold">R$ {resultado.sugerido}</div>
                  <div className="text-xs opacity-90 mt-1">Lucro estimado: R$ {resultado.lucro}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
