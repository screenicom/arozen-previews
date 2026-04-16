import React from 'react';
interface StatusBadgeProps {
  isOnline: boolean;
}
export function StatusBadge({ isOnline }: StatusBadgeProps) {
  return (
    <div
      className={`flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-medium font-body ${isOnline ? 'bg-arozen-gold/20 text-arozen-gold' : 'bg-white/10 text-white/50'}`}>
      
      <div
        className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-arozen-gold' : 'bg-white/30'}`} />
      
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>);

}