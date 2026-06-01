import React from 'react';
import { PowerIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface PowerCircleProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}
export function PowerCircle({
  isOn,
  onToggle,
  disabled = false
}: PowerCircleProps) {
  // Color tokens — On state has stronger 3D
  const onOuter = '#C9DAB6';
  const onInner1 = '#3F5530';
  const onInner2 = '#2E3F22';
  // Off state — flatter, subtler 3D (neutral monochrome)
  const offOuter = '#E5E5E5';
  const offInner1 = '#F2F2F2';
  const offInner2 = '#DFDFDF';
  const disabledOuter = '#ECECEC';
  const disabledInner1 = '#F2F2F2';
  const disabledInner2 = '#E2E2E2';
  const ringColor = disabled ? disabledOuter : isOn ? onOuter : offOuter;
  const innerTop = disabled ? disabledInner1 : isOn ? onInner1 : offInner1;
  const innerBottom = disabled ? disabledInner2 : isOn ? onInner2 : offInner2;
  // Inner shadow / rim — softer when off
  const innerShadow = disabled ?
  'inset 0 -1px 2px rgba(0,0,0,0.04)' :
  isOn ?
  'inset 0 -1.5px 3px rgba(0,0,0,0.10)' :
  'inset 0 -1px 2px rgba(0,0,0,0.05)';
  // Drop shadow — bigger and warmer when on, lighter when off
  const dropShadow = disabled ?
  '0 3px 8px rgba(0,0,0,0.06)' :
  isOn ?
  '0 10px 24px rgba(60,90,40,0.28), 0 2px 4px rgba(60,90,40,0.16)' :
  '0 3px 10px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.05)';
  return (
    <div className="flex justify-center items-center py-0">
      <motion.button
        whileTap={
        disabled ?
        {} :
        {
          scale: 0.94
        }
        }
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        className={`relative w-[76px] h-[76px] rounded-full flex items-center justify-center transition-all duration-500 ${disabled ? 'cursor-not-allowed' : ''}`}
        style={{
          backgroundColor: ringColor,
          padding: 5,
          boxShadow: dropShadow
        }}
        aria-label={isOn ? 'Turn off' : 'Turn on'}>
        
        {/* Inner button face — gradient for 3D feel */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: `linear-gradient(180deg, ${innerTop} 0%, ${innerBottom} 100%)`,
            boxShadow: innerShadow
          }}>
          
          <PowerIcon
            className={`relative w-6 h-6 transition-colors duration-500 ${disabled ? 'text-gray-400/70' : isOn ? 'text-white' : 'text-gray-500'}`}
            strokeWidth={2.5} />
          
        </div>
      </motion.button>
    </div>);

}