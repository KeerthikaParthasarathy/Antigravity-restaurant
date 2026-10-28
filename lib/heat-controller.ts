export interface HeatPreset {
  id: string;
  label: string;
  value: number;
  description: string;
  color: string;
}

export const HEAT_PRESETS: HeatPreset[] = [
  {
    id: "gentle-royalty",
    label: "Gentle Royalty",
    value: 18,
    description: "Subtle saffron infusion & slow aromatic smoke.",
    color: "#D6B875",
  },
  {
    id: "royal-simmer",
    label: "Royal Simmer",
    value: 55,
    description: "Dum Pukht clay pot braise & active golden embers.",
    color: "#F28C28",
  },
  {
    id: "tandoor-inferno",
    label: "Tandoor Inferno",
    value: 92,
    description: "High-intensity white-hot coals, char glaze & roaring flames.",
    color: "#A83420",
  },
];

export interface VisualHeatParameters {
  flameIntensity: number; // 0.1 to 1.5
  emberCount: number; // 20 to 160
  emberSpeed: number; // 0.5 to 2.5
  emberBrightness: number; // 0.4 to 1.8
  smokeOpacity: number; // 0.15 to 0.75
  smokeSpeed: number; // 0.3 to 1.4
  ambientAmberLight: number; // 0.2 to 2.2
  vesselRimLight: number; // 0.5 to 2.8
  flameColorMix: number; // 0 to 1 (from warm gold to fire amber to deep ember red)
}

export function calculateHeatVisuals(heatValue: number): VisualHeatParameters {
  const norm = Math.max(0, Math.min(100, heatValue)) / 100;

  return {
    flameIntensity: 0.15 + norm * 1.35,
    emberCount: Math.round(25 + norm * 135),
    emberSpeed: 0.6 + norm * 2.0,
    emberBrightness: 0.5 + norm * 1.3,
    smokeOpacity: 0.2 + norm * 0.55,
    smokeSpeed: 0.4 + norm * 1.0,
    ambientAmberLight: 0.3 + norm * 1.9,
    vesselRimLight: 0.6 + norm * 2.2,
    flameColorMix: norm,
  };
}

export function clampHeat(val: number): number {
  return Math.max(0, Math.min(100, Math.round(val)));
}

/**
 * Convert polar angle (degrees, 0 at top or bottom) to heat value 0..100.
 * A 270-degree arc from 135° (bottom-left) around to 405° (bottom-right).
 */
export function angleToHeat(angleDeg: number): number {
  // Normalize angle between 0 and 360
  let normalized = (angleDeg + 360) % 360;
  
  // Rotary arc: starts at 135° (min, 0), passes 270° (top), to 405° / 45° (max, 100)
  // Arc span = 270°
  let relativeAngle = normalized - 135;
  if (relativeAngle < 0) {
    relativeAngle += 360;
  }

  // If pointer is in the dead bottom zone (between 45° and 135°, span 90°)
  if (relativeAngle > 270) {
    // Snap to nearest limit
    return relativeAngle > 315 ? 0 : 100;
  }

  const fraction = relativeAngle / 270;
  return clampHeat(fraction * 100);
}

export function heatToAngle(heat: number): number {
  const clamped = clampHeat(heat);
  const fraction = clamped / 100;
  return 135 + fraction * 270;
}
