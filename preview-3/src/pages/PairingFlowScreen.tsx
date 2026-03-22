import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  BluetoothIcon,
  WifiIcon,
  SearchIcon,
  CheckCircle2Icon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepIndicator } from '../components/StepIndicator';
import { DeviceType } from '../types';
interface PairingFlowScreenProps {
  onCancel: () => void;
  onComplete: (name: string, type: DeviceType, pin?: string) => void;
}
export function PairingFlowScreen({
  onCancel,
  onComplete
}: PairingFlowScreenProps) {
  const [step, setStep] = useState(1);
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [pin, setPin] = useState('');
  const [deviceName, setDeviceName] = useState('New Diffuser');
  const handleNext = () => {
    if (step === 3 && !deviceType) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setDeviceType('vortex');
      }, 2000);
      return;
    }
    if (step === 4 && deviceType === 'eon') {
      setStep(6);
    } else {
      setStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (step === 1) onCancel();else
    setStep((prev) => prev - 1);
  };
  const finishPairing = () => {
    onComplete(deviceName, deviceType || 'eon', pin);
  };
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal relative">
      <div className="px-4 pt-14 pb-4 flex justify-between items-center z-10">
        <button
          onClick={handleBack}
          className="p-2 text-aaa-cream/60 hover:text-aaa-cream transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-aaa-cream font-heading">
          Add Diffuser
        </h1>
        <button
          onClick={onCancel}
          className="p-2 text-aaa-cream/40 hover:text-aaa-cream text-sm font-medium font-body">
          
          Cancel
        </button>
      </div>

      <div className="py-4">
        <StepIndicator currentStep={step} totalSteps={6} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col phone-scroll">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -20
            }}
            transition={{
              duration: 0.2
            }}
            className="flex-1 flex flex-col">
            
            {/* STEP 1: Permissions */}
            {step === 1 &&
            <div className="flex flex-col items-center text-center mt-8">
                <div className="w-20 h-20 bg-aaa-sage/20 rounded-full flex items-center justify-center mb-6">
                  <BluetoothIcon className="w-10 h-10 text-aaa-sage" />
                </div>
                <h2 className="text-2xl font-bold text-aaa-cream mb-3 font-heading">
                  Allow Access
                </h2>
                <p className="text-aaa-cream/60 mb-8 font-body">
                  Arozen needs Bluetooth and Location access to find and connect
                  to your diffuser.
                </p>
                <div className="bg-aaa-charcoal-light rounded-xl p-4 w-full text-left border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle2Icon className="w-5 h-5 text-aaa-sage" />
                    <span className="text-sm font-medium text-aaa-cream/80 font-body">
                      Bluetooth for pairing
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2Icon className="w-5 h-5 text-aaa-sage" />
                    <span className="text-sm font-medium text-aaa-cream/80 font-body">
                      Location for Wi-Fi setup
                    </span>
                  </div>
                </div>
              </div>
            }

            {/* STEP 2: Instructions */}
            {step === 2 &&
            <div className="flex flex-col items-center text-center mt-8">
                <div className="w-48 h-48 bg-aaa-charcoal-light rounded-3xl mb-8 relative overflow-hidden flex items-center justify-center border border-white/10">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-aaa-sage rounded-full animate-pulse" />
                  <span className="text-aaa-cream/40 font-medium font-body">
                    Diffuser Illustration
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-aaa-cream mb-3 font-heading">
                  Pairing Mode
                </h2>
                <p className="text-aaa-cream/60 font-body">
                  Plug in your diffuser and hold the power button for 5 seconds
                  until the indicator light blinks rapidly.
                </p>
              </div>
            }

            {/* STEP 3: Detection */}
            {step === 3 &&
            <div className="flex flex-col items-center text-center mt-8">
                <div className="w-24 h-24 bg-aaa-sage/20 rounded-full flex items-center justify-center mb-6 relative">
                  {isScanning ?
                <>
                      <div className="absolute inset-0 border-4 border-aaa-sage/40 rounded-full animate-ping opacity-75" />
                      <SearchIcon className="w-10 h-10 text-aaa-sage animate-pulse" />
                    </> :
                deviceType ?
                <CheckCircle2Icon className="w-12 h-12 text-aaa-sage" /> :

                <SearchIcon className="w-10 h-10 text-aaa-sage" />
                }
                </div>

                <h2 className="text-2xl font-bold text-aaa-cream mb-3 font-heading">
                  {isScanning ?
                'Looking for devices...' :
                deviceType ?
                'Device Found!' :
                'Ready to scan'}
                </h2>

                <p className="text-aaa-cream/60 mb-8 font-body">
                  {isScanning ?
                'Keep your phone close to the diffuser.' :
                deviceType ?
                `We found an Arozen ${deviceType === 'vortex' ? 'Vortex' : 'Eon'}.` :
                'Make sure your device is in pairing mode.'}
                </p>

                {deviceType &&
              <div className="w-full bg-aaa-charcoal-light border-2 border-aaa-sage rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-aaa-sage/20 rounded-full flex items-center justify-center">
                        <BluetoothIcon className="w-5 h-5 text-aaa-sage" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-aaa-cream font-body">
                          Arozen {deviceType === 'vortex' ? 'Vortex' : 'Eon'}
                        </p>
                        <p className="text-xs text-aaa-cream/50 font-body">
                          Ready to connect
                        </p>
                      </div>
                    </div>
                  </div>
              }
              </div>
            }

            {/* STEP 4: Wi-Fi */}
            {step === 4 &&
            <div className="flex flex-col mt-4">
                <div className="flex items-center justify-center w-16 h-16 bg-aaa-sage/20 rounded-full mx-auto mb-6">
                  <WifiIcon className="w-8 h-8 text-aaa-sage" />
                </div>
                <h2 className="text-2xl font-bold text-aaa-cream mb-2 text-center font-heading">
                  Connect to Wi-Fi
                </h2>
                <p className="text-aaa-cream/60 mb-8 text-center text-sm font-body">
                  Your diffuser needs a 2.4GHz Wi-Fi connection to work
                  remotely.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
                      Wi-Fi Network
                    </label>
                    <input
                    type="text"
                    defaultValue="Home_Network_2.4G"
                    className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
                      Password
                    </label>
                    <input
                    type="password"
                    placeholder="Enter Wi-Fi password"
                    className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream placeholder-aaa-cream/30 font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-aaa-cream/70 mb-1 font-body">
                      Name your diffuser
                    </label>
                    <input
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="w-full bg-aaa-charcoal-light border border-white/10 rounded-xl px-4 py-3 text-aaa-cream font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage" />
                  
                  </div>
                </div>
              </div>
            }

            {/* STEP 5: PIN (Vortex Only) */}
            {step === 5 &&
            <div className="flex flex-col items-center text-center mt-8">
                <h2 className="text-2xl font-bold text-aaa-cream mb-3 font-heading">
                  Set a PIN
                </h2>
                <p className="text-aaa-cream/60 mb-8 font-body">
                  Your Vortex diffuser supports PIN protection to prevent
                  unauthorized changes.
                </p>

                <div className="flex space-x-4 mb-8">
                  {[0, 1, 2, 3].map((i) =>
                <input
                  key={i}
                  type="password"
                  maxLength={1}
                  value={pin[i] || ''}
                  onChange={(e) => {
                    const newPin = pin.split('');
                    newPin[i] = e.target.value;
                    setPin(newPin.join(''));
                  }}
                  className="w-14 h-16 text-center text-2xl font-bold bg-aaa-charcoal-light border border-white/10 rounded-xl text-aaa-cream font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent" />

                )}
                </div>
                <button
                onClick={() => setStep(6)}
                className="text-aaa-cream/40 text-sm font-medium hover:text-aaa-cream/60 font-body">
                
                  Skip for now
                </button>
              </div>
            }

            {/* STEP 6: Success */}
            {step === 6 &&
            <div className="flex flex-col items-center text-center mt-12">
                <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                transition={{
                  type: 'spring',
                  bounce: 0.5
                }}
                className="w-24 h-24 bg-aaa-sage/20 rounded-full flex items-center justify-center mb-6">
                
                  <CheckCircle2Icon className="w-12 h-12 text-aaa-sage" />
                </motion.div>
                <h2 className="text-2xl font-bold text-aaa-cream mb-3 font-heading">
                  Successfully Paired!
                </h2>
                <p className="text-aaa-cream/60 font-body">
                  Your {deviceName} is now connected and ready to use.
                </p>
              </div>
            }
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto pt-6">
          <button
            onClick={step === 6 ? finishPairing : handleNext}
            disabled={isScanning || step === 3 && !deviceType && isScanning}
            className={`w-full font-semibold py-4 rounded-xl shadow-lg transition-all font-body ${isScanning ? 'bg-aaa-charcoal-light text-aaa-cream/30 cursor-not-allowed' : 'bg-aaa-sage text-white shadow-aaa-sage/20 active:scale-[0.98]'}`}>
            
            {step === 1 ?
            'Grant Permissions' :
            step === 2 ?
            'Ready' :
            step === 3 && !deviceType ?
            'Scan for Device' :
            step === 6 ?
            'Go to Device' :
            'Next'}
          </button>
        </div>
      </div>
    </div>);

}