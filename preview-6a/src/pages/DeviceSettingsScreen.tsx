import React, { useState } from 'react';
import { ChevronLeftIcon, TrashIcon } from 'lucide-react';
import { Device } from '../types';
interface DeviceSettingsScreenProps {
  device: Device;
  onBack: () => void;
  onUpdateDevice: (updated: Device) => void;
  onDeleteDevice: (id: string) => void;
}
export function DeviceSettingsScreen({
  device,
  onBack,
  onUpdateDevice,
  onDeleteDevice
}: DeviceSettingsScreenProps) {
  const [name, setName] = useState(device.name);
  const [pinEnabled, setPinEnabled] = useState(!!device.pin);
  const handleSave = () => {
    onUpdateDevice({
      ...device,
      name
    });
    onBack();
  };
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#E4F1DD] via-[#F8F0DA] to-[#D8E9C9] relative">
      <div className="px-4 pt-14 pb-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 font-heading">
          Device Settings
        </h1>
        <button
          onClick={handleSave}
          className="bg-arozen-black text-white font-medium text-sm font-body px-4 py-2 rounded-lg active:scale-[0.97] transition-transform">
          
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-6 phone-scroll">
        {/* Basic Info */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
          <div className="p-4 border-b border-white/20">
            <label className="block text-xs font-medium text-gray-500 mb-2 font-body">
              Device Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/50 border border-white/20 rounded-lg px-3 py-2 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
            
          </div>
          <div className="p-4 flex justify-between items-center bg-white/30">
            <span className="text-sm font-medium text-gray-500 font-body">
              Model
            </span>
            <span className="text-sm font-medium text-gray-900 capitalize font-body">
              {device.type}
            </span>
          </div>
          <div className="p-4 flex justify-between items-center border-t border-white/20 bg-white/30">
            <span className="text-sm font-medium text-gray-500 font-body">
              Device ID
            </span>
            <span className="text-xs font-mono text-gray-400">{device.id}</span>
          </div>
        </div>

        {/* Vortex Specific Settings */}
        {device.type === 'vortex' &&
        <div className="bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
            <div className="p-4 flex justify-between items-center border-b border-white/20">
              <div>
                <h3 className="text-sm font-medium text-gray-900 font-body">
                  PIN Protection
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-body">
                  Require PIN to control device
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                className="sr-only peer"
                checked={pinEnabled}
                onChange={() => setPinEnabled(!pinEnabled)} />
              
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arozen-gold"></div>
              </label>
            </div>
            {pinEnabled &&
          <button className="w-full p-4 text-left text-sm font-medium text-arozen-gold hover:bg-orange-50 transition-colors font-body">
                Change PIN
              </button>
          }
          </div>
        }

        {/* Danger Zone */}
        <div className="pt-8">
          <button
            onClick={() => onDeleteDevice(device.id)}
            className="w-full bg-transparent border border-arozen-danger/30 text-arozen-danger font-medium py-4 rounded-xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-transform font-body">
            
            <TrashIcon className="w-5 h-5" />
            <span>Delete Device</span>
          </button>
          <p className="text-center text-xs text-gray-400 mt-3 px-4 font-body">
            Deleting this device will remove it from your account and clear all
            schedules.
          </p>
        </div>
      </div>
    </div>);

}