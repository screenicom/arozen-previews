import React from 'react';
import { TrashIcon } from 'lucide-react';
import { PresetChips } from './PresetChips';
import { TimeBlock } from '../types';
interface TimeRangeBlockProps {
  block: TimeBlock;
  onChange: (block: TimeBlock) => void;
  onDelete: () => void;
}
const FREQUENCY_OPTIONS = [
{
  label: '1m',
  value: 1
},
{
  label: '3m',
  value: 3
},
{
  label: '5m',
  value: 5
},
{
  label: '10m',
  value: 10
},
{
  label: '20m',
  value: 20
},
{
  label: '30m',
  value: 30
},
{
  label: '40m',
  value: 40
}];

export function TimeRangeBlock({
  block,
  onChange,
  onDelete
}: TimeRangeBlockProps) {
  return (
    <div className="bg-aaa-charcoal-light border border-white/10 rounded-2xl p-4 shadow-md shadow-black/20 mb-4 relative">
      <button
        onClick={onDelete}
        className="absolute top-4 right-4 text-aaa-cream/30 hover:text-aaa-danger transition-colors p-1">
        
        <TrashIcon className="w-4 h-4" />
      </button>

      <div className="flex items-center space-x-4 mb-5 pr-8">
        <div className="flex-1">
          <label className="block text-xs text-aaa-cream/60 mb-1 font-body">
            Start Time
          </label>
          <input
            type="time"
            value={block.startTime}
            onChange={(e) =>
            onChange({
              ...block,
              startTime: e.target.value
            })
            }
            className="w-full bg-aaa-charcoal border border-white/10 rounded-lg px-3 py-2 text-aaa-cream font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent" />
          
        </div>
        <div className="text-aaa-cream/40 mt-5 font-body">to</div>
        <div className="flex-1">
          <label className="block text-xs text-aaa-cream/60 mb-1 font-body">
            End Time
          </label>
          <input
            type="time"
            value={block.endTime}
            onChange={(e) =>
            onChange({
              ...block,
              endTime: e.target.value
            })
            }
            className="w-full bg-aaa-charcoal border border-white/10 rounded-lg px-3 py-2 text-aaa-cream font-body focus:outline-none focus:ring-2 focus:ring-aaa-sage focus:border-transparent" />
          
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-aaa-cream/70 mb-2 font-body">
            Misting Frequency
          </label>
          <PresetChips
            options={FREQUENCY_OPTIONS}
            selectedValue={block.frequency}
            onSelect={(val) =>
            onChange({
              ...block,
              frequency: val as number
            })
            } />
          
        </div>
      </div>
    </div>);

}