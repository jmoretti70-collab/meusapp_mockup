import { useEffect } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col items-center justify-center bg-primary text-primary-foreground">
        <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Meus App" className="w-40 h-40 object-contain" />
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wider opacity-90">SISTEMA OPERACIONAL</h1>
          <p className="text-xs opacity-60 tracking-[4px] mt-1">DO CAMINHONEIRO</p>
        </div>

        <div className="absolute bottom-16">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </PhoneFrame>
  );
}
