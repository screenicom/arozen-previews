import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface MistEffectProps {
  active: boolean;
  intensity?: 'low' | 'medium' | 'high';
}
export function MistEffect({ active, intensity = 'medium' }: MistEffectProps) {
  const particleCount =
  intensity === 'low' ? 6 : intensity === 'medium' ? 10 : 16;
  const particles = useMemo(() => {
    return Array.from(
      {
        length: particleCount
      },
      (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        delay: Math.random() * 3,
        duration: 2.5 + Math.random() * 2,
        size: 3 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 40
      })
    );
  }, [particleCount]);
  return (
    <AnimatePresence>
      {active &&
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) =>
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(50% + ${p.x}px)`,
            bottom: '20%',
            background:
            'radial-gradient(circle, rgba(124,154,142,0.5) 0%, rgba(124,154,142,0) 70%)'
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
            scale: 1
          }}
          animate={{
            y: [0, -60, -130],
            x: [0, p.drift * 0.5, p.drift],
            opacity: [0, 0.6, 0],
            scale: [1, 1.3, 0.4]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5
            }
          }} />

        )}
          {/* Soft glow base */}
          <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[15%] w-24 h-8 rounded-full"
          style={{
            background:
            'radial-gradient(ellipse, rgba(124,154,142,0.15) 0%, transparent 70%)'
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          exit={{
            opacity: 0
          }} />
        
        </div>
      }
    </AnimatePresence>);

}