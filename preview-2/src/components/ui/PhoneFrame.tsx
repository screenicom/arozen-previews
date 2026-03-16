import React from 'react';
interface PhoneFrameProps {
  children: React.ReactNode;
}
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: 390,
        height: 844
      }}>
      
      {/* Outer bezel */}
      <div
        className="absolute inset-0 rounded-[52px] bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A]"
        style={{
          boxShadow:
          '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'
        }} />
      

      {/* Screen area */}
      <div className="absolute inset-[4px] rounded-[48px] overflow-hidden bg-aaa-charcoal">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-3 pointer-events-none">
          <div className="w-[126px] h-[34px] bg-black rounded-full" />
        </div>

        {/* Screen content */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden phone-scroll">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center pb-2 pointer-events-none">
          <div className="w-[134px] h-[5px] bg-aaa-cream/20 rounded-full" />
        </div>
      </div>

      {/* Side buttons (visual only) */}
      <div className="absolute left-[-2px] top-[160px] w-[3px] h-[32px] bg-[#2A2A2A] rounded-l-sm" />
      <div className="absolute left-[-2px] top-[210px] w-[3px] h-[56px] bg-[#2A2A2A] rounded-l-sm" />
      <div className="absolute left-[-2px] top-[275px] w-[3px] h-[56px] bg-[#2A2A2A] rounded-l-sm" />
      <div className="absolute right-[-2px] top-[220px] w-[3px] h-[72px] bg-[#2A2A2A] rounded-l-sm" />
    </div>);

}