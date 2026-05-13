import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="flex flex-col h-full bg-white px-6 pt-24 pb-8 overflow-y-auto phone-scroll">
      <div className="flex flex-col items-center mb-10">
        <img
          src={`${import.meta.env.BASE_URL}Black_png_-_medium.png`}
          alt="Arozen"
          className="w-40 mb-6" />
        
        <h1 className="text-2xl font-medium text-gray-900 font-heading">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-gray-500 text-sm mt-2 text-center font-body">
          {isLogin ?
          'Enter your details to access your diffusers.' :
          'Sign up to start controlling your Arozen devices.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        {!isLogin &&
        <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
                First Name
              </label>
              <input
              type="text"
              className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
              placeholder="Jane" />
            
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
                Last Name
              </label>
              <input
              type="text"
              className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
              placeholder="Doe" />
            
            </div>
          </div>
        }

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
            Email
          </label>
          <input
            type="text"
            className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
            placeholder="jane@example.com" />
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
            placeholder="••••••••" />
          
        </div>

        {!isLogin &&
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 font-body">
              Re-enter Password
            </label>
            <input
            type="password"
            className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow"
            placeholder="••••••••" />
          
          </div>
        }

        {isLogin &&
        <div className="flex justify-end">
            <button
            type="button"
            className="text-sm text-arozen-gold font-medium font-body">
            
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
            className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl shadow-lg shadow-black/20 font-body">
            
            {isLogin ? 'Log In' : 'Create Account'}
          </motion.button>

          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm font-body">
              {isLogin ?
              "Don't have an account? " :
              'Already have an account? '}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-arozen-gold font-medium text-sm font-body">
              
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </form>
    </div>);

}