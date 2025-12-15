import { LucideIcon } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  iconBgColor?: string;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
  disabled?: boolean;
}

export default function ModuleCard({
  icon: Icon,
  title,
  description,
  path,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  badge,
  badgeColor = "bg-secondary text-white",
  disabled = false,
}: ModuleCardProps) {
  const [, setLocation] = useLocation();

  return (
    <button
      onClick={() => !disabled && setLocation(path)}
      disabled={disabled}
      className={cn(
        "module-card w-full text-left relative",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      aria-label={title}
    >
      {badge && (
        <span className={cn(
          "absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-[9px] font-bold",
          badgeColor
        )}>
          {badge}
        </span>
      )}
      <div className={cn("module-icon", iconBgColor)}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      <div className="text-sm font-bold text-foreground">{title}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{description}</div>
    </button>
  );
}
