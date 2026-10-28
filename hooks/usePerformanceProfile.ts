import { useState, useEffect } from 'react';
import { detectInitialProfile, PROFILES, PerformanceLevel, PerformanceProfile } from '@/lib/performance-profile';

export function usePerformanceProfile(): PerformanceProfile {
  const [level, setLevel] = useState<PerformanceLevel>('balanced');

  useEffect(() => {
    const initial = detectInitialProfile();
    setLevel(initial);

    // Monitor sustained frame drops if browser supports requestAnimationFrame
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (time: number) => {
      frameCount++;
      if (time - lastTime >= 2000) {
        const fps = (frameCount * 1000) / (time - lastTime);
        if (fps < 24 && level === 'high') {
          setLevel('balanced');
        } else if (fps < 18 && level === 'balanced') {
          setLevel('reduced');
        }
        frameCount = 0;
        lastTime = time;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, [level]);

  return PROFILES[level];
}
