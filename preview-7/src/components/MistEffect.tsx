import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface MistEffectProps {
  active: boolean;
  intensity?: 'low' | 'medium' | 'high';
}
export function MistEffect({ active, intensity = 'medium' }: MistEffectProps) {
  const particleCount =
  intensity === 'low' ? 8 : intensity === 'medium' ? 14 : 22;
  // useMemo so particle positions stay stable across re-renders
  const particles = useMemo(() => {
    return Array.from(
      {
        length: particleCount
      },
      (_, i) => ({
        id: i,
        x: Math.random() * 220 - 110,
        delay: Math.random() * 3,
        duration: 2.8 + Math.random() * 2.5,
        size: 4 + Math.random() * 7,
        drift: (Math.random() - 0.5) * 90
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
            bottom: '78%',
            background:
            'radial-gradient(circle, rgba(181,152,105,0.6) 0%, rgba(181,152,105,0) 70%)'
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
            scale: 1
          }}
          animate={{
            y: [0, -70, -150],
            x: [0, p.drift * 0.5, p.drift],
            opacity: [0, 0.7, 0],
            scale: [1, 1.5, 0.4]
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

          {/* Soft golden glow at the mist source */}
          <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-40 h-10 rounded-full"
          style={{
            bottom: '76%',
            background:
            'radial-gradient(ellipse, rgba(181,152,105,0.22) 0%, transparent 70%)'
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: [0.4, 0.75, 0.4]
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