import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Wrench, Hotel, Coffee, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeusServicos() {
  const [, setLocation] = useLocation();

  const servicos = [
    { nome: "Oficina Silva", tipo: "Oficina Mecânica", distancia: "2.5 km", rating: 4.8, preco: "R$ 150/h", icon: "🔧" },
    { nome: "Hotel Rodoviário", tipo: "Hospedagem", distancia: "5.0 km", rating: 4.5, preco: "R$ 80/noite", icon: "🏨" },
    { nome: "Posto Ipiranga", tipo: "Combustível", distancia: "1.2 km", rating: 4.9, preco: "R$ 5.89/L", icon: "⛽" },
    { nome: "Restaurante do Caminhoneiro", tipo: "Alimentação", distancia: "3.8 km", rating: 4.7, preco: "R$ 25/prato", icon: "🍽️" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Meus Serviços</h1>
          <p className="text-sm opacity-80">Próximos a você</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {servicos.map((servico, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-4xl">{servico.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{servico.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{servico.tipo}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-3 h-3 fill-yellow-500" />
                      <span>{servico.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{servico.distancia}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{servico.preco}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">Ver no Mapa</Button>
                <Button size="sm">Contatar</Button>
              </div>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
