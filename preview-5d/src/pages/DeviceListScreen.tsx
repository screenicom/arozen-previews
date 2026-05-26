import React from 'react';
import { PlusIcon, ChevronRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Device, TabKey } from '../types';
import { DeviceCard } from '../components/DeviceCard';
import { BottomTabs } from '../components/BottomTabs';
interface DeviceListScreenProps {
  devices: Device[];
  onDeviceSelect: (id: string) => void;
  onTogglePower: (id: string) => void;
  onAddDevice: () => void;
  onTabChange: (tab: TabKey) => void;
}
export function DeviceListScreen({
  devices,
  onDeviceSelect,
  onTogglePower,
  onAddDevice,
  onTabChange
}: DeviceListScreenProps) {
  return (
    <div className="flex flex-col h-full bg-arozen-grey relative">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 z-10">
        <h1 className="text-2xl font-medium text-gray-900 font-heading">
          My Devices
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 phone-scroll">
        {devices.length === 0 ?
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <PlusIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2 font-heading">
              No diffusers yet
            </h2>
            <p className="text-gray-500 mb-8 font-body">
              Add your first Arozen diffuser to start controlling your home's
              scent.
            </p>
            <button
            onClick={onAddDevice}
            className="bg-arozen-black text-white font-medium py-3 px-8 rounded-xl shadow-lg shadow-black/20 active:scale-95 transition-transform font-body">
            
              Add Diffuser
            </button>
          </div> :

        <div className="space-y-2 pb-4">
            <motion.button
            whileTap={{
              scale: 0.98
            }}
            onClick={onAddDevice}
            className="w-full mb-3 bg-white rounded-2xl px-4 py-2.5 flex items-center justify-between font-body shadow-[0_4px_14px_-6px_rgba(60,40,15,0.10),0_1px_3px_-1px_rgba(60,40,15,0.05)]">
            
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <PlusIcon
                  className="w-4 h-4 text-gray-700"
                  strokeWidth={1.75} />
                
                </div>
                <span className="font-medium text-gray-900 text-[15px] font-heading">
                  Add Diffuser
                </span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
            </motion.button>
            {devices.map((device) =>
          <DeviceCard
            key={device.id}
            device={device}
            onClick={() => onDeviceSelect(device.id)}
            onTogglePower={() => onTogglePower(device.id)} />

          )}
          </div>
        }
      </div>

      {/* Shop CTA banner */}
      <a
        href="https://arozen.com.au"
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-arozen-black text-white px-5 py-3 flex items-center justify-between active:scale-[0.99] transition-transform z-10">
        
        <div className="flex items-center space-x-3">
          <img
            src={`${import.meta.env.BASE_URL}F93EBFD6-3848-4EBB-80D4-6895633CF230-LR.jpg`}
            alt="Arozen fragrance bottles"
            className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
          
          <div className="leading-tight">
            <p className="text-sm font-medium font-body">Shop for scents</p>
            <p className="text-xs text-gray-400 font-body">
              Discover the Arozen online store
            </p>
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
      </a>

      <BottomTabs active="devices" onSelect={onTabChange} />
    </div>);

}