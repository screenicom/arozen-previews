import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, CheckIcon } from 'lucide-react';
interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
  onComplete: () => void;
}
type Step = 'email' | 'code' | 'password' | 'success';
export function ForgotPasswordScreen({
  onBackToLogin,
  onComplete
}: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [codeError, setCodeError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (step === 'code') {
      codeRefs.current[0]?.focus();
    }
  }, [step]);
  const handleBack = () => {
    if (step === 'email') onBackToLogin();else
    if (step === 'code') setStep('email');else
    if (step === 'password') setStep('code');else
    onBackToLogin();
  };
  /* --- Email step --- */
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid) return;
    setStep('code');
  };
  /* --- Code step --- */
  const codeComplete = code.every((c) => c.length === 1);
  const handleCodeChange = (idx: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    setCodeError('');
    if (digit && idx < 5) {
      codeRefs.current[idx + 1]?.focus();
    }
  };
  const handleCodeKeyDown = (
  idx: number,
  e: React.KeyboardEvent<HTMLInputElement>) =>
  {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      codeRefs.current[idx - 1]?.focus();
    }
  };
  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.
    getData('text').
    replace(/\D/g, '').
    slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(next);
    const lastFilled = Math.min(pasted.length, 6) - 1;
    codeRefs.current[lastFilled]?.focus();
  };
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeComplete) return;
    // Demo validation: accept any 6-digit code except "000000"
    if (code.join('') === '000000') {
      setCodeError('That code doesn\u2019t look right. Try again.');
      return;
    }
    setStep('password');
  };
  /* --- Password step --- */
  const canUpdate = newPassword.length > 0 && confirmPassword.length > 0;
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canUpdate) return;
    onComplete();
  };
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#E4F1DD] via-[#F8F0DA] to-[#D8E9C9] px-6 pt-14 pb-8 overflow-y-auto phone-scroll relative">
      {step !== 'success' &&
      <button
        onClick={handleBack}
        className="self-start -ml-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Back">
        
          <ChevronLeftIcon className="w-6 h-6" strokeWidth={1.5} />
        </button>
      }

      <div className="flex flex-col items-center mt-2 mb-8">
        <img
          src={`${import.meta.env.BASE_URL}Black_png_-_medium.png`}
          alt="Arozen"
          className="w-32 mb-6" />
        
      </div>

      <AnimatePresence mode="wait">
        {step === 'email' &&
        <motion.form
          key="email"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          transition={{
            duration: 0.2
          }}
          onSubmit={handleEmailSubmit}
          className="flex-1 flex flex-col">
          
            <h1 className="text-2xl font-medium text-gray-900 font-heading text-center">
              Reset your password
            </h1>
            <p className="text-gray-500 text-sm mt-2 text-center font-body mb-8">
              Enter the email address associated with your account and
              we&rsquo;ll send you a verification code.
            </p>

            <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
              Email
            </label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
            placeholder="jane@example.com"
            autoFocus />
          

            <div className="pt-6 mt-auto">
              <motion.button
              whileTap={
              emailValid ?
              {
                scale: 0.98
              } :
              undefined
              }
              type="submit"
              disabled={!emailValid}
              className={`w-full font-medium py-4 rounded-xl font-body transition-colors ${emailValid ? 'bg-arozen-black text-white' : 'bg-white/50 text-gray-400 cursor-not-allowed'}`}>
              
                Send code
              </motion.button>
              <button
              type="button"
              onClick={onBackToLogin}
              className="w-full mt-4 text-center text-arozen-gold font-medium text-sm font-body">
              
                Back to log in
              </button>
            </div>
          </motion.form>
        }

        {step === 'code' &&
        <motion.form
          key="code"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          transition={{
            duration: 0.2
          }}
          onSubmit={handleCodeSubmit}
          className="flex-1 flex flex-col">
          
            <h1 className="text-2xl font-medium text-gray-900 font-heading text-center">
              Check your email
            </h1>
            <p className="text-gray-500 text-sm mt-2 text-center font-body mb-8">
              We sent a 6-digit code to
              <br />
              <span className="text-gray-900 font-medium">{email}</span>
            </p>

            <div className="flex justify-between gap-2 mb-2">
              {code.map((digit, i) =>
            <input
              key={i}
              ref={(el) => codeRefs.current[i] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(i, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(i, e)}
              onPaste={handleCodePaste}
              className={`w-12 h-14 text-center bg-white/60 backdrop-blur-md border rounded-xl text-xl font-medium text-gray-900 font-heading focus:outline-none focus:ring-2 focus:ring-arozen-gold transition-shadow ${codeError ? 'border-arozen-danger/40' : 'border-white/20 focus:border-transparent'}`} />

            )}
            </div>

            {codeError &&
          <p className="text-xs text-arozen-danger font-body mt-2">
                {codeError}
              </p>
          }

            <button
            type="button"
            onClick={() => {
              setCode(['', '', '', '', '', '']);
              setCodeError('');
              codeRefs.current[0]?.focus();
            }}
            className="self-start text-sm text-arozen-gold font-medium font-body mt-4">
            
              Resend code
            </button>

            <div className="pt-6 mt-auto">
              <motion.button
              whileTap={
              codeComplete ?
              {
                scale: 0.98
              } :
              undefined
              }
              type="submit"
              disabled={!codeComplete}
              className={`w-full font-medium py-4 rounded-xl font-body transition-colors ${codeComplete ? 'bg-arozen-black text-white' : 'bg-white/50 text-gray-400 cursor-not-allowed'}`}>
              
                Verify
              </motion.button>
            </div>
          </motion.form>
        }

        {step === 'password' &&
        <motion.form
          key="password"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          transition={{
            duration: 0.2
          }}
          onSubmit={handlePasswordSubmit}
          className="flex-1 flex flex-col">
          
            <h1 className="text-2xl font-medium text-gray-900 font-heading text-center">
              Set a new password
            </h1>
            <p className="text-gray-500 text-sm mt-2 text-center font-body mb-8">
              Choose a password you haven&rsquo;t used before. At least 8
              characters.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
                  New Password
                </label>
                <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-white/60 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
                autoFocus />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
                  Confirm New Password
                </label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-white/60 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
              
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <motion.button
              whileTap={
              canUpdate ?
              {
                scale: 0.98
              } :
              undefined
              }
              type="submit"
              disabled={!canUpdate}
              className={`w-full font-medium py-4 rounded-xl font-body transition-colors ${canUpdate ? 'bg-arozen-black text-white' : 'bg-white/50 text-gray-400 cursor-not-allowed'}`}>
              
                Update password
              </motion.button>
            </div>
          </motion.form>
        }

        {step === 'success' &&
        <motion.div
          key="success"
          initial={{
            opacity: 0,
            scale: 0.97
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.25
          }}
          className="flex-1 flex flex-col items-center justify-center text-center">
          
            <div className="w-20 h-20 rounded-full bg-arozen-green/10 flex items-center justify-center mb-6">
              <CheckIcon
              className="w-9 h-9 text-arozen-green"
              strokeWidth={2} />
            
            </div>
            <h1 className="text-2xl font-medium text-gray-900 font-heading">
              Password updated
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-body max-w-xs">
              You can now log in with your new password.
            </p>

            <div className="pt-10 w-full">
              <motion.button
              whileTap={{
                scale: 0.98
              }}
              onClick={onComplete}
              className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl font-body">
              
                Back to log in
              </motion.button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}