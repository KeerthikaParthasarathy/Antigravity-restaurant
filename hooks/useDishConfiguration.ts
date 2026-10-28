import { useState, useMemo } from 'react';
import { DishConfiguration, CalculatedDishPrice } from '@/types/dish';
import { calculateDishPrice } from '@/lib/pricing';
import { COOKING_STYLES, PROTEINS, INGREDIENTS, ACCOMPANIMENTS } from '@/lib/menu-data';

const DEFAULT_CONFIG: DishConfiguration = {
  dishId: 'royal-sigri-thali',
  dishName: 'The Imperial Brass Thali',
  basePrice: 58,
  cookingStyleId: 'dum-pukht',
  proteinId: 'shahi-lamb',
  ingredientIds: ['kashmiri-saffron', 'smoked-charcoal-butter'],
  spiceLevel: 'Royal Zest',
  accompanimentIds: ['truffle-roghani-naan', 'aged-basmati-pulao'],
  customNotes: '',
};

export function useDishConfiguration(initialConfig: Partial<DishConfiguration> = {}) {
  const [config, setConfig] = useState<DishConfiguration>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  });

  const calculated: CalculatedDishPrice = useMemo(() => {
    return calculateDishPrice(config, {
      cookingStyles: COOKING_STYLES,
      proteins: PROTEINS,
      ingredients: INGREDIENTS,
      accompaniments: ACCOMPANIMENTS,
    });
  }, [config]);

  const toggleIngredient = (ingredientId: string) => {
    setConfig((prev) => {
      const exists = prev.ingredientIds.includes(ingredientId);
      const updated = exists
        ? prev.ingredientIds.filter((id) => id !== ingredientId)
        : [...prev.ingredientIds, ingredientId];
      return { ...prev, ingredientIds: updated };
    });
  };

  const toggleAccompaniment = (accompanimentId: string) => {
    setConfig((prev) => {
      const exists = prev.accompanimentIds.includes(accompanimentId);
      const updated = exists
        ? prev.accompanimentIds.filter((id) => id !== accompanimentId)
        : [...prev.accompanimentIds, accompanimentId];
      return { ...prev, accompanimentIds: updated };
    });
  };

  const setCookingStyle = (cookingStyleId: string) => {
    setConfig((prev) => ({ ...prev, cookingStyleId }));
  };

  const setProtein = (proteinId: string) => {
    setConfig((prev) => ({ ...prev, proteinId }));
  };

  const setSpiceLevel = (spiceLevel: DishConfiguration['spiceLevel']) => {
    setConfig((prev) => ({ ...prev, spiceLevel }));
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return {
    config,
    calculated,
    toggleIngredient,
    toggleAccompaniment,
    setCookingStyle,
    setProtein,
    setSpiceLevel,
    resetToDefault,
  };
}
