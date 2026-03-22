import React, { Fragment } from 'react';
import { CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}
export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full px-4">
      {Array.from({
        length: totalSteps
      }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        return (
          <Fragment key={stepNumber}>
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                  isCompleted || isCurrent ? '#7C9A8E' : '#252540',
                  borderColor:
                  isCompleted || isCurrent ?
                  '#7C9A8E' :
                  'rgba(255,255,255,0.1)',
                  scale: isCurrent ? 1.1 : 1
                }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300">
                
                {isCompleted ?
                <CheckIcon className="w-4 h-4 text-white" /> :

                <span
                  className={`text-xs font-semibold font-body ${isCurrent ? 'text-white' : 'text-aaa-cream/40'}`}>
                  
                    {stepNumber}
                  </span>
                }
              </motion.div>
            </div>

            {stepNumber < totalSteps &&
            <div className="flex-1 h-0.5 mx-1 bg-white/10 relative">
                <motion.div
                initial={{
                  width: '0%'
                }}
                animate={{
                  width: isCompleted ? '100%' : '0%'
                }}
                className="absolute top-0 left-0 h-full bg-aaa-sage"
                transition={{
                  duration: 0.3
                }} />
              
              </div>
            }
          </Fragment>);

      })}
    </div>);

}