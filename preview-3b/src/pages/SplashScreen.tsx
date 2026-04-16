import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="flex flex-col items-center justify-center h-full bg-black">
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
        
        <img
          src={`${import.meta.env.BASE_URL}White_png_-_medium.png`}
          alt="Arozen"
          className="w-56 mb-6" />
        
        <div className="text-arozen-gold mt-3 font-medium tracking-widest text-xs uppercase font-body text-center leading-relaxed">
          <p>Luxury Scenting</p>
          <p>For Your Home & Business</p>
        </div>
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
        
        <div className="w-6 h-6 border-2 border-arozen-gold/30 border-t-arozen-gold rounded-full animate-spin" />
      </motion.div>
    </div>);

}