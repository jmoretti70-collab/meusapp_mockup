import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, Heart, Video, Pill, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinhaSaude() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <div className="bg-gradient-to-br from-pink-600 to-red-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Heart className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Minha Saúde</h1>
              <p className="text-sm opacity-90">Telemedicina 24/7</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm opacity-90 mb-1">Atendimento Disponível</div>
                <div className="text-2xl font-bold">24 horas por dia</div>
              </div>
              <Video className="w-12 h-12 opacity-80" />
            </div>
            <Button className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold">
              <Video className="w-4 h-4 mr-2" /> Consultar Agora
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Pill className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-foreground">Receitas</div>
              <div className="text-xs text-muted-foreground mt-1">Digitais</div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-foreground">Exames</div>
              <div className="text-xs text-muted-foreground mt-1">Resultados</div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-foreground">Agendamentos</div>
              <div className="text-xs text-muted-foreground mt-1">Consultas</div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-foreground">Bem-Estar</div>
              <div className="text-xs text-muted-foreground mt-1">Dicas</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-3">Últimas Consultas</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="text-sm font-semibold text-foreground">Dr. Carlos Silva</div>
                  <div className="text-xs text-muted-foreground">Clínico Geral • 15/11/2024</div>
                </div>
                <Button size="sm" variant="outline">Ver</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-semibold text-foreground">Dra. Ana Santos</div>
                  <div className="text-xs text-muted-foreground">Cardiologista • 02/11/2024</div>
                </div>
                <Button size="sm" variant="outline">Ver</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
