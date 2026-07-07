import React from 'react';
import {
  ChevronLeftIcon,
  ShieldCheckIcon,
  FileTextIcon,
  ExternalLinkIcon,
  MailIcon } from
'lucide-react';
interface AppInfoScreenProps {
  onBack: () => void;
  onOpenContact: () => void;
}
export function AppInfoScreen({ onBack, onOpenContact }: AppInfoScreenProps) {
  return (
    <div className="flex flex-col h-full wall-bg relative">
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
        <div className="bg-white rounded-2xl p-6 text-center">
          <img
            src={`${import.meta.env.BASE_URL}Black_png_-_medium.png`}
            alt="Arozen"
            className="w-36 mx-auto mb-3" />
          
          <p className="text-arozen-gold font-medium tracking-widest text-xs uppercase font-body leading-relaxed">
            <span className="block">Luxury Scenting</span>
            <span className="block">For Your Home & Business</span>
          </p>
        </div>

        {/* Our mission */}
        <div className="bg-white rounded-2xl p-5">
          <p className="text-[10px] text-arozen-gold uppercase tracking-[0.3em] font-medium font-body mb-3">
            Our Mission
          </p>
          <p className="text-sm text-gray-700 font-body leading-relaxed">
            To put it simply, our mission is to enhance living spaces and small
            businesses with luxurious, non-toxic, and eco-friendly fragrances
            inspired by the world&rsquo;s finest hotels and popular luxury
            scents. Through our high-quality aroma diffusers and fragrance oils,
            we aim to create a sensory escape, evoking emotions and ensuring a
            safe, welcoming, elegant, and soothing environment through scent.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          <a
            href="https://arozen.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center space-x-3">
              <ExternalLinkIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 font-body">
                Arozen Online Store
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-gray-300 rotate-180" />
          </a>
          <button
            onClick={onOpenContact}
            className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left">
            
            <div className="flex items-center space-x-3">
              <MailIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 font-body">
                Contact Us
              </span>
            </div>
            <ChevronLeftIcon className="w-5 h-5 text-gray-300 rotate-180" />
          </button>
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