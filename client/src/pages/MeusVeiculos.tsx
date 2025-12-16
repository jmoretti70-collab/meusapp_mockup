import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Truck, Plus, Edit2, Trash2, Check, X, Calendar, 
  Gauge, FileText, Shield, ChevronRight, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Veiculo {
  id: string;
  tipo: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  renavam: string;
  cor: string;
  capacidade: string;
  status: "ativo" | "manutencao" | "inativo";
  documentos: {
    crlv: boolean;
    seguro: boolean;
    vistoria: boolean;
  };
  proximaManutencao: string;
  kmAtual: string;
}

export default function MeusVeiculos() {
  const [, setLocation] = useLocation();
  const [selectedVeiculo, setSelectedVeiculo] = useState<string | null>(null);

  const veiculos: Veiculo[] = [
    {
      id: "1",
      tipo: "Cavalo Mecânico",
      marca: "Scania",
      modelo: "R450",
      ano: "2022",
      placa: "ABC-1234",
      renavam: "12345678901",
      cor: "Branco",
      capacidade: "45 toneladas",
      status: "ativo",
      documentos: {
        crlv: true,
        seguro: true,
        vistoria: true
      },
      proximaManutencao: "15/01/2025",
      kmAtual: "125.430"
    },
    {
      id: "2",
      tipo: "Carreta Baú",
      marca: "Randon",
      modelo: "SR BA",
      ano: "2021",
      placa: "XYZ-5678",
      renavam: "98765432101",
      cor: "Branco",
      capacidade: "30 toneladas",
      status: "ativo",
      documentos: {
        crlv: true,
        seguro: true,
        vistoria: false
      },
      proximaManutencao: "20/12/2024",
      kmAtual: "89.200"
    }
  ];

  const getStatusBadge = (status: Veiculo["status"]) => {
    switch (status) {
      case "ativo":
        return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Ativo</span>;
      case "manutencao":
        return <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Em Manutenção</span>;
      case "inativo":
        return <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Inativo</span>;
    }
  };

  const handleAddVeiculo = () => {
    toast.info("Adicionar Veículo", { description: "Funcionalidade em desenvolvimento" });
  };

  const handleEditVeiculo = (id: string) => {
    toast.info("Editar Veículo", { description: "Funcionalidade em desenvolvimento" });
  };

  const handleDeleteVeiculo = (id: string) => {
    toast.error("Remover Veículo", { description: "Tem certeza que deseja remover este veículo?" });
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background">
        <PageHeader 
          title="Meus Veículos"
          subtitle={`${veiculos.length} veículos cadastrados`}
          backPath="/profile"
          variant="gradient"
          rightContent={
            <button 
              onClick={handleAddVeiculo}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <Plus className="w-5 h-5" />
            </button>
          }
        />

        <div className="flex-1 px-4 py-4 pb-24 space-y-4">
          {/* Lista de Veículos */}
          {veiculos.map((veiculo) => (
            <div 
              key={veiculo.id}
              className={cn(
                "app-card space-y-4 cursor-pointer transition-all",
                selectedVeiculo === veiculo.id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedVeiculo(selectedVeiculo === veiculo.id ? null : veiculo.id)}
            >
              {/* Header do Veículo */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{veiculo.marca} {veiculo.modelo}</h3>
                    <p className="text-xs text-muted-foreground">{veiculo.tipo} • {veiculo.ano}</p>
                  </div>
                </div>
                {getStatusBadge(veiculo.status)}
              </div>

              {/* Placa e Info Básica */}
              <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-muted-foreground">Placa</p>
                  <p className="text-lg font-bold text-foreground">{veiculo.placa}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Capacidade</p>
                  <p className="text-sm font-medium text-foreground">{veiculo.capacidade}</p>
                </div>
              </div>

              {/* Detalhes Expandidos */}
              {selectedVeiculo === veiculo.id && (
                <div className="space-y-4 pt-2 border-t border-border">
                  {/* Informações Gerais */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">RENAVAM</p>
                      <p className="text-sm font-medium text-foreground">{veiculo.renavam}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cor</p>
                      <p className="text-sm font-medium text-foreground">{veiculo.cor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">KM Atual</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Gauge className="w-3 h-3" /> {veiculo.kmAtual} km
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Próx. Manutenção</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {veiculo.proximaManutencao}
                      </p>
                    </div>
                  </div>

                  {/* Status dos Documentos */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Documentos</p>
                    <div className="flex gap-2">
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        veiculo.documentos.crlv 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      )}>
                        {veiculo.documentos.crlv ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        CRLV
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        veiculo.documentos.seguro 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      )}>
                        {veiculo.documentos.seguro ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        Seguro
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        veiculo.documentos.vistoria 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      )}>
                        {veiculo.documentos.vistoria ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        Vistoria
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditVeiculo(veiculo.id);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVeiculo(veiculo.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Botão Adicionar Veículo */}
          <button 
            onClick={handleAddVeiculo}
            className="w-full app-card flex items-center justify-center gap-2 py-6 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Adicionar Novo Veículo</span>
          </button>

          {/* Dica */}
          <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Mantenha seus documentos em dia</p>
              <p className="text-xs text-blue-700 mt-1">
                Veículos com documentação completa têm prioridade nos fretes e melhor avaliação.
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
