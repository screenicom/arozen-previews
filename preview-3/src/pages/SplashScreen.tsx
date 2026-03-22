import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { WindIcon } from 'lucide-react';
interface SplashScreenProps {
  onComplete: () => void;
}
export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <div className="flex flex-col items-center justify-center h-full bg-aaa-charcoal">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className="flex flex-col items-center">
        
        <div className="w-24 h-24 bg-aaa-sage/20 rounded-full flex items-center justify-center mb-6">
          <WindIcon className="w-12 h-12 text-aaa-sage" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-aaa-cream tracking-tight font-heading">
          AROZEN
        </h1>
        <p className="text-aaa-gold mt-2 font-medium tracking-widest text-sm uppercase font-body">
          Scent Control
        </p>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1,
          duration: 0.5
        }}
        className="absolute bottom-16">
        
        <div className="w-6 h-6 border-2 border-aaa-sage/30 border-t-aaa-sage rounded-full animate-spin" />
      </motion.div>
    </div>);

}