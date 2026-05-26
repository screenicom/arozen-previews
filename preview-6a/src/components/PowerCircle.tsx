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
  // Flat colors
  const onBg = '#84A86A';
  const offBg = '#E5E7EB';
  const disabledBg = '#F3F4F6';
  const bgColor = disabled ? disabledBg : isOn ? onBg : offBg;
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
        className={`relative w-[76px] h-[76px] rounded-full flex items-center justify-center transition-all duration-300 ${disabled ? 'cursor-not-allowed' : ''}`}
        style={{
          backgroundColor: bgColor
        }}
        aria-label={isOn ? 'Turn off' : 'Turn on'}>
        
        <PowerIcon
          className={`relative w-8 h-8 transition-colors duration-300 ${disabled ? 'text-gray-400' : isOn ? 'text-white' : 'text-gray-500'}`}
          strokeWidth={2} />
        
      </motion.button>
    </div>);

}