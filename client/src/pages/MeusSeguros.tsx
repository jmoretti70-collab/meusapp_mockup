import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { Shield, Truck, Heart, Home, FileText, Phone, CheckCircle, AlertTriangle, ChevronRight, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Insurance {
  id: string;
  type: string;
  name: string;
  coverage: string;
  price: string;
  status: "ativo" | "pendente" | "expirado";
  expiry?: string;
  icon: typeof Shield;
  color: string;
}

export default function MeusSeguros() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"meus" | "cotar">("meus");

  const myInsurances: Insurance[] = [
    { id: "1", type: "Veículo", name: "Seguro Caminhão", coverage: "Cobertura Total + Carga", price: "R$ 450/mês", status: "ativo", expiry: "15/06/2026", icon: Truck, color: "bg-blue-100 text-blue-600" },
    { id: "2", type: "Vida", name: "Seguro de Vida", coverage: "R$ 500.000 + Invalidez", price: "R$ 89/mês", status: "ativo", expiry: "20/12/2025", icon: Heart, color: "bg-pink-100 text-pink-600" },
  ];

  const availableInsurances = [
    { id: "3", type: "Carga", name: "Seguro de Carga", description: "Proteja suas mercadorias", priceFrom: "R$ 120/mês", icon: FileText, color: "bg-green-100 text-green-600" },
    { id: "4", type: "Responsabilidade Civil", name: "RC Transportador", description: "Cobertura para terceiros", priceFrom: "R$ 180/mês", icon: Shield, color: "bg-purple-100 text-purple-600" },
    { id: "5", type: "Acidentes Pessoais", name: "APP Motorista", description: "Proteção em acidentes", priceFrom: "R$ 45/mês", icon: Heart, color: "bg-red-100 text-red-600" },
    { id: "6", type: "Residencial", name: "Seguro Residencial", description: "Proteja sua casa", priceFrom: "R$ 35/mês", icon: Home, color: "bg-amber-100 text-amber-600" },
  ];

  const statusConfig = {
    ativo: { label: "Ativo", color: "bg-green-100 text-green-700" },
    pendente: { label: "Pendente", color: "bg-amber-100 text-amber-700" },
    expirado: { label: "Expirado", color: "bg-red-100 text-red-700" },
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <PageHeader title="Meus Seguros" subtitle="Proteção completa" backPath="/profile" variant="gradient" />

        {/* Emergency Banner */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Sinistro ou Emergência?</p>
              <p className="text-xs opacity-90">Atendimento 24h</p>
            </div>
            <Button size="sm" className="bg-white text-red-600 hover:bg-white/90" onClick={() => toast.error("Emergência", { description: "Ligando para central de sinistros..." })}>
              0800
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-4">
          <div className="flex bg-muted rounded-xl p-1">
            <button onClick={() => setActiveTab("meus")} className={cn("flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all", activeTab === "meus" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
              Meus Seguros
            </button>
            <button onClick={() => setActiveTab("cotar")} className={cn("flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all", activeTab === "cotar" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
              Cotar Novo
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3 custom-scrollbar">
          {activeTab === "meus" && (
            <>
              {myInsurances.length > 0 ? (
                myInsurances.map((insurance) => {
                  const Icon = insurance.icon;
                  const status = statusConfig[insurance.status];
                  return (
                    <div key={insurance.id} className="app-card">
                      <div className="flex items-start gap-3">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", insurance.color)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] text-muted-foreground uppercase">{insurance.type}</span>
                              <h3 className="text-sm font-bold text-foreground">{insurance.name}</h3>
                            </div>
                            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", status.color)}>{status.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{insurance.coverage}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <DollarSign className="w-3 h-3" />
                              <span className="font-medium text-foreground">{insurance.price}</span>
                            </div>
                            {insurance.expiry && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>Vence: {insurance.expiry}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 text-xs h-8" onClick={() => toast.info("Apólice", { description: "Baixando documento..." })}>
                              <FileText className="w-3 h-3 mr-1" /> Apólice
                            </Button>
                            <Button size="sm" className="flex-1 text-xs h-8" onClick={() => toast.info("Sinistro", { description: "Abrindo formulário..." })}>
                              <AlertTriangle className="w-3 h-3 mr-1" /> Sinistro
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Nenhum seguro ativo</p>
                  <p className="text-xs text-muted-foreground">Contrate um seguro para se proteger</p>
                </div>
              )}

              {/* Renewal Alert */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200/50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">Renovação Próxima</p>
                    <p className="text-xs text-muted-foreground">Seguro de Vida vence em 5 dias</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.info("Renovação", { description: "Iniciando processo de renovação..." })}>
                    Renovar
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab === "cotar" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-2">Escolha o tipo de seguro para fazer uma cotação:</p>
              {availableInsurances.map((insurance) => {
                const Icon = insurance.icon;
                return (
                  <button key={insurance.id} className="app-card w-full text-left flex items-center gap-3" onClick={() => toast.info("Cotação", { description: `Iniciando cotação de ${insurance.name}...` })}>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", insurance.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-muted-foreground uppercase">{insurance.type}</span>
                      <h3 className="text-sm font-bold text-foreground">{insurance.name}</h3>
                      <p className="text-xs text-muted-foreground">{insurance.description}</p>
                      <p className="text-xs text-primary font-medium mt-1">A partir de {insurance.priceFrom}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}

              {/* Benefits */}
              <div className="bg-primary/5 rounded-xl p-4 mt-4">
                <h3 className="font-bold text-foreground mb-3">Por que contratar conosco?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Melhores preços do mercado</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Atendimento 24h para sinistros</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Parceria com principais seguradoras</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Pagamento facilitado no app</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
