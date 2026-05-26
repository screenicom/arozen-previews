import React from 'react';
import { TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BottomTabs } from '../components/BottomTabs';
import { TabKey } from '../types';
interface HomeScreenProps {
  onTabChange: (tab: TabKey) => void;
  onConnectDevice: () => void;
}
export function HomeScreen({ onTabChange, onConnectDevice }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#FFF9E8] via-[#ECF2D5] to-[#D2E3BD] relative">
      {/* Header */}
      <div className="px-6 pt-14 pb-3">
        <h1 className="text-[26px] font-medium text-gray-900 font-heading leading-tight">
          Welcome back
        </h1>
        <p className="text-gray-500 text-sm font-body mt-1">
          Create your perfect atmosphere.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4 phone-scroll">
        {/* Set up your diffuser */}
        <motion.button
          whileTap={{
            scale: 0.99
          }}
          onClick={onConnectDevice}
          className="relative w-full bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden text-left flex items-stretch min-h-[210px]">
          
          <div className="flex-1 pl-6 pr-2 py-6 flex flex-col justify-between relative z-10">
            <div>
              <h2 className="text-[19px] font-medium text-gray-900 font-heading tracking-tight leading-tight">
                Set up your
                <br />
                diffuser.
              </h2>
              <p className="text-sm text-gray-500 font-body mt-2 max-w-[150px] leading-snug">
                Be in control of your scent from anywhere.
              </p>
            </div>
            <span className="inline-flex self-start items-center bg-arozen-green text-white font-medium text-sm py-2.5 px-5 rounded-full font-body whitespace-nowrap">
              Connect my device
            </span>
          </div>
          {/* Diffuser image with halo */}
          <div className="relative w-[45%] flex-shrink-0 flex items-center justify-center">
            <div
              className="absolute w-40 h-40 rounded-full pointer-events-none"
              style={{
                background:
                'radial-gradient(circle, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0) 70%)'
              }} />
            
            <img
              src={`${import.meta.env.BASE_URL}eon-transp.png`}
              alt="Arozen diffuser"
              className="relative h-44 w-auto object-contain z-10" />
            
          </div>
        </motion.button>

        {/* Subscribe */}
        <motion.a
          whileTap={{
            scale: 0.99
          }}
          href="https://arozen.com.au"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md min-h-[180px]">
          
          {/* Background image */}
          <img
            src={`${import.meta.env.BASE_URL}A7BD2579-5F3F-4B0D-82DA-9D397AFAC565-LR.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-90" />
          
          {/* Left fade so the headline stays legible */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
              'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0) 65%)'
            }} />
          
          {/* Content */}
          <div className="relative z-10 p-6 max-w-[62%]">
            <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center mb-4">
              <TagIcon className="w-4 h-4 text-arozen-gold" strokeWidth={1.5} />
            </div>
            <h2 className="text-[19px] font-medium text-gray-900 font-heading tracking-tight leading-tight">
              Subscribe and
              <br />
              save up to 30%
            </h2>
            <p className="text-sm text-gray-500 font-body mt-2 leading-snug">
              Enjoy your favourite scents, delivered to you.
            </p>
          </div>
        </motion.a>
      </div>

      <BottomTabs active="home" onSelect={onTabChange} />
    </div>);

}