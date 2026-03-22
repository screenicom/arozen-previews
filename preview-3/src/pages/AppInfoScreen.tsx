import React from 'react';
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  FileTextIcon,
  InfoIcon } from
'lucide-react';
interface AppInfoScreenProps {
  onBack: () => void;
}
export function AppInfoScreen({ onBack }: AppInfoScreenProps) {
  return (
    <div className="flex flex-col h-full bg-aaa-charcoal relative">
      <div className="bg-aaa-charcoal-light px-4 pt-14 pb-4 flex justify-between items-center shadow-md shadow-black/20 z-10">
        <button
          onClick={onBack}
          className="p-2 text-aaa-cream/60 hover:text-aaa-cream transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-aaa-cream font-heading">About</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 phone-scroll">
        <div className="bg-aaa-charcoal-light rounded-2xl p-6 shadow-md shadow-black/20 border border-white/10 text-center">
          <div className="w-16 h-16 bg-aaa-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-aaa-sage tracking-tight font-heading">
              A
            </span>
          </div>
          <h2 className="text-xl font-bold text-aaa-cream font-heading">
            Arozen
          </h2>
          <p className="text-sm text-aaa-cream/50 mt-1 font-body">
            Premium Scent Control
          </p>
          <p className="text-xs text-aaa-cream/30 mt-4 font-body">
            Version 1.0.4 (Build 42)
          </p>
        </div>

        <div className="bg-aaa-charcoal-light rounded-2xl shadow-md shadow-black/20 border border-white/10 overflow-hidden">
          <a
            href="#"
            className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors">
            
            <div className="flex items-center space-x-3">
              <InfoIcon className="w-5 h-5 text-aaa-cream/40" />
              <span className="text-sm font-medium text-aaa-cream font-body">
                About Arozen
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-aaa-cream/30 rotate-180" />
          </a>
          <a
            href="https://arozen.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors">
            
            <div className="flex items-center space-x-3">
              <ExternalLinkIcon className="w-5 h-5 text-aaa-cream/40" />
              <span className="text-sm font-medium text-aaa-cream font-body">
                Visit our shop
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-aaa-cream/30 rotate-180" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors">
            
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-aaa-cream/40" />
              <span className="text-sm font-medium text-aaa-cream font-body">
                Privacy Policy
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-aaa-cream/30 rotate-180" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            
            <div className="flex items-center space-x-3">
              <FileTextIcon className="w-5 h-5 text-aaa-cream/40" />
              <span className="text-sm font-medium text-aaa-cream font-body">
                Terms & Conditions
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-aaa-cream/30 rotate-180" />
          </a>
        </div>

        <div className="text-center pt-8">
          <p className="text-xs text-aaa-cream/30 font-body">
            © {new Date().getFullYear()} Arozen Australia. All rights reserved.
          </p>
        </div>
      </div>
    </div>);

}