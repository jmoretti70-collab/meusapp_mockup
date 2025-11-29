import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, Copy, Share2, Gift, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SistemaIndicacao() {
  const [, setLocation] = useLocation();
  const [codigoConvite] = useState("JOAO2024MEUS");
  const [indicacoes, setIndicacoes] = useState(3);
  const [bonusTotal, setBonusTotal] = useState(450);

  const minhasIndicacoes = [
    { id: 1, nome: "Carlos Silva", data: "15 de nov", status: "Ativo", bonus: 150 },
    { id: 2, nome: "Maria Santos", data: "10 de nov", status: "Ativo", bonus: 150 },
    { id: 3, nome: "Pedro Costa", data: "05 de nov", status: "Ativo", bonus: 150 }
  ];

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoConvite);
    toast.success("Código copiado para a área de transferência!");
  };

  const compartilharWhatsApp = () => {
    const mensagem = `Oi! Estou usando o Meus App e adorei! 🚚 Usa meu código de convite ${codigoConvite} e ganha R$ 150 de bônus. Baixa aí: https://meusapp.com.br`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    toast.success("Abrindo WhatsApp...");
  };

  const compartilharFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=https://meusapp.com.br&quote=Ganha%20R$%20150%20com%20meu%20código%20de%20convite%20${codigoConvite}`;
    window.open(url, '_blank');
    toast.success("Abrindo Facebook...");
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary pt-12 pb-6 px-6 text-primary-foreground relative z-10">
          <button onClick={() => setLocation("/profile")} className="mb-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Gift className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Indique e Ganhe</h1>
              <p className="text-sm opacity-90">Compartilhe e receba bônus</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Bonus Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-sm text-green-700 mb-2">Bônus Total Acumulado</div>
              <div className="text-5xl font-bold text-green-600 mb-2">R$ {bonusTotal}</div>
              <div className="flex items-center justify-center gap-2 text-green-700">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{indicacoes} amigos indicados</span>
              </div>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="bg-card border-2 border-primary rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-sm text-muted-foreground mb-3">Seu Código de Convite</div>
              <div className="bg-primary/10 rounded-xl p-4 mb-4">
                <div className="text-3xl font-bold text-primary font-mono">{codigoConvite}</div>
              </div>
              <Button 
                className="w-full mb-3 h-12"
                onClick={copiarCodigo}
              >
                <Copy className="w-5 h-5 mr-2" />
                Copiar Código
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Compartilhe Seu Código
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 justify-start"
                onClick={compartilharWhatsApp}
              >
                <div className="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold">W</div>
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 justify-start"
                onClick={compartilharFacebook}
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold">f</div>
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 justify-start"
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=Ganha%20R$%20150%20com%20meu%20código%20de%20convite%20${codigoConvite}%20no%20Meus%20App!%20https://meusapp.com.br`;
                  window.open(url, '_blank');
                  toast.success("Abrindo Twitter...");
                }}
              >
                <div className="w-6 h-6 bg-black rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">X</div>
                Twitter/X
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 justify-start"
                onClick={() => {
                  const texto = `Oi! Estou usando o Meus App e adorei! 🚚 Usa meu código de convite ${codigoConvite} e ganha R$ 150 de bônus.`;
                  if (navigator.share) {
                    navigator.share({
                      title: 'Meus App',
                      text: texto,
                      url: 'https://meusapp.com.br'
                    });
                  } else {
                    toast.success("Compartilhe manualmente!");
                  }
                }}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Mais Opções
              </Button>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Como Funciona
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <div className="font-semibold text-sm text-foreground">Compartilhe seu código</div>
                  <div className="text-xs text-muted-foreground">Envie para amigos e colegas</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <div className="font-semibold text-sm text-foreground">Amigo se cadastra</div>
                  <div className="text-xs text-muted-foreground">Usa seu código durante o cadastro</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <div className="font-semibold text-sm text-foreground">Ganhe R$ 150</div>
                  <div className="text-xs text-muted-foreground">Bônus creditado quando amigo ativa conta</div>
                </div>
              </div>
            </div>
          </div>

          {/* Minhas Indicações */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Minhas Indicações ({indicacoes})
            </h3>
            <div className="space-y-3">
              {minhasIndicacoes.map((indicacao) => (
                <div key={indicacao.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-semibold text-sm text-foreground">{indicacao.nome}</div>
                    <div className="text-xs text-muted-foreground">{indicacao.data}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold mb-1">{indicacao.status}</div>
                    <div className="text-sm font-bold text-green-600">+R$ {indicacao.bonus}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bonus Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="text-xs text-blue-800">
              <div className="font-semibold mb-2">📌 Informações Importantes</div>
              <ul className="space-y-1 list-disc list-inside">
                <li>Bônus é creditado após amigo completar primeiro frete</li>
                <li>Máximo de 50 indicações por mês</li>
                <li>Bônus pode ser usado para pagar fretes ou sacar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
