import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { Heart, Video, Phone, Calendar, Pill, Activity, Brain, Moon, Apple, ChevronRight, Clock, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function MinhaSaude() {
  const [, setLocation] = useLocation();

  const services = [
    { id: "1", icon: Video, title: "Teleconsulta", description: "Médico online 24/7", color: "bg-blue-100 text-blue-600", action: "Consultar Agora" },
    { id: "2", icon: Phone, title: "Orientação Médica", description: "Tire dúvidas por telefone", color: "bg-green-100 text-green-600", action: "Ligar" },
    { id: "3", icon: Calendar, title: "Agendar Consulta", description: "Presencial ou online", color: "bg-purple-100 text-purple-600", action: "Agendar" },
    { id: "4", icon: Pill, title: "Farmácia", description: "Descontos em medicamentos", color: "bg-red-100 text-red-600", action: "Ver Ofertas" },
  ];

  const healthTips = [
    { icon: Activity, title: "Exercícios na Estrada", description: "5 exercícios para fazer nas paradas", color: "bg-orange-100 text-orange-600" },
    { icon: Moon, title: "Sono de Qualidade", description: "Dicas para descansar melhor", color: "bg-indigo-100 text-indigo-600" },
    { icon: Apple, title: "Alimentação Saudável", description: "O que comer na estrada", color: "bg-green-100 text-green-600" },
    { icon: Brain, title: "Saúde Mental", description: "Cuide da sua mente", color: "bg-pink-100 text-pink-600" },
  ];

  const doctors = [
    { name: "Dr. Carlos Silva", specialty: "Clínico Geral", rating: 4.9, available: true },
    { name: "Dra. Ana Santos", specialty: "Cardiologista", rating: 4.8, available: true },
    { name: "Dr. Pedro Lima", specialty: "Ortopedista", rating: 4.7, available: false },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <PageHeader title="Minha Saúde" subtitle="Cuide de você" backPath="/profile" variant="gradient" />

        {/* Emergency Banner */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Emergência 24h</p>
              <p className="text-xs opacity-90">Atendimento imediato</p>
            </div>
            <Button size="sm" className="bg-white text-red-600 hover:bg-white/90" onClick={() => toast.error("Emergência", { description: "Conectando com médico de plantão..." })}>
              Ligar
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-6 custom-scrollbar">
          {/* Services */}
          <section>
            <h3 className="text-sm font-bold text-foreground mb-3">Serviços de Saúde</h3>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button key={service.id} className="app-card text-left" onClick={() => toast.info(service.title, { description: "Iniciando serviço..." })}>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-2", service.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground">{service.title}</h4>
                    <p className="text-[10px] text-muted-foreground mb-2">{service.description}</p>
                    <span className="text-xs text-primary font-medium">{service.action} →</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Available Doctors */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Médicos Disponíveis</h3>
              <button className="text-xs text-primary font-medium flex items-center gap-1">Ver todos <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="space-y-2">
              {doctors.map((doctor, idx) => (
                <div key={idx} className="app-card flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-foreground">{doctor.name}</h4>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs text-muted-foreground">{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", doctor.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>
                      {doctor.available ? "Disponível" : "Ocupado"}
                    </span>
                    {doctor.available && (
                      <Button size="sm" className="mt-2 text-xs h-7" onClick={() => toast.info("Teleconsulta", { description: `Conectando com ${doctor.name}...` })}>
                        <Video className="w-3 h-3 mr-1" /> Chamar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Health Tips */}
          <section>
            <h3 className="text-sm font-bold text-foreground mb-3">Dicas de Saúde</h3>
            <div className="grid grid-cols-2 gap-3">
              {healthTips.map((tip, idx) => {
                const Icon = tip.icon;
                return (
                  <button key={idx} className="app-card text-left" onClick={() => toast.info(tip.title, { description: tip.description })}>
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", tip.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-foreground">{tip.title}</h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">{tip.description}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Benefits Card */}
          <section className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-pink-200/50">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-6 h-6 text-pink-500" />
              <div>
                <h3 className="font-bold text-foreground">Plano Saúde Meus App</h3>
                <p className="text-xs text-muted-foreground">Cobertura completa para você e família</p>
              </div>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 mb-3">
              <li>✓ Teleconsulta ilimitada</li>
              <li>✓ Desconto em farmácias</li>
              <li>✓ Exames com preço reduzido</li>
              <li>✓ Assistência 24h</li>
            </ul>
            <Button className="w-full bg-pink-500 hover:bg-pink-600" onClick={() => toast.info("Plano Saúde", { description: "A partir de R$ 49,90/mês" })}>
              Conhecer Plano
            </Button>
          </section>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
