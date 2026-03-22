import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Device, Screen } from './types';
import { SplashScreen } from './pages/SplashScreen';
import { OnboardingScreen } from './pages/OnboardingScreen';
import { LoginScreen } from './pages/LoginScreen';
import { DeviceListScreen } from './pages/DeviceListScreen';
import { DeviceControlScreen } from './pages/DeviceControlScreen';
import { DeviceSettingsScreen } from './pages/DeviceSettingsScreen';
import { ScheduleScreen } from './pages/ScheduleScreen';
import { AppInfoScreen } from './pages/AppInfoScreen';
import { PairingFlowScreen } from './pages/PairingFlowScreen';
const INITIAL_DEVICES: Device[] = [
{
  id: 'd1',
  name: 'Living Room',
  type: 'eon',
  isOn: true,
  isOnline: true,
  frequency: 5,
  countdown: 4,
  timeRemaining: '3h 42m'
},
{
  id: 'd2',
  name: 'Bedroom',
  type: 'vortex',
  isOn: false,
  isOnline: true,
  frequency: 10,
  countdown: 8,
  liquidLevel: 65,
  pin: '1234'
},
{
  id: 'd3',
  name: 'Office',
  type: 'eon',
  isOn: false,
  isOnline: false,
  frequency: 3,
  countdown: 2
}];

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const selectedDevice = devices.find((d) => d.id === selectedDeviceId);
  const handleUpdateDevice = (updatedDevice: Device) => {
    setDevices(
      devices.map((d) => d.id === updatedDevice.id ? updatedDevice : d)
    );
  };
  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
    setCurrentScreen('deviceList');
  };
  const handleAddDevice = (
  name: string,
  type: 'eon' | 'vortex',
  pin?: string) =>
  {
    const newDevice: Device = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type,
      isOn: false,
      isOnline: true,
      frequency: 10,
      countdown: 'infinite',
      pin,
      liquidLevel: type === 'vortex' ? 100 : undefined
    };
    setDevices([...devices, newDevice]);
    setSelectedDeviceId(newDevice.id);
    setCurrentScreen('deviceControl');
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />);

      case 'onboarding':
        return <OnboardingScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('deviceList')} />;
      case 'deviceList':
        return (
          <DeviceListScreen
            devices={devices}
            onDeviceSelect={(id) => {
              setSelectedDeviceId(id);
              setCurrentScreen('deviceControl');
            }}
            onAddDevice={() => setCurrentScreen('pairingFlow')}
            onOpenAppInfo={() => setCurrentScreen('appInfo')}
            onLogout={() => setCurrentScreen('login')} />);


      case 'deviceControl':
        if (!selectedDevice) return null;
        return (
          <DeviceControlScreen
            device={selectedDevice}
            onBack={() => setCurrentScreen('deviceList')}
            onUpdateDevice={handleUpdateDevice}
            onOpenSettings={() => setCurrentScreen('deviceSettings')}
            onOpenSchedule={() => setCurrentScreen('schedule')} />);


      case 'deviceSettings':
        if (!selectedDevice) return null;
        return (
          <DeviceSettingsScreen
            device={selectedDevice}
            onBack={() => setCurrentScreen('deviceControl')}
            onUpdateDevice={handleUpdateDevice}
            onDeleteDevice={handleDeleteDevice} />);


      case 'schedule':
        return (
          <ScheduleScreen onBack={() => setCurrentScreen('deviceControl')} />);

      case 'appInfo':
        return <AppInfoScreen onBack={() => setCurrentScreen('deviceList')} />;
      case 'pairingFlow':
        return (
          <PairingFlowScreen
            onCancel={() => setCurrentScreen('deviceList')}
            onComplete={handleAddDevice} />);


      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#0D0D1A] flex items-center justify-center p-4 font-body">
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-aaa-charcoal rounded-[3rem] shadow-2xl shadow-black/50 overflow-hidden border-[8px] border-aaa-charcoal-light ring-1 ring-white/10">
        {/* Fake Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 z-50 pointer-events-none">
          <span className="text-xs font-semibold text-aaa-cream">9:41</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-aaa-cream/80 rounded-sm" />
            <div className="w-4 h-3 bg-aaa-cream/80 rounded-sm" />
            <div className="w-6 h-3 border border-aaa-cream/80 rounded-sm p-[1px]">
              <div className="w-full h-full bg-aaa-cream/80 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Dynamic Island / Notch Mock */}
        <div className="absolute top-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-7 bg-black rounded-full" />
        </div>

        {/* Screen Content Area */}
        <div className="w-full h-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.2
              }}
              className="w-full h-full">
              
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-1 bg-aaa-cream/40 rounded-full" />
        </div>
      </div>
    </div>);

}