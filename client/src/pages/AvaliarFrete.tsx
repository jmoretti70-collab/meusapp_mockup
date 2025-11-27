import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AvaliarFrete() {
  const [, setLocation] = useLocation();
  const [nota, setNota] = useState(0);
  const [notaHover, setNotaHover] = useState(0);
  const [aspectos, setAspectos] = useState({
    pontualidade: 0,
    comunicacao: 0,
    profissionalismo: 0,
    condicoesCarga: 0
  });
  const [comentario, setComentario] = useState("");
  const [recomenda, setRecomenda] = useState<boolean | null>(null);

  const frete = {
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    embarcador: "Transportadora XYZ",
    valor: 3500,
    data: "15/03/2025"
  };

  const enviarAvaliacao = () => {
    if (nota === 0) {
      toast.error("Por favor, dê uma nota geral");
      return;
    }
    if (recomenda === null) {
      toast.error("Indique se recomenda este embarcador");
      return;
    }

    toast.success("Avaliação enviada com sucesso!");
    setTimeout(() => setLocation("/historico"), 1500);
  };

  const aspectosTitulos = {
    pontualidade: "Pontualidade",
    comunicacao: "Comunicação",
    profissionalismo: "Profissionalismo",
    condicoesCarga: "Condições da Carga"
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/historico")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Star className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Avaliar Frete</h1>
              <p className="text-sm opacity-90">Sua opinião é importante</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Frete Info */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-sm text-muted-foreground mb-2">Frete concluído</div>
            <div className="font-bold text-foreground text-lg mb-1">{frete.embarcador}</div>
            <div className="text-sm text-muted-foreground">
              {frete.origem} → {frete.destino}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Valor</span>
              <span className="font-bold text-primary">R$ {frete.valor.toLocaleString()}</span>
            </div>
          </div>

          {/* Nota Geral */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-4 text-center">Nota Geral</h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <button
                  key={estrela}
                  onClick={() => setNota(estrela)}
                  onMouseEnter={() => setNotaHover(estrela)}
                  onMouseLeave={() => setNotaHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      estrela <= (notaHover || nota)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {nota > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{nota}.0</div>
                <div className="text-sm text-muted-foreground">
                  {nota === 5 ? "Excelente!" : nota === 4 ? "Muito Bom!" : nota === 3 ? "Bom" : nota === 2 ? "Regular" : "Ruim"}
                </div>
              </div>
            )}
          </div>

          {/* Aspectos Específicos */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4">Avalie os Aspectos</h3>
            <div className="space-y-4">
              {Object.entries(aspectos).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground">{aspectosTitulos[key as keyof typeof aspectosTitulos]}</span>
                    <span className="text-sm font-bold text-primary">{value > 0 ? `${value}.0` : "-"}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((estrela) => (
                      <button
                        key={estrela}
                        onClick={() => setAspectos({ ...aspectos, [key]: estrela })}
                        className="flex-1"
                      >
                        <Star
                          className={`w-6 h-6 mx-auto ${
                            estrela <= value
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendação */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-4">Você recomenda este embarcador?</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRecomenda(true)}
                className={`p-4 rounded-xl border-2 transition ${
                  recomenda === true
                    ? "border-green-500 bg-green-50"
                    : "border-border bg-background"
                }`}
              >
                <ThumbsUp className={`w-8 h-8 mx-auto mb-2 ${recomenda === true ? "text-green-600" : "text-muted-foreground"}`} />
                <div className={`text-sm font-bold ${recomenda === true ? "text-green-700" : "text-muted-foreground"}`}>
                  Sim
                </div>
              </button>
              <button
                onClick={() => setRecomenda(false)}
                className={`p-4 rounded-xl border-2 transition ${
                  recomenda === false
                    ? "border-red-500 bg-red-50"
                    : "border-border bg-background"
                }`}
              >
                <ThumbsDown className={`w-8 h-8 mx-auto mb-2 ${recomenda === false ? "text-red-600" : "text-muted-foreground"}`} />
                <div className={`text-sm font-bold ${recomenda === false ? "text-red-700" : "text-muted-foreground"}`}>
                  Não
                </div>
              </button>
            </div>
          </div>

          {/* Comentário */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-3">Comentário (opcional)</h3>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Conte mais sobre sua experiência..."
              className="w-full h-24 p-3 border border-border rounded-lg resize-none text-sm bg-background text-foreground"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {comentario.length}/500
            </div>
          </div>

          <Button className="w-full h-12 font-bold" onClick={enviarAvaliacao}>
            <Send className="w-5 h-5 mr-2" />
            Enviar Avaliação
          </Button>

          <div className="text-xs text-center text-muted-foreground pb-4">
            Sua avaliação ajuda a melhorar a qualidade dos serviços na plataforma
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
