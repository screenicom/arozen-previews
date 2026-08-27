import React from 'react';
interface DaySelectorProps {
  selectedDays: number[];
  onChange: (days: number[]) => void;
}
const DAYS = [
{
  label: 'M',
  value: 0
},
{
  label: 'T',
  value: 1
},
{
  label: 'W',
  value: 2
},
{
  label: 'T',
  value: 3
},
{
  label: 'F',
  value: 4
},
{
  label: 'S',
  value: 5
},
{
  label: 'S',
  value: 6
}];

export function DaySelector({ selectedDays, onChange }: DaySelectorProps) {
  const toggleDay = (dayValue: number) => {
    if (selectedDays.includes(dayValue)) {
      onChange(selectedDays.filter((d) => d !== dayValue));
    } else {
      onChange([...selectedDays, dayValue].sort());
    }
  };
  return (
    <div className="flex justify-between items-center w-full">
      {DAYS.map((day, index) => {
        const isSelected = selectedDays.includes(day.value);
        return (
          <button
            key={`${day.label}-${index}`}
            onClick={() => toggleDay(day.value)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium font-body transition-colors ${isSelected ? 'bg-arozen-black text-white shadow-sm shadow-black/20' : 'bg-white text-gray-500 border border-gray-200'}`}>
            
            {day.label}
          </button>);

      })}
    </div>);

}