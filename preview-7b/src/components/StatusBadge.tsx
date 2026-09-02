import React from 'react';
interface StatusBadgeProps {
  isOnline: boolean;
}
export function StatusBadge({ isOnline }: StatusBadgeProps) {
  return (
    <div
      className={`flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-medium font-body ${isOnline ? 'bg-arozen-gold/10 text-arozen-gold' : 'bg-gray-100 text-gray-500'}`}>
      
      <div
        className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-arozen-gold' : 'bg-gray-400'}`} />
      
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>);

}