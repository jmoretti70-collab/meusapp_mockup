import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { Bell, Wallet, Truck, Tag, Calculator, AlertTriangle, Settings, Moon, Sun, HelpCircle, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-primary pt-12 pb-6 px-6 rounded-b-3xl text-primary-foreground flex justify-between items-center shadow-lg">
          <div>
            <div className="text-sm opacity-80">Bom dia,</div>
            <div className="font-bold text-xl">João Motorista</div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLocation("/tutorial")}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
              title="Tutorial"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative hover:bg-white/30">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></div>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div 
            className="bg-card rounded-2xl p-4 shadow-sm border border-primary/20 flex items-center justify-between cursor-pointer hover:bg-primary/5 transition"
            onClick={() => setLocation("/profile")}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Acesse suas funções</div>
                <div className="text-xs text-muted-foreground">Configure seus dados e veículos</div>
              </div>
            </div>
            <span className="text-muted-foreground">›</span>
          </div>

          <div className="bg-gradient-to-r from-primary to-primary/80 p-5 rounded-2xl shadow-lg text-primary-foreground relative overflow-hidden">
            <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5" />
            <div className="text-xs uppercase font-bold mb-1 opacity-80">Meu Saldo Disponível</div>
            <div className="text-3xl font-bold">R$ 12.850,75</div>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={() => setLocation("/financeiro")}>Extrato</Button>
              <Button variant="secondary" size="sm" className="bg-secondary hover:bg-secondary/90" onClick={() => setLocation("/financeiro")}>Antecipar</Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-3 ml-1">Atalhos</h3>
            <div className="grid grid-cols-4 gap-3">
              <button className="flex flex-col items-center gap-2" onClick={() => setLocation("/fretes")}>
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-primary hover:bg-primary/10 transition"><Truck className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold text-foreground">Fretes</span>
              </button>
              <button className="flex flex-col items-center gap-2" onClick={() => setLocation("/produtos")}>
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-secondary hover:bg-secondary/10 transition"><Tag className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold text-foreground">Ofertas</span>
              </button>
              <button className="flex flex-col items-center gap-2" onClick={() => setLocation("/calculadora")}>
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-green-600 hover:bg-green-50 transition"><Calculator className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold text-foreground">Custos</span>
              </button>
              <button onClick={() => setLocation("/clima")} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-cyan-600 hover:bg-cyan-50 transition"><Cloud className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold text-foreground">Clima</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-red-600 hover:bg-red-50 transition"><AlertTriangle className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold text-foreground">SOS</span>
              </button>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
