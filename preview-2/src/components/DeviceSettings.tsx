import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, TrashIcon, WifiIcon } from 'lucide-react';
import { StatusDot } from './ui/StatusDot';
interface DeviceSettingsProps {
  deviceName: string;
  isConnected: boolean;
  onBack: () => void;
  onRename: (name: string) => void;
  onRemove: () => void;
}
export function DeviceSettings({
  deviceName,
  isConnected,
  onBack,
  onRename,
  onRemove
}: DeviceSettingsProps) {
  const [name, setName] = useState(deviceName);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    if (name.trim()) {
      onRename(name.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };
  return (
    <div className="w-full h-full bg-aaa-charcoal flex flex-col relative">
      {/* Header */}
      <div className="pt-16 px-6 pb-6 flex items-center gap-4">
        <motion.button
          onClick={onBack}
          whileTap={{
            scale: 0.9
          }}
          className="w-9 h-9 rounded-full bg-aaa-cream/5 flex items-center justify-center cursor-pointer"
          aria-label="Go back">
          
          <ArrowLeftIcon size={18} className="text-aaa-cream/60" />
        </motion.button>
        <h1 className="font-heading text-lg text-aaa-cream font-medium">
          Device Settings
        </h1>
      </div>

      <div className="flex-1 px-6 overflow-y-auto phone-scroll">
        {/* Rename section */}
        <div className="mb-8">
          <label className="font-body text-xs font-semibold text-aaa-cream/50 uppercase tracking-wider mb-3 block">
            Device Name
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-aaa-cream/5 border border-aaa-cream/10 rounded-xl px-4 py-3 font-body text-sm text-aaa-cream placeholder-aaa-cream/20 outline-none focus:border-aaa-sage/40 transition-colors"
              placeholder="Enter name"
              maxLength={24} />
            
            <motion.button
              onClick={handleSave}
              whileTap={{
                scale: 0.95
              }}
              className={`px-5 py-3 rounded-xl font-body text-sm font-semibold cursor-pointer transition-colors ${saved ? 'bg-aaa-sage/20 text-aaa-sage' : 'bg-aaa-sage text-aaa-charcoal'}`}>
              
              {saved ? 'Saved!' : 'Save'}
            </motion.button>
          </div>
        </div>

        {/* Device info */}
        <div className="mb-8">
          <h3 className="font-body text-xs font-semibold text-aaa-cream/50 uppercase tracking-wider mb-3">
            Device Info
          </h3>
          <div className="bg-aaa-cream/[0.03] border border-aaa-cream/[0.06] rounded-2xl overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-aaa-cream/[0.04]">
              <span className="font-body text-sm text-aaa-cream/50">Model</span>
              <span className="font-body text-sm text-aaa-cream">
                Arozen Diffuser v1
              </span>
            </div>
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-aaa-cream/[0.04]">
              <span className="font-body text-sm text-aaa-cream/50">
                Firmware
              </span>
              <span className="font-body text-sm text-aaa-cream/60">1.0.2</span>
            </div>
            <div className="px-4 py-3.5 flex items-center justify-between">
              <span className="font-body text-sm text-aaa-cream/50">
                Connection
              </span>
              <div className="flex items-center gap-2">
                <StatusDot status={isConnected ? 'on' : 'off'} />
                <span
                  className={`font-body text-sm ${isConnected ? 'text-aaa-sage' : 'text-aaa-cream/40'}`}>
                  
                  {isConnected ? 'Connected' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="mb-8">
          <h3 className="font-body text-xs font-semibold text-aaa-cream/50 uppercase tracking-wider mb-3">
            Danger Zone
          </h3>
          <motion.button
            onClick={() => setShowConfirm(true)}
            whileTap={{
              scale: 0.98
            }}
            className="w-full flex items-center gap-3 bg-aaa-danger/[0.06] border border-aaa-danger/10 rounded-2xl px-4 py-3.5 cursor-pointer">
            
            <div className="w-9 h-9 rounded-xl bg-aaa-danger/10 flex items-center justify-center">
              <TrashIcon size={16} className="text-aaa-danger" />
            </div>
            <div className="text-left">
              <p className="font-body text-sm font-medium text-aaa-danger">
                Remove Diffuser
              </p>
              <p className="font-body text-xs text-aaa-cream/25">
                Unpair and forget this device
              </p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {showConfirm &&
        <>
            <motion.div
            className="absolute inset-0 bg-black/60 z-40"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowConfirm(false)} />
          
            <motion.div
            className="absolute bottom-0 left-0 right-0 z-50 bg-aaa-charcoal-light border-t border-aaa-cream/[0.06] rounded-t-3xl px-6 pt-6 pb-10"
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}>
            
              <div className="w-10 h-1 bg-aaa-cream/10 rounded-full mx-auto mb-6" />
              <h3 className="font-heading text-lg text-aaa-cream text-center mb-2">
                Remove Diffuser?
              </h3>
              <p className="font-body text-sm text-aaa-cream/40 text-center mb-6 leading-relaxed">
                You will need to re-pair this diffuser to use it again. This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                onClick={() => setShowConfirm(false)}
                whileTap={{
                  scale: 0.97
                }}
                className="flex-1 py-3.5 rounded-full bg-aaa-cream/5 font-body text-sm font-medium text-aaa-cream cursor-pointer">
                
                  Cancel
                </motion.button>
                <motion.button
                onClick={() => {
                  setShowConfirm(false);
                  onRemove();
                }}
                whileTap={{
                  scale: 0.97
                }}
                className="flex-1 py-3.5 rounded-full bg-aaa-danger font-body text-sm font-semibold text-white cursor-pointer">
                
                  Remove
                </motion.button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}