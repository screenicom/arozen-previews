import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';
interface ContactScreenProps {
  onBack: () => void;
}
const SOCIALS = [
{
  label: 'Instagram',
  href: 'https://www.instagram.com/arozen.official',
  src: 'instagram.svg'
},
{
  label: 'Facebook',
  href: 'https://www.facebook.com/Arozen.Official',
  src: 'facebook.svg'
},
{
  label: 'TikTok',
  href: 'https://www.tiktok.com/@arozen.official',
  src: 'tiktok.svg'
},
{
  label: 'Pinterest',
  href: 'https://au.pinterest.com/arozen_official/',
  src: 'pinterest.svg'
}];

export function ContactScreen({ onBack }: ContactScreenProps) {
  return (
    <div className="flex flex-col h-full wall-bg relative">
      <div className="px-4 pt-14 pb-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Back">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 font-heading">
          Contact Us
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-6 phone-scroll">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-5">
          <p className="text-sm text-gray-700 font-body leading-relaxed">
            Need help or want to reach out? We&rsquo;re here to support you.
          </p>
        </div>

        {/* Ways to reach us */}
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <a
            href="mailto:hello@arozen.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group">
            
            <span className="text-lg leading-none mt-0.5" aria-hidden="true">
              📧
            </span>
            <span className="text-sm font-medium text-gray-900 font-body underline decoration-gray-300 underline-offset-2 group-hover:text-arozen-gold transition-colors">
              hello@arozen.co
            </span>
          </a>
          <div className="flex items-start gap-3">
            <span className="text-lg leading-none mt-0.5" aria-hidden="true">
              💬
            </span>
            <p className="text-sm text-gray-700 font-body leading-relaxed">
              Live chat available on our{' '}
              <a
                href="https://www.arozen.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:text-arozen-gold transition-colors">
                
                website
              </a>{' '}
              from 9am to 6pm AEDT, Monday to Friday
            </p>
          </div>
        </div>

        {/* Follow us */}
        <div className="bg-white rounded-2xl p-5">
          <p className="text-[10px] text-arozen-gold uppercase tracking-[0.3em] font-medium font-body mb-4">
            Follow Us
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) =>
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              
                <img src={`${import.meta.env.BASE_URL}${s.src}`} alt="" className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>);

}