import { LucideIcon } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  path?: string;
  onClick?: () => void;
  iconBgColor?: string;
  iconColor?: string;
  badge?: number;
  comingSoon?: boolean;
}

export default function QuickAction({
  icon: Icon,
  label,
  path,
  onClick,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  badge,
  comingSoon = false,
}: QuickActionProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    if (comingSoon) {
      toast.info("Em breve!", {
        description: `${label} estará disponível em breve.`,
      });
      return;
    }
    if (onClick) {
      onClick();
    } else if (path) {
      setLocation(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 tap-highlight-none"
      aria-label={label}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center transition-all relative",
        "hover:shadow-md active:scale-95",
        iconBgColor
      )}>
        <Icon className={cn("w-6 h-6", iconColor)} />
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
        {comingSoon && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-muted text-muted-foreground text-[8px] font-bold rounded whitespace-nowrap">
            EM BREVE
          </span>
        )}
      </div>
      <span className="text-[10px] font-bold text-foreground text-center leading-tight max-w-[60px]">
        {label}
      </span>
    </button>
  );
}
