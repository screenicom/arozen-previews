import React from 'react';
import { DropletIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface LiquidLevelProps {
  level: number;
}
export function LiquidLevel({ level }: LiquidLevelProps) {
  const isLow = level <= 20;
  return (
    <div className="bg-aaa-charcoal-light rounded-2xl p-4 shadow-md shadow-black/20 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-aaa-cream font-medium font-body">
          <DropletIcon className="w-5 h-5 text-aaa-sage" />
          <span>Liquid Level</span>
        </div>
        <span
          className={`font-semibold font-body ${isLow ? 'text-aaa-danger' : 'text-aaa-sage'}`}>
          
          {level}%
        </span>
      </div>

      <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden relative">
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
          className={`absolute top-0 left-0 h-full rounded-full ${isLow ? 'bg-aaa-danger' : 'bg-aaa-sage'}`} />
        
      </div>

      {isLow &&
      <p className="text-xs text-aaa-danger mt-2 font-body">
          Liquid level is low. Please refill soon.
        </p>
      }
    </div>);

}