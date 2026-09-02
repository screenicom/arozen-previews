import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, ShoppingBagIcon, DropletIcon, MenuIcon } from 'lucide-react';
import { TabKey } from '../types';
interface BottomTabsProps {
  active: TabKey;
  onSelect: (tab: TabKey) => void;
}
const TABS: {
  key: TabKey;
  label: string;
  icon: React.ElementType;
  href?: string;
}[] = [
{
  key: 'home',
  label: 'Home',
  icon: HomeIcon
},
{
  key: 'devices',
  label: 'My Devices',
  icon: DropletIcon
},
{
  key: 'shop',
  label: 'Shop',
  icon: ShoppingBagIcon,
  href: 'https://arozen.com.au'
},
{
  key: 'more',
  label: 'More',
  icon: MenuIcon
}];

export function BottomTabs({ active, onSelect }: BottomTabsProps) {
  return (
    <nav
      aria-label="Primary"
      className="bg-white border-t border-black/[0.06] px-2 pt-3 pb-5 flex items-stretch justify-around z-20">
      
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        const content =
        <motion.div
          whileTap={{
            scale: 0.94
          }}
          className={`flex flex-col items-center justify-center gap-1.5 py-2 px-2 min-w-[56px] rounded-xl transition-colors ${isActive ? 'text-arozen-gold' : 'text-gray-400 hover:text-gray-600'}`}>
          
            <Icon
            className="w-[22px] h-[22px]"
            strokeWidth={isActive ? 2 : 1.6}
            aria-hidden />
          
            <span
            className={`text-[10px] font-body leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
            
              {tab.label}
            </span>
          </motion.div>;

        if (tab.href) {
          return (
            <a
              key={tab.key}
              href={tab.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center"
              aria-label={tab.label}>
              
              {content}
            </a>);

        }
        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className="flex-1 flex items-center justify-center"
            aria-current={isActive ? 'page' : undefined}
            aria-label={tab.label}>
            
            {content}
          </button>);

      })}
    </nav>);

}