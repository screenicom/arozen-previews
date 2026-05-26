import React from 'react';
import {
  ChevronLeftIcon,
  ShieldCheckIcon,
  FileTextIcon,
  ExternalLinkIcon } from
'lucide-react';
interface AppInfoScreenProps {
  onBack: () => void;
}
export function AppInfoScreen({ onBack }: AppInfoScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#E4F1DD] via-[#F8F0DA] to-[#D8E9C9] relative">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 font-heading">
          About
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-6 phone-scroll">
        <div className="flex flex-col items-center justify-center py-8">
          <img
            src={`${import.meta.env.BASE_URL}Black_png_-_medium.png`}
            alt="Arozen"
            className="w-32 mb-4" />
          
          <p className="text-gray-500 text-sm font-body">Version 1.1.0</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <InfoRow label="Terms of Service" />
          <div className="h-px bg-white/20" />
          <InfoRow label="Privacy Policy" />
          <div className="h-px bg-white/20" />
          <InfoRow label="Support & FAQ" />
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <InfoRow label="Shop Arozen" external />
          <div className="h-px bg-white/20" />
          <InfoRow label="Follow us on Instagram" external />
        </div>

        <div className="text-center pt-2 pb-4 space-y-1">
          <p className="text-xs text-gray-400 font-body">
            Version 1.0.4 (Build 42)
          </p>
          <p className="text-xs text-gray-400 font-body">
            © {new Date().getFullYear()} Arozen Australia. All rights reserved.
          </p>
        </div>
      </div>
    </div>);

}
function InfoRow({ label, external }: InfoRowProps) {
  return (
    <button className="group w-full px-6 py-4 flex items-center justify-between hover:bg-white/40 transition-colors text-left">
      <span className="text-[15px] font-medium text-gray-900 font-heading">
        {label}
      </span>
      <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
    </button>);

}