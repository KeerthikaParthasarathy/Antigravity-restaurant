export type PerformanceLevel = 'high' | 'balanced' | 'reduced' | 'static';

export interface PerformanceProfile {
  level: PerformanceLevel;
  dpr: number;
  particleMultiplier: number;
  shadowsEnabled: boolean;
  blurQuality: 'high' | 'low' | 'none';
  enableShaders: boolean;
}

export const PROFILES: Record<PerformanceLevel, PerformanceProfile> = {
  high: {
    level: 'high',
    dpr: 2,
    particleMultiplier: 1.0,
    shadowsEnabled: true,
    blurQuality: 'high',
    enableShaders: true,
  },
  balanced: {
    level: 'balanced',
    dpr: 1.5,
    particleMultiplier: 0.7,
    shadowsEnabled: false,
    blurQuality: 'high',
    enableShaders: true,
  },
  reduced: {
    level: 'reduced',
    dpr: 1.0,
    particleMultiplier: 0.35,
    shadowsEnabled: false,
    blurQuality: 'low',
    enableShaders: false,
  },
  static: {
    level: 'static',
    dpr: 1.0,
    particleMultiplier: 0,
    shadowsEnabled: false,
    blurQuality: 'none',
    enableShaders: false,
  },
};

export function detectInitialProfile(): PerformanceLevel {
  if (typeof window === 'undefined') return 'balanced';

  // Check WebGL availability
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'static';
  } catch {
    return 'static';
  }

  // Check hardware concurrency and device memory
  const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
  if (nav.deviceMemory && nav.deviceMemory <= 4) return 'reduced';
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return 'balanced';

  // Check mobile screen width
  if (window.innerWidth < 768) return 'balanced';

  return 'high';
}
