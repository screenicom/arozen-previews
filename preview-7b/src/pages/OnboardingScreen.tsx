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
  lightText?: boolean;
  whiteWash?: boolean;
};
const SLIDES: Slide[] = [
{
  id: 1,
  title: 'More Than a Scent',
  description:
  'Every space has a feeling. Arozen turns it into a memory worth keeping.',
  image: '2026-09-02/ALT2_B2B.png',
  lightText: true
},
{
  id: 2,
  title: 'Smart Scheduling',
  description: 'Effortless scheduling, every day.',
  image: 'onboarding-smart-scheduling.png',
  whiteWash: true
},
{
  id: 3,
  title: 'Home & Business Scenting',
  description:
  'One system, styled for any space — from your living room to your storefront.',
  image: '2026-09-02/ALT2_Effortless-Scenting_ORIGINAL_IMG_9530.png',
  lightText: true
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
  const lightText = !isAuthSlide && Boolean(SLIDES[currentSlide].lightText);
  const whiteWash = !isAuthSlide && Boolean(SLIDES[currentSlide].whiteWash);
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
            backgroundImage: `url('${import.meta.env.BASE_URL}${backgroundImage.split('/').map(encodeURIComponent).join('/')}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        
      </AnimatePresence>

      {whiteWash &&
      <>
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/90 via-white/50 to-transparent pointer-events-none z-[1]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none z-[1]" />
        </>
      }

      {!isAuthSlide &&
      <button
        onClick={() => setCurrentSlide(SLIDES.length)}
        className={`absolute top-12 right-6 font-medium text-sm z-10 font-body ${lightText ? 'text-white' : 'text-gray-900'}`}>
        
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
                <h2 className={`text-2xl font-medium mb-4 font-heading ${lightText ? 'text-white' : 'text-gray-900'}`}>
                  {SLIDES[currentSlide].title}
                </h2>
                <p
                  className={`leading-relaxed font-body ${lightText ? 'text-white' : 'text-gray-700'}`}>
                  
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
