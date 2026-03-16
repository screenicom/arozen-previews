import React from 'react';
import { motion } from 'framer-motion';
import { PowerIcon } from 'lucide-react';
interface PowerButtonProps {
  isOn: boolean;
  onToggle: () => void;
  size?: number;
}
export function PowerButton({ isOn, onToggle, size = 120 }: PowerButtonProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size + 40,
        height: size + 40
      }}>
      
      {/* Outer glow ring */}
      <AnimatedGlow isOn={isOn} size={size} />

      {/* Button */}
      <motion.button
        onClick={onToggle}
        whileTap={{
          scale: 0.92
        }}
        className="relative z-10 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          width: size,
          height: size
        }}
        aria-label={isOn ? 'Turn off diffuser' : 'Turn on diffuser'}>
        
        {/* Background circle */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: isOn ?
            'radial-gradient(circle at 40% 35%, #9AB5A8 0%, #7C9A8E 50%, #5A7A6E 100%)' :
            'radial-gradient(circle at 40% 35%, #3A3A54 0%, #252540 50%, #1A1A2E 100%)',
            boxShadow: isOn ?
            '0 0 40px rgba(124,154,142,0.4), inset 0 2px 4px rgba(255,255,255,0.15)' :
            '0 0 20px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.05)'
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut'
          }} />
        

        {/* Inner ring detail */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: size - 16,
            height: size - 16
          }}
          animate={{
            borderColor: isOn ?
            'rgba(245,240,235,0.2)' :
            'rgba(245,240,235,0.06)'
          }}
          transition={{
            duration: 0.4
          }} />
        

        {/* Icon */}
        <motion.div
          animate={{
            color: isOn ? '#F5F0EB' : 'rgba(245,240,235,0.3)'
          }}
          transition={{
            duration: 0.3
          }}>
          
          <PowerIcon size={size * 0.3} strokeWidth={2} />
        </motion.div>
      </motion.button>
    </div>);

}
function AnimatedGlow({ isOn, size }: {isOn: boolean;size: number;}) {
  return (
    <>
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size + 30,
          height: size + 30
        }}
        animate={{
          boxShadow: isOn ?
          '0 0 60px rgba(124,154,142,0.25), 0 0 120px rgba(124,154,142,0.1)' :
          '0 0 0px rgba(0,0,0,0)',
          background: isOn ?
          'radial-gradient(circle, rgba(124,154,142,0.08) 0%, transparent 70%)' :
          'transparent'
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut'
        }} />
      
      {isOn &&
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size + 50,
          height: size + 50
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.15, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          width: size + 50,
          height: size + 50,
          background:
          'radial-gradient(circle, rgba(124,154,142,0.1) 0%, transparent 70%)'
        }} />

      }
    </>);

}