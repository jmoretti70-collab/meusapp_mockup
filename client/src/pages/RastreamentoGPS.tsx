import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, Navigation, MapPin, Clock, Fuel, AlertTriangle, Phone, MessageCircle, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RastreamentoGPS() {
  const [, setLocation] = useLocation();
  const [progresso, setProgresso] = useState(65);
  const [velocidade, setVelocidade] = useState(85);
  const [tempoRestante, setTempoRestante] = useState("2h 15min");

  // Simular movimento do veículo
  useEffect(() => {
    const interval = setInterval(() => {
      setProgresso(prev => Math.min(prev + 0.5, 100));
      setVelocidade(prev => 80 + Math.random() * 20);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const frete = {
    origem: "Curitiba, PR",
    destino: "Florianópolis, SC",
    distanciaTotal: 300,
    distanciaPercorrida: 195,
    motorista: "João Motorista",
    veiculo: "Scania R450 - ABC-1234",
    carga: "Eletrônicos - 15 toneladas",
    previsaoChegada: "18:30"
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-primary pt-12 pb-4 px-6 text-primary-foreground relative z-10">
          <button onClick={() => setLocation("/historico")} className="mb-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Navigation className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Rastreamento GPS</h1>
              <p className="text-sm opacity-90">Em tempo real</p>
            </div>
          </div>
        </div>

        {/* Map Container (Simulated) */}
        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Simulated Map with Route */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Route Line */}
              <path
                d="M 30 150 Q 100 50, 270 100"
                stroke="#0055A4"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
                opacity="0.5"
              />
              {/* Completed Route */}
              <path
                d="M 30 150 Q 100 50, 180 80"
                stroke="#0055A4"
                strokeWidth="6"
                fill="none"
              />
              
              {/* Origin Marker */}
              <circle cx="30" cy="150" r="8" fill="#22c55e" stroke="white" strokeWidth="2" />
              <text x="30" y="170" textAnchor="middle" fontSize="10" fill="#374151">Curitiba</text>
              
              {/* Destination Marker */}
              <circle cx="270" cy="100" r="8" fill="#ef4444" stroke="white" strokeWidth="2" />
              <text x="270" y="120" textAnchor="middle" fontSize="10" fill="#374151">Florianópolis</text>
              
              {/* Truck Position (Animated) */}
              <g transform="translate(180, 80)">
                <circle r="12" fill="#FF6B00" opacity="0.3">
                  <animate attributeName="r" from="12" to="20" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="10" fill="#FF6B00" stroke="white" strokeWidth="2" />
                <text y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">Você</text>
              </g>
            </svg>
          </div>

          {/* Speed Indicator */}
          <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3 border-2 border-primary">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{Math.round(velocidade)}</div>
              <div className="text-xs text-muted-foreground">km/h</div>
            </div>
          </div>

          {/* ETA Card */}
          <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Chegada prevista</div>
                <div className="text-sm font-bold text-foreground">{frete.previsaoChegada}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-card border-b border-border">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-foreground">{progresso.toFixed(0)}% concluído</span>
            <span className="text-muted-foreground">{frete.distanciaPercorrida} / {frete.distanciaTotal} km</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Tempo restante: {tempoRestante}</span>
          </div>
        </div>

        {/* Trip Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Detalhes da Viagem
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Origem</span>
                <span className="font-bold text-foreground">{frete.origem}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destino</span>
                <span className="font-bold text-foreground">{frete.destino}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Veículo</span>
                <span className="font-bold text-foreground">{frete.veiculo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Carga</span>
                <span className="font-bold text-foreground">{frete.carga}</span>
              </div>
            </div>
          </div>

          {/* Navigation Apps */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-primary" />
              Abrir Navegação
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-12 text-xs"
                onClick={() => {
                  const wazeUrl = `https://waze.com/ul?ll=${-25.4284},-49.2733&navigate=yes`;
                  window.open(wazeUrl, '_blank');
                  toast.success('Abrindo Waze...');
                }}
              >
                <MapIcon className="w-4 h-4 mr-1" />
                Waze
              </Button>
              <Button 
                variant="outline" 
                className="h-12 text-xs"
                onClick={() => {
                  const googleMapsUrl = `https://maps.google.com/?q=-25.4284,-49.2733`;
                  window.open(googleMapsUrl, '_blank');
                  toast.success('Abrindo Google Maps...');
                }}
              >
                <MapIcon className="w-4 h-4 mr-1" />
                Google Maps
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-14"
              onClick={() => setLocation("/fretes/2/chat")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat
            </Button>
            <Button variant="outline" className="h-14">
              <Phone className="w-5 h-5 mr-2" />
              Ligar
            </Button>
          </div>

          {/* Alerts */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-yellow-800 text-sm">Atenção</div>
                <div className="text-xs text-yellow-700 mt-1">
                  Tráfego moderado detectado na BR-101. Adicione 15min ao tempo estimado.
                </div>
              </div>
            </div>
          </div>

          {/* Fuel Consumption */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Consumo médio</span>
              </div>
              <span className="text-lg font-bold text-foreground">2.4 km/l</span>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
