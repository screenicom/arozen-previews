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
            disabled={isOffline}
            mirrored />
          
        </div>

        {/* Hero card with metrics + device */}
        <div className="rounded-3xl px-5 pt-5 pb-4 relative overflow-hidden shadow-[0_8px_20px_-8px_rgba(60,40,15,0.18),0_2px_5px_-1px_rgba(60,40,15,0.10)] bg-[#F5F2EC]">
          {/* Glow backdrop image — full card width, anchored to the top */}
          <motion.img
            aria-hidden
            src={`${import.meta.env.BASE_URL}bcg-01b.png`}
            alt=""
            animate={{
              opacity: isOffline ? 0.15 : device.isOn ? 1 : 0.4,
              scale: device.isOn && !isOffline ? [1, 1.015, 1] : 1
            }}
            transition={{
              opacity: {
                duration: 0.7,
                ease: 'easeOut'
              },
              scale: {
                duration: 5,
                repeat: device.isOn && !isOffline ? Infinity : 0,
                ease: 'easeInOut'
              }
            }}
            className="absolute -top-6 left-0 w-full h-auto pointer-events-none select-none z-0" />
          
          {/* Metrics row */}
          <div className="flex items-start justify-between relative z-20 -mx-3">
            <MetricBlock
              icon={DropletIcon}
              label="OIL"
              value={
              device.liquidLevel !== undefined ?
              `${device.liquidLevel}%` :
              '—'
              }
              muted={isOffline}
              align="left" />
            
            <MetricBlock
              customIcon={
              device.batteryLevel !== undefined ?
              <BatteryIndicator
                level={device.batteryLevel}
                muted={isOffline}
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
              muted={isOffline}
              align="right" />
            
          </div>

          {/* Diffuser stage */}
          <div className="relative h-[300px] flex items-end justify-center -mt-2">
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
              src={`${import.meta.env.BASE_URL}eon-transp.png`}
              alt={`${device.type} diffuser`}
              animate={{
                opacity: isOffline ? 0.4 : 1,
                filter: isOffline ? 'grayscale(1)' : 'grayscale(0)'
              }}
              transition={{
                duration: 0.7
              }}
              className="relative h-[260px] w-auto object-contain z-10 mb-6" />
            
          </div>

          {/* Power — inside hero card */}
          <div className="flex flex-col items-center pt-0 pb-2 relative z-20">
            <PowerCircle
              isOn={device.isOn}
              onToggle={handleTogglePower}
              disabled={isOffline} />
            
            <p
              className={`mt-3 text-[13px] font-medium font-body relative z-20 ${isOffline ? 'text-gray-300' : device.isOn ? 'text-arozen-green' : 'text-gray-400'}`}>
              
              {device.isOn ? 'On' : 'Off'}
            </p>
          </div>
        </div>

        <div className="h-4" />

        {/* Schedule */}
        <button
          onClick={onOpenSchedule}
          disabled={isOffline}
          className={`w-full bg-[#F5F2EC] rounded-2xl px-4 py-3.5 flex items-center justify-between transition-opacity shadow-[0_8px_20px_-8px_rgba(60,40,15,0.18),0_2px_5px_-1px_rgba(60,40,15,0.10)] ${isOffline ? 'opacity-50' : 'active:scale-[0.99]'} text-left`}>
          
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
  mirrored?: boolean;
}
function PillControl({
  icon: Icon,
  label,
  value,
  onClick,
  disabled,
  mirrored = false
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
      className={`bg-[#F5F2EC] rounded-2xl pl-2 pr-2 py-2 flex items-center gap-2 text-left transition-opacity shadow-[0_8px_20px_-8px_rgba(60,40,15,0.18),0_2px_5px_-1px_rgba(60,40,15,0.10)] ${disabled ? 'opacity-50' : ''} ${mirrored ? 'flex-row-reverse' : ''}`}>
      
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
      </div>
      <div
        className={`leading-tight min-w-0 flex-1 ${mirrored ? 'text-right' : ''}`}>
        
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
      
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
        {customIcon ?
        customIcon :
        Icon ?
        <Icon
          className={`w-5 h-5 ${muted ? 'text-gray-400' : 'text-gray-800'}`}
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
/* ---------- Ambient Mist (atmospheric backdrop) ---------- */
const MIST_WISPS = [
{
  left: '10%',
  size: 150,
  delay: 0,
  duration: 7,
  drift: 24
},
{
  left: '22%',
  size: 120,
  delay: 2.1,
  duration: 6.4,
  drift: 12
},
{
  left: '50%',
  size: 200,
  delay: 1.2,
  duration: 7.6,
  drift: -8
},
{
  left: '78%',
  size: 140,
  delay: 3.4,
  duration: 6.8,
  drift: -22
},
{
  left: '90%',
  size: 110,
  delay: 0.6,
  duration: 7,
  drift: -14
},
{
  left: '38%',
  size: 95,
  delay: 4.2,
  duration: 6.2,
  drift: 16
},
{
  left: '62%',
  size: 105,
  delay: 5.0,
  duration: 7.2,
  drift: -10
}];

interface AmbientMistProps {
  active: boolean;
}
function AmbientMist({ active }: AmbientMistProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {MIST_WISPS.map((w, i) =>
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          left: w.left,
          bottom: -20,
          width: w.size,
          height: w.size,
          transform: 'translateX(-50%)',
          background:
          'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0) 72%)',
          filter: 'blur(8px)'
        }}
        initial={{
          y: 20,
          x: 0,
          opacity: 0,
          scale: 0.6
        }}
        animate={{
          y: [20, -100, -220],
          x: [0, w.drift * 0.5, w.drift],
          opacity: active ? [0, 0.95, 0] : [0, 0.45, 0],
          scale: [0.6, 1.05, 1.4]
        }}
        transition={{
          duration: active ? w.duration : w.duration * 1.6,
          delay: w.delay,
          repeat: Infinity,
          ease: 'easeOut'
        }} />

      )}
    </div>);

}