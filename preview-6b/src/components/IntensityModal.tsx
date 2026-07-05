import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
export const INTENSITY_LEVELS = ['1m', '3m', '5m', '10m', '20m', '40m'] as const;
export const INTENSITY_FULL_LABELS = [
'1 minute',
'3 minutes',
'5 minutes',
'10 minutes',
'20 minutes',
'40 minutes'] as
const;
interface IntensityModalProps {
  open: boolean;
  value: number;
  onClose: () => void;
  onChange: (value: number) => void;
}
export function IntensityModal({
  open,
  value,
  onClose,
  onChange
}: IntensityModalProps) {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    if (open) setLocalValue(value);
  }, [open, value]);
  const handleSave = () => {
    onChange(localValue);
    onClose();
  };
  return (
    <AnimatePresence>
      {open &&
      <>
          {/* Backdrop */}
          <motion.div
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
            duration: 0.2
          }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 z-40" />
        
          {/* Sheet */}
          <motion.div
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
            damping: 30,
            stiffness: 300
          }}
          className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl z-50 px-6 pt-5 pb-8 shadow-2xl">
          
            {/* Drag handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-gray-900 font-heading">
                Intensity
              </h2>
              <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close">
              
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Current selection */}
            <div className="text-center my-8">
              <motion.p
              key={localValue}
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="text-3xl font-medium text-arozen-black font-heading">
              
                {INTENSITY_FULL_LABELS[localValue]}
              </motion.p>
              <p className="text-sm text-gray-500 mt-1 font-body">
                Level {localValue + 1} of {INTENSITY_LEVELS.length}
              </p>
            </div>

            {/* Slider */}
            <div className="px-1">
              <input
              type="range"
              min={0}
              max={INTENSITY_LEVELS.length - 1}
              step={1}
              value={localValue}
              onChange={(e) => setLocalValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer intensity-slider"
              style={{
                background: `linear-gradient(to right, #000000 0%, #000000 ${localValue / (INTENSITY_LEVELS.length - 1) * 100}%, #F3F4F6 ${localValue / (INTENSITY_LEVELS.length - 1) * 100}%, #F3F4F6 100%)`
              }} />
            
              {/* Tick labels */}
              <div className="relative mt-3 h-4">
                {INTENSITY_LEVELS.map((label, i) =>
              <button
                key={label}
                onClick={() => setLocalValue(i)}
                className={`absolute top-0 -translate-x-1/2 text-[10px] font-medium font-body transition-colors ${i === localValue ? 'text-arozen-black' : 'text-gray-400'}`}
                style={{
                  left: `${i / (INTENSITY_LEVELS.length - 1) * 100}%`
                }}>
                
                    {label}
                  </button>
              )}
              </div>
            </div>

            {/* Save button */}
            <button
            onClick={handleSave}
            className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl shadow-lg shadow-black/20 active:scale-[0.98] transition-transform font-body mt-8">
            
              Save
            </button>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}