import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
interface SplashScreenProps {
  onComplete: () => void;
}
export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  const particles = useMemo(() => {
    return Array.from(
      {
        length: 20
      },
      (_, i) => ({
        id: i,
        x: Math.random() * 300 + 45,
        y: Math.random() * 700 + 70,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 3
      })
    );
  }, []);
  return (
    <motion.div
      className="relative w-full h-full bg-aaa-charcoal flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      onClick={onComplete}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.5
      }}>
      
      {/* Background ambient particles */}
      {particles.map((p) =>
      <motion.div
        key={p.id}
        className="absolute rounded-full"
        style={{
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          background:
          'radial-gradient(circle, rgba(124,154,142,0.3) 0%, transparent 70%)'
        }}
        animate={{
          y: [0, -80, -160],
          opacity: [0, 0.5, 0],
          scale: [1, 1.5, 0.5]
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: 'easeOut'
        }} />

      )}

      {/* Soft radial glow behind logo */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background:
          'radial-gradient(circle, rgba(124,154,142,0.08) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
      

      {/* Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{
          y: 20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeOut'
        }}>
        
        {/* Arozen Logo Mark */}
        <motion.div
          className="mb-6 flex items-center gap-1"
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}>
          
          <svg width="80" height="48" viewBox="0 0 80 48" fill="none">
            {/* Stylized triple-A mark */}
            <path
              d="M12 44L24 4L36 44"
              stroke="#7C9A8E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none" />
            
            <path
              d="M16 32H32"
              stroke="#7C9A8E"
              strokeWidth="2"
              strokeLinecap="round" />
            
            <path
              d="M28 44L40 4L52 44"
              stroke="#C4A87C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none" />
            
            <path
              d="M32 32H48"
              stroke="#C4A87C"
              strokeWidth="2"
              strokeLinecap="round" />
            
            <path
              d="M44 44L56 4L68 44"
              stroke="#7C9A8E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none" />
            
            <path
              d="M48 32H64"
              stroke="#7C9A8E"
              strokeWidth="2"
              strokeLinecap="round" />
            
          </svg>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="font-heading text-4xl tracking-[0.3em] text-aaa-cream font-medium"
          initial={{
            opacity: 0,
            letterSpacing: '0.5em'
          }}
          animate={{
            opacity: 1,
            letterSpacing: '0.3em'
          }}
          transition={{
            delay: 0.8,
            duration: 1,
            ease: 'easeOut'
          }}>
          
          AROZEN
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="w-12 h-px bg-aaa-gold/40 my-4"
          initial={{
            scaleX: 0
          }}
          animate={{
            scaleX: 1
          }}
          transition={{
            delay: 1.2,
            duration: 0.6,
            ease: 'easeOut'
          }} />
        

        {/* Tagline */}
        <motion.p
          className="font-body text-sm tracking-[0.2em] text-aaa-cream/50 uppercase"
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 1.5,
            duration: 0.8,
            ease: 'easeOut'
          }}>
          
          Elevate Your Space
        </motion.p>
      </motion.div>

      {/* Tap hint */}
      <motion.p
        className="absolute bottom-20 font-body text-xs text-aaa-cream/25 tracking-wider"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 2.5,
          duration: 0.8
        }}>
        
        Tap to continue
      </motion.p>
    </motion.div>);

}