import React, { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SmartphoneIcon,
  CalendarClockIcon,
  SlidersHorizontalIcon } from
'lucide-react';
interface OnboardingScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
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
  image: `${import.meta.env.BASE_URL}F93EBFD6-3848-4EBB-80D4-6895633CF230-LR-2.jpg`

},
{
  id: 2,
  title: 'Smart Scheduling',
  description:
  'Set it and forget it. Create automated schedules that fit perfectly into your daily routine.',
  icon: CalendarClockIcon,
  image: `${import.meta.env.BASE_URL}A7BD2579-5F3F-4B0D-82DA-9D397AFAC565-LR.jpg`

},
{
  id: 3,
  title: 'Complete Control',
  description:
  'Fine-tune misting frequency and duration to create your ideal atmosphere.',
  icon: SlidersHorizontalIcon,
  image: `${import.meta.env.BASE_URL}002A3776-LR.jpg`

}];

// Total step count: 3 intro slides + 1 auth choice slide
const TOTAL_STEPS = SLIDES.length + 1;
export function OnboardingScreen({
  onCreateAccount,
  onLogin
}: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAuthSlide = currentSlide === SLIDES.length;
  const isLastIntroSlide = currentSlide === SLIDES.length - 1;
  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };
  return (
    <div className="flex flex-col h-full bg-arozen-grey relative">
      {!isAuthSlide &&
      <button
        onClick={() => setCurrentSlide(SLIDES.length)}
        className="absolute top-12 right-6 text-gray-400 font-medium text-sm z-10 font-body">
        
          Skip
        </button>
      }

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
            
            {isAuthSlide ?
            // Auth choice slide — empty stage (image placeholder)
            <div className="w-full" /> :

            <>
                <div className="w-60 h-60 bg-arozen-gold/10 rounded-full flex items-center justify-center mb-10 overflow-hidden">
                  {SLIDES[currentSlide].image ?
                <img
                  src={SLIDES[currentSlide].image}
                  alt={SLIDES[currentSlide].title}
                  className="w-full h-full object-cover" /> :


                createElement(SLIDES[currentSlide].icon, {
                  className: 'w-24 h-24 text-arozen-gold',
                  strokeWidth: 1.5
                })
                }
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4 font-heading">
                  {SLIDES[currentSlide].title}
                </h2>
                <p className="text-gray-500 leading-relaxed font-body">
                  {SLIDES[currentSlide].description}
                </p>
              </>
            }
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12 pt-4">
        {!isAuthSlide &&
        <div className="flex justify-center space-x-2 mb-8">
            {SLIDES.map((_, idx) =>
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-arozen-gold' : 'w-2 bg-gray-200'}`} />

          )}
          </div>
        }

        {isAuthSlide ?
        <AnimatePresence mode="wait">
            <motion.div
            key="auth-buttons"
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
            }}>
            
              <button
              onClick={onCreateAccount}
              className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl shadow-lg shadow-black/20 active:scale-[0.98] transition-transform font-body">
              
                Create Account
              </button>
              <button
              onClick={onLogin}
              className="w-full bg-white text-gray-900 font-medium py-4 rounded-xl mt-3 active:scale-[0.98] transition-transform font-body border border-gray-200">
              
                Log In
              </button>
            </motion.div>
          </AnimatePresence> :

        <button
          onClick={handleNext}
          className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl shadow-lg shadow-black/20 active:scale-[0.98] transition-transform font-body">
          
            {isLastIntroSlide ? 'Get Started' : 'Next'}
          </button>
        }
      </div>
    </div>);

}