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
import MinhaEscola from "./pages/MinhaEscola";
import MinhaSaude from "./pages/MinhaSaude";
import MinhaRede from "./pages/MinhaRede";
import MeusSeguros from "./pages/MeusSeguros";

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
      <Route path="/escola" component={MinhaEscola} />
      <Route path="/saude" component={MinhaSaude} />
      <Route path="/rede" component={MinhaRede} />
      <Route path="/seguros" component={MeusSeguros} />
      <Route path="/demo" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
