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
      <div 
        className="relative bg-background overflow-hidden"
        style={{
          width: '375px',
          height: '812px',
          borderRadius: '44px',
          boxShadow: '0 0 0 12px #262626, 0 0 0 14px #4d4d4d, 0 25px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* Notch */}
        {showNotch && (
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#262626] z-[100]"
            style={{
              width: '150px',
              height: '34px',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
            }}
          >
            <div 
              className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#404040] rounded-full"
              style={{ width: '60px', height: '6px' }}
            />
          </div>
        )}
        
        {/* Content Area - This is where scroll happens */}
        <div 
          className="h-full w-full overflow-y-auto overflow-x-hidden"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
        
        {/* Home Indicator */}
        {showHomeIndicator && (
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#666] rounded-full z-[100] pointer-events-none"
            style={{ width: '134px', height: '5px' }}
          />
        )}
      </div>
    </div>
  );
}
