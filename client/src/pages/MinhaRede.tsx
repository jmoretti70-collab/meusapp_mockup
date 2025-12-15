import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Users, ThumbsUp, MessageCircle, Share2, MapPin, Award, Trophy, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinhaRede() {
  const [, setLocation] = useLocation();
  const [showBadges, setShowBadges] = useState(false);

  const badges = [
    { id: 1, nome: "Primeiro Frete", descricao: "Completou seu primeiro frete", icon: "🚛", conquistado: true, data: "15/11/2024" },
    { id: 2, nome: "100 Fretes", descricao: "Completou 100 fretes com sucesso", icon: "💯", conquistado: true, data: "20/01/2025" },
    { id: 3, nome: "Motorista do Mês", descricao: "Melhor avaliação do mês", icon: "🏆", conquistado: true, data: "01/02/2025" },
    { id: 4, nome: "Segurança Total", descricao: "6 meses sem multas ou acidentes", icon: "🛡️", conquistado: true, data: "10/02/2025" },
    { id: 5, nome: "Estudante", descricao: "Completou 5 cursos na Minha Escola", icon: "🎓", conquistado: true, data: "25/02/2025" },
    { id: 6, nome: "500 Fretes", descricao: "Completou 500 fretes com sucesso", icon: "⭐", conquistado: false, progresso: 342 },
    { id: 7, nome: "Lenda da Estrada", descricao: "1000 fretes completados", icon: "👑", conquistado: false, progresso: 342 },
    { id: 8, nome: "Comunidade Ativa", descricao: "100 postagens na Minha Rede", icon: "💬", conquistado: false, progresso: 67 },
  ];

  const posts = [
    { 
      autor: "João Motorista", 
      avatar: "JM", 
      tempo: "Agora", 
      texto: "🏆 Acabei de conquistar o badge 'Estudante'! Completei 5 cursos na Minha Escola!", 
      tipo: "conquista", 
      curtidas: 0, 
      comentarios: 0, 
      local: null,
      badge: "🎓"
    },
    { 
      autor: "Carlos Mendes", 
      avatar: "CM", 
      tempo: "2h atrás", 
      texto: "Atenção! BR-101 altura de Joinville com congestionamento. Previsão de 1h de atraso.", 
      tipo: "alerta", 
      curtidas: 24, 
      comentarios: 8, 
      local: "BR-101, SC" 
    },
    { 
      autor: "Maria Silva", 
      avatar: "MS", 
      tempo: "5h atrás", 
      texto: "Alguém conhece uma boa oficina em Curitiba para manutenção de Scania?", 
      tipo: "pergunta", 
      curtidas: 12, 
      comentarios: 15, 
      local: "Curitiba, PR" 
    },
  ];

  const conquistadosCount = badges.filter(b => b.conquistado).length;

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background pb-20">
        <div className="bg-gradient-to-br from-violet-600 to-purple-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold">Minha Rede</h1>
                <p className="text-sm opacity-90">Comunidade de Motoristas</p>
              </div>
            </div>
            <Button size="sm" className="bg-white text-violet-600 hover:bg-gray-100">
              + Post
            </Button>
          </div>
        </div>

        {/* Badges Summary Card */}
        <div className="px-4 pt-4">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition"
            onClick={() => setShowBadges(!showBadges)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <div className="text-xs opacity-90">Minhas Conquistas</div>
                  <div className="text-2xl font-bold">{conquistadosCount}/{badges.length}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {badges.slice(0, 3).map((badge, idx) => (
                  badge.conquistado && (
                    <div key={idx} className="text-2xl">{badge.icon}</div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        {showBadges && (
          <div className="px-4 py-4 bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground">Todas as Conquistas</h3>
              <button onClick={() => setShowBadges(false)} className="text-xs text-primary font-bold">
                Fechar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`bg-card border rounded-xl p-3 ${
                    badge.conquistado ? "border-yellow-400" : "border-border opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-bold text-xs text-foreground mb-1">{badge.nome}</div>
                  <div className="text-[10px] text-muted-foreground mb-2">{badge.descricao}</div>
                  {badge.conquistado ? (
                    <div className="flex items-center gap-1 text-[10px] text-green-600">
                      <Trophy className="w-3 h-3" />
                      <span>{badge.data}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-muted-foreground">
                      {badge.progresso}/{badge.id === 6 ? 500 : badge.id === 7 ? 1000 : 100}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="flex-1  p-4 space-y-3">
          {posts.map((post, idx) => (
            <div key={idx} className={`bg-card border rounded-xl p-4 ${
              post.tipo === "conquista" ? "border-yellow-400 bg-yellow-50/50" : "border-border"
            }`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{post.autor}</div>
                  <div className="text-xs text-muted-foreground">{post.tempo}</div>
                </div>
                {post.tipo === "alerta" && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">Alerta</span>
                )}
                {post.tipo === "pergunta" && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Pergunta</span>
                )}
                {post.tipo === "conquista" && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Conquista
                  </span>
                )}
              </div>

              <p className="text-sm text-foreground mb-3">{post.texto}</p>

              {post.local && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{post.local}</span>
                </div>
              )}

              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.curtidas}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comentarios}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary ml-auto">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
