import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fingerprint, ArrowLeft, Phone, HelpCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [cpf, setCpf] = useState("123.456.789-00");
  const [showCpf, setShowCpf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const handleLogin = () => {
    if (cpf.replace(/\D/g, "").length !== 11) {
      toast.error("CPF inválido", { description: "Digite um CPF válido com 11 dígitos" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Bem-vindo!", { description: "Login realizado com sucesso" });
      setLocation("/profile");
    }, 1500);
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        {/* Header */}
        <div className="pt-14 px-5">
          <button 
            onClick={() => setLocation("/onboarding")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
          {/* Logo */}
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg relative">
            <Fingerprint className="w-12 h-12" />
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl -z-10" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">Bem-vindo de volta!</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Digite seu CPF para acessar sua conta</p>

          {/* Form */}
          <div className="w-full space-y-4">
            <div className="relative">
              <Input 
                type={showCpf ? "text" : "password"}
                placeholder="000.000.000-00"
                className="h-14 text-lg font-semibold text-center pr-12 bg-muted/50 border-0"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                maxLength={14}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowCpf(!showCpf)}
              >
                {showCpf ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button 
              className="w-full h-14 text-base font-bold"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Entrando...</>
              ) : (
                "Entrar"
              )}
            </Button>

            <Button 
              variant="outline"
              className="w-full h-12 text-sm"
              onClick={() => toast.info("Biometria", { description: "Use sua digital para entrar" })}
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              Entrar com Biometria
            </Button>
          </div>

          {/* Help Links */}
          <div className="mt-8 flex gap-4">
            <button 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => toast.info("Suporte", { description: "0800 123 4567" })}
            >
              <Phone className="w-4 h-4" />
              Suporte
            </button>
            <span className="text-muted-foreground">•</span>
            <button 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => toast.info("Ajuda", { description: "Central de ajuda" })}
            >
              <HelpCircle className="w-4 h-4" />
              Ajuda
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <button className="text-primary hover:underline">Termos de Uso</button>
            {" "}e{" "}
            <button className="text-primary hover:underline">Política de Privacidade</button>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
