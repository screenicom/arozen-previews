import React from 'react';
import { ChevronLeftIcon, SettingsIcon, CalendarIcon } from 'lucide-react';
import { Device } from '../types';
import { PowerCircle } from '../components/PowerCircle';
import { PresetChips } from '../components/PresetChips';
import { LiquidLevel } from '../components/LiquidLevel';
interface DeviceControlScreenProps {
  device: Device;
  onBack: () => void;
  onUpdateDevice: (updated: Device) => void;
  onOpenSettings: () => void;
  onOpenSchedule: () => void;
}
const FREQUENCY_OPTIONS = [
{
  label: '1m',
  value: 1
},
{
  label: '3m',
  value: 3
},
{
  label: '5m',
  value: 5
},
{
  label: '10m',
  value: 10
},
{
  label: '20m',
  value: 20
},
{
  label: '30m',
  value: 30
},
{
  label: '40m',
  value: 40
}];

const COUNTDOWN_OPTIONS = [
{
  label: '1h',
  value: 1
},
{
  label: '2h',
  value: 2
},
{
  label: '4h',
  value: 4
},
{
  label: '8h',
  value: 8
},
{
  label: '∞',
  value: 'infinite' as const
}];

export function DeviceControlScreen({
  device,
  onBack,
  onUpdateDevice,
  onOpenSettings,
  onOpenSchedule
}: DeviceControlScreenProps) {
  const handleTogglePower = () => {
    onUpdateDevice({
      ...device,
      isOn: !device.isOn
    });
  };
  const handleFrequencyChange = (val: number | 'infinite') => {
    onUpdateDevice({
      ...device,
      frequency: val as number
    });
  };
  const handleCountdownChange = (val: number | 'infinite') => {
    onUpdateDevice({
      ...device,
      countdown: val
    });
  };
  const isOffline = !device.isOnline;
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal relative">
      {/* Header */}
      <div className="bg-aaa-charcoal-light px-4 pt-14 pb-4 flex justify-between items-center shadow-md shadow-black/20 z-10">
        <button
          onClick={onBack}
          className="p-2 text-aaa-cream/60 hover:text-aaa-cream transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-aaa-cream font-heading">
            {device.name}
          </h1>
          <span className="text-xs text-aaa-cream/50 capitalize font-body">
            {device.type}
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-2 text-aaa-cream/60 hover:text-aaa-cream transition-colors">
          
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      {isOffline &&
      <div className="bg-aaa-danger/20 border-b border-aaa-danger/30 px-4 py-2 flex items-center justify-center">
          <span className="text-sm text-aaa-danger font-medium font-body">
            Device is offline
          </span>
        </div>
      }

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 phone-scroll">
        {/* Power Control */}
        <div className="flex flex-col items-center">
          <PowerCircle
            isOn={device.isOn}
            onToggle={handleTogglePower}
            disabled={isOffline} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-aaa-cream/50 font-medium uppercase tracking-wider font-body">
              Status
            </p>
            <p
              className={`text-xl font-bold font-heading ${device.isOn ? 'text-aaa-sage' : 'text-aaa-cream/40'}`}>
              
              {device.isOn ? 'Misting Active' : 'Standby'}
            </p>
          </div>
        </div>

        {/* Liquid Level (Vortex Only) */}
        {device.type === 'vortex' && device.liquidLevel !== undefined &&
        <LiquidLevel level={device.liquidLevel} />
        }

        {/* Controls Container */}
        <div
          className={`bg-aaa-charcoal-light rounded-3xl p-5 shadow-md shadow-black/20 border border-white/10 space-y-6 ${isOffline ? 'opacity-50 pointer-events-none' : ''}`}>
          
          {/* Frequency */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-aaa-cream font-body">
                Misting Frequency
              </label>
              <span className="text-xs text-aaa-sage font-medium bg-aaa-sage/20 px-2 py-1 rounded-md font-body">
                {device.frequency} min
              </span>
            </div>
            <PresetChips
              options={FREQUENCY_OPTIONS}
              selectedValue={device.frequency}
              onSelect={handleFrequencyChange} />
            
          </div>

          <div className="h-px bg-white/10" />

          {/* Countdown */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-aaa-cream font-body">
                Countdown Timer
              </label>
              {device.isOn && device.countdown !== 'infinite' &&
              <span className="text-xs text-aaa-gold font-medium bg-aaa-gold/20 px-2 py-1 rounded-md font-body">
                  {device.timeRemaining || `${device.countdown}h remaining`}
                </span>
              }
            </div>
            <PresetChips
              options={COUNTDOWN_OPTIONS}
              selectedValue={device.countdown}
              onSelect={handleCountdownChange} />
            
          </div>
        </div>

        {/* Schedule Button */}
        <button
          onClick={onOpenSchedule}
          className="w-full bg-aaa-charcoal-light rounded-2xl p-4 shadow-md shadow-black/20 border border-white/10 flex items-center justify-between active:scale-[0.98] transition-transform">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-aaa-sage/20 rounded-full flex items-center justify-center text-aaa-sage">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-aaa-cream font-body">
                Schedule
              </h3>
              <p className="text-xs text-aaa-cream/50 font-body">
                Automate misting times
              </p>
            </div>
          </div>
          <ChevronLeftIcon className="w-5 h-5 text-aaa-cream/30 rotate-180" />
        </button>

        <div className="h-6" />
      </div>
    </div>);

}