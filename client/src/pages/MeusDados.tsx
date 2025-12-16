import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { 
  User, IdCard, MapPin, Phone, Mail, CreditCard, 
  Camera, Edit2, Check, ChevronRight, Shield, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function MeusDados() {
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    nome: "João Carlos da Silva",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    cnh: "04567891234",
    categoriaCnh: "E",
    validadeCnh: "15/03/2028",
    rntrc: "12345678",
    telefone: "(11) 98765-4321",
    email: "joao.motorista@email.com",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    chavePix: "joao.motorista@email.com",
    tipoPix: "E-mail"
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Dados atualizados!", { description: "Suas informações foram salvas com sucesso." });
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background">
        <PageHeader 
          title="Meus Dados"
          subtitle="Informações pessoais"
          backPath="/profile"
          variant="gradient"
          rightContent={
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              {isEditing ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
          }
        />

        <div className="flex-1 px-4 py-4 pb-24 space-y-4">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center py-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                JC
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-foreground mt-3">{userData.nome}</h2>
            <p className="text-sm text-muted-foreground">Motorista Autônomo</p>
          </div>

          {/* Dados Pessoais */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Dados Pessoais
            </h3>
            
            <div className="app-card space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Nome Completo</span>
                {isEditing ? (
                  <Input defaultValue={userData.nome} className="w-48 h-8 text-sm" />
                ) : (
                  <span className="text-sm font-medium text-foreground">{userData.nome}</span>
                )}
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">CPF</span>
                <span className="text-sm font-medium text-foreground">{userData.cpf}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">RG</span>
                <span className="text-sm font-medium text-foreground">{userData.rg}</span>
              </div>
            </div>
          </section>

          {/* CNH */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <IdCard className="w-4 h-4 text-primary" />
              CNH
            </h3>
            
            <div className="app-card space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Número</span>
                <span className="text-sm font-medium text-foreground">{userData.cnh}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Categoria</span>
                <span className="text-sm font-medium text-foreground">{userData.categoriaCnh}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Validade</span>
                <span className="text-sm font-medium text-green-600">{userData.validadeCnh}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">RNTRC</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{userData.rntrc}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Ativo
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Contato */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Contato
            </h3>
            
            <div className="app-card space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Telefone</span>
                {isEditing ? (
                  <Input defaultValue={userData.telefone} className="w-40 h-8 text-sm" />
                ) : (
                  <span className="text-sm font-medium text-foreground">{userData.telefone}</span>
                )}
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">E-mail</span>
                {isEditing ? (
                  <Input defaultValue={userData.email} className="w-48 h-8 text-sm" />
                ) : (
                  <span className="text-sm font-medium text-foreground">{userData.email}</span>
                )}
              </div>
            </div>
          </section>

          {/* Endereço */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Endereço
            </h3>
            
            <div className="app-card space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Logradouro</span>
                <span className="text-sm font-medium text-foreground">{userData.endereco}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Cidade/UF</span>
                <span className="text-sm font-medium text-foreground">{userData.cidade} - {userData.estado}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">CEP</span>
                <span className="text-sm font-medium text-foreground">{userData.cep}</span>
              </div>
            </div>
          </section>

          {/* Chave Pix */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Chave Pix
            </h3>
            
            <div className="app-card space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Tipo</span>
                <span className="text-sm font-medium text-foreground">{userData.tipoPix}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Chave</span>
                <span className="text-sm font-medium text-foreground">{userData.chavePix}</span>
              </div>
            </div>
          </section>

          {/* Documentos */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Documentos
            </h3>
            
            <button className="w-full app-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">CNH Digital</p>
                  <p className="text-xs text-muted-foreground">Verificada</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <button className="w-full app-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Comprovante de Residência</p>
                  <p className="text-xs text-muted-foreground">Verificado</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </section>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
