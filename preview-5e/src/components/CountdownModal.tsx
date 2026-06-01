import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
export const COUNTDOWN_VALUES = [1, 2, 4, 8, 'infinite'] as const;
export const COUNTDOWN_LABELS = ['1h', '2h', '4h', '8h', '∞'] as const;
export type CountdownValue = (typeof COUNTDOWN_VALUES)[number];
interface CountdownModalProps {
  open: boolean;
  value: CountdownValue;
  onClose: () => void;
  onChange: (value: CountdownValue) => void;
}
function valueToIndex(value: CountdownValue): number {
  const idx = COUNTDOWN_VALUES.findIndex((v) => v === value);
  return idx === -1 ? 0 : idx;
}
export function CountdownModal({
  open,
  value,
  onClose,
  onChange
}: CountdownModalProps) {
  const [localIndex, setLocalIndex] = useState(valueToIndex(value));
  useEffect(() => {
    if (open) setLocalIndex(valueToIndex(value));
  }, [open, value]);
  const handleSave = () => {
    onChange(COUNTDOWN_VALUES[localIndex]);
    onClose();
  };
  const fillPercent = localIndex / (COUNTDOWN_VALUES.length - 1) * 100;
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
                Countdown Timer
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
              key={localIndex}
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
              className="text-3xl font-medium text-gray-900 font-heading">
              
                {COUNTDOWN_VALUES[localIndex] === 'infinite' ?
              'Continuous' :
              `${COUNTDOWN_VALUES[localIndex]} hour${COUNTDOWN_VALUES[localIndex] === 1 ? '' : 's'}`}
              </motion.p>
              <p className="text-sm text-gray-500 mt-1 font-body">
                {COUNTDOWN_VALUES[localIndex] === 'infinite' ?
              'Run until turned off' :
              `Auto-stop after ${COUNTDOWN_LABELS[localIndex]}`}
              </p>
            </div>

            {/* Slider */}
            <div className="px-1">
              <input
              type="range"
              min={0}
              max={COUNTDOWN_VALUES.length - 1}
              step={1}
              value={localIndex}
              onChange={(e) => setLocalIndex(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer intensity-slider"
              style={{
                background: `linear-gradient(to right, #000000 0%, #000000 ${fillPercent}%, #F3F4F6 ${fillPercent}%, #F3F4F6 100%)`
              }} />
            
              {/* Tick labels */}
              <div className="flex justify-between mt-3 px-1">
                {COUNTDOWN_LABELS.map((label, i) =>
              <button
                key={label}
                onClick={() => setLocalIndex(i)}
                className={`text-xs font-medium font-body transition-colors ${i === localIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                
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