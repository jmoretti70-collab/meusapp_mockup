import { useLocation } from "wouter";
import { Home, Truck, Store, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Início" },
  { path: "/fretes", icon: Truck, label: "Fretes" },
  { path: "/ia", icon: Sparkles, label: "LogIA", special: true },
  { path: "/produtos", icon: Store, label: "Loja" },
  { path: "/profile", icon: User, label: "Perfil" },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav 
      className="absolute bottom-0 left-0 right-0 bg-card border-t border-border/50 flex items-center justify-around px-2 z-[90]"
      style={{
        height: '80px',
        paddingBottom: '20px',
        background: 'linear-gradient(to top, var(--card) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path || 
          (item.path === "/profile" && location.startsWith("/profile")) ||
          (item.path === "/fretes" && (location.startsWith("/fretes") || location === "/historico" || location === "/calculadora"));
        
        if (item.special) {
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className="relative -mt-6 flex flex-col items-center"
              aria-label={item.label}
            >
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-br from-secondary to-secondary/80 scale-110" 
                  : "bg-gradient-to-br from-primary to-primary/80 hover:scale-105"
              )}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className={cn(
                "text-[10px] font-medium mt-1 block text-center transition-colors",
                isActive ? "text-secondary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        }
        
        return (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
              isActive && "bg-primary/10"
            )}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className={cn(
              "w-6 h-6 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-[10px] transition-colors",
              isActive ? "text-primary font-semibold" : "text-muted-foreground font-medium"
            )}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
