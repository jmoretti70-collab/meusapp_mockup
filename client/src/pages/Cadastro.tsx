import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, CheckCircle2, Camera } from "lucide-react";
import { toast } from "sonner";

export default function Cadastro() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    cnh: "",
    rntrc: "",
    cnhFoto: null as File | null,
    veiculoDoc: null as File | null
  });

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, "");
    if (cleanCPF.length !== 11) return false;
    // Validação simplificada
    return cleanCPF !== "00000000000" && cleanCPF !== "11111111111";
  };

  const formatCPF = (value: string) => {
    const clean = value.replace(/\D/g, "");
    return clean
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const clean = value.replace(/\D/g, "");
    return clean
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  const handleFileUpload = (field: "cnhFoto" | "veiculoDoc") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFormData({ ...formData, [field]: file });
        toast.success(`${field === "cnhFoto" ? "CNH" : "Documento do veículo"} anexado!`);
      }
    };
    input.click();
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.nome || !formData.cpf || !formData.telefone || !formData.email) {
        toast.error("Preencha todos os campos");
        return;
      }
      if (!validateCPF(formData.cpf)) {
        toast.error("CPF inválido");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.cnh || !formData.rntrc) {
        toast.error("Preencha CNH e RNTRC");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.cnhFoto || !formData.veiculoDoc) {
        toast.error("Envie os documentos obrigatórios");
        return;
      }
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => setLocation("/dashboard"), 1500);
    }
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        <div className="bg-primary pt-12 pb-6 px-6 text-primary-foreground">
          <button onClick={() => step === 1 ? setLocation("/login") : setStep(step - 1)} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="text-sm opacity-80">Passo {step} de 3</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1 px-6 py-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        <div className="flex-1  px-6 pb-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-foreground mb-4">Dados Pessoais</h2>
              
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">Nome Completo</label>
                <Input
                  placeholder="João da Silva"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">CPF</label>
                <Input
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                  maxLength={14}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">Telefone</label>
                <Input
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                  maxLength={15}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">E-mail</label>
                <Input
                  type="email"
                  placeholder="joao@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-foreground mb-4">Documentos Profissionais</h2>
              
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">Número da CNH</label>
                <Input
                  placeholder="00000000000"
                  value={formData.cnh}
                  onChange={(e) => setFormData({ ...formData, cnh: e.target.value.replace(/\D/g, "") })}
                  maxLength={11}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">RNTRC</label>
                <Input
                  placeholder="00000000"
                  value={formData.rntrc}
                  onChange={(e) => setFormData({ ...formData, rntrc: e.target.value.replace(/\D/g, "") })}
                  maxLength={8}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Registro Nacional de Transportadores Rodoviários de Cargas
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-xs text-blue-800">
                  ℹ️ Seus documentos serão validados pela ANTT para garantir a segurança da plataforma.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-foreground mb-4">Upload de Documentos</h2>
              
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-bold text-sm text-foreground mb-2">Foto da CNH</h3>
                {formData.cnhFoto ? (
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-bold">{formData.cnhFoto.name}</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mb-3">
                    Tire uma foto ou selecione da galeria
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFileUpload("cnhFoto")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.cnhFoto ? "Alterar" : "Enviar"}
                </Button>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-bold text-sm text-foreground mb-2">Documento do Veículo (CRLV)</h3>
                {formData.veiculoDoc ? (
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-bold">{formData.veiculoDoc.name}</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mb-3">
                    Tire uma foto ou selecione da galeria
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFileUpload("veiculoDoc")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.veiculoDoc ? "Alterar" : "Enviar"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border">
          <Button className="w-full h-12 font-bold" onClick={handleNext}>
            {step === 3 ? "Finalizar Cadastro" : "Continuar"}
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
