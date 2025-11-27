import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, Users, ThumbsUp, MessageCircle, Share2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinhaRede() {
  const [, setLocation] = useLocation();

  const posts = [
    { autor: "Carlos Mendes", avatar: "CM", tempo: "2h atrás", texto: "Atenção! BR-101 altura de Joinville com congestionamento. Previsão de 1h de atraso.", tipo: "alerta", curtidas: 24, comentarios: 8, local: "BR-101, SC" },
    { autor: "Maria Silva", avatar: "MS", tempo: "5h atrás", texto: "Alguém conhece uma boa oficina em Curitiba para manutenção de Scania?", tipo: "pergunta", curtidas: 12, comentarios: 15, local: "Curitiba, PR" },
    { autor: "João Santos", avatar: "JS", tempo: "1d atrás", texto: "Acabei de concluir o curso de Direção Defensiva! 🎓 Recomendo para todos!", tipo: "conquista", curtidas: 45, comentarios: 6, local: null },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
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

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-4">
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
      </div>
    </PhoneFrame>
  );
}
