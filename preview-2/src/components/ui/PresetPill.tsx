import React from 'react';
import { motion } from 'framer-motion';
interface PresetPillProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}
export function PresetPill({
  label,
  selected,
  onSelect,
  disabled = false
}: PresetPillProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{
        scale: 0.93
      }}
      className={`
        relative px-4 py-2 rounded-full text-sm font-medium font-body
        transition-colors duration-200 whitespace-nowrap flex-shrink-0
        ${disabled ? 'opacity-40 cursor-default' : 'cursor-pointer'}
        ${selected ? 'bg-aaa-sage text-aaa-charcoal' : 'bg-transparent text-aaa-cream/70 border border-aaa-cream/20'}
      `}
      disabled={disabled}>
      
      {selected &&
      <motion.span
        layoutId="pill-bg"
        className="absolute inset-0 rounded-full bg-aaa-sage"
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }} />

      }
      <span className={`relative z-10 ${selected ? 'text-aaa-charcoal' : ''}`}>
        {label}
      </span>
    </motion.button>);

}