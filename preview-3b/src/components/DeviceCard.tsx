import React from 'react';
import { ChevronRightIcon, PowerIcon } from 'lucide-react';
import { Device } from '../types';
import { StatusBadge } from './StatusBadge';
import { motion } from 'framer-motion';
interface DeviceCardProps {
  device: Device;
  onClick: () => void;
}
export function DeviceCard({ device, onClick }: DeviceCardProps) {
  return (
    <motion.div
      whileTap={{
        scale: 0.98
      }}
      onClick={onClick}
      className="bg-arozen-dark rounded-2xl p-4 shadow-md shadow-black/40 border border-white/10 flex items-center justify-between cursor-pointer mb-3">
      
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${device.isOn ? 'bg-arozen-gold/20 text-arozen-gold' : 'bg-white/5 text-white/40'}`}>
          
          <PowerIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-medium text-white text-base font-heading">
            {device.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-white/50 capitalize font-body">
              {device.type}
            </span>
            <span className="text-white/20 text-xs">•</span>
            <StatusBadge isOnline={device.isOnline} />
          </div>
        </div>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-white/30" />
    </motion.div>);

}