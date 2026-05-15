import React from 'react';
import { motion } from 'framer-motion';
interface SplashScreenProps {
  onComplete: () => void;
}
export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div
      className="flex flex-col h-full relative"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}002A3776-LR.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      
      {/* Logo + tagline — anchored in the upper empty area */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className="relative flex flex-col items-center pt-44">
        
        <img
          src={`${import.meta.env.BASE_URL}Black_png_-_medium.png`}
          alt="Arozen"
          className="w-48 mb-5" />
        
        <div className="text-arozen-gold font-medium tracking-[0.25em] text-[11px] uppercase font-body text-center leading-relaxed">
          <p>Luxury Scenting</p>
          <p>For Your Home & Business</p>
        </div>
      </motion.div>

      {/* Get Started button — unchanged position */}
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
          delay: 0.8,
          duration: 0.6,
          ease: 'easeOut'
        }}
        className="absolute bottom-16 inset-x-0 px-8">
        
        <button
          onClick={onComplete}
          className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl shadow-lg shadow-black/20 active:scale-[0.98] transition-transform font-body">
          
          Get Started
        </button>
      </motion.div>
    </div>);

}