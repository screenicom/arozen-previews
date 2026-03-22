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
const SLIDES = [
{
  id: 1,
  title: 'Effortless Scenting',
  description:
  'Control your Arozen diffusers from anywhere. Adjust settings with a simple tap.',
  icon: SmartphoneIcon
},
{
  id: 2,
  title: 'Smart Scheduling',
  description:
  'Set it and forget it. Create automated schedules that fit perfectly into your daily routine.',
  icon: CalendarClockIcon
},
{
  id: 3,
  title: 'Complete Control',
  description:
  'Fine-tune misting frequency and duration to create your ideal atmosphere.',
  icon: SlidersHorizontalIcon
}];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNext = () => {
    if (currentSlide === SLIDES.length - 1) {
      onComplete();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal relative">
      <button
        onClick={onComplete}
        className="absolute top-12 right-6 text-aaa-cream/50 font-medium text-sm z-10 font-body">
        
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
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
            
            <div className="w-48 h-48 bg-aaa-sage/20 rounded-full flex items-center justify-center mb-10">
              {createElement(SLIDES[currentSlide].icon, {
                className: 'w-24 h-24 text-aaa-sage',
                strokeWidth: 1.5
              })}
            </div>
            <h2 className="text-2xl font-bold text-aaa-cream mb-4 font-heading">
              {SLIDES[currentSlide].title}
            </h2>
            <p className="text-aaa-cream/60 leading-relaxed font-body">
              {SLIDES[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12 pt-4">
        <div className="flex justify-center space-x-2 mb-8">
          {SLIDES.map((_, idx) =>
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-aaa-sage' : 'w-2 bg-white/20'}`} />

          )}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-aaa-sage text-white font-semibold py-4 rounded-xl shadow-lg shadow-aaa-sage/20 active:scale-[0.98] transition-transform font-body">
          
          {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>);

}