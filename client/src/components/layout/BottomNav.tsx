import { useLocation } from "wouter";
import { Home, Truck, Store, User } from "lucide-react";

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Início" },
    { path: "/fretes", icon: Truck, label: "Fretes" },
    { path: "/produtos", icon: Store, label: "Loja" },
    { path: "/profile", icon: User, label: "Meu" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-card border-t border-border flex items-center justify-around px-4 pb-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        
        return (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
