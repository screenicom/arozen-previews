import React, { useEffect, useState, useRef } from 'react';
import { PlusIcon, MenuIcon, InfoIcon, LogOutIcon, XIcon } from 'lucide-react';
import { Device } from '../types';
import { DeviceCard } from '../components/DeviceCard';
import { motion, AnimatePresence } from 'framer-motion';
interface DeviceListScreenProps {
  devices: Device[];
  onDeviceSelect: (id: string) => void;
  onAddDevice: () => void;
  onOpenAppInfo: () => void;
  onLogout: () => void;
}
export function DeviceListScreen({
  devices,
  onDeviceSelect,
  onAddDevice,
  onOpenAppInfo,
  onLogout
}: DeviceListScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Close menu when tapping outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal relative">
      {/* Header */}
      <div className="bg-aaa-charcoal-light px-6 pt-14 pb-4 flex justify-between items-center shadow-md shadow-black/20 z-30">
        <h1 className="text-2xl font-bold text-aaa-cream font-heading">
          My Diffusers
        </h1>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-aaa-cream/50 hover:text-aaa-sage transition-colors">
            
            {menuOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen &&
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: -4
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: -4
              }}
              transition={{
                duration: 0.15
              }}
              className="absolute right-0 top-full mt-2 w-48 bg-aaa-charcoal-light border border-white/10 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-50">
              
                <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAppInfo();
                }}
                className="w-full flex items-center space-x-3 px-4 py-3.5 text-aaa-cream/80 hover:bg-white/5 transition-colors border-b border-white/10">
                
                  <InfoIcon className="w-5 h-5 text-aaa-cream/40" />
                  <span className="text-sm font-medium font-body">About</span>
                </button>
                <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center space-x-3 px-4 py-3.5 text-aaa-danger hover:bg-aaa-danger/10 transition-colors">
                
                  <LogOutIcon className="w-5 h-5" />
                  <span className="text-sm font-medium font-body">Log Out</span>
                </button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 phone-scroll">
        {devices.length === 0 ?
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <PlusIcon className="w-10 h-10 text-aaa-cream/40" />
            </div>
            <h2 className="text-xl font-semibold text-aaa-cream mb-2 font-heading">
              No diffusers yet
            </h2>
            <p className="text-aaa-cream/60 mb-8 font-body">
              Add your first Arozen diffuser to start controlling your home's
              scent.
            </p>
            <button
            onClick={onAddDevice}
            className="bg-aaa-sage text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-aaa-sage/20 active:scale-95 transition-transform font-body">
            
              Add Diffuser
            </button>
          </div> :

        <div className="space-y-1 pb-24">
            {devices.map((device) =>
          <DeviceCard
            key={device.id}
            device={device}
            onClick={() => onDeviceSelect(device.id)} />

          )}
          </div>
        }
      </div>

      {/* FAB */}
      {devices.length > 0 &&
      <button
        onClick={onAddDevice}
        className="absolute bottom-8 right-6 w-14 h-14 bg-aaa-sage text-white rounded-full shadow-lg shadow-aaa-sage/30 flex items-center justify-center active:scale-90 transition-transform z-20">
        
          <PlusIcon className="w-7 h-7" />
        </button>
      }
    </div>);

}