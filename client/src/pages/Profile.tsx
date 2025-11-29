import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { NotificationManager } from "@/components/NotificationManager";
import { 
  IdCard, TruckIcon, Gift, FileText, Shield, LogOut,
  Wallet, Heart, GraduationCap, Radio, Users, ShieldCheck,
  BarChart3, Crown, Sparkles, Clock, TrendingUp
} from "lucide-react";

export default function Profile() {
  const [, setLocation] = useLocation();

  const modules = [
    { icon: IdCard, title: "Meus Dados", desc: "CNH, Endereço e Pix", color: "bg-blue-50 text-blue-600", path: "/profile" },
    { icon: TruckIcon, title: "Meus Veículos", desc: "Cadastrar ou editar", color: "bg-green-50 text-green-600", path: "/profile" },
    { icon: Clock, title: "Histórico", desc: "Fretes anteriores", color: "bg-indigo-50 text-indigo-600", path: "/historico" },
    { icon: Wallet, title: "Meu Financeiro", desc: "Conta e extrato", color: "bg-purple-50 text-purple-600", path: "/financeiro" },
    { icon: BarChart3, title: "Meu Score", desc: "Ver pontuação", color: "bg-yellow-50 text-yellow-600", path: "/score" },
    { icon: TrendingUp, title: "Análise", desc: "Desempenho e gráficos", color: "bg-purple-50 text-purple-600", path: "/analise" },
    { icon: Gift, title: "Meus Produtos", desc: "Marketplace", color: "bg-orange-50 text-orange-600", path: "/produtos" },
    { icon: FileText, title: "Meus Serviços", desc: "Oficinas e hotéis", color: "bg-indigo-50 text-indigo-600", path: "/servicos" },
    { icon: ShieldCheck, title: "Meus Seguros", desc: "Cotação e contrato", color: "bg-red-50 text-red-600", path: "/seguros" },
    { icon: GraduationCap, title: "Minha Escola", desc: "Cursos e certificados", color: "bg-teal-50 text-teal-600", path: "/escola" },
    { icon: Heart, title: "Minha Saúde", desc: "Telemedicina 24/7", color: "bg-pink-50 text-pink-600", path: "/saude" },
    { icon: Radio, title: "Meu Rádio", desc: "Streaming ao vivo", color: "bg-cyan-50 text-cyan-600", path: "/profile" },
    { icon: Users, title: "Minha Rede", desc: "Comunidade", color: "bg-violet-50 text-violet-600", path: "/rede" },
    { icon: Sparkles, title: "Minha IA", desc: "Assistente LogIA", color: "bg-purple-50 text-purple-600", path: "/ia" },
    { icon: Crown, title: "Indique e Ganhe", desc: "Compartilhe e ganhe bônus", color: "bg-amber-50 text-amber-600", path: "/indicacao" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        {/* Profile Header */}
        <div className="bg-primary pt-12 pb-10 px-6 rounded-b-3xl text-center text-primary-foreground relative">
          <div className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg">
            JM
          </div>
          <h2 className="text-xl font-bold">João Motorista</h2>
          <div className="flex items-center justify-center gap-2 mt-2 opacity-90">
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Scania R450</span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">RNTRC Ativo</span>
          </div>
          <div className="mt-3">
            <NotificationManager />
          </div>
        </div>

        {/* Score Card */}
        <div className="px-5 -mt-8 relative z-10">
          <div 
            className="bg-card rounded-xl p-4 shadow-lg border-b-4 border-secondary flex justify-between items-center mb-6 cursor-pointer hover:shadow-xl transition"
            onClick={() => setLocation("/score")}
          >
            <div>
              <div className="text-xs text-muted-foreground font-bold uppercase">Meu Score</div>
              <div className="text-3xl font-bold text-primary">850</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground font-bold uppercase">Nível</div>
              <div className="text-xl font-bold text-secondary flex items-center justify-end gap-1">
                <Crown className="w-5 h-5" /> Ouro
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <h3 className="text-foreground font-bold text-lg mb-3">Central "Meus App"</h3>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <button
                  key={idx}
                  className="bg-card p-4 rounded-xl shadow-sm border border-border flex flex-col items-start hover:shadow-md transition"
                  onClick={() => setLocation(module.path)}
                >
                  <div className={`w-9 h-9 rounded-lg ${module.color} flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-foreground">{module.title}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{module.desc}</div>
                </button>
              );
            })}
            
            {/* Logout Button */}
            <button
              className="bg-card p-4 rounded-xl shadow-sm border border-border flex flex-col items-start hover:shadow-md transition"
              onClick={() => setLocation("/")}
            >
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-2">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-foreground">Sair</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Deslogar da conta</div>
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
