import React from 'react';
import { motion } from 'framer-motion';
interface VerticalLiquidLevelProps {
  level: number;
  muted?: boolean;
  label?: string;
}
/**
 * Vertical oil-level gauge — visually paired with the BatteryIndicator.
 * Bordered capsule with rounded top/bottom and an internal fill that
 * grows upward from the bottom.
 */
export function VerticalLiquidLevel({
  level,
  muted = false,
  label = 'Oil'
}: VerticalLiquidLevelProps) {
  const safeLevel = Math.max(0, Math.min(100, level));
  const isLow = safeLevel <= 20;
  const fillColor = muted ?
  'bg-gray-300' :
  isLow ?
  'bg-arozen-danger' :
  'bg-arozen-gold';
  const labelColor = muted ?
  'text-gray-400' :
  isLow ?
  'text-arozen-danger' :
  'text-arozen-gold';
  const borderColor = muted ?
  'border-gray-300' :
  isLow ?
  'border-arozen-danger/60' :
  'border-arozen-gold/60';
  const displayLevel = muted ? 100 : safeLevel;
  return (
    <div className="flex flex-col items-start">
      <span
        className={`text-[9px] uppercase tracking-[0.3em] font-medium font-body mb-3 ${labelColor}`}>
        
        {label}
      </span>
      <div
        className={`relative border ${borderColor} overflow-hidden flex items-end`}
        style={{
          width: 13,
          height: 128,
          borderRadius: 6,
          padding: '0 2px 4px 2px'
        }}>
        
        <motion.div
          initial={{
            height: 0
          }}
          animate={{
            height: `${displayLevel}%`
          }}
          transition={{
            duration: 1.1,
            ease: 'easeOut'
          }}
          className={`w-full rounded-[1.5px] ${fillColor}`} />
        
      </div>
    </div>);

}