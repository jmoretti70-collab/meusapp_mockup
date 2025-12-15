import { useState } from "react";
import { useLocation } from "wouter";
import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomNav from "@/components/layout/BottomNav";
import PageHeader from "@/components/layout/PageHeader";
import { GraduationCap, Play, Clock, Award, CheckCircle, Lock, Star, ChevronRight, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  progress: number;
  certificate: boolean;
  category: string;
  locked?: boolean;
}

export default function MinhaEscola() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"cursos" | "certificados">("cursos");

  const courses: Course[] = [
    { id: "1", title: "Direção Defensiva", description: "Técnicas avançadas de segurança", duration: "4h", lessons: 12, progress: 100, certificate: true, category: "Obrigatório" },
    { id: "2", title: "MOPP - Produtos Perigosos", description: "Transporte de cargas perigosas", duration: "8h", lessons: 24, progress: 75, certificate: true, category: "Especialização" },
    { id: "3", title: "Economia de Combustível", description: "Reduza custos e aumente lucros", duration: "2h", lessons: 8, progress: 30, certificate: false, category: "Dicas" },
    { id: "4", title: "Manutenção Preventiva", description: "Cuide do seu veículo", duration: "3h", lessons: 10, progress: 0, certificate: false, category: "Técnico" },
    { id: "5", title: "Legislação de Trânsito", description: "Atualizações 2025", duration: "5h", lessons: 15, progress: 0, certificate: true, category: "Obrigatório", locked: true },
  ];

  const certificates = [
    { id: "1", title: "Direção Defensiva", date: "15/11/2025", valid: "15/11/2030", status: "Válido" },
    { id: "2", title: "Primeiros Socorros", date: "10/09/2025", valid: "10/09/2027", status: "Válido" },
  ];

  const stats = { completed: 2, inProgress: 2, certificates: 2, hours: 12 };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col bg-background pb-24">
        <PageHeader title="Minha Escola" subtitle="Aprenda e evolua" backPath="/profile" variant="gradient" />

        {/* Stats */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="bg-card rounded-2xl p-4 shadow-lg border border-border/50 grid grid-cols-4 gap-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.completed}</p>
              <p className="text-[10px] text-muted-foreground">Concluídos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">{stats.inProgress}</p>
              <p className="text-[10px] text-muted-foreground">Em Andamento</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.certificates}</p>
              <p className="text-[10px] text-muted-foreground">Certificados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.hours}h</p>
              <p className="text-[10px] text-muted-foreground">Estudadas</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-4">
          <div className="flex bg-muted rounded-xl p-1">
            <button onClick={() => setActiveTab("cursos")} className={cn("flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "cursos" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
              <BookOpen className="w-4 h-4" /> Cursos
            </button>
            <button onClick={() => setActiveTab("certificados")} className={cn("flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "certificados" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
              <Trophy className="w-4 h-4" /> Certificados
            </button>
          </div>
        </div>

        <div className="flex-1  px-4 pb-24 space-y-3 ">
          {activeTab === "cursos" && courses.map((course) => (
            <div key={course.id} className={cn("app-card", course.locked && "opacity-60")}>
              <div className="flex items-start gap-3">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", course.progress === 100 ? "bg-green-100 text-green-600" : course.progress > 0 ? "bg-blue-100 text-blue-600" : "bg-muted text-muted-foreground")}>
                  {course.locked ? <Lock className="w-6 h-6" /> : course.progress === 100 ? <CheckCircle className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">{course.description}</p>
                    </div>
                    {course.certificate && <Award className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                    <span>{course.lessons} aulas</span>
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{course.category}</span>
                  </div>
                  {course.progress > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium text-foreground">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all", course.progress === 100 ? "bg-green-500" : "bg-primary")} style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  )}
                  <Button size="sm" className={cn("w-full mt-3 text-xs h-8", course.progress === 100 && "bg-green-600 hover:bg-green-700")} disabled={course.locked} onClick={() => toast.info(course.locked ? "Curso bloqueado" : course.progress === 100 ? "Curso concluído!" : "Iniciando curso...")}>
                    {course.locked ? <><Lock className="w-3 h-3 mr-1" /> Bloqueado</> : course.progress === 100 ? <><CheckCircle className="w-3 h-3 mr-1" /> Concluído</> : course.progress > 0 ? <><Play className="w-3 h-3 mr-1" /> Continuar</> : <><Play className="w-3 h-3 mr-1" /> Iniciar</>}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {activeTab === "certificados" && (
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="app-card">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground">Emitido em {cert.date}</p>
                      <p className="text-xs text-green-600 font-medium">Válido até {cert.valid}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.info("Download", { description: "Baixando certificado..." })}>
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
              {certificates.length === 0 && (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Nenhum certificado ainda</p>
                  <p className="text-xs text-muted-foreground">Complete cursos para ganhar certificados</p>
                </div>
              )}
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
