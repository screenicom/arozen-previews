import React from 'react';
import { motion } from 'framer-motion';
interface BatteryIndicatorProps {
  level: number;
  muted?: boolean;
  label?: string;
  size?: 'lg' | 'sm';
  showLabel?: boolean;
  showPercent?: boolean;
}
/**
 * Recognizable horizontal battery glyph.
 * - "lg" — used on the device control hero, with tracked-caps label above
 * - "sm" — used in the device list, inline with a percentage
 */
export function BatteryIndicator({
  level,
  muted = false,
  label = 'Battery',
  size = 'lg',
  showLabel = true,
  showPercent = false
}: BatteryIndicatorProps) {
  const safeLevel = Math.max(0, Math.min(100, level));
  const isLow = safeLevel <= 20;
  const fillColor = muted ?
  'bg-gray-300' :
  isLow ?
  'bg-arozen-danger' :
  'bg-arozen-gold';
  const accentText = muted ?
  'text-gray-400' :
  isLow ?
  'text-arozen-danger' :
  'text-arozen-gold';
  const borderColor = muted ?
  'border-gray-300' :
  isLow ?
  'border-arozen-danger/60' :
  'border-arozen-gold/60';
  if (size === 'sm') {
    // Compact inline version for device list
    return (
      <div
        className="inline-flex items-center gap-1.5"
        aria-label={`Battery ${safeLevel}%`}>
        
        <BatteryGlyph
          level={safeLevel}
          width={20}
          height={10}
          radius={2}
          padding={1.5}
          fillColor={fillColor}
          borderColor={borderColor} />
        
        {showPercent &&
        <span
          className={`text-[11px] font-medium font-body ${muted ? 'text-gray-400' : 'text-gray-500'}`}>
          
            {safeLevel}%
          </span>
        }
      </div>);

  }
  // Large version — device control hero
  const displayLevel = muted ? 100 : safeLevel;
  return (
    <div
      className="flex flex-col items-end"
      aria-label={`Battery ${safeLevel}%`}>
      
      {showLabel &&
      <span
        className={`text-[9px] uppercase tracking-[0.3em] font-medium font-body mb-3 ${accentText}`}>
        
          {label}
        </span>
      }
      <BatteryGlyph
        level={displayLevel}
        width={28}
        height={13}
        radius={2.5}
        padding={2}
        fillColor={fillColor}
        borderColor={borderColor} />
      
    </div>);

}
interface GlyphProps {
  level: number;
  width: number;
  height: number;
  radius: number;
  padding: number;
  fillColor: string;
  borderColor: string;
}
function BatteryGlyph({
  level,
  width,
  height,
  radius,
  padding,
  fillColor,
  borderColor
}: GlyphProps) {
  const nubHeight = Math.max(4, height * 0.5);
  const nubWidth = Math.max(2, height * 0.18);
  return (
    <div className="flex items-center">
      {/* Body */}
      <div
        className={`relative border ${borderColor} overflow-hidden`}
        style={{
          width,
          height,
          borderRadius: radius,
          padding
        }}>
        
        <motion.div
          initial={{
            width: 0
          }}
          animate={{
            width: `${level}%`
          }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
          className={`h-full rounded-[1px] ${fillColor}`} />
        
      </div>
      {/* Nub */}
      <div
        className={`border ${borderColor} border-l-0`}
        style={{
          width: nubWidth,
          height: nubHeight,
          borderTopRightRadius: 1,
          borderBottomRightRadius: 1
        }} />
      
    </div>);

}