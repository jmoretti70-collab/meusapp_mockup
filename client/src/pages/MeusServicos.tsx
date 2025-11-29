import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, MapPin, Star, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MeusServicos() {
  const [, setLocation] = useLocation();
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<string>("prompt");

  useEffect(() => {
    // Verificar permissão de localização
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state);
      });
    }
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      toast.loading("Obtendo sua localização...");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success("Localização obtida!");
          setLocationPermission("granted");
        },
        (error) => {
          toast.dismiss();
          let errorMessage = "Não foi possível obter sua localização";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permissão de localização negada. Por favor, habilite nas configurações do navegador.";
              setLocationPermission("denied");
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Localização indisponível no momento. Tente novamente.";
              break;
            case error.TIMEOUT:
              errorMessage = "Tempo esgotado ao obter localização. Tente novamente.";
              break;
            default:
              errorMessage = "Erro desconhecido ao obter localização.";
          }
          
          toast.error(errorMessage);
          console.error("Erro de geolocalização:", error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      toast.error("Geolocalização não suportada");
    }
  };

  const servicos = [
    { nome: "Oficina Silva", tipo: "Oficina Mecânica", distancia: userLocation ? "2.5 km" : "Localização desativada", rating: 4.8, preco: "R$ 150/h", icon: "🔧", lat: -23.550, lng: -46.633 },
    { nome: "Hotel Rodoviário", tipo: "Hospedagem", distancia: userLocation ? "5.0 km" : "Localização desativada", rating: 4.5, preco: "R$ 80/noite", icon: "🏨", lat: -23.555, lng: -46.638 },
    { nome: "Posto Ipiranga", tipo: "Combustível", distancia: userLocation ? "1.2 km" : "Localização desativada", rating: 4.9, preco: "R$ 5.89/L", icon: "⛽", lat: -23.548, lng: -46.630 },
    { nome: "Restaurante do Caminhoneiro", tipo: "Alimentação", distancia: userLocation ? "3.8 km" : "Localização desativada", rating: 4.7, preco: "R$ 25/prato", icon: "🍽️", lat: -23.552, lng: -46.635 },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Meus Serviços</h1>
              <p className="text-sm opacity-80">
                {userLocation ? "Próximos a você" : "Ative a localização"}
              </p>
            </div>
            {!userLocation && locationPermission !== "granted" && (
              <Button
                size="sm"
                variant="secondary"
                onClick={requestLocation}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Ativar GPS
              </Button>
            )}
          </div>
        </div>

        {!userLocation && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-blue-900 mb-1">
                  Ative sua localização
                </h3>
                <p className="text-xs text-blue-800">
                  Encontre serviços próximos a você com distâncias precisas e rotas otimizadas.
                </p>
                <Button
                  size="sm"
                  onClick={requestLocation}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Navigation className="w-3 h-3 mr-2" />
                  Permitir Localização
                </Button>
              </div>
            </div>
          </div>
        )}

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
                    <div className={`flex items-center gap-1 ${userLocation ? 'text-green-600' : 'text-muted-foreground'}`}>
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
