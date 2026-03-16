import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, ChevronRightIcon } from 'lucide-react';
import { StatusDot } from './ui/StatusDot';
export interface DiffuserDevice {
  id: string;
  name: string;
  isOn: boolean;
  mistingPreset: number;
  countdownPreset: string;
  countdownRemaining?: string;
}
interface DeviceListProps {
  devices: DiffuserDevice[];
  onSelectDevice: (id: string) => void;
  onAddDiffuser: () => void;
}
export function DeviceList({
  devices,
  onSelectDevice,
  onAddDiffuser
}: DeviceListProps) {
  return (
    <div className="w-full h-full bg-aaa-charcoal flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 pb-2 flex items-center justify-between">
        <div>
          <p className="font-body text-xs tracking-[0.15em] text-aaa-gold/60 uppercase mb-1">
            Arozen
          </p>
          <h1 className="font-heading text-2xl text-aaa-cream font-medium">
            My Diffusers
          </h1>
        </div>
        <motion.button
          onClick={onAddDiffuser}
          whileTap={{
            scale: 0.9
          }}
          className="w-10 h-10 rounded-full bg-aaa-charcoal-light border border-aaa-cream/10 flex items-center justify-center cursor-pointer"
          aria-label="Add diffuser">
          
          <PlusIcon size={20} className="text-aaa-sage" />
        </motion.button>
      </div>

      <p className="px-6 pb-4 font-body text-xs text-aaa-cream/30">
        {devices.length} {devices.length === 1 ? 'device' : 'devices'} paired
      </p>

      {/* Device cards */}
      <div className="flex-1 px-6 space-y-3 pb-8 overflow-y-auto phone-scroll">
        {devices.map((device, index) =>
        <motion.button
          key={device.id}
          onClick={() => onSelectDevice(device.id)}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.4
          }}
          whileTap={{
            scale: 0.98
          }}
          className="w-full bg-aaa-white/[0.04] border border-aaa-cream/[0.06] rounded-2xl p-4 flex items-center gap-4 cursor-pointer text-left"
          style={{
            boxShadow: device.isOn ?
            '0 2px 20px rgba(124,154,142,0.06)' :
            '0 2px 10px rgba(0,0,0,0.1)'
          }}>
          
            {/* Diffuser icon */}
            <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.isOn ? 'bg-aaa-sage/15' : 'bg-aaa-cream/5'}`}>
            
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path
                d="M8 12 C8 6, 16 6, 16 12 L15.2 24 C15.2 25, 8.8 25, 8.8 24 Z"
                fill={
                device.isOn ?
                'rgba(124,154,142,0.4)' :
                'rgba(245,240,235,0.1)'
                }
                stroke={device.isOn ? '#7C9A8E' : 'rgba(245,240,235,0.2)'}
                strokeWidth="1" />
              
                {device.isOn &&
              <>
                    <path
                  d="M11 10 Q10.5 6, 11.5 3"
                  stroke="rgba(124,154,142,0.4)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none" />
                
                    <path
                  d="M13 10 Q13.5 7, 12.5 4"
                  stroke="rgba(124,154,142,0.3)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none" />
                
                  </>
              }
              </svg>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-body font-semibold text-sm text-aaa-cream truncate">
                  {device.name}
                </h3>
                <StatusDot status={device.isOn ? 'on' : 'off'} />
              </div>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-aaa-cream/40">
                  {device.isOn ? `Every ${device.mistingPreset} min` : 'Off'}
                </span>
                {device.isOn && device.countdownRemaining &&
              <>
                    <span className="text-aaa-cream/15">·</span>
                    <span className="font-body text-xs text-aaa-sage/70">
                      {device.countdownRemaining} left
                    </span>
                  </>
              }
              </div>
            </div>

            <ChevronRightIcon
            size={18}
            className="text-aaa-cream/20 flex-shrink-0" />
          
          </motion.button>
        )}
      </div>
    </div>);

}