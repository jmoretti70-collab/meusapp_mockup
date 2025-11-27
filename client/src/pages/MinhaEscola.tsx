import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { ArrowLeft, GraduationCap, Clock, Award, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function MinhaEscola() {
  const [, setLocation] = useLocation();

  const cursos = [
    { titulo: "Direção Defensiva Avançada", progresso: 75, duracao: "4h", certificado: true, icon: "🚗" },
    { titulo: "Gestão Financeira para Motoristas", progresso: 30, duracao: "3h", certificado: true, icon: "💰" },
    { titulo: "Primeiros Socorros na Estrada", progresso: 0, duracao: "2h", certificado: true, icon: "🏥" },
    { titulo: "Manutenção Preventiva de Veículos", progresso: 100, duracao: "5h", certificado: true, icon: "🔧" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-background">
        <div className="bg-gradient-to-br from-teal-600 to-teal-500 pt-12 pb-6 px-6 text-white">
          <button onClick={() => setLocation("/profile")} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">Minha Escola</h1>
              <p className="text-sm opacity-90">Universidade na Estrada</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">Meus Certificados</span>
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">3 Concluídos</div>
            <div className="text-xs opacity-90 mt-1">+150 pontos no seu score</div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-3">Meus Cursos</h3>
            <div className="space-y-3">
              {cursos.map((curso, idx) => (
                <div key={idx} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{curso.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground mb-1">{curso.titulo}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{curso.duracao}</span>
                        </div>
                        {curso.certificado && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Award className="w-3 h-3" />
                            <span>Certificado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {curso.progresso > 0 && curso.progresso < 100 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-bold text-foreground">{curso.progresso}%</span>
                      </div>
                      <Progress value={curso.progresso} className="h-2" />
                    </div>
                  )}
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    variant={curso.progresso === 100 ? "outline" : "default"}
                  >
                    {curso.progresso === 0 ? (
                      <><Play className="w-4 h-4 mr-2" /> Iniciar Curso</>
                    ) : curso.progresso === 100 ? (
                      <><Award className="w-4 h-4 mr-2" /> Ver Certificado</>
                    ) : (
                      <><Play className="w-4 h-4 mr-2" /> Continuar</>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-bold text-blue-900 mb-2">📺 Canal Exclusivo na SKY</h4>
            <p className="text-sm text-blue-800">
              Assista conteúdos exclusivos no canal "TV Na Boleia" disponível na SKY.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
