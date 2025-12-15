import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { 
  ArrowLeft, Send, Sparkles, Mic, Image, 
  Calculator, MapPin, FileText, Lightbulb,
  Bot, User, Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface QuickAction {
  icon: typeof Calculator;
  label: string;
  prompt: string;
}

export default function MinhaIA() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Olá, João! 👋 Sou a LogIA, sua assistente inteligente. Como posso ajudar você hoje?\n\nPosso ajudar com:\n• Calcular custos de frete\n• Encontrar a melhor rota\n• Tirar dúvidas sobre documentação\n• Dicas de economia de combustível\n• E muito mais!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { icon: Calculator, label: "Calcular Frete", prompt: "Quanto custa um frete de São Paulo para Rio de Janeiro com 15 toneladas?" },
    { icon: MapPin, label: "Melhor Rota", prompt: "Qual a melhor rota de Curitiba para Florianópolis?" },
    { icon: FileText, label: "Documentação", prompt: "Quais documentos preciso para transportar carga perigosa?" },
    { icon: Lightbulb, label: "Dicas", prompt: "Me dê dicas para economizar combustível" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("frete") && (lowerMessage.includes("custo") || lowerMessage.includes("quanto"))) {
      return "📊 **Cálculo de Frete Estimado**\n\nBaseado na sua consulta:\n\n• **Distância:** ~430 km\n• **Custo por km:** R$ 4,50\n• **Pedágios estimados:** R$ 180,00\n• **Combustível:** R$ 650,00\n\n💰 **Valor sugerido:** R$ 2.800 - R$ 3.200\n\nDica: Considere também custos de alimentação e pernoite se a viagem for longa!";
    }
    
    if (lowerMessage.includes("rota") || lowerMessage.includes("caminho")) {
      return "🗺️ **Análise de Rota**\n\nRota recomendada:\n\n1. Saída pela BR-116\n2. Acesso pela BR-101 (litoral)\n3. Chegada estimada: 4h30min\n\n⚠️ **Alertas:**\n• Trecho com obras no km 45\n• Previsão de chuva às 15h\n\n⛽ Postos recomendados:\n• Posto Shell km 120 (R$ 5,89/L)\n• Auto Posto km 280 (R$ 5,79/L)";
    }
    
    if (lowerMessage.includes("documento") || lowerMessage.includes("carga perigosa")) {
      return "📋 **Documentação para Carga Perigosa**\n\nDocumentos obrigatórios:\n\n✅ CIPP (Certificado de Inspeção)\n✅ Ficha de Emergência\n✅ Envelope para Transporte\n✅ MOPP (curso atualizado)\n✅ Rótulos de Risco\n\n⚠️ Importante: Verifique a validade do seu MOPP! O seu vence em 45 dias.";
    }
    
    if (lowerMessage.includes("dica") || lowerMessage.includes("economizar") || lowerMessage.includes("combustível")) {
      return "💡 **Dicas de Economia de Combustível**\n\n1. **Velocidade ideal:** 80-90 km/h\n   Economia de até 15%\n\n2. **Calibragem dos pneus**\n   Verifique semanalmente\n\n3. **Ar condicionado**\n   Use com moderação\n\n4. **Planeje abastecimentos**\n   Compare preços pelo app\n\n5. **Manutenção em dia**\n   Filtros limpos = mais economia\n\n📈 Seguindo essas dicas, você pode economizar até R$ 800/mês!";
    }
    
    return "Entendi sua pergunta! 🤔\n\nPosso ajudar você com:\n• Cálculos de frete e custos\n• Rotas e navegação\n• Documentação necessária\n• Dicas de economia\n• Informações sobre fretes disponíveis\n\nPode me perguntar mais detalhes sobre qualquer um desses temas!";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = simulateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.prompt);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 pt-14 pb-4 px-5 text-white">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocation("/dashboard")}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold">LogIA</h1>
                <p className="text-xs opacity-80">Sua assistente inteligente</p>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="px-4 py-3 bg-card border-b border-border/50">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs font-medium whitespace-nowrap hover:bg-muted/80 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.type === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
              )}>
                {message.type === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.type === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-card border border-border/50 rounded-tl-sm"
              )}>
                <p className={cn(
                  "text-sm whitespace-pre-wrap",
                  message.type === "assistant" && "text-foreground"
                )}>
                  {message.content}
                </p>
                <p className={cn(
                  "text-[10px] mt-1",
                  message.type === "user" ? "text-white/70" : "text-muted-foreground"
                )}>
                  {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Digitando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 bg-card border-t border-border/50 pb-24">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors">
              <Image className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <Input
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="pr-10 bg-muted/50 border-0"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
