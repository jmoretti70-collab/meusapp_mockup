import { ReactNode } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backPath?: string;
  rightContent?: ReactNode;
  variant?: "default" | "gradient" | "transparent";
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backPath,
  rightContent,
  variant = "default",
  className,
}: PageHeaderProps) {
  const [, setLocation] = useLocation();

  const variants = {
    default: "bg-primary text-primary-foreground",
    gradient: "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground",
    transparent: "bg-transparent text-foreground",
  };

  return (
    <header
      className={cn(
        "pt-14 pb-6 px-5 relative",
        variant !== "transparent" && "rounded-b-3xl shadow-lg",
        variants[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {backPath && (
            <button
              onClick={() => setLocation(backPath)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                variant === "transparent"
                  ? "bg-muted hover:bg-muted/80 text-foreground"
                  : "bg-white/20 hover:bg-white/30"
              )}
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && (
              <p className={cn(
                "text-sm mt-0.5",
                variant === "transparent" ? "text-muted-foreground" : "opacity-80"
              )}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
      </div>
    </header>
  );
}
