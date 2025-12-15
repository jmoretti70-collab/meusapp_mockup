import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  showNotch?: boolean;
  showHomeIndicator?: boolean;
}

export default function PhoneFrame({ 
  children, 
  showNotch = true,
  showHomeIndicator = true 
}: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="phone-frame">
        {showNotch && <div className="notch" />}
        <div className="flex-1 overflow-hidden relative animate-in">
          {children}
        </div>
        {showHomeIndicator && <div className="home-indicator" />}
      </div>
    </div>
  );
}
