import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  WifiIcon,
  CheckIcon,
  XIcon,
  AlertCircleIcon } from
'lucide-react';
interface PairingFlowProps {
  onComplete: (name: string) => void;
  onCancel: () => void;
}
type PairingStep = 'prepare' | 'searching' | 'connected' | 'error';
export function PairingFlow({ onComplete, onCancel }: PairingFlowProps) {
  const [step, setStep] = useState<PairingStep>('prepare');
  const [deviceName, setDeviceName] = useState('My Diffuser');
  const stepIndex = step === 'prepare' ? 0 : step === 'searching' ? 1 : 2;
  useEffect(() => {
    if (step === 'searching') {
      // Simulate search — 70% success, 30% fail for demo
      const timer = setTimeout(() => {
        setStep(Math.random() > 0.3 ? 'connected' : 'error');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  const handleRetry = () => {
    setStep('searching');
  };
  return (
    <div className="w-full h-full bg-aaa-charcoal flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 pb-4 flex items-center gap-4">
        <motion.button
          onClick={onCancel}
          whileTap={{
            scale: 0.9
          }}
          className="w-9 h-9 rounded-full bg-aaa-cream/5 flex items-center justify-center cursor-pointer"
          aria-label="Go back">
          
          <ArrowLeftIcon size={18} className="text-aaa-cream/60" />
        </motion.button>
        <h1 className="font-heading text-lg text-aaa-cream font-medium">
          Add Diffuser
        </h1>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pb-6">
        {[0, 1, 2].map((i) =>
        <motion.div
          key={i}
          className="rounded-full"
          animate={{
            width: i === stepIndex ? 24 : 8,
            height: 8,
            backgroundColor:
            i <= stepIndex ? '#7C9A8E' : 'rgba(245,240,235,0.1)'
          }}
          transition={{
            duration: 0.3
          }} />

        )}
      </div>

      {/* Step content */}
      <div className="flex-1 px-6 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 'prepare' &&
          <motion.div
            key="prepare"
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -30
            }}
            transition={{
              duration: 0.3
            }}
            className="flex-1 flex flex-col">
            
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                {/* Diffuser illustration */}
                <div className="mb-8 relative">
                  <div className="w-24 h-24 rounded-full bg-aaa-sage/10 flex items-center justify-center">
                    <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                      <path
                      d="M14 20 C14 10, 26 10, 26 20 L24.5 42 C24.5 44, 15.5 44, 15.5 42 Z"
                      fill="#252540"
                      stroke="#7C9A8E"
                      strokeWidth="1.5" />
                    
                      <ellipse
                      cx="20"
                      cy="20"
                      rx="6"
                      ry="2"
                      fill="#252540"
                      stroke="#7C9A8E"
                      strokeWidth="1.5" />
                    
                    </svg>
                  </div>
                  <motion.div
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-aaa-gold/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}>
                  
                    <WifiIcon size={14} className="text-aaa-gold" />
                  </motion.div>
                </div>

                <h2 className="font-heading text-xl text-aaa-cream mb-3">
                  Prepare Your Diffuser
                </h2>
                <div className="space-y-3 mb-8">
                  <StepInstruction
                  number={1}
                  text="Turn on your Arozen diffuser" />
                
                  <StepInstruction
                  number={2}
                  text="Hold the button for 3 seconds until the light blinks" />
                
                  <StepInstruction number={3} text="Keep the diffuser nearby" />
                </div>
              </div>

              <motion.button
              onClick={() => setStep('searching')}
              whileTap={{
                scale: 0.97
              }}
              className="w-full bg-aaa-sage text-aaa-charcoal font-body font-semibold text-sm py-3.5 rounded-full mb-8 cursor-pointer"
              style={{
                boxShadow: '0 4px 20px rgba(124,154,142,0.3)'
              }}>
              
                Next
              </motion.button>
            </motion.div>
          }

          {step === 'searching' &&
          <motion.div
            key="searching"
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -30
            }}
            transition={{
              duration: 0.3
            }}
            className="flex-1 flex flex-col items-center justify-center text-center">
            
              {/* Pulsing search animation */}
              <div className="relative mb-10 w-40 h-40 flex items-center justify-center">
                {[0, 1, 2].map((i) =>
              <motion.div
                key={i}
                className="absolute rounded-full border border-aaa-sage/30"
                style={{
                  width: 60,
                  height: 60
                }}
                animate={{
                  scale: [0.5, 2.5],
                  opacity: [0.6, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: 'easeOut'
                }} />

              )}
                <div className="w-14 h-14 rounded-full bg-aaa-sage/15 flex items-center justify-center z-10">
                  <WifiIcon size={24} className="text-aaa-sage" />
                </div>
              </div>

              <h2 className="font-heading text-xl text-aaa-cream mb-2">
                Searching…
              </h2>
              <p className="font-body text-sm text-aaa-cream/40 mb-8">
                Looking for nearby diffusers
              </p>

              <button
              onClick={onCancel}
              className="font-body text-sm text-aaa-cream/30 underline underline-offset-4 cursor-pointer">
              
                Cancel
              </button>
            </motion.div>
          }

          {step === 'connected' &&
          <motion.div
            key="connected"
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -30
            }}
            transition={{
              duration: 0.3
            }}
            className="flex-1 flex flex-col">
            
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                {/* Diffuser image with success badge */}
                <motion.div
                className="relative mb-6"
                initial={{
                  scale: 0.8,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1
                }}>
                
                  <img
                  src="/EonProV2_-_transp.png"
                  alt="Arozen Diffuser"
                  className="w-28 h-auto object-contain" />
                
                  <motion.div
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-aaa-sage flex items-center justify-center"
                  initial={{
                    scale: 0
                  }}
                  animate={{
                    scale: 1
                  }}
                  transition={{
                    delay: 0.4,
                    type: 'spring',
                    stiffness: 500
                  }}
                  style={{
                    boxShadow: '0 2px 8px rgba(124,154,142,0.4)'
                  }}>
                  
                    <CheckIcon
                    size={16}
                    className="text-aaa-charcoal"
                    strokeWidth={3} />
                  
                  </motion.div>
                </motion.div>

                <h2 className="font-heading text-xl text-aaa-cream mb-2">
                  Diffuser Found!
                </h2>
                <p className="font-body text-sm text-aaa-cream/40 mb-8">
                  Give your diffuser a name
                </p>

                <div className="w-full max-w-[260px]">
                  <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full bg-aaa-cream/5 border border-aaa-cream/10 rounded-xl px-4 py-3 text-center font-body text-sm text-aaa-cream placeholder-aaa-cream/20 outline-none focus:border-aaa-sage/40 transition-colors"
                  placeholder="e.g. Living Room"
                  maxLength={24} />
                
                </div>
              </div>

              <motion.button
              onClick={() => onComplete(deviceName || 'My Diffuser')}
              whileTap={{
                scale: 0.97
              }}
              className="w-full bg-aaa-sage text-aaa-charcoal font-body font-semibold text-sm py-3.5 rounded-full mb-8 cursor-pointer"
              style={{
                boxShadow: '0 4px 20px rgba(124,154,142,0.3)'
              }}>
              
                Done
              </motion.button>
            </motion.div>
          }

          {step === 'error' &&
          <motion.div
            key="error"
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -30
            }}
            transition={{
              duration: 0.3
            }}
            className="flex-1 flex flex-col items-center justify-center text-center">
            
              <motion.div
              className="w-20 h-20 rounded-full bg-aaa-danger/10 flex items-center justify-center mb-6"
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}>
              
                <XIcon size={32} className="text-aaa-danger" strokeWidth={2} />
              </motion.div>

              <h2 className="font-heading text-xl text-aaa-cream mb-2">
                Unable to Find Diffuser
              </h2>
              <p className="font-body text-sm text-aaa-cream/40 mb-8 max-w-[260px] leading-relaxed">
                Make sure your diffuser is powered on and in pairing mode, then
                try again
              </p>

              <div className="flex flex-col gap-3 w-full max-w-[260px]">
                <motion.button
                onClick={handleRetry}
                whileTap={{
                  scale: 0.97
                }}
                className="w-full bg-aaa-sage text-aaa-charcoal font-body font-semibold text-sm py-3.5 rounded-full cursor-pointer">
                
                  Retry
                </motion.button>
                <button
                onClick={onCancel}
                className="w-full font-body text-sm text-aaa-cream/40 py-3 cursor-pointer">
                
                  Go Back
                </button>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}
function StepInstruction({ number, text }: {number: number;text: string;}) {
  return (
    <div className="flex items-center gap-3 text-left">
      <span className="w-7 h-7 rounded-full bg-aaa-sage/10 flex items-center justify-center flex-shrink-0">
        <span className="font-body text-xs font-semibold text-aaa-sage">
          {number}
        </span>
      </span>
      <span className="font-body text-sm text-aaa-cream/60">{text}</span>
    </div>);

}