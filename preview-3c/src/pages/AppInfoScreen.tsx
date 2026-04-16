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
    <div className="flex flex-col h-full bg-arozen-grey relative">
      <div className="bg-white px-4 pt-14 pb-4 flex justify-between items-center shadow-sm shadow-gray-200 z-10">
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

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 phone-scroll">
        <div className="bg-white rounded-2xl p-6 shadow-sm shadow-gray-200 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-arozen-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-medium text-arozen-gold tracking-tight font-heading">
              A
            </span>
          </div>
          <h2 className="text-xl font-medium text-gray-900 font-heading">
            Arozen
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-body">
            Premium Scent Control
          </p>
          <p className="text-xs text-gray-400 mt-4 font-body">
            Version 1.0.4 (Build 42)
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm shadow-gray-200 border border-gray-200 overflow-hidden">
          <a
            href="#"
            className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center space-x-3">
              <InfoIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 font-body">
                About Arozen
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-gray-300 rotate-180" />
          </a>
          <a
            href="https://arozen.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center space-x-3">
              <ExternalLinkIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 font-body">
                Visit our shop
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-gray-300 rotate-180" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 font-body">
                Privacy Policy
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-gray-300 rotate-180" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center space-x-3">
              <FileTextIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 font-body">
                Terms & Conditions
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-gray-300 rotate-180" />
          </a>
        </div>

        <div className="text-center pt-8">
          <p className="text-xs text-gray-400 font-body">
            © {new Date().getFullYear()} Arozen Australia. All rights reserved.
          </p>
        </div>
      </div>
    </div>);

}