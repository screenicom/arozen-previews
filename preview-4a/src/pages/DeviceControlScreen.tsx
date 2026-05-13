import React, { useState } from 'react';
import { ChevronLeftIcon, SettingsIcon, ChevronRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Device } from '../types';
import { PowerCircle } from '../components/PowerCircle';
import { VerticalLiquidLevel } from '../components/VerticalLiquidLevel';
import { BatteryIndicator } from '../components/BatteryIndicator';
import { IntensityModal, INTENSITY_LEVELS } from '../components/IntensityModal';
import {
  CountdownModal,
  COUNTDOWN_LABELS,
  COUNTDOWN_VALUES,
  type CountdownValue } from
'../components/CountdownModal';
interface DeviceControlScreenProps {
  device: Device;
  onBack: () => void;
  onUpdateDevice: (updated: Device) => void;
  onOpenSettings: () => void;
  onOpenSchedule: () => void;
}
export function DeviceControlScreen({
  device,
  onBack,
  onUpdateDevice,
  onOpenSettings,
  onOpenSchedule
}: DeviceControlScreenProps) {
  const [intensityOpen, setIntensityOpen] = useState(false);
  const [countdownOpen, setCountdownOpen] = useState(false);
  const intensityValue = device.intensity ?? 2;
  const countdownIndex = COUNTDOWN_VALUES.findIndex(
    (v) => v === device.countdown
  );
  const countdownLabel =
  countdownIndex >= 0 ? COUNTDOWN_LABELS[countdownIndex] : '4h';
  const countdownDisplay =
  device.countdown === 'infinite' ? 'Continuous' : countdownLabel;
  const handleIntensityChange = (val: number) => {
    onUpdateDevice({
      ...device,
      intensity: val
    });
  };
  const handleCountdownValueChange = (val: CountdownValue) => {
    onUpdateDevice({
      ...device,
      countdown: val
    });
  };
  const handleTogglePower = () => {
    onUpdateDevice({
      ...device,
      isOn: !device.isOn
    });
  };
  const isOffline = !device.isOnline;
  const muted = !device.isOn || isOffline;
  return (
    <div className="flex flex-col h-full bg-arozen-grey relative">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-start border-b border-black/5 z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 -ml-2 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Back">
          
          <ChevronLeftIcon className="w-5 h-5" strokeWidth={1.25} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-[20px] font-medium text-gray-900 font-heading tracking-tight leading-none">
            {device.name}
          </h1>
          <span className="text-[9px] text-arozen-gold uppercase tracking-[0.4em] font-medium font-body mt-1.5">
            {device.type}
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-9 h-9 -mr-2 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Settings">
          
          <SettingsIcon className="w-[18px] h-[18px]" strokeWidth={1.25} />
        </button>
      </div>

      {/* Offline notice */}
      {isOffline &&
      <div className="bg-arozen-danger/5 border-b border-arozen-danger/10 px-5 py-2.5 flex items-center justify-center">
          <span className="text-[10px] text-arozen-danger uppercase tracking-[0.3em] font-medium font-body">
            Device Offline
          </span>
        </div>
      }

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Hero — warm stage */}
        <div className="relative px-6 pt-6 pb-3">
          {/* Warm radial backdrop */}
          <div
            className="absolute inset-x-0 top-0 h-[260px] pointer-events-none"
            style={{
              background:
              'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(181,152,105,0.10) 0%, rgba(181,152,105,0.04) 40%, rgba(181,152,105,0) 75%)'
            }} />
          

          <div className="relative h-48 flex items-center justify-center">
            {/* Left gauge — equal inset from screen edge */}
            {device.liquidLevel !== undefined &&
            <div className="absolute left-0 top-1">
                <VerticalLiquidLevel
                level={device.liquidLevel}
                muted={muted}
                label="Oil" />
              
              </div>
            }

            {/* Product stage — centered */}
            <div className="relative flex items-center justify-center">
              {/* Soft floor shadow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2.5 rounded-full blur-md"
                style={{
                  background: muted ?
                  'rgba(0,0,0,0.06)' :
                  'rgba(181,152,105,0.18)'
                }} />
              
              <motion.img
                src={`${import.meta.env.BASE_URL}diffuser-eon-pro-v2.png`}
                alt={`${device.type} diffuser`}
                animate={{
                  opacity: isOffline ? 0.4 : 1,
                  filter: isOffline ? 'grayscale(1)' : 'grayscale(0)'
                }}
                transition={{
                  duration: 0.7
                }}
                className="relative h-44 w-auto object-contain" />
              
            </div>

            {/* Right gauge — equal inset from screen edge */}
            {device.batteryLevel !== undefined &&
            <div className="absolute right-0 top-0">
                <BatteryIndicator
                level={device.batteryLevel}
                muted={muted}
                label="Battery" />
              
              </div>
            }
          </div>
        </div>

        {/* Power + status */}
        <div className="flex flex-col items-center px-6 pt-2">
          <PowerCircle
            isOn={device.isOn}
            onToggle={handleTogglePower}
            disabled={isOffline} />
          
          <div className="mt-4">
            <p
              className={`text-[10px] uppercase tracking-[0.4em] font-medium font-body transition-colors duration-500 ${device.isOn && !isOffline ? 'text-arozen-green' : 'text-gray-400'}`}>
              
              {device.isOn ? 'On' : 'Off'}
            </p>
          </div>
        </div>

        {/* Controls panel */}
        <div className="px-6 pt-8 pb-6">
          <div
            className={`bg-white rounded-2xl border border-black/[0.06] overflow-hidden transition-opacity ${isOffline ? 'opacity-50 pointer-events-none' : ''}`}>
            
            <ControlRow
              label="Intensity"
              value={INTENSITY_LEVELS[intensityValue]}
              onClick={() => setIntensityOpen(true)} />
            
            <div className="h-px bg-black/[0.06]" />
            <ControlRow
              label="Countdown"
              value={countdownDisplay}
              onClick={() => setCountdownOpen(true)} />
            
            <div className="h-px bg-black/[0.06]" />
            <ControlRow
              label="Schedule"
              value="Set Routine"
              onClick={onOpenSchedule} />
            
          </div>
        </div>
      </div>

      <IntensityModal
        open={intensityOpen}
        value={intensityValue}
        onClose={() => setIntensityOpen(false)}
        onChange={handleIntensityChange} />
      
      <CountdownModal
        open={countdownOpen}
        value={device.countdown as CountdownValue}
        onClose={() => setCountdownOpen(false)}
        onChange={handleCountdownValueChange} />
      
    </div>);

}
interface ControlRowProps {
  label: string;
  value: string;
  onClick: () => void;
}
function ControlRow({ label, value, onClick }: ControlRowProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full px-6 py-4 flex items-center justify-between hover:bg-arozen-grey/40 transition-colors text-left">
      
      <div>
        <p className="text-[9px] text-arozen-gold uppercase tracking-[0.4em] font-medium font-body">
          {label}
        </p>
        <p className="text-[17px] font-medium text-gray-900 font-heading tracking-tight mt-1.5 leading-none">
          {value}
        </p>
      </div>
      <ChevronRightIcon
        className="w-4 h-4 text-gray-300 group-hover:text-arozen-gold transition-colors"
        strokeWidth={1.25} />
      
    </button>);

}