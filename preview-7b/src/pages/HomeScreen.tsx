import React from 'react';
import { motion } from 'framer-motion';
import { BottomTabs } from '../components/BottomTabs';
import { TabKey } from '../types';
interface HomeScreenProps {
  onTabChange: (tab: TabKey) => void;
  onConnectDevice: () => void;
}
export function HomeScreen({ onTabChange, onConnectDevice }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full wall-bg relative">
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
          className="relative flex w-full flex-col items-start rounded-3xl overflow-hidden text-left min-h-[210px]">
          
          <img
            src={`${import.meta.env.BASE_URL}2026-09-22/${encodeURIComponent('banner-1b.png')}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-right" />
          
          <div className="relative z-10 pl-6 pr-2 py-6 max-w-[58%]">
            <h2 className="text-[19px] font-semibold text-gray-900 font-heading tracking-tight leading-tight">
              Set up your
              <br />
              diffuser
            </h2>
            <p className="text-sm text-gray-800 font-body mt-2 max-w-[150px] leading-snug">
              Be in control of your scent from anywhere.
            </p>
            <span className="inline-flex self-start items-center bg-arozen-black text-white font-medium text-sm mt-4 py-2.5 px-5 rounded-full shadow-sm shadow-black/20 font-body whitespace-nowrap">
              Connect my device
            </span>
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
          className="relative block w-full rounded-3xl overflow-hidden min-h-[180px]">
          
          <img
            src={`${import.meta.env.BASE_URL}2026-09-22/${encodeURIComponent('banner-2b.jpg')}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-right" />
          
          <div className="relative z-10 px-6 py-6 max-w-[62%]">
            <h2 className="text-[19px] font-semibold text-white font-heading tracking-tight leading-tight">
              Subscribe and
              <br />
              save up to 30%
            </h2>
            <p className="text-sm text-white font-body mt-2 leading-snug">
              Enjoy your favourite
              <br />
              scents, delivered
              <br />
              to you.
            </p>
          </div>
        </motion.a>
      </div>

      <BottomTabs active="home" onSelect={onTabChange} />
    </div>);

}