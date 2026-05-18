import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SettingsIcon,
  WavesIcon,
  ClockIcon,
  DropletIcon,
  CalendarIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { Device } from '../types';
import { PowerCircle } from '../components/PowerCircle';
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
  device.countdown === 'infinite' ? 'Continuous' : `${countdownLabel} left`;
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
    <div className="flex flex-col h-full bg-arozen-grey relative overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-start justify-between z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 -ml-2 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Back">
          
          <ChevronLeftIcon className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <div className="flex flex-col items-center pt-0.5">
          <h1 className="text-[20px] font-medium text-gray-900 font-heading tracking-tight leading-none">
            {device.name}
          </h1>
          <span className="text-[13px] text-arozen-gold font-body capitalize mt-1.5">
            {device.type}
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-9 h-9 -mr-2 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Settings">
          
          <SettingsIcon className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Offline notice */}
      {isOffline &&
      <div className="mx-4 mt-1 mb-2 bg-arozen-danger/[0.06] rounded-2xl px-4 py-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-arozen-danger/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-arozen-danger" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-arozen-danger font-heading leading-tight">
              Device is offline
            </p>
            <p className="text-[12px] text-gray-600 font-body leading-snug mt-1">
              Make sure it&rsquo;s plugged in, powered on, and within Wi-Fi
              range. If the issue persists, try unplugging the diffuser for 10
              seconds and plugging it back in.
            </p>
          </div>
        </div>
      }

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 phone-scroll">
        {/* Top pills — Diffusion level + Run time */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <PillControl
            icon={WavesIcon}
            label="Intensity"
            value={INTENSITY_LEVELS[intensityValue]}
            onClick={() => setIntensityOpen(true)}
            disabled={isOffline} />
          
          <PillControl
            icon={ClockIcon}
            label="Run time"
            value={countdownDisplay}
            onClick={() => setCountdownOpen(true)}
            disabled={isOffline} />
          
        </div>

        {/* Hero card with metrics + device */}
        <div className="bg-[#F5F2EC] rounded-3xl px-5 pt-5 pb-4 relative overflow-hidden">
          {/* Metrics row */}
          <div className="flex items-start justify-between">
            <MetricBlock
              icon={DropletIcon}
              label="OIL"
              value={
              device.liquidLevel !== undefined ?
              `${device.liquidLevel}%` :
              '—'
              }
              muted={muted}
              align="left" />
            
            <MetricBlock
              customIcon={
              device.batteryLevel !== undefined ?
              <BatteryIndicator
                level={device.batteryLevel}
                muted={muted}
                size="sm"
                tone="neutral" /> :

              null
              }
              label="BATTERY"
              value={
              device.batteryLevel !== undefined ?
              `${device.batteryLevel}%` :
              '—'
              }
              muted={muted}
              align="right" />
            
          </div>

          {/* Diffuser stage */}
          <div className="relative h-[240px] flex items-end justify-center -mt-2">
            {/* Mist puff */}
            {device.isOn && !isOffline &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: [0, 0.7, 0],
                y: -30
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full pointer-events-none"
              style={{
                background:
                'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)'
              }} />

            }
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
              className="relative h-[220px] w-auto object-contain z-10" />
            
          </div>

          {/* Power — inside hero card */}
          <div className="flex flex-col items-center pt-3 pb-2">
            <PowerCircle
              isOn={device.isOn}
              onToggle={handleTogglePower}
              disabled={isOffline} />
            
            <p
              className={`mt-3 text-[13px] font-medium font-body transition-colors duration-500 ${device.isOn && !isOffline ? 'text-arozen-green' : 'text-gray-400'}`}>
              
              {device.isOn ? 'On' : 'Off'}
            </p>
          </div>
        </div>

        <div className="h-4" />

        {/* Schedule */}
        <button
          onClick={onOpenSchedule}
          disabled={isOffline}
          className={`w-full bg-[#F5F2EC] rounded-2xl px-4 py-3.5 flex items-center justify-between transition-opacity ${isOffline ? 'opacity-50' : 'active:scale-[0.99]'} text-left`}>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <CalendarIcon
                className="w-4 h-4 text-gray-700"
                strokeWidth={1.5} />
              
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-medium text-gray-900 font-heading">
                Schedule
              </p>
              <p className="text-xs text-gray-500 font-body mt-0.5">
                Automate misting times
              </p>
            </div>
          </div>
          <ChevronRightIcon
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            strokeWidth={1.5} />
          
        </button>
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
/* ---------- Top pill control ---------- */
interface PillControlProps {
  icon: React.ElementType;
  label: string;
  value: string;
  onClick: () => void;
  disabled?: boolean;
}
function PillControl({
  icon: Icon,
  label,
  value,
  onClick,
  disabled
}: PillControlProps) {
  return (
    <motion.button
      whileTap={
      disabled ?
      undefined :
      {
        scale: 0.98
      }
      }
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#F5F2EC] rounded-2xl pl-2 pr-2 py-2 flex items-center gap-2 text-left transition-opacity ${disabled ? 'opacity-50' : ''}`}>
      
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
      </div>
      <div className="leading-tight min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.1em] font-medium font-body text-gray-500 truncate">
          {label}
        </p>
        <p className="text-[14px] font-medium text-gray-900 font-heading mt-0.5 truncate">
          {value}
        </p>
      </div>
      <ChevronDownIcon
        className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
        strokeWidth={1.5} />
      
    </motion.button>);

}
/* ---------- Metric block (OIL / BATTERY) ---------- */
interface MetricBlockProps {
  icon?: React.ElementType;
  customIcon?: React.ReactNode;
  label: string;
  value: string;
  muted: boolean;
  align: 'left' | 'right';
}
function MetricBlock({
  icon: Icon,
  customIcon,
  label,
  value,
  muted,
  align
}: MetricBlockProps) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
        {customIcon ?
        customIcon :
        Icon ?
        <Icon
          className={`w-4 h-4 ${muted ? 'text-gray-400' : 'text-gray-800'}`}
          strokeWidth={1.5} /> :

        null}
      </div>
      <div
        className={`leading-tight ${align === 'right' ? 'text-right' : 'text-left'}`}>
        
        <p
          className={`text-[10px] uppercase tracking-[0.1em] font-medium font-body ${muted ? 'text-gray-400' : 'text-gray-500'}`}>
          
          {label}
        </p>
        <p
          className={`text-[14px] font-medium font-heading mt-0.5 ${muted ? 'text-gray-400' : 'text-gray-900'}`}>
          
          {value}
        </p>
      </div>
    </div>);

}