import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Truck, Wallet, GraduationCap, Heart } from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        <div className="h-[55%] relative bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000')] bg-cover bg-center opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute top-12 left-0 right-0 flex justify-center">
            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
              <img src="/logo.png" alt="Meus App" className="w-6 h-6" />
              <span className="text-white text-sm font-bold tracking-wider">MEUS APP</span>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              Sua vida na estrada, <span className="text-primary">resolvida.</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Não é só frete. É banco, escola, saúde e comunidade. Tudo no Meus App.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
              <Wallet className="w-5 h-5 text-primary mb-2" />
              <div className="font-bold text-xs text-foreground">Conta Digital</div>
              <div className="text-[10px] text-muted-foreground mt-1">Sem taxas</div>
            </div>
            <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20">
              <Truck className="w-5 h-5 text-secondary mb-2" />
              <div className="font-bold text-xs text-foreground">Fretes</div>
              <div className="text-[10px] text-muted-foreground mt-1">Leilão reverso</div>
            </div>
            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
              <GraduationCap className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-xs text-foreground">Minha Escola</div>
              <div className="text-[10px] text-muted-foreground mt-1">Cursos grátis</div>
            </div>
            <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              <Heart className="w-5 h-5 text-red-600 mb-2" />
              <div className="font-bold text-xs text-foreground">Telemedicina</div>
              <div className="text-[10px] text-muted-foreground mt-1">24/7</div>
            </div>
          </div>
          <div className="space-y-3">
            <Button className="w-full h-14 text-base font-bold shadow-lg" onClick={() => setLocation("/login")}>
              Acessar minha conta
            </Button>
            <div className="text-center">
              <span className="text-xs text-muted-foreground">
                Primeira vez? <strong className="text-primary cursor-pointer" onClick={() => setLocation("/cadastro")}>Cadastre-se grátis</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
