import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  trend,
  trendValue,
  variant = "default",
  size = "md",
  className,
  onClick,
}: StatCardProps) {
  const variants = {
    default: "bg-card border border-border/50",
    primary: "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground",
    secondary: "bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground",
    success: "bg-gradient-to-br from-green-500 to-green-600 text-white",
    warning: "bg-gradient-to-br from-amber-500 to-amber-600 text-white",
  };

  const sizes = {
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  };

  const valueSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl shadow-sm transition-all",
        variants[variant],
        sizes[size],
        onClick && "cursor-pointer hover:shadow-md active:scale-[0.98]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn(
            "text-xs font-medium uppercase tracking-wide mb-1",
            variant === "default" ? "text-muted-foreground" : "opacity-80"
          )}>
            {label}
          </p>
          <p className={cn("font-bold", valueSizes[size])}>
            {value}
          </p>
          {subValue && (
            <p className={cn(
              "text-xs mt-1",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}>
              {subValue}
            </p>
          )}
          {trend && trendValue && (
            <p className={cn("text-xs mt-1 font-medium", trendColors[trend])}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"}
              {" "}{trendValue}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            variant === "default" ? "bg-primary/10 text-primary" : "bg-white/20"
          )}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
