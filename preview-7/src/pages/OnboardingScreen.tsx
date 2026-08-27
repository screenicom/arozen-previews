import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface OnboardingScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}
type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
};
const SLIDES: Slide[] = [
{
  id: 1,
  title: 'Effortless Scenting',
  description:
  'Control your Arozen diffusers from anywhere. Adjust settings with a simple tap.',
  image: 'onboarding-effortless-scenting.png'
},
{
  id: 2,
  title: 'Smart Scheduling',
  description:
  'Set it and forget it. Create automated schedules that fit perfectly into your daily routine.',
  image: 'onboarding-smart-scheduling.png'
},
{
  id: 3,
  title: 'Complete Control',
  description:
  'Fine-tune misting frequency and duration to create your ideal atmosphere.',
  image: 'onboarding-complete-control.png'
}];

const AUTH_IMAGE = 'onboarding-login-hero.png';

// Total step count: 3 intro slides + 1 auth choice slide
const TOTAL_STEPS = SLIDES.length + 1;
export function OnboardingScreen({
  onCreateAccount,
  onLogin
}: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAuthSlide = currentSlide === SLIDES.length;
  const isLastIntroSlide = currentSlide === SLIDES.length - 1;
  const backgroundImage = isAuthSlide ?
  AUTH_IMAGE :
  SLIDES[currentSlide].image;
  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };
  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-arozen-grey">
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
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${import.meta.env.BASE_URL}${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        
      </AnimatePresence>

      {/* Top fade — keeps title, description, and Skip readable on pale photo areas */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/90 via-white/50 to-transparent pointer-events-none z-[1]" />

      {/* Bottom fade — keeps dots and buttons clear over busy photo areas */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none z-[1]" />

      {!isAuthSlide &&
      <button
        onClick={() => setCurrentSlide(SLIDES.length)}
        className="absolute top-12 right-6 text-gray-900 font-medium text-sm z-10 font-body">
        
          Skip
        </button>
      }

      <div className="relative z-[2] flex-1 flex flex-col items-center px-8 pt-[5.5rem]">
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
            
            {!isAuthSlide &&
            <>
                <h2 className="text-2xl font-medium text-gray-900 mb-4 font-heading">
                  {SLIDES[currentSlide].title}
                </h2>
                <p className="text-gray-700 leading-relaxed font-body">
                  {SLIDES[currentSlide].description}
                </p>
              </>
            }
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-[2] px-8 pb-12 pt-4">
        {!isAuthSlide &&
        <div className="flex justify-center space-x-2 mb-8">
            {SLIDES.map((_, idx) =>
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-arozen-gold' : 'w-2 bg-gray-400/70'}`} />

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
