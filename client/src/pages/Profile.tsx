import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import ModuleCard from "@/components/ModuleCard";
import { NotificationManager } from "@/components/NotificationManager";
import { 
  IdCard, TruckIcon, Gift, FileText, Shield, LogOut,
  Wallet, Heart, GraduationCap, Radio, Users, ShieldCheck,
  BarChart3, Crown, Sparkles, Clock, Settings, ChevronRight,
  Star, MapPin, Phone, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Profile() {
  const [, setLocation] = useLocation();

  const modules = [
    { 
      icon: IdCard, 
      title: "Meus Dados", 
      desc: "CNH, Endereço e Pix", 
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600", 
      path: "/cadastro" 
    },
    { 
      icon: TruckIcon, 
      title: "Meus Veículos", 
      desc: "Cadastrar ou editar", 
      iconBg: "bg-green-100", 
      iconColor: "text-green-600", 
      path: "/cadastro",
      badge: "2"
    },
    { 
      icon: Clock, 
      title: "Histórico", 
      desc: "Fretes anteriores", 
      iconBg: "bg-indigo-100", 
      iconColor: "text-indigo-600", 
      path: "/historico" 
    },
    { 
      icon: Wallet, 
      title: "Meu Financeiro", 
      desc: "Conta e extrato", 
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600", 
      path: "/financeiro" 
    },
    { 
      icon: BarChart3, 
      title: "Meu Score", 
      desc: "Ver pontuação", 
      iconBg: "bg-amber-100", 
      iconColor: "text-amber-600", 
      path: "/score" 
    },
    { 
      icon: Gift, 
      title: "Meus Produtos", 
      desc: "Marketplace", 
      iconBg: "bg-orange-100", 
      iconColor: "text-orange-600", 
      path: "/produtos",
      badge: "NOVO"
    },
    { 
      icon: FileText, 
      title: "Meus Serviços", 
      desc: "Oficinas e hotéis", 
      iconBg: "bg-slate-100", 
      iconColor: "text-slate-600", 
      path: "/servicos" 
    },
    { 
      icon: ShieldCheck, 
      title: "Meus Seguros", 
      desc: "Cotação e contrato", 
      iconBg: "bg-red-100", 
      iconColor: "text-red-600", 
      path: "/seguros" 
    },
    { 
      icon: GraduationCap, 
      title: "Minha Escola", 
      desc: "Cursos e certificados", 
      iconBg: "bg-teal-100", 
      iconColor: "text-teal-600", 
      path: "/escola" 
    },
    { 
      icon: Heart, 
      title: "Minha Saúde", 
      desc: "Telemedicina 24/7", 
      iconBg: "bg-pink-100", 
      iconColor: "text-pink-600", 
      path: "/saude" 
    },
    { 
      icon: Radio, 
      title: "Meu Rádio", 
      desc: "Streaming ao vivo", 
      iconBg: "bg-cyan-100", 
      iconColor: "text-cyan-600", 
      path: "/profile",
      badge: "BREVE"
    },
    { 
      icon: Users, 
      title: "Minha Rede", 
      desc: "Comunidade", 
      iconBg: "bg-violet-100", 
      iconColor: "text-violet-600", 
      path: "/rede" 
    },
    { 
      icon: Sparkles, 
      title: "Minha IA", 
      desc: "Assistente LogIA", 
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600", 
      path: "/ia" 
    },
    { 
      icon: Crown, 
      title: "Indique e Ganhe", 
      desc: "Compartilhe e ganhe", 
      iconBg: "bg-amber-100", 
      iconColor: "text-amber-600", 
      path: "/indicacao" 
    },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        {/* Profile Header */}
        <header className="bg-gradient-to-br from-primary via-primary to-primary/90 pt-14 pb-12 px-5 rounded-b-3xl text-primary-foreground relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl font-bold shadow-xl">
              JM
            </div>
            
            <h1 className="text-xl font-bold">João Motorista</h1>
            
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                <TruckIcon className="w-3 h-3" /> Scania R450
              </span>
              <span className="text-xs bg-secondary/80 px-3 py-1 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> RNTRC Ativo
              </span>
            </div>
            
            {/* Quick Info */}
            <div className="flex items-center justify-center gap-4 mt-3 text-xs opacity-80">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> São Paulo, SP
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> 4.9
              </span>
            </div>
            
            <div className="mt-4">
              <NotificationManager />
            </div>
          </div>
        </header>

        {/* Score Card - Floating */}
        <div className="px-5 -mt-6 relative z-20">
          <div 
            className="bg-card rounded-2xl p-4 shadow-lg border-l-4 border-l-secondary flex justify-between items-center cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setLocation("/score")}
          >
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase">Meu Score</p>
              <p className="text-3xl font-bold text-primary">850</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-bold uppercase">Nível</p>
              <p className="text-xl font-bold text-secondary flex items-center justify-end gap-1">
                <Crown className="w-5 h-5" /> Ouro
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 py-4">
          {/* Settings Button */}
          <button 
            className="w-full app-card flex items-center gap-3 mb-4"
            onClick={() => setLocation("/cadastro")}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-foreground">Configurações da Conta</p>
              <p className="text-xs text-muted-foreground">Editar perfil, notificações e privacidade</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Modules Grid */}
          <h2 className="text-sm font-bold text-foreground mb-3">Central "Meus App"</h2>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((module, idx) => (
              <ModuleCard
                key={idx}
                icon={module.icon}
                title={module.title}
                description={module.desc}
                path={module.path}
                iconBgColor={module.iconBg}
                iconColor={module.iconColor}
                badge={module.badge}
                badgeColor={module.badge === "BREVE" ? "bg-muted text-muted-foreground" : "bg-secondary text-white"}
              />
            ))}
          </div>

          {/* Contact & Support */}
          <div className="mt-6 space-y-3">
            <h2 className="text-sm font-bold text-foreground">Suporte</h2>
            
            <button 
              className="w-full app-card flex items-center gap-3"
              onClick={() => toast.info("Suporte", { description: "Ligando para 0800 123 4567..." })}
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">Central de Atendimento</p>
                <p className="text-xs text-muted-foreground">0800 123 4567</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <button 
              className="w-full app-card flex items-center gap-3"
              onClick={() => toast.info("E-mail", { description: "suporte@meusapp.com.br" })}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">E-mail de Suporte</p>
                <p className="text-xs text-muted-foreground">suporte@meusapp.com.br</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Logout */}
          <Button 
            variant="outline" 
            className="w-full mt-6 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => {
              toast.success("Até logo!", { description: "Você foi desconectado." });
              setLocation("/");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
