import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="w-full h-full overflow-y-auto animate-in">
          {children}
        </div>
      </div>
    </div>
  );
}
