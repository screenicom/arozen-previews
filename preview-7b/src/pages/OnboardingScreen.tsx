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
  title: 'More Than a Scent',
  description:
  'Every space has a feeling.\nArozen turns it into a memory\nworth keeping.',
  image: '2026-09-19/2 - AZ_App_Screen2_MoreThanAScent_STEEL.png'
},
{
  id: 2,
  title: 'Smart Scheduling',
  description: 'Effortless scheduling, every day.',
  image: 'onboarding-smart-scheduling.png'
},
{
  id: 3,
  title: 'Home & Business\nScenting',
  description:
  'One system, styled for any space —\nfrom your living room\nto your storefront.',
  image: '2026-09-19/4 - AZ_App_Screen4_HomeAndBusiness.png'
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
            backgroundImage: `url('${import.meta.env.BASE_URL}${backgroundImage.split('/').map(encodeURIComponent).join('/')}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        
      </AnimatePresence>

      {!isAuthSlide &&
      <button
        onClick={() => setCurrentSlide(SLIDES.length)}
        className="absolute top-12 right-6 font-medium text-sm z-10 font-body text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
        
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
            
            {isAuthSlide ?
            <>
                <img
                  src={`${import.meta.env.BASE_URL}Black_png_-_medium.png`}
                  alt="Arozen"
                  className="w-48 mb-5" />
                
                <div className="text-arozen-gold font-medium tracking-[0.25em] text-[11px] uppercase font-body text-center leading-relaxed">
                  <p>Premium Scenting</p>
                </div>
              </> :

            <>
                <h2 className="text-2xl mb-4 font-heading font-semibold text-white whitespace-pre-line">
                  {SLIDES[currentSlide].title}
                </h2>
                <p className="leading-relaxed font-body font-medium text-white whitespace-pre-line">
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
