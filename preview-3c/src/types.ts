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
}

export type Screen =
'splash' |
'onboarding' |
'login' |
'deviceList' |
'deviceControl' |
'deviceSettings' |
'schedule' |
'appInfo' |
'pairingFlow';

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