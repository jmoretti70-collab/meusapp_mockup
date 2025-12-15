import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";

export default function Splash() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const timer = setTimeout(() => {
      setLocation("/onboarding");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [setLocation]);

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-60 h-60 bg-white rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-40 -right-20 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        </div>
        
        {/* Logo */}
        <div className="relative z-10 animate-fade-up">
          <div className="w-40 h-40 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 relative">
            <img src="/logo.png" alt="Meus App" className="w-32 h-32 object-contain" />
            <div className="absolute -inset-1 bg-white/20 rounded-3xl blur-xl -z-10" />
          </div>
        </div>
        
        {/* Text */}
        <div className="text-center relative z-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-2xl font-bold tracking-wider">MEUS APP</h1>
          <p className="text-sm opacity-80 tracking-[3px] mt-1">SISTEMA OPERACIONAL</p>
          <p className="text-xs opacity-60 tracking-[4px] mt-0.5">DO CAMINHONEIRO</p>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 z-10">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-center mt-2 opacity-60">Carregando...</p>
        </div>

        {/* Version */}
        <div className="absolute bottom-8 text-xs opacity-40">
          v2.0.0
        </div>
      </div>
    </PhoneFrame>
  );
}
