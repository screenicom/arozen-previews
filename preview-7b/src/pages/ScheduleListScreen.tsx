import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { Schedule } from '../types';
interface ScheduleListScreenProps {
  schedules: Schedule[];
  onBack: () => void;
  onAddSchedule: () => void;
  onSelectSchedule: (id: string) => void;
  onToggleSchedule: (id: string) => void;
}
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
function formatDays(days: number[]): string {
  const sorted = [...days].sort((a, b) => a - b);
  if (sorted.length === 7) return 'Every day';
  if (
  sorted.length === 5 &&
  sorted.every((d, i) => d === i) // 0-4
  )
  return 'Weekdays';
  if (sorted.length === 2 && sorted[0] === 5 && sorted[1] === 6)
  return 'Weekends';
  if (sorted.length === 0) return 'No days';
  return sorted.map((d) => DAY_LABELS[d]).join(', ');
}
function formatStartTime(schedule: Schedule): string {
  if (schedule.blocks.length === 0) return '—';
  const earliest = [...schedule.blocks].sort((a, b) =>
  a.startTime.localeCompare(b.startTime)
  )[0];
  return earliest.startTime;
}
function formatRunTimes(schedule: Schedule): string {
  const count = schedule.blocks.length;
  if (count === 0) return 'No run times';
  return `${count} run time${count > 1 ? 's' : ''}`;
}
export function ScheduleListScreen({
  schedules,
  onBack,
  onAddSchedule,
  onSelectSchedule,
  onToggleSchedule
}: ScheduleListScreenProps) {
  return (
    <div className="flex flex-col h-full wall-bg relative">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Back">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 font-heading">
          Schedule
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 phone-scroll">
        {/* Add Schedule */}
        <motion.button
          whileTap={{
            scale: 0.98
          }}
          onClick={onAddSchedule}
          className="w-full mb-3 bg-white rounded-2xl px-4 py-2.5 flex items-center justify-between font-body shadow-[0_4px_14px_-6px_rgba(60,40,15,0.10),0_1px_3px_-1px_rgba(60,40,15,0.05)]">
          
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <PlusIcon className="w-4 h-4 text-gray-700" strokeWidth={1.75} />
            </div>
            <span className="font-medium text-gray-900 text-[15px] font-heading">
              Add Schedule
            </span>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
        </motion.button>

        {/* Schedule list */}
        {schedules.length === 0 ?
        <div className="flex flex-col items-center text-center mt-16 px-6">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-[0_4px_14px_-6px_rgba(60,40,15,0.10)]">
              <ClockIcon className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
            </div>
            <p className="text-gray-900 font-medium font-heading mb-1">
              No schedules yet
            </p>
            <p className="text-sm text-gray-500 font-body">
              Create a schedule to automate your diffuser.
            </p>
          </div> :

        <ul className="space-y-3">
            {schedules.map((schedule) =>
          <li key={schedule.id}>
                <motion.div
              whileTap={{
                scale: 0.99
              }}
              onClick={() => onSelectSchedule(schedule.id)}
              className="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-[0_4px_14px_-6px_rgba(60,40,15,0.10),0_1px_3px_-1px_rgba(60,40,15,0.05)]">
              
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex items-baseline gap-2">
                      <span
                    className={`text-2xl font-medium font-heading ${schedule.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                    
                        {formatStartTime(schedule)}
                      </span>
                    </div>
                    <p
                  className={`text-sm font-body mt-0.5 ${schedule.enabled ? 'text-gray-600' : 'text-gray-400'}`}>
                  
                      {formatDays(schedule.days)}
                    </p>
                    <p className="text-xs text-gray-400 font-body mt-1">
                      {formatRunTimes(schedule)}
                    </p>
                  </div>

                  {/* On/off switch */}
                  <label
                className="relative inline-flex items-center cursor-pointer flex-shrink-0"
                onClick={(e) => e.stopPropagation()}>
                
                    <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={schedule.enabled}
                  onChange={() => onToggleSchedule(schedule.id)} />
                
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arozen-black" />
                  </label>
                </motion.div>
              </li>
          )}
          </ul>
        }
      </div>
    </div>);

}