import React from 'react';
import { ChevronRightIcon, InfoIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { BottomTabs } from '../components/BottomTabs';
import { TabKey } from '../types';
interface MoreScreenProps {
  onTabChange: (tab: TabKey) => void;
  onOpenAppInfo: () => void;
  onOpenAccount: () => void;
  onLogout: () => void;
}
export function MoreScreen({
  onTabChange,
  onOpenAppInfo,
  onOpenAccount,
  onLogout
}: MoreScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-bl from-[#D6EAF5] via-[#CFE5DA] to-[#FFF4D6] relative">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 z-10">
        <h1 className="text-2xl font-medium text-gray-900 font-heading">
          More
        </h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-6 phone-scroll">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <MoreRow
            label="About Arozen"
            icon={InfoIcon}
            onClick={onOpenAppInfo} />
          
          <div className="h-px bg-white/20" />
          <MoreRow label="My Account" icon={UserIcon} onClick={onOpenAccount} />
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <MoreRow
            label="Log Out"
            icon={LogOutIcon}
            danger
            onClick={onLogout} />
          
        </div>
      </div>

      <BottomTabs active="more" onSelect={onTabChange} />
    </div>);

}
interface MoreRowProps {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  danger?: boolean;
}
function MoreRow({ label, icon: Icon, onClick, danger }: MoreRowProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full px-6 py-5 flex items-center justify-between hover:bg-white/40 transition-colors text-left">
      
      <div className="flex items-center gap-3">
        <Icon
          className={`w-5 h-5 ${danger ? 'text-arozen-danger' : 'text-gray-400'}`}
          strokeWidth={1.5} />
        
        <span
          className={`text-[17px] font-medium font-heading tracking-tight leading-none ${danger ? 'text-arozen-danger' : 'text-gray-900'}`}>
          
          {label}
        </span>
      </div>
      <ChevronRightIcon
        className={`w-4 h-4 ${danger ? 'text-arozen-danger/50' : 'text-gray-300'} group-hover:text-arozen-gold transition-colors`}
        strokeWidth={1.25} />
      
    </button>);

}