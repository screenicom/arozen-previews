import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, SettingsIcon } from 'lucide-react';
import { PowerButton } from './ui/PowerButton';
import { MistEffect } from './ui/MistEffect';
import type { DiffuserDevice } from './DeviceList';
interface DeviceControlProps {
  device: DiffuserDevice;
  onBack: () => void;
  onSettings: () => void;
  onUpdateDevice: (updates: Partial<DiffuserDevice>) => void;
}
const MISTING_PRESETS = [1, 3, 5, 10, 20, 40];
const COUNTDOWN_PRESETS = [
{
  value: '1h',
  label: '1h'
},
{
  value: '2h',
  label: '2h'
},
{
  value: '4h',
  label: '4h'
},
{
  value: '8h',
  label: '8h'
},
{
  value: 'unlimited',
  label: '∞'
}];

export function DeviceControl({
  device,
  onBack,
  onSettings,
  onUpdateDevice
}: DeviceControlProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    device.countdownRemaining || ''
  );
  useEffect(() => {
    if (!device.isOn || device.countdownPreset === 'unlimited') {
      setTimeRemaining(device.countdownPreset === 'unlimited' ? '' : '');
      return;
    }
    // Simulated countdown display
    const hours = parseInt(device.countdownPreset);
    if (!isNaN(hours)) {
      setTimeRemaining(`${hours}h 00m`);
    }
  }, [device.isOn, device.countdownPreset]);
  const handleToggle = () => {
    onUpdateDevice({
      isOn: !device.isOn
    });
  };
  return (
    <div className="w-full h-full bg-aaa-charcoal flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 pb-2 flex items-center justify-between">
        <motion.button
          onClick={onBack}
          whileTap={{
            scale: 0.9
          }}
          className="w-9 h-9 rounded-full bg-aaa-cream/5 flex items-center justify-center cursor-pointer"
          aria-label="Go back">
          
          <ArrowLeftIcon size={18} className="text-aaa-cream/60" />
        </motion.button>

        <div className="text-center">
          <h1 className="font-body font-semibold text-base text-aaa-cream">
            {device.name}
          </h1>
          <p className="font-body text-xs text-aaa-cream/30 mt-0.5">
            {device.isOn ? 'Active' : 'Standby'}
          </p>
        </div>

        <motion.button
          onClick={onSettings}
          whileTap={{
            scale: 0.9
          }}
          className="w-9 h-9 rounded-full bg-aaa-cream/5 flex items-center justify-center cursor-pointer"
          aria-label="Device settings">
          
          <SettingsIcon size={18} className="text-aaa-cream/60" />
        </motion.button>
      </div>

      {/* Main control area */}
      <div className="flex-1 flex flex-col items-center px-6 overflow-y-auto phone-scroll">
        {/* Diffuser image with mist + power button */}
        <div className="relative flex flex-col items-center pt-4 pb-2">
          <div className="relative">
            <MistEffect active={device.isOn} intensity="medium" />
            <motion.img
              src={`${import.meta.env.BASE_URL}EonProV2_-_transp.png`}
              alt="Arozen Diffuser"
              className="w-24 h-auto object-contain relative z-10"
              animate={{
                opacity: device.isOn ? 1 : 0.5
              }}
              transition={{
                duration: 0.4
              }} />
            
          </div>
          <div className="mt-3">
            <PowerButton isOn={device.isOn} onToggle={handleToggle} size={80} />
          </div>
        </div>

        {/* Time remaining */}
        <AnimatePresence>
          {device.isOn &&
          device.countdownPreset !== 'unlimited' &&
          timeRemaining &&
          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            exit={{
              opacity: 0,
              height: 0
            }}
            className="mb-6 text-center">
            
                <p className="font-body text-xs text-aaa-cream/30 uppercase tracking-wider mb-1">
                  Time Remaining
                </p>
                <p className="font-heading text-2xl text-aaa-cream/80">
                  {timeRemaining}
                </p>
              </motion.div>
          }
        </AnimatePresence>

        {/* Misting Interval */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body text-xs font-semibold text-aaa-cream/50 uppercase tracking-wider">
              Misting Interval
            </h3>
            <span className="font-body text-xs text-aaa-sage">
              Every {device.mistingPreset} min
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto phone-scroll pb-1">
            {MISTING_PRESETS.map((preset) =>
            <motion.button
              key={preset}
              onClick={() =>
              onUpdateDevice({
                mistingPreset: preset
              })
              }
              whileTap={{
                scale: 0.93
              }}
              className={`
                  relative px-4 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap flex-shrink-0 cursor-pointer
                  transition-all duration-200
                  ${!device.isOn ? 'opacity-40' : ''}
                  ${device.mistingPreset === preset ? 'bg-aaa-sage text-aaa-charcoal' : 'bg-aaa-cream/[0.04] text-aaa-cream/50 border border-aaa-cream/10'}
                `}>
              
                {preset}m
              </motion.button>
            )}
          </div>
        </div>

        {/* Run Duration */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body text-xs font-semibold text-aaa-cream/50 uppercase tracking-wider">
              Run Duration
            </h3>
            <span className="font-body text-xs text-aaa-sage">
              {device.countdownPreset === 'unlimited' ?
              'Continuous' :
              device.countdownPreset}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto phone-scroll pb-1">
            {COUNTDOWN_PRESETS.map((preset) =>
            <motion.button
              key={preset.value}
              onClick={() =>
              onUpdateDevice({
                countdownPreset: preset.value
              })
              }
              whileTap={{
                scale: 0.93
              }}
              className={`
                  relative px-4 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap flex-shrink-0 cursor-pointer
                  transition-all duration-200
                  ${!device.isOn ? 'opacity-40' : ''}
                  ${device.countdownPreset === preset.value ? 'bg-aaa-sage text-aaa-charcoal' : 'bg-aaa-cream/[0.04] text-aaa-cream/50 border border-aaa-cream/10'}
                `}>
              
                {preset.label}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>);

}