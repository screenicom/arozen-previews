import React from 'react';
import { ChevronRightIcon, PowerIcon } from 'lucide-react';
import { Device } from '../types';
import { motion } from 'framer-motion';
import { BatteryIndicator } from './BatteryIndicator';
interface DeviceCardProps {
  device: Device;
  onClick: () => void;
  onTogglePower: () => void;
}
export function DeviceCard({
  device,
  onClick,
  onTogglePower
}: DeviceCardProps) {
  const handleTogglePower = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (device.isOnline) onTogglePower();
  };
  return (
    <motion.div
      whileTap={{
        scale: 0.98
      }}
      onClick={onClick}
      className="bg-[#F5F2EC] rounded-2xl p-4 flex items-center justify-between cursor-pointer">
      
      <div className="flex items-center space-x-4 min-w-0">
        <div
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${device.isOn ? 'bg-arozen-green/10' : 'bg-[#EBE7DF] border border-black/[0.05]'}`}>
          
          <img
            src={`${import.meta.env.BASE_URL}diffuser-eon-pro-v2.png`}
            alt={`${device.type} diffuser`}
            className={`h-12 w-auto object-contain transition-opacity ${device.isOn ? 'opacity-100' : 'opacity-60'}`} />
          
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-gray-900 text-base font-heading truncate">
            {device.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-500 capitalize font-body">
              {device.type}
            </span>
            {!device.isOnline ?
            <>
                <span className="text-gray-300 text-xs">·</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-arozen-danger bg-arozen-danger/10 px-2 py-0.5 rounded-full font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-arozen-danger" />
                  Offline
                </span>
              </> :

            device.batteryLevel !== undefined &&
            <>
                  <span className="text-gray-300 text-xs">·</span>
                  <BatteryIndicator
                level={device.batteryLevel}
                muted={false}
                size="sm"
                tone="neutral"
                animate={false} />
              
                </>

            }
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-1 flex-shrink-0">
        <motion.button
          whileTap={
          device.isOnline ?
          {
            scale: 0.9
          } :
          {}
          }
          onClick={handleTogglePower}
          disabled={!device.isOnline}
          aria-label={device.isOn ? 'Turn off' : 'Turn on'}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${!device.isOnline ? 'bg-[#EBE7DF] border border-black/[0.05] text-gray-300 cursor-not-allowed opacity-70' : device.isOn ? 'bg-arozen-green text-white shadow-sm shadow-arozen-green/40' : 'bg-[#EBE7DF] border border-black/[0.05] text-gray-500 hover:bg-[#E4DFD5]'}`}>
          
          <PowerIcon className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
        <ChevronRightIcon className="w-5 h-5 text-gray-300" />
      </div>
    </motion.div>);

}