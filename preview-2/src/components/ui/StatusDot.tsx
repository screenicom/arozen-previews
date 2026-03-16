import React from 'react';
import { motion } from 'framer-motion';
interface StatusDotProps {
  status: 'on' | 'off' | 'connecting';
  size?: 'sm' | 'md';
}
export function StatusDot({ status, size = 'sm' }: StatusDotProps) {
  const sizeClass = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';
  const colorMap = {
    on: 'bg-aaa-sage',
    off: 'bg-gray-500',
    connecting: 'bg-aaa-gold'
  };
  return (
    <span className="relative inline-flex items-center justify-center">
      <span className={`${sizeClass} rounded-full ${colorMap[status]}`} />
      {status === 'on' &&
      <motion.span
        className={`absolute ${sizeClass} rounded-full bg-aaa-sage`}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />

      }
      {status === 'connecting' &&
      <motion.span
        className={`absolute ${sizeClass} rounded-full bg-aaa-gold`}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />

      }
    </span>);

}