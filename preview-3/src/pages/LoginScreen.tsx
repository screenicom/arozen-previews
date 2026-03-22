import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WindIcon } from 'lucide-react';
interface LoginScreenProps {
  onLogin: () => void;
}
export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal px-6 pt-16 pb-8 overflow-y-auto phone-scroll">
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 bg-aaa-sage/20 rounded-full flex items-center justify-center mb-4">
          <WindIcon className="w-8 h-8 text-aaa-sage" />
        </div>
        <h1 className="text-2xl font-bold text-aaa-cream font-heading">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-aaa-cream/60 text-sm mt-2 text-center font-body">
          {isLogin ?
          'Enter your details to access your diffusers.' :
          'Sign up to start controlling your Arozen devices.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        {!isLogin &&
        <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
                First Name
              </label>
              <input
              type="text"
              className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream placeholder-aaa-cream/30 font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent transition-shadow"
              placeholder="Jane" />
            
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
                Last Name
              </label>
              <input
              type="text"
              className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream placeholder-aaa-cream/30 font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent transition-shadow"
              placeholder="Doe" />
            
            </div>
          </div>
        }

        <div>
          <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
            Email
          </label>
          <input
            type="text"
            className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream placeholder-aaa-cream/30 font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent transition-shadow"
            placeholder="jane@example.com" />
          
        </div>

        <div>
          <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream placeholder-aaa-cream/30 font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent transition-shadow"
            placeholder="••••••••" />
          
        </div>

        {!isLogin &&
        <div>
            <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
              Re-enter Password
            </label>
            <input
            type="password"
            className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream placeholder-aaa-cream/30 font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent transition-shadow"
            placeholder="••••••••" />
          
          </div>
        }

        {isLogin &&
        <div className="flex justify-end">
            <button
            type="button"
            className="text-sm text-aaa-sage font-medium font-body">
            
              Forgot password?
            </button>
          </div>
        }

        <div className="pt-6 mt-auto">
          <motion.button
            whileTap={{
              scale: 0.98
            }}
            type="submit"
            className="w-full bg-aaa-sage text-white font-semibold py-4 rounded-xl shadow-lg shadow-aaa-sage/20 font-body">
            
            {isLogin ? 'Log In' : 'Create Account'}
          </motion.button>

          <div className="mt-6 text-center">
            <span className="text-aaa-cream/50 text-sm font-body">
              {isLogin ?
              "Don't have an account? " :
              'Already have an account? '}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-aaa-sage font-semibold text-sm font-body">
              
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </form>
    </div>);

}