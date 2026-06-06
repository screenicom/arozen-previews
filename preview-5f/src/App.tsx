import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Device, Schedule, Screen, UserProfile } from './types';
import { SplashScreen } from './pages/SplashScreen';
import { OnboardingScreen } from './pages/OnboardingScreen';
import { LoginScreen } from './pages/LoginScreen';
import { DeviceListScreen } from './pages/DeviceListScreen';
import { DeviceControlScreen } from './pages/DeviceControlScreen';
import { DeviceSettingsScreen } from './pages/DeviceSettingsScreen';
import { ScheduleListScreen } from './pages/ScheduleListScreen';
import { ScheduleScreen } from './pages/ScheduleScreen';
import { AppInfoScreen } from './pages/AppInfoScreen';
import { AccountScreen } from './pages/AccountScreen';
import { PairingFlowScreen } from './pages/PairingFlowScreen';
import { HomeScreen } from './pages/HomeScreen';
import { MoreScreen } from './pages/MoreScreen';
import { ForgotPasswordScreen } from './pages/ForgotPasswordScreen';
import { TabKey } from './types';
const INITIAL_DEVICES: Device[] = [
{
  id: 'd1',
  name: 'Living Room',
  type: 'eon',
  isOn: true,
  isOnline: true,
  frequency: 5,
  countdown: 4,
  timeRemaining: '3h 42m',
  liquidLevel: 82,
  batteryLevel: 76,
  intensity: 2
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
  pin: '1234',
  batteryLevel: 42,
  intensity: 0
},
{
  id: 'd3',
  name: 'Office',
  type: 'eon',
  isOn: false,
  isOnline: false,
  frequency: 3,
  countdown: 2,
  liquidLevel: 18,
  intensity: 3
}];

const INITIAL_USER: UserProfile = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com'
};
const INITIAL_SCHEDULES: Schedule[] = [
{
  id: 's1',
  enabled: true,
  days: [0, 1, 2, 3, 4],
  blocks: [
  {
    id: 'b1',
    startTime: '07:00',
    endTime: '09:00',
    frequency: 5,
    countdown: 'infinite'
  },
  {
    id: 'b2',
    startTime: '18:00',
    endTime: '22:00',
    frequency: 10,
    countdown: 'infinite'
  }]

},
{
  id: 's2',
  enabled: false,
  days: [5, 6],
  blocks: [
  {
    id: 'b3',
    startTime: '09:30',
    endTime: '12:00',
    frequency: 10,
    countdown: 'infinite'
  }]

}];

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const goToLogin = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentScreen('login');
  };
  const selectedDevice = devices.find((d) => d.id === selectedDeviceId);
  const handleTabChange = (tab: TabKey) => {
    if (tab === 'home') setCurrentScreen('home');else
    if (tab === 'devices') setCurrentScreen('deviceList');else
    if (tab === 'more') setCurrentScreen('more');
    // 'shop' opens an external link via BottomTabs anchor
  };
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
      liquidLevel: 100,
      batteryLevel: 100,
      intensity: 2
    };
    setDevices([...devices, newDevice]);
    setSelectedDeviceId(newDevice.id);
    setCurrentScreen('deviceControl');
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onComplete={() => setCurrentScreen('onboarding')}
            onSkipToHome={() => setCurrentScreen('home')} />);


      case 'onboarding':
        return (
          <OnboardingScreen
            onCreateAccount={() => goToLogin('signup')}
            onLogin={() => goToLogin('login')} />);


      case 'login':
        return (
          <LoginScreen
            key={authMode}
            initialMode={authMode}
            onLogin={() => setCurrentScreen('home')}
            onForgotPassword={() => setCurrentScreen('forgotPassword')} />);


      case 'forgotPassword':
        return (
          <ForgotPasswordScreen
            onBackToLogin={() => goToLogin('login')}
            onComplete={() => goToLogin('login')} />);


      case 'home':
        return (
          <HomeScreen
            onTabChange={handleTabChange}
            onConnectDevice={() => setCurrentScreen('pairingFlow')} />);


      case 'more':
        return (
          <MoreScreen
            onTabChange={handleTabChange}
            onOpenAppInfo={() => setCurrentScreen('appInfo')}
            onOpenAccount={() => setCurrentScreen('account')}
            onLogout={() => goToLogin('login')} />);


      case 'deviceList':
        return (
          <DeviceListScreen
            devices={devices}
            onDeviceSelect={(id) => {
              setSelectedDeviceId(id);
              setCurrentScreen('deviceControl');
            }}
            onTogglePower={(id) => {
              const target = devices.find((d) => d.id === id);
              if (target && target.isOnline) {
                handleUpdateDevice({
                  ...target,
                  isOn: !target.isOn
                });
              }
            }}
            onAddDevice={() => setCurrentScreen('pairingFlow')}
            onTabChange={handleTabChange} />);


      case 'deviceControl':
        if (!selectedDevice) return null;
        return (
          <DeviceControlScreen
            device={selectedDevice}
            onBack={() => setCurrentScreen('deviceList')}
            onUpdateDevice={handleUpdateDevice}
            onOpenSettings={() => setCurrentScreen('deviceSettings')}
            onOpenSchedule={() => setCurrentScreen('scheduleList')} />);


      case 'deviceSettings':
        if (!selectedDevice) return null;
        return (
          <DeviceSettingsScreen
            device={selectedDevice}
            onBack={() => setCurrentScreen('deviceControl')}
            onUpdateDevice={handleUpdateDevice}
            onDeleteDevice={handleDeleteDevice} />);


      case 'scheduleList':
        return (
          <ScheduleListScreen
            schedules={schedules}
            onBack={() => setCurrentScreen('deviceControl')}
            onAddSchedule={() => {
              setSelectedScheduleId(null);
              setCurrentScreen('schedule');
            }}
            onSelectSchedule={(id) => {
              setSelectedScheduleId(id);
              setCurrentScreen('schedule');
            }}
            onToggleSchedule={(id) =>
            setSchedules((prev) =>
            prev.map((s) =>
            s.id === id ?
            {
              ...s,
              enabled: !s.enabled
            } :
            s
            )
            )
            } />);


      case 'schedule':
        return (
          <ScheduleScreen onBack={() => setCurrentScreen('scheduleList')} />);

      case 'appInfo':
        return <AppInfoScreen onBack={() => setCurrentScreen('more')} />;
      case 'account':
        return (
          <AccountScreen
            user={user}
            onBack={() => setCurrentScreen('more')}
            onUpdateUser={setUser}
            onDeleteAccount={() => goToLogin('login')} />);


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
    <div className="min-h-screen w-full bg-arozen-grey flex items-center justify-center p-4 font-body">
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl shadow-gray-300/50 overflow-hidden border-[8px] border-gray-200 ring-1 ring-black/5">
        {/* Fake Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 z-50 pointer-events-none">
          <span className="text-xs font-semibold text-black">9:41</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-black/80 rounded-sm" />
            <div className="w-4 h-3 bg-black/80 rounded-sm" />
            <div className="w-6 h-3 border border-black/80 rounded-sm p-[1px]">
              <div className="w-full h-full bg-black/80 rounded-[1px]" />
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
          <div className="w-32 h-1 bg-black/30 rounded-full" />
        </div>
      </div>
    </div>);

}