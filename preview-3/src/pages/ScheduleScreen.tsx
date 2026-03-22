import React, { useState } from 'react';
import { ChevronLeftIcon, PlusIcon } from 'lucide-react';
import { DaySelector } from '../components/DaySelector';
import { TimeRangeBlock } from '../components/TimeRangeBlock';
import { TimeBlock } from '../types';
interface ScheduleScreenProps {
  onBack: () => void;
}
const INITIAL_BLOCKS: TimeBlock[] = [
{
  id: '1',
  startTime: '07:00',
  endTime: '09:00',
  frequency: 5,
  countdown: 'infinite'
},
{
  id: '2',
  startTime: '18:00',
  endTime: '22:00',
  frequency: 10,
  countdown: 'infinite'
}];

export function ScheduleScreen({ onBack }: ScheduleScreenProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [blocks, setBlocks] = useState<TimeBlock[]>(INITIAL_BLOCKS);
  const handleAddBlock = () => {
    const newBlock: TimeBlock = {
      id: Math.random().toString(36).substr(2, 9),
      startTime: '12:00',
      endTime: '13:00',
      frequency: 10,
      countdown: 'infinite'
    };
    setBlocks([...blocks, newBlock]);
  };
  const handleUpdateBlock = (updated: TimeBlock) => {
    setBlocks(blocks.map((b) => b.id === updated.id ? updated : b));
  };
  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal relative">
      <div className="bg-aaa-charcoal-light px-4 pt-14 pb-4 flex justify-between items-center shadow-md shadow-black/20 z-10">
        <button
          onClick={onBack}
          className="p-2 text-aaa-cream/60 hover:text-aaa-cream transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-aaa-cream font-heading">
          Schedule
        </h1>
        <button
          onClick={onBack}
          className="p-2 text-aaa-sage font-medium text-sm font-body">
          
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 phone-scroll">
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-aaa-cream mb-4 font-body">
            Active Days
          </h2>
          <DaySelector selectedDays={selectedDays} onChange={setSelectedDays} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-aaa-cream font-body">
              Time Blocks
            </h2>
            <span className="text-xs text-aaa-cream/50 font-body">
              {blocks.length} active
            </span>
          </div>

          <div className="space-y-4">
            {blocks.map((block) =>
            <TimeRangeBlock
              key={block.id}
              block={block}
              onChange={handleUpdateBlock}
              onDelete={() => handleDeleteBlock(block.id)} />

            )}
          </div>

          <button
            onClick={handleAddBlock}
            className="w-full mt-4 border-2 border-dashed border-aaa-sage/30 text-aaa-cream/50 font-medium py-4 rounded-2xl flex items-center justify-center space-x-2 hover:border-aaa-sage hover:text-aaa-sage transition-colors font-body">
            
            <PlusIcon className="w-5 h-5" />
            <span>Add Time Block</span>
          </button>
        </div>

        <div className="h-12" />
      </div>
    </div>);

}