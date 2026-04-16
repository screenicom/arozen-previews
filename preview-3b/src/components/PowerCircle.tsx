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
          '0 0 0px 0px rgba(181, 152, 105, 0)',
          '0 0 40px 10px rgba(181, 152, 105, 0.3)',
          '0 0 0px 0px rgba(181, 152, 105, 0)'] :

          'none'
        }}
        transition={{
          duration: 2,
          repeat: isOn ? Infinity : 0,
          ease: 'easeInOut'
        }}
        className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-colors duration-500 ${disabled ? 'bg-arozen-dark/50 cursor-not-allowed' : isOn ? 'bg-arozen-gold shadow-lg shadow-arozen-gold/40' : 'bg-arozen-dark shadow-inner shadow-black/50'}`}>
        
        {/* Inner ring for depth */}
        <div
          className={`absolute inset-2 rounded-full border-2 ${isOn ? 'border-white/20' : 'border-white/5'}`} />
        
        <PowerIcon
          className={`w-16 h-16 transition-colors duration-500 ${disabled ? 'text-white/10' : isOn ? 'text-white' : 'text-white/40'}`}
          strokeWidth={2.5} />
        
      </motion.button>
    </div>);

}