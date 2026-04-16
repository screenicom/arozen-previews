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
    <div className="flex flex-col h-full bg-black relative">
      <div className="bg-arozen-dark px-4 pt-14 pb-4 flex justify-between items-center shadow-md shadow-black/40 z-10">
        <button
          onClick={onBack}
          className="p-2 text-white/60 hover:text-white transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-white font-heading">
          Device Settings
        </h1>
        <button
          onClick={handleSave}
          className="p-2 text-arozen-gold font-medium text-sm font-body">
          
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 phone-scroll">
        {/* Basic Info */}
        <div className="bg-arozen-dark rounded-2xl shadow-md shadow-black/40 border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <label className="block text-xs font-medium text-white/50 mb-1 font-body">
              Device Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-white font-medium bg-transparent focus:outline-none focus:text-arozen-gold font-body" />
            
          </div>
          <div className="p-4 flex justify-between items-center bg-white/5">
            <span className="text-sm font-medium text-white/50 font-body">
              Model
            </span>
            <span className="text-sm font-medium text-white capitalize font-body">
              {device.type}
            </span>
          </div>
          <div className="p-4 flex justify-between items-center border-t border-white/10 bg-white/5">
            <span className="text-sm font-medium text-white/50 font-body">
              Device ID
            </span>
            <span className="text-xs font-mono text-white/40">{device.id}</span>
          </div>
        </div>

        {/* Vortex Specific Settings */}
        {device.type === 'vortex' &&
        <div className="bg-arozen-dark rounded-2xl shadow-md shadow-black/40 border border-white/10 overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
              <div>
                <h3 className="text-sm font-medium text-white font-body">
                  PIN Protection
                </h3>
                <p className="text-xs text-white/50 mt-0.5 font-body">
                  Require PIN to control device
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                className="sr-only peer"
                checked={pinEnabled}
                onChange={() => setPinEnabled(!pinEnabled)} />
              
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arozen-gold"></div>
              </label>
            </div>
            {pinEnabled &&
          <button className="w-full p-4 text-left text-sm font-medium text-arozen-gold hover:bg-arozen-gold/10 transition-colors font-body">
                Change PIN
              </button>
          }
          </div>
        }

        {/* Danger Zone */}
        <div className="pt-8">
          <button
            onClick={() => onDeleteDevice(device.id)}
            className="w-full bg-transparent border border-arozen-danger/30 text-arozen-danger font-medium py-4 rounded-xl shadow-sm flex items-center justify-center space-x-2 active:scale-[0.98] transition-transform font-body">
            
            <TrashIcon className="w-5 h-5" />
            <span>Delete Device</span>
          </button>
          <p className="text-center text-xs text-white/40 mt-3 px-4 font-body">
            Deleting this device will remove it from your account and clear all
            schedules.
          </p>
        </div>
      </div>
    </div>);

}