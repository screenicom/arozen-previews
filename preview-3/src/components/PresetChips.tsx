import React from 'react';
import { motion } from 'framer-motion';
interface Option {
  label: string;
  value: number | 'infinite';
}
interface PresetChipsProps {
  options: Option[];
  selectedValue: number | 'infinite';
  onSelect: (value: number | 'infinite') => void;
  disabled?: boolean;
}
export function PresetChips({
  options,
  selectedValue,
  onSelect,
  disabled = false
}: PresetChipsProps) {
  return (
    <div className="flex overflow-x-auto space-x-2 pb-2 pt-1 px-1 -mx-1 phone-scroll">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <motion.button
            key={option.value.toString()}
            whileTap={
            disabled ?
            {} :
            {
              scale: 0.95
            }
            }
            onClick={() => !disabled && onSelect(option.value)}
            disabled={disabled}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-body transition-colors ${isSelected ? 'bg-aaa-sage text-white shadow-md shadow-aaa-sage/20' : 'bg-aaa-charcoal text-aaa-sage border border-aaa-sage/30'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            
            {option.label}
          </motion.button>);

      })}
    </div>);

}