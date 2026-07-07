import React from 'react';
import { TrashIcon } from 'lucide-react';
import { TimeBlock } from '../types';
import { INTENSITY_LEVELS } from './IntensityModal';
interface TimeRangeBlockProps {
  block: TimeBlock;
  onChange: (block: TimeBlock) => void;
  onDelete: () => void;
}
export function TimeRangeBlock({
  block,
  onChange,
  onDelete
}: TimeRangeBlockProps) {
  const maxIntensity = INTENSITY_LEVELS.length - 1;
  const intensity = Math.min(Math.max(block.frequency, 0), maxIntensity);
  return (
    <div className="bg-white rounded-2xl p-4 mb-4 relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-300 hover:text-arozen-danger transition-colors p-1">
        
        <TrashIcon className="w-4 h-4" />
      </button>

      <div className="flex items-center space-x-4 mb-5 pr-10">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-body">
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
            className="w-full bg-arozen-grey border border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-black focus:border-transparent" />
          
        </div>
        <div className="text-gray-400 mt-5 font-body">to</div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-body">
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
            className="w-full bg-arozen-grey border border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-black focus:border-transparent" />
          
        </div>
      </div>

      {/* Intensity */}
      <div>
        <label className="block text-xs font-medium text-gray-700 font-body mb-2">
          Intensity
        </label>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={maxIntensity}
            step={1}
            value={intensity}
            onChange={(e) =>
            onChange({
              ...block,
              frequency: Number(e.target.value)
            })
            }
            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer intensity-slider"
            style={{
              background: `linear-gradient(to right, #000000 0%, #000000 ${intensity / maxIntensity * 100}%, #F3F4F6 ${intensity / maxIntensity * 100}%, #F3F4F6 100%)`
            }} />
          
          {/* Tick labels */}
          <div className="relative mt-3 h-4">
            {INTENSITY_LEVELS.map((label, i) =>
            <button
              key={label}
              onClick={() =>
              onChange({
                ...block,
                frequency: i
              })
              }
              className={`absolute top-0 -translate-x-1/2 text-[10px] font-medium font-body transition-colors ${i === intensity ? 'text-arozen-black' : 'text-gray-400'}`}
              style={{
                left: `${i / maxIntensity * 100}%`
              }}>
              
                {label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

}