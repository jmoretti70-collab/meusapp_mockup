import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

export default function Tutorial() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Encontre Fretes",
      subtitle: "Leilão Reverso ANTT",
      description: "Negocie fretes de forma transparente. Você escolhe o melhor preço e condições!",
      icon: "📦",
      color: "from-green-600 to-green-400",
      features: ["Leilão reverso", "Sem intermediários", "Pagamento garantido"]
    },
    {
      title: "Conta Digital",
      subtitle: "Meu Financeiro",
      description: "Antecipe fretes, pague contas e gerencie seu dinheiro sem burocracia.",
      icon: "💰",
      color: "from-purple-600 to-purple-400",
      features: ["Antecipação de fretes", "Pix grátis", "Cartão virtual"]
    },
    {
      title: "Aprenda e Cresça",
      subtitle: "Minha Escola",
      description: "Cursos profissionais, certificações e canal exclusivo na SKY.",
      icon: "🎓",
      color: "from-orange-600 to-orange-400",
      features: ["Cursos gratuitos", "Certificação digital", "Canal na SKY"]
    },
    {
      title: "Comunidade",
      subtitle: "Minha Rede",
      description: "Conecte-se com outros motoristas, compartilhe experiências e dicas.",
      icon: "👥",
      color: "from-indigo-600 to-indigo-400",
      features: ["Rede social", "Grupos temáticos", "Alertas de rota"]
    },
    {
      title: "Assistente IA",
      subtitle: "LogIA - Sua Copiloto",
      description: "Inteligência artificial que te ajuda em rotas, custos e muito mais.",
      icon: "✨",
      color: "from-pink-600 to-pink-400",
      features: ["Rotas otimizadas", "Cálculo de custos", "Suporte 24/7"]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLocation("/dashboard");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <PhoneFrame>
      <div className={`h-full flex flex-col bg-gradient-to-br ${currentStepData.color} text-white relative overflow-hidden`}>
        {/* Skip Button */}
        <button
          onClick={() => setLocation("/dashboard")}
          className="absolute top-10 right-6 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute top-8 left-0 right-0 flex justify-center gap-2 px-12 z-10">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all ${
                idx === currentStep ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in">
          <div className="text-8xl mb-6">{currentStepData.icon}</div>
          <h1 className="text-3xl font-bold mb-2">{currentStepData.title}</h1>
          <p className="text-lg opacity-90 mb-4">{currentStepData.subtitle}</p>
          <p className="text-sm opacity-80 max-w-sm mb-8">{currentStepData.description}</p>

          {/* Features List */}
          <div className="space-y-2 w-full max-w-xs">
            {currentStepData.features.map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-8 flex items-center justify-between gap-4">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              className="bg-white/20 hover:bg-white/30 text-white border-white/40"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
          ) : (
            <div className="w-32"></div>
          )}

          <div className="text-xs opacity-70">
            {currentStep + 1} de {steps.length}
          </div>

          <Button
            size="lg"
            onClick={handleNext}
            className="bg-white text-primary hover:bg-white/90"
          >
            {currentStep === steps.length - 1 ? "Começar" : "Próximo"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
