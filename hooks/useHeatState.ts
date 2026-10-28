import { create } from 'zustand';
import { HEAT_PRESETS, calculateHeatVisuals, clampHeat, VisualHeatParameters } from '@/lib/heat-controller';

interface HeatStoreState {
  heatValue: number;
  activePresetId: string | null;
  visuals: VisualHeatParameters;
  isDragging: boolean;
  setHeatValue: (value: number) => void;
  setPreset: (presetId: string) => void;
  resetHeat: () => void;
  setIsDragging: (isDragging: boolean) => void;
}

const DEFAULT_HEAT = 55; // Royal Simmer

export const useHeatState = create<HeatStoreState>((set) => ({
  heatValue: DEFAULT_HEAT,
  activePresetId: 'royal-simmer',
  visuals: calculateHeatVisuals(DEFAULT_HEAT),
  isDragging: false,
  setHeatValue: (rawVal: number) => {
    const clamped = clampHeat(rawVal);
    // Find matching preset if exact or within 2 units
    const matchingPreset = HEAT_PRESETS.find((p) => Math.abs(p.value - clamped) <= 2);
    set({
      heatValue: clamped,
      activePresetId: matchingPreset ? matchingPreset.id : null,
      visuals: calculateHeatVisuals(clamped),
    });
  },
  setPreset: (presetId: string) => {
    const preset = HEAT_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      set({
        heatValue: preset.value,
        activePresetId: preset.id,
        visuals: calculateHeatVisuals(preset.value),
      });
    }
  },
  resetHeat: () => {
    set({
      heatValue: DEFAULT_HEAT,
      activePresetId: 'royal-simmer',
      visuals: calculateHeatVisuals(DEFAULT_HEAT),
    });
  },
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
}));
