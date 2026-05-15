export type DeviceType = 'eon' | 'vortex';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
  isOnline: boolean;
  frequency: number; // in minutes
  countdown: number | 'infinite'; // in hours or infinite
  timeRemaining?: string; // e.g., "2h 34m"
  pin?: string; // Vortex only
  liquidLevel?: number; // Vortex only (0-100)
  batteryLevel?: number; // 0-100
  intensity?: number; // 0-4 (Delicate, Soft, Balanced, Bold, Intense)
}

export type Screen =
'splash' |
'onboarding' |
'login' |
'home' |
'deviceList' |
'deviceControl' |
'deviceSettings' |
'schedule' |
'appInfo' |
'account' |
'more' |
'pairingFlow';

export type TabKey = 'home' | 'shop' | 'devices' | 'more';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface TimeBlock {
  id: string;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  frequency: number;
  countdown: number | 'infinite';
}

export interface DaySchedule {
  day: number; // 0-6 (Mon-Sun)
  blocks: TimeBlock[];
}