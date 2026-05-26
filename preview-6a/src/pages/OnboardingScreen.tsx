import React, { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SmartphoneIcon,
  CalendarClockIcon,
  SlidersHorizontalIcon } from
'lucide-react';
interface OnboardingScreenProps {
  onComplete: () => void;
}
type Slide = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
};
const SLIDES: Slide[] = [
{
  id: 1,
  title: 'Effortless Scenting',
  description:
  'Control your Arozen diffusers from anywhere. Adjust settings with a simple tap.',
  icon: SmartphoneIcon,
  image: 'F93EBFD6-3848-4EBB-80D4-6895633CF230-LR-2.jpg'

},
{
  id: 2,
  title: 'Smart Scheduling',
  description:
  'Set it and forget it. Create automated schedules that fit perfectly into your daily routine.',
  icon: CalendarClockIcon,
  image: 'A7BD2579-5F3F-4B0D-82DA-9D397AFAC565-LR.jpg'

},
{
  id: 3,
  title: 'Complete Control',
  description:
  'Fine-tune misting frequency and duration to create your ideal atmosphere.',
  icon: SlidersHorizontalIcon,
  image: '002A3776-LR.jpg'

}];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    if (currentStep < SLIDES.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  const isLastStep = currentStep === SLIDES.length - 1;
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#E4F1DD] via-[#F8F0DA] to-[#D8E9C9] relative">
      {/* Skip link */}
      {!isLastStep &&
      <div className="absolute top-14 right-6 z-20">
          <button
          onClick={onComplete}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors font-body">
          
            Skip
          </button>
        </div>
      }
      <div className="flex-1 relative overflow-hidden flex items-center justify-center px-8 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              x: 50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -50
            }}
            transition={{
              duration: 0.3
            }}
            className="flex flex-col items-center text-center w-full">
            
            <div className="w-60 h-60 bg-arozen-gold/10 rounded-full flex items-center justify-center mb-10 overflow-hidden">
              {SLIDES[currentStep].image ?
              <img
                src={`${import.meta.env.BASE_URL}${SLIDES[currentStep].image}`}
                alt={SLIDES[currentStep].title}
                className="w-full h-full object-cover" /> :


              createElement(SLIDES[currentStep].icon, {
                className: 'w-24 h-24 text-arozen-gold',
                strokeWidth: 1.5
              })
              }
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4 font-heading">
              {SLIDES[currentStep].title}
            </h2>
            <p className="text-gray-500 leading-relaxed font-body">
              {SLIDES[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {SLIDES.map((_, i) =>
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-arozen-gold' : 'w-1.5 bg-gray-300'}`} />

            )}
          </div>
          <button
            onClick={nextStep}
            className="bg-arozen-black text-white px-8 py-3.5 rounded-xl font-medium active:scale-95 transition-transform font-body">
            
            {currentStep === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>);

}