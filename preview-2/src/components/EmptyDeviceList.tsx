import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
interface EmptyDeviceListProps {
  onAddDiffuser: () => void;
}
export function EmptyDeviceList({ onAddDiffuser }: EmptyDeviceListProps) {
  return (
    <div className="w-full h-full bg-aaa-charcoal flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 pb-4 flex items-center justify-between">
        <div>
          <p className="font-body text-xs tracking-[0.15em] text-aaa-gold/60 uppercase mb-1">
            Arozen
          </p>
          <h1 className="font-heading text-2xl text-aaa-cream font-medium">
            My Diffusers
          </h1>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 0.6
          }}
          className="flex flex-col items-center text-center">
          
          {/* Diffuser illustration (CSS-drawn) */}
          <motion.div
            className="relative mb-8"
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}>
            
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
              {/* Diffuser body */}
              <ellipse
                cx="50"
                cy="110"
                rx="28"
                ry="6"
                fill="rgba(124,154,142,0.1)" />
              
              <path
                d="M35 50 C35 30, 65 30, 65 50 L62 100 C62 104, 38 104, 38 100 Z"
                fill="#252540"
                stroke="rgba(124,154,142,0.3)"
                strokeWidth="1.5" />
              
              {/* Diffuser top */}
              <ellipse
                cx="50"
                cy="50"
                rx="15"
                ry="4"
                fill="#252540"
                stroke="rgba(124,154,142,0.3)"
                strokeWidth="1.5" />
              
              <circle cx="50" cy="48" r="3" fill="rgba(124,154,142,0.2)" />
              {/* Mist wisps */}
              <motion.path
                d="M46 42 Q44 30, 48 20"
                stroke="rgba(124,154,142,0.2)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }} />
              
              <motion.path
                d="M50 40 Q52 28, 50 16"
                stroke="rgba(124,154,142,0.15)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  y: [0, -4, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }} />
              
              <motion.path
                d="M54 42 Q56 32, 53 22"
                stroke="rgba(124,154,142,0.2)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }} />
              
            </svg>
          </motion.div>

          <h2 className="font-heading text-xl text-aaa-cream/80 mb-2">
            No diffusers yet
          </h2>
          <p className="font-body text-sm text-aaa-cream/40 mb-10 max-w-[240px] leading-relaxed">
            Add your first diffuser to start creating the perfect atmosphere
          </p>

          <motion.button
            onClick={onAddDiffuser}
            whileTap={{
              scale: 0.96
            }}
            className="flex items-center gap-2.5 bg-aaa-sage text-aaa-charcoal font-body font-semibold text-sm px-8 py-3.5 rounded-full cursor-pointer"
            style={{
              boxShadow: '0 4px 20px rgba(124,154,142,0.3)'
            }}>
            
            <PlusIcon size={18} strokeWidth={2.5} />
            Add Diffuser
          </motion.button>
        </motion.div>
      </div>
    </div>);

}