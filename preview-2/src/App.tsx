import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PhoneFrame } from './components/ui/PhoneFrame';
import { SplashScreen } from './components/SplashScreen';
import { EmptyDeviceList } from './components/EmptyDeviceList';
import { DeviceList } from './components/DeviceList';
import type { DiffuserDevice } from './components/DeviceList';
import { PairingFlow } from './components/PairingFlow';
import { DeviceControl } from './components/DeviceControl';
import { DeviceSettings } from './components/DeviceSettings';
type Screen = 'splash' | 'deviceList' | 'pairing' | 'control' | 'settings';
const INITIAL_DEVICES: DiffuserDevice[] = [
{
  id: '1',
  name: 'Living Room',
  isOn: true,
  mistingPreset: 10,
  countdownPreset: '4h',
  countdownRemaining: '2h 34m'
},
{
  id: '2',
  name: 'Bedroom',
  isOn: false,
  mistingPreset: 20,
  countdownPreset: '8h'
},
{
  id: '3',
  name: 'Office',
  isOn: true,
  mistingPreset: 5,
  countdownPreset: 'unlimited'
}];

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-30%' : '30%',
    opacity: 0
  })
};
export function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [prevScreen, setPrevScreen] = useState<Screen>('splash');
  const [devices, setDevices] = useState<DiffuserDevice[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [showEmpty, setShowEmpty] = useState(false);
  const selectedDevice = devices.find((d) => d.id === selectedDeviceId) || null;
  // Navigation direction: 1 = forward, -1 = back
  const getDirection = (from: Screen, to: Screen): number => {
    const order: Screen[] = [
    'splash',
    'deviceList',
    'pairing',
    'control',
    'settings'];

    return order.indexOf(to) >= order.indexOf(from) ? 1 : -1;
  };
  const navigate = useCallback(
    (to: Screen) => {
      setPrevScreen(screen);
      setScreen(to);
    },
    [screen]
  );
  const handleSelectDevice = (id: string) => {
    setSelectedDeviceId(id);
    navigate('control');
  };
  const handlePairingComplete = (name: string) => {
    const newDevice: DiffuserDevice = {
      id: Date.now().toString(),
      name,
      isOn: false,
      mistingPreset: 10,
      countdownPreset: '2h'
    };
    setDevices((prev) => [...prev, newDevice]);
    setShowEmpty(false);
    navigate('deviceList');
  };
  const handleUpdateDevice = (updates: Partial<DiffuserDevice>) => {
    if (!selectedDeviceId) return;
    setDevices((prev) =>
    prev.map((d) =>
    d.id === selectedDeviceId ?
    {
      ...d,
      ...updates
    } :
    d
    )
    );
  };
  const handleRenameDevice = (name: string) => {
    handleUpdateDevice({
      name
    });
  };
  const handleRemoveDevice = () => {
    setDevices((prev) => prev.filter((d) => d.id !== selectedDeviceId));
    setSelectedDeviceId(null);
    navigate('deviceList');
  };
  const direction = getDirection(prevScreen, screen);
  const displayDevices = showEmpty ? [] : devices;
  return (
    <div className="w-full min-h-screen bg-[#0D0D1A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #7C9A8E 0%, transparent 70%)'
          }} />
        
        <div
          className="absolute bottom-[-30%] right-[-15%] w-[70%] h-[70%] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #C4A87C 0%, transparent 70%)'
          }} />
        
      </div>

      <div className="relative z-10">
        <PhoneFrame>
          <AnimatePresence mode="wait" custom={direction}>
            {screen === 'splash' &&
            <motion.div
              key="splash"
              className="w-full h-full"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 0.3
              }}>
              
                <SplashScreen onComplete={() => navigate('deviceList')} />
              </motion.div>
            }

            {screen === 'deviceList' &&
            <motion.div
              key="deviceList"
              className="w-full h-full"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1]
              }}>
              
                {displayDevices.length === 0 ?
              <EmptyDeviceList onAddDiffuser={() => navigate('pairing')} /> :

              <DeviceList
                devices={displayDevices}
                onSelectDevice={handleSelectDevice}
                onAddDiffuser={() => navigate('pairing')} />

              }
              </motion.div>
            }

            {screen === 'pairing' &&
            <motion.div
              key="pairing"
              className="w-full h-full"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1]
              }}>
              
                <PairingFlow
                onComplete={handlePairingComplete}
                onCancel={() => navigate('deviceList')} />
              
              </motion.div>
            }

            {screen === 'control' && selectedDevice &&
            <motion.div
              key="control"
              className="w-full h-full"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1]
              }}>
              
                <DeviceControl
                device={selectedDevice}
                onBack={() => navigate('deviceList')}
                onSettings={() => navigate('settings')}
                onUpdateDevice={handleUpdateDevice} />
              
              </motion.div>
            }

            {screen === 'settings' && selectedDevice &&
            <motion.div
              key="settings"
              className="w-full h-full"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1]
              }}>
              
                <DeviceSettings
                deviceName={selectedDevice.name}
                isConnected={selectedDevice.isOn}
                onBack={() => navigate('control')}
                onRename={handleRenameDevice}
                onRemove={handleRemoveDevice} />
              
              </motion.div>
            }
          </AnimatePresence>
        </PhoneFrame>
      </div>
    </div>);

}