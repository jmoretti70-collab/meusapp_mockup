import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fingerprint } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col items-center justify-center bg-background p-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
          <Fingerprint className="w-10 h-10" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Vamos começar?</h2>
        <p className="text-muted-foreground text-sm mb-8">Digite seu CPF para entrar.</p>

        <div className="w-full space-y-4">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="000.000.000-00"
              className="h-14 text-lg font-semibold text-center"
              defaultValue="123.456.789-00"
            />
          </div>

          <Button 
            className="w-full h-14 text-base font-bold"
            onClick={() => setLocation("/dashboard")}
          >
            Entrar
          </Button>
        </div>

        <div className="mt-8 flex gap-6 text-muted-foreground">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center cursor-pointer hover:bg-green-500/20 transition">
            <span className="text-green-600 text-xl">📱</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition">
            <span className="text-primary text-xl">❓</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
