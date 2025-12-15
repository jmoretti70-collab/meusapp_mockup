import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
  CreditCard, PiggyBank, Receipt, Filter, Download, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TabType = "extrato" | "antecipacao" | "carteira";

interface Transaction {
  id: string;
  type: "entrada" | "saida";
  description: string;
  value: number;
  date: string;
  category: string;
}

export default function MeuFinanceiro() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("extrato");
  const [showBalance, setShowBalance] = useState(true);

  const transactions: Transaction[] = [
    { id: "1", type: "entrada", description: "Frete SP → RJ", value: 4500, date: "Hoje, 14:30", category: "Frete" },
    { id: "2", type: "saida", description: "Combustível - Posto Shell", value: 850, date: "Hoje, 10:15", category: "Combustível" },
    { id: "3", type: "entrada", description: "Frete Curitiba → Floripa", value: 2800, date: "Ontem, 18:45", category: "Frete" },
    { id: "4", type: "saida", description: "Pedágio Via Dutra", value: 180, date: "Ontem, 08:20", category: "Pedágio" },
    { id: "5", type: "entrada", description: "Frete BH → Brasília", value: 3200, date: "12/12, 16:00", category: "Frete" },
    { id: "6", type: "saida", description: "Manutenção - Troca de óleo", value: 450, date: "11/12, 09:30", category: "Manutenção" },
    { id: "7", type: "entrada", description: "Bônus Indicação", value: 150, date: "10/12, 12:00", category: "Bônus" },
  ];

  const tabs = [
    { id: "extrato" as TabType, label: "Extrato" },
    { id: "antecipacao" as TabType, label: "Antecipação" },
    { id: "carteira" as TabType, label: "Carteira" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <PageHeader 
          title="Meu Financeiro"
          subtitle="Gerencie suas finanças"
          backPath="/dashboard"
          variant="gradient"
          rightContent={
            <button 
              className="icon-button-primary"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          }
        />

        {/* Balance Card */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">Saldo Disponível</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {showBalance ? "R$ 12.850,75" : "R$ ••••••"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <ArrowDownLeft className="w-4 h-4" />
                  <span className="text-xs font-medium">Entradas</span>
                </div>
                <p className="text-lg font-bold text-green-700 dark:text-green-400">
                  {showBalance ? "+R$ 10.650" : "+R$ ••••"}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-xs font-medium">Saídas</span>
                </div>
                <p className="text-lg font-bold text-red-700 dark:text-red-400">
                  {showBalance ? "-R$ 1.480" : "-R$ ••••"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-4 gap-2">
            <button 
              className="flex flex-col items-center gap-1 p-3 bg-card rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
              onClick={() => toast.info("Transferência", { description: "Transfira para sua conta bancária" })}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-medium text-foreground">Transferir</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1 p-3 bg-card rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
              onClick={() => setActiveTab("antecipacao")}
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-[10px] font-medium text-foreground">Antecipar</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1 p-3 bg-card rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
              onClick={() => toast.info("Pix", { description: "Receba via Pix instantâneo" })}
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-[10px] font-medium text-foreground">Pix</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1 p-3 bg-card rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
              onClick={() => toast.info("Comprovantes", { description: "Baixe seus comprovantes" })}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-[10px] font-medium text-foreground">Recibos</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex bg-muted rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 custom-scrollbar">
          {activeTab === "extrato" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-foreground">Últimas Transações</h3>
                <button className="flex items-center gap-1 text-xs text-primary font-medium">
                  <Filter className="w-3 h-3" /> Filtrar
                </button>
              </div>
              
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="app-card flex items-center gap-3"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    transaction.type === "entrada" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  )}>
                    {transaction.type === "entrada" ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-bold",
                      transaction.type === "entrada" ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.type === "entrada" ? "+" : "-"}
                      {formatCurrency(transaction.value)}
                    </p>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {transaction.category}
                    </span>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <Download className="w-4 h-4 mr-2" />
                Exportar Extrato
              </Button>
            </div>
          )}

          {activeTab === "antecipacao" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-5 border border-secondary/20">
                <h3 className="font-bold text-foreground mb-2">Antecipação Disponível</h3>
                <p className="text-3xl font-bold text-secondary">R$ 8.500,00</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Taxa: 2,5% ao mês • Liberação em até 2h
                </p>
                <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                  Solicitar Antecipação
                </Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Fretes a Receber</h3>
                <div className="app-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Frete SP → RJ</p>
                      <p className="text-xs text-muted-foreground">Previsão: 20/12/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">R$ 4.500</p>
                      <button className="text-xs text-secondary font-medium">Antecipar</button>
                    </div>
                  </div>
                </div>
                <div className="app-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Frete Curitiba → Floripa</p>
                      <p className="text-xs text-muted-foreground">Previsão: 22/12/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">R$ 2.800</p>
                      <button className="text-xs text-secondary font-medium">Antecipar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "carteira" && (
            <div className="space-y-4">
              <div className="app-card">
                <h3 className="font-bold text-foreground mb-3">Dados Bancários</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Banco</span>
                    <span className="font-medium text-foreground">Banco do Brasil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Agência</span>
                    <span className="font-medium text-foreground">1234-5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conta</span>
                    <span className="font-medium text-foreground">12345-6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pix</span>
                    <span className="font-medium text-foreground">CPF: •••.456.789-••</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Alterar Dados Bancários
                </Button>
              </div>
              
              <div className="app-card">
                <h3 className="font-bold text-foreground mb-3">Cartão Virtual</h3>
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 text-white">
                  <p className="text-xs opacity-80 mb-1">Meus App Card</p>
                  <p className="text-lg font-mono tracking-wider">•••• •••• •••• 4567</p>
                  <div className="flex justify-between mt-4 text-xs">
                    <span>JOÃO MOTORISTA</span>
                    <span>12/28</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Use seu cartão virtual para compras online
                </p>
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
