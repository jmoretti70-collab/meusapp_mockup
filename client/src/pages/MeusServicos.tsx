import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { Search, MapPin, Star, Clock, Phone, Navigation, Wrench, Bed, Fuel, Utensils, ShowerHead, Wifi } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CategoryType = "todos" | "oficinas" | "hoteis" | "postos" | "restaurantes";

interface Service {
  id: string;
  name: string;
  category: CategoryType;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  phone: string;
  open24h: boolean;
  amenities: string[];
  price?: string;
}

export default function MeusServicos() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("todos");

  const categories = [
    { id: "todos" as CategoryType, label: "Todos", icon: MapPin },
    { id: "oficinas" as CategoryType, label: "Oficinas", icon: Wrench },
    { id: "hoteis" as CategoryType, label: "Hotéis", icon: Bed },
    { id: "postos" as CategoryType, label: "Postos", icon: Fuel },
    { id: "restaurantes" as CategoryType, label: "Restaurantes", icon: Utensils },
  ];

  const services: Service[] = [
    { id: "1", name: "Auto Mecânica Silva", category: "oficinas", rating: 4.8, reviews: 234, distance: "2.3 km", address: "Av. Brasil, 1234", phone: "(11) 99999-1234", open24h: true, amenities: ["Caminhões", "Emergência", "Peças"] },
    { id: "2", name: "Hotel Rota do Sol", category: "hoteis", rating: 4.6, reviews: 567, distance: "5.1 km", address: "Rod. Dutra, km 45", phone: "(11) 99999-5678", open24h: true, amenities: ["Estacionamento", "Wi-Fi", "Restaurante"], price: "R$ 89/noite" },
    { id: "3", name: "Posto Ipiranga BR-116", category: "postos", rating: 4.7, reviews: 892, distance: "1.2 km", address: "BR-116, km 123", phone: "(11) 99999-9012", open24h: true, amenities: ["Diesel S10", "Arla 32", "Loja"], price: "R$ 5,89/L" },
    { id: "4", name: "Restaurante Bom Prato", category: "restaurantes", rating: 4.5, reviews: 345, distance: "3.4 km", address: "Av. Principal, 567", phone: "(11) 99999-3456", open24h: false, amenities: ["Buffet", "Marmitex", "Estacionamento"], price: "R$ 25/refeição" },
    { id: "5", name: "Oficina do Zé", category: "oficinas", rating: 4.9, reviews: 156, distance: "4.8 km", address: "Rua das Oficinas, 89", phone: "(11) 99999-7890", open24h: false, amenities: ["Elétrica", "Freios", "Suspensão"] },
    { id: "6", name: "Pousada Caminhoneiro", category: "hoteis", rating: 4.4, reviews: 234, distance: "8.2 km", address: "Rod. Anhanguera, km 78", phone: "(11) 99999-2345", open24h: true, amenities: ["Chuveiro", "TV", "Café"], price: "R$ 65/noite" },
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === "todos" || service.category === activeCategory;
    const matchesSearch = !searchQuery || service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (category: CategoryType) => {
    const icons = { todos: MapPin, oficinas: Wrench, hoteis: Bed, postos: Fuel, restaurantes: Utensils };
    return icons[category];
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        <PageHeader title="Meus Serviços" subtitle="Encontre serviços próximos" backPath="/profile" variant="gradient" />

        <div className="px-4 py-3 bg-card border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar serviços..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-muted/50 border-0" />
          </div>
        </div>

        <div className="px-4 py-3 border-b border-border/50">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn("flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all", activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1  px-4 py-3 pb-24 space-y-3 ">
          {filteredServices.map((service) => {
            const Icon = getIcon(service.category);
            return (
              <div key={service.id} className="app-card">
                <div className="flex items-start gap-3">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", service.category === "oficinas" ? "bg-blue-100 text-blue-600" : service.category === "hoteis" ? "bg-purple-100 text-purple-600" : service.category === "postos" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600")}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{service.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs text-muted-foreground">{service.rating} ({service.reviews})</span>
                          </div>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-primary font-medium">{service.distance}</span>
                        </div>
                      </div>
                      {service.open24h && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">24h</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {service.address}
                    </p>
                    {service.price && <p className="text-sm font-bold text-primary mt-1">{service.price}</p>}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{amenity}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8" onClick={() => toast.info("Ligando...", { description: service.phone })}>
                        <Phone className="w-3 h-3 mr-1" /> Ligar
                      </Button>
                      <Button size="sm" className="flex-1 text-xs h-8" onClick={() => toast.info("Navegando...", { description: service.address })}>
                        <Navigation className="w-3 h-3 mr-1" /> Ir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
