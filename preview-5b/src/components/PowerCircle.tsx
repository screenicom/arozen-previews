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
  return (
    <div className="flex justify-center items-center py-0">
      <motion.button
        whileTap={
        disabled ?
        {} :
        {
          scale: 0.95
        }
        }
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        animate={{
          boxShadow:
          isOn && !disabled ?
          [
          '0 0 0px 0px rgba(132, 168, 106, 0)',
          '0 0 40px 10px rgba(132, 168, 106, 0.3)',
          '0 0 0px 0px rgba(132, 168, 106, 0)'] :

          '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}
        transition={{
          duration: 2.6,
          repeat: isOn ? Infinity : 0,
          ease: 'easeInOut'
        }}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-700 ${disabled ? 'cursor-not-allowed' : ''}`}
        style={{
          backgroundColor: disabled ? '#F1EFEA' : isOn ? '#84A86A' : '#F3F2EF',
          border: disabled ?
          '1px solid rgba(0,0,0,0.05)' :
          isOn ?
          '1px solid rgba(132,168,106,0.55)' :
          '1px solid rgba(0,0,0,0.08)'
        }}
        aria-label={isOn ? 'Turn off' : 'Turn on'}>
        
        {/* Inner concentric ring */}
        <div
          className={`absolute inset-[7px] rounded-full transition-colors duration-700 ${isOn ? 'border border-white/25' : 'border border-black/5'}`} />
        
        <PowerIcon
          className={`relative w-7 h-7 transition-colors duration-700 ${disabled ? 'text-gray-300' : isOn ? 'text-white' : 'text-gray-400'}`}
          strokeWidth={2.5} />
        
      </motion.button>
    </div>);

}