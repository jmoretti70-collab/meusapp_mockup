import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MeuScore from "./pages/MeuScore";
import MeusFretes from "./pages/MeusFretes";
import MeuFinanceiro from "./pages/MeuFinanceiro";
import MeusProdutos from "./pages/MeusProdutos";
import MeusServicos from "./pages/MeusServicos";
import MinhaIA from "./pages/MinhaIA";
import Tutorial from "./pages/Tutorial";
import Cadastro from "./pages/Cadastro";
import CalculadoraFrete from "./pages/CalculadoraFrete";
import HistoricoFretes from "./pages/HistoricoFretes";
import FreteChat from "./pages/FreteChat";
import PainelAnalise from "./pages/PainelAnalise";
import RastreamentoGPS from "./pages/RastreamentoGPS";
import AvaliarFrete from "./pages/AvaliarFrete";
import ClimaRota from "./pages/ClimaRota";
import MinhaEscola from "./pages/MinhaEscola";
import MinhaSaude from "./pages/MinhaSaude";
import MinhaRede from "./pages/MinhaRede";
import MeusSeguros from "./pages/MeusSeguros";
import SistemaIndicacao from "./pages/SistemaIndicacao";
import MeusDados from "./pages/MeusDados";
import MeusVeiculos from "./pages/MeusVeiculos";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/score" component={MeuScore} />
      <Route path="/fretes" component={MeusFretes} />
      <Route path="/financeiro" component={MeuFinanceiro} />
      <Route path="/produtos" component={MeusProdutos} />
      <Route path="/servicos" component={MeusServicos} />
      <Route path="/ia" component={MinhaIA} />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/calculadora" component={CalculadoraFrete} />
      <Route path="/historico" component={HistoricoFretes} />
      <Route path="/fretes/:id/chat" component={FreteChat} />
      <Route path="/analise" component={PainelAnalise} />
      <Route path="/rastreamento/:id" component={RastreamentoGPS} />
      <Route path="/avaliar/:id" component={AvaliarFrete} />
      <Route path="/clima" component={ClimaRota} />
      <Route path="/escola" component={MinhaEscola} />
      <Route path="/saude" component={MinhaSaude} />
      <Route path="/rede" component={MinhaRede} />
      <Route path="/seguros" component={MeusSeguros} />
      <Route path="/indicacao" component={SistemaIndicacao} />
      <Route path="/meus-dados" component={MeusDados} />
      <Route path="/meus-veiculos" component={MeusVeiculos} />
      <Route path="/demo" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
