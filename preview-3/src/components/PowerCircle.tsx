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
    <div className="flex justify-center items-center py-8">
      <motion.button
        whileTap={
        disabled ?
        {} :
        {
          scale: 0.9
        }
        }
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        animate={{
          boxShadow:
          isOn && !disabled ?
          [
          '0 0 0px 0px rgba(124, 154, 142, 0)',
          '0 0 40px 10px rgba(124, 154, 142, 0.3)',
          '0 0 0px 0px rgba(124, 154, 142, 0)'] :

          'none'
        }}
        transition={{
          duration: 2,
          repeat: isOn ? Infinity : 0,
          ease: 'easeInOut'
        }}
        className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-colors duration-500 ${disabled ? 'bg-aaa-charcoal cursor-not-allowed' : isOn ? 'bg-aaa-sage shadow-lg shadow-aaa-sage/40' : 'bg-aaa-charcoal-light shadow-inner shadow-black/30'}`}>
        
        {/* Inner ring for depth */}
        <div
          className={`absolute inset-2 rounded-full border-2 ${isOn ? 'border-aaa-sage-light/30' : 'border-white/10'}`} />
        
        <PowerIcon
          className={`w-16 h-16 transition-colors duration-500 ${disabled ? 'text-aaa-cream/20' : isOn ? 'text-white' : 'text-aaa-cream/40'}`}
          strokeWidth={2.5} />
        
      </motion.button>
    </div>);

}