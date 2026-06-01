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
  const [deviceName, setDeviceName] = useState('My Eon');
  const handleNext = () => {
    if (step === 3 && !deviceType) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setDeviceType('eon');
      }, 2000);
      return;
    }
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    if (step === 1) onCancel();else
    setStep((prev) => prev - 1);
  };
  const finishPairing = () => {
    onComplete(deviceName, deviceType || 'eon');
  };
  return (
    <div className="flex flex-col h-full wall-bg relative">
      <div className="px-4 pt-14 pb-4 flex justify-between items-center z-10">
        <button
          onClick={handleBack}
          className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 font-heading">
          Add Diffuser
        </h1>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-900 text-sm font-medium font-body">
          
          Cancel
        </button>
      </div>

      <div className="py-4">
        <StepIndicator currentStep={step} totalSteps={5} />
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
                <div className="w-20 h-20 bg-arozen-gold/10 rounded-full flex items-center justify-center mb-6">
                  <BluetoothIcon className="w-10 h-10 text-arozen-gold" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-3 font-heading">
                  Allow Access
                </h2>
                <p className="text-gray-500 mb-8 font-body">
                  Arozen needs Bluetooth and Location access to find and connect
                  to your diffuser.
                </p>
                <div className="bg-arozen-grey rounded-xl p-4 w-full text-left">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle2Icon className="w-5 h-5 text-arozen-gold" />
                    <span className="text-sm font-medium text-gray-700 font-body">
                      Bluetooth for pairing
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2Icon className="w-5 h-5 text-arozen-gold" />
                    <span className="text-sm font-medium text-gray-700 font-body">
                      Location for Wi-Fi setup
                    </span>
                  </div>
                </div>
              </div>
            }

            {/* STEP 2: Instructions */}
            {step === 2 &&
            <div className="flex flex-col items-center text-center mt-8">
                <div className="w-48 h-48 bg-arozen-grey rounded-3xl mb-8 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-arozen-gold rounded-full animate-pulse" />
                  <span className="text-gray-400 font-medium font-body">
                    Diffuser Illustration
                  </span>
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-3 font-heading">
                  Pairing Mode
                </h2>
                <p className="text-gray-500 font-body">
                  Plug in your diffuser and hold the power button for 5 seconds
                  until the indicator light blinks rapidly.
                </p>
              </div>
            }

            {/* STEP 3: Detection */}
            {step === 3 &&
            <div className="flex flex-col items-center text-center mt-8">
                <div className="w-24 h-24 bg-arozen-gold/10 rounded-full flex items-center justify-center mb-6 relative">
                  {isScanning ?
                <>
                      <div className="absolute inset-0 border-4 border-arozen-gold/40 rounded-full animate-ping opacity-75" />
                      <SearchIcon className="w-10 h-10 text-arozen-gold animate-pulse" />
                    </> :
                deviceType ?
                <CheckCircle2Icon className="w-12 h-12 text-arozen-gold" /> :

                <SearchIcon className="w-10 h-10 text-arozen-gold" />
                }
                </div>

                <h2 className="text-2xl font-medium text-gray-900 mb-3 font-heading">
                  {isScanning ?
                'Looking for devices...' :
                deviceType ?
                'Device Found!' :
                'Ready to scan'}
                </h2>

                <p className="text-gray-500 mb-8 font-body">
                  {isScanning ?
                'Keep your phone close to the diffuser.' :
                deviceType ?
                'We found an Arozen Eon.' :
                'Make sure your device is in pairing mode.'}
                </p>

                {deviceType &&
              <div className="w-full bg-arozen-grey border-2 border-arozen-gold rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-arozen-gold/10 rounded-full flex items-center justify-center">
                        <BluetoothIcon className="w-5 h-5 text-arozen-gold" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900 font-body">
                          Arozen Eon
                        </p>
                        <p className="text-xs text-gray-500 font-body">
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
                <div className="flex items-center justify-center w-16 h-16 bg-arozen-gold/10 rounded-full mx-auto mb-6">
                  <WifiIcon className="w-8 h-8 text-arozen-gold" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-2 text-center font-heading">
                  Connect to Wi-Fi
                </h2>
                <p className="text-gray-500 mb-8 text-center text-sm font-body">
                  Your diffuser needs a 2.4GHz Wi-Fi connection to work
                  remotely.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
                      Wi-Fi Network
                    </label>
                    <input
                    type="text"
                    defaultValue="Home_Network_2.4G"
                    className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
                      Password
                    </label>
                    <input
                    type="password"
                    placeholder="Enter Wi-Fi password"
                    className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold" />
                  
                  </div>
                </div>
              </div>
            }

            {/* STEP 5: Success */}
            {step === 5 &&
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
                className="w-24 h-24 bg-arozen-gold/10 rounded-full flex items-center justify-center mb-6">
                
                  <CheckCircle2Icon className="w-12 h-12 text-arozen-gold" />
                </motion.div>
                <h2 className="text-2xl font-medium text-gray-900 mb-3 font-heading">
                  Successfully Paired!
                </h2>
                <p className="text-gray-500 font-body mb-8">
                  Give your new diffuser a name.
                </p>

                <div className="w-full text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
                    Diffuser Name
                  </label>
                  <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold" />
                
                </div>
              </div>
            }
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto pt-6">
          <button
            onClick={step === 5 ? finishPairing : handleNext}
            disabled={isScanning || step === 3 && !deviceType && isScanning}
            className={`w-full font-medium py-4 rounded-xl shadow-lg transition-all font-body ${isScanning ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-arozen-black text-white shadow-black/20 active:scale-[0.98]'}`}>
            
            {step === 1 ?
            'Grant Permissions' :
            step === 2 ?
            'Ready' :
            step === 3 && !deviceType ?
            'Scan for Device' :
            step === 5 ?
            'Go to Device' :
            'Next'}
          </button>
        </div>
      </div>
    </div>);

}