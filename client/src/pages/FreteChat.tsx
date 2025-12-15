import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, Send, Paperclip, Image as ImageIcon, MapPin, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FreteChat() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const [mensagem, setMensagem] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      remetente: "embarcador",
      nome: "Transportadora XYZ",
      texto: "Olá! O frete foi confirmado. Quando você pode iniciar a coleta?",
      hora: "10:30",
      lido: true
    },
    {
      id: 2,
      remetente: "motorista",
      nome: "Você",
      texto: "Bom dia! Posso iniciar amanhã às 8h. Confirma o endereço de coleta?",
      hora: "10:35",
      lido: true
    },
    {
      id: 3,
      remetente: "embarcador",
      nome: "Transportadora XYZ",
      texto: "Perfeito! Endereço: Av. Paulista, 1000 - São Paulo, SP. Contato: (11) 98765-4321",
      hora: "10:37",
      lido: true
    },
    {
      id: 4,
      remetente: "motorista",
      nome: "Você",
      texto: "Anotado! Vou confirmar quando estiver a caminho.",
      hora: "10:40",
      lido: true
    },
    {
      id: 5,
      remetente: "embarcador",
      nome: "Transportadora XYZ",
      texto: "Ótimo! Qualquer dúvida, estou à disposição.",
      hora: "10:42",
      lido: false
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: mensagens.length + 1,
      remetente: "motorista",
      nome: "Você",
      texto: mensagem,
      hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      lido: false
    };

    setMensagens([...mensagens, novaMensagem]);
    setMensagem("");

    // Simular resposta automática do embarcador
    setTimeout(() => {
      const respostaAuto = {
        id: mensagens.length + 2,
        remetente: "embarcador",
        nome: "Transportadora XYZ",
        texto: "Mensagem recebida! Vou verificar e te retorno em breve.",
        hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        lido: false
      };
      setMensagens(prev => [...prev, respostaAuto]);
    }, 2000);
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        {/* Header */}
        <div className="bg-primary pt-12 pb-4 px-6 text-primary-foreground">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setLocation("/historico")} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <div className="font-bold">Transportadora XYZ</div>
              <div className="text-xs opacity-80 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Curitiba → Florianópolis
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-blue-600 font-bold">Frete em andamento</span>
              <span className="text-blue-500 ml-2">• 65% concluído</span>
            </div>
            <button className="text-blue-600 font-bold text-xs">Ver detalhes</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1  p-4 space-y-3 bg-muted/20">
          {/* Date Divider */}
          <div className="flex justify-center">
            <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
              Hoje
            </div>
          </div>

          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.remetente === "motorista" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  msg.remetente === "motorista"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card text-foreground border border-border rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.texto}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                  msg.remetente === "motorista" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  <span>{msg.hora}</span>
                  {msg.remetente === "motorista" && (
                    <span>{msg.lido ? "✓✓" : "✓"}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-background border-t border-border">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80">
              <ImageIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <Input
                placeholder="Digite uma mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && enviarMensagem()}
                className="pr-12"
              />
            </div>
            <button
              onClick={enviarMensagem}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
