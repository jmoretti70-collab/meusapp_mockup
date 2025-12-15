import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import QuickAction from "@/components/QuickAction";
import StatCard from "@/components/StatCard";
import FreteCard, { FreteData } from "@/components/FreteCard";
import { 
  Bell, Wallet, Truck, Tag, Calculator, AlertTriangle, 
  Moon, Sun, HelpCircle, Cloud, Heart, GraduationCap,
  ChevronRight, Sparkles, TrendingUp, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Dados simulados
  const fretesRecentes: FreteData[] = [
    { 
      id: "1",
      origem: "São Paulo - SP", 
      destino: "Rio de Janeiro - RJ", 
      carga: "Eletrônicos", 
      peso: "15 ton", 
      valor: "R$ 4.500",
      valorOriginal: "R$ 5.200",
      lances: 3, 
      tempo: "2h",
      status: "aberto",
      avaliacao: 4.8,
      embarcador: "Tech Corp"
    },
    { 
      id: "2",
      origem: "Curitiba - PR", 
      destino: "Florianópolis - SC", 
      carga: "Alimentos", 
      peso: "10 ton", 
      valor: "R$ 2.800",
      lances: 7, 
      tempo: "45min",
      status: "aberto",
      avaliacao: 4.5,
      embarcador: "Alimentos SA"
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleDarLance = (freteId: string) => {
    toast.success("Lance registrado!", {
      description: "Você será notificado sobre o resultado.",
    });
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <header className="bg-gradient-to-br from-primary via-primary to-primary/90 pt-14 pb-8 px-5 rounded-b-3xl text-primary-foreground relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm opacity-80">{getGreeting()},</p>
                <h1 className="text-xl font-bold">João Motorista</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Scania R450</span>
                  <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> RNTRC Ativo
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setLocation("/tutorial")}
                  className="icon-button-primary"
                  aria-label="Tutorial"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={toggleTheme}
                  className="icon-button-primary"
                  aria-label="Alternar tema"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  className="icon-button-primary relative"
                  onClick={() => toast.info("3 novas notificações")}
                  aria-label="Notificações"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-primary" />
                </button>
              </div>
            </div>

            {/* Saldo Card */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 cursor-pointer hover:bg-white/15 transition-all"
              onClick={() => setLocation("/financeiro")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-medium opacity-80 mb-1">Saldo Disponível</p>
                  <p className="text-3xl font-bold">R$ 12.850,75</p>
                  <p className="text-xs opacity-80 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +R$ 2.340 esta semana
                  </p>
                </div>
                <Wallet className="w-12 h-12 opacity-30" />
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation("/financeiro");
                  }}
                >
                  Ver Extrato
                </Button>
                <Button 
                  size="sm" 
                  className="bg-secondary hover:bg-secondary/90 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info("Antecipação", { description: "Solicite antecipação de até R$ 8.500" });
                  }}
                >
                  Antecipar
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-6 custom-scrollbar">
          {/* Quick Actions */}
          <section>
            <h2 className="text-sm font-bold text-foreground mb-3">Atalhos Rápidos</h2>
            <div className="grid grid-cols-5 gap-2">
              <QuickAction 
                icon={Truck} 
                label="Fretes" 
                path="/fretes"
                iconBgColor="bg-primary/10"
                iconColor="text-primary"
                badge={5}
              />
              <QuickAction 
                icon={Tag} 
                label="Ofertas" 
                path="/produtos"
                iconBgColor="bg-secondary/10"
                iconColor="text-secondary"
              />
              <QuickAction 
                icon={Calculator} 
                label="Custos" 
                path="/calculadora"
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
              />
              <QuickAction 
                icon={Cloud} 
                label="Clima" 
                path="/clima"
                iconBgColor="bg-cyan-100"
                iconColor="text-cyan-600"
              />
              <QuickAction 
                icon={AlertTriangle} 
                label="SOS" 
                iconBgColor="bg-red-100"
                iconColor="text-red-600"
                onClick={() => toast.error("SOS Ativado!", { 
                  description: "Contato de emergência será notificado.",
                  duration: 5000 
                })}
              />
            </div>
          </section>

          {/* Stats Row */}
          <section className="grid grid-cols-2 gap-3">
            <StatCard
              label="Meu Score"
              value="850"
              subValue="Nível Ouro"
              trend="up"
              trendValue="+15 pts"
              onClick={() => setLocation("/score")}
            />
            <StatCard
              label="Fretes no Mês"
              value="12"
              subValue="R$ 28.450 faturados"
              trend="up"
              trendValue="+3 vs mês anterior"
              onClick={() => setLocation("/historico")}
            />
          </section>

          {/* LogIA Banner */}
          <section 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setLocation("/ia")}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">LogIA - Sua Assistente</h3>
                <p className="text-xs opacity-90">Tire dúvidas, calcule rotas e muito mais</p>
              </div>
              <ChevronRight className="w-5 h-5 opacity-70" />
            </div>
          </section>

          {/* Fretes Disponíveis */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground">Fretes Disponíveis</h2>
              <button 
                onClick={() => setLocation("/fretes")}
                className="text-xs text-primary font-medium flex items-center gap-1"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {fretesRecentes.map((frete) => (
                <FreteCard 
                  key={frete.id} 
                  frete={frete}
                  onDarLance={() => handleDarLance(frete.id)}
                />
              ))}
            </div>
          </section>

          {/* Serviços Extras */}
          <section>
            <h2 className="text-sm font-bold text-foreground mb-3">Cuide de Você</h2>
            <div className="grid grid-cols-2 gap-3">
              <div 
                className="app-card flex items-center gap-3 cursor-pointer"
                onClick={() => setLocation("/saude")}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Minha Saúde</p>
                  <p className="text-[10px] text-muted-foreground">Telemedicina 24/7</p>
                </div>
              </div>
              <div 
                className="app-card flex items-center gap-3 cursor-pointer"
                onClick={() => setLocation("/escola")}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Minha Escola</p>
                  <p className="text-[10px] text-muted-foreground">Cursos gratuitos</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
