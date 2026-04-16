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
      className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-200 border border-gray-200 flex items-center justify-between cursor-pointer mb-3">
      
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${device.isOn ? 'bg-arozen-gold/10 text-arozen-gold' : 'bg-gray-100 text-gray-400'}`}>
          
          <PowerIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 text-base font-heading">
            {device.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-500 capitalize font-body">
              {device.type}
            </span>
            <span className="text-gray-300 text-xs">•</span>
            <StatusBadge isOnline={device.isOnline} />
          </div>
        </div>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-300" />
    </motion.div>);

}