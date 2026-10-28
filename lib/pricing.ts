import { DishConfiguration, CalculatedDishPrice, CookingStyle, ProteinOption, IngredientOption, AccompanimentOption } from '@/types/dish';

export function calculateDishPrice(
  config: DishConfiguration,
  catalogs: {
    cookingStyles: CookingStyle[];
    proteins: ProteinOption[];
    ingredients: IngredientOption[];
    accompaniments: AccompanimentOption[];
  }
): CalculatedDishPrice {
  const breakdown: { label: string; amount: number }[] = [];
  
  // Base price
  let total = config.basePrice;
  breakdown.push({ label: `${config.dishName} Base`, amount: config.basePrice });

  // Cooking Style
  const style = catalogs.cookingStyles.find((s) => s.id === config.cookingStyleId);
  const styleDelta = style ? style.priceDelta : 0;
  if (style && styleDelta !== 0) {
    total += styleDelta;
    breakdown.push({ label: `Style: ${style.name}`, amount: styleDelta });
  }

  // Protein
  const protein = catalogs.proteins.find((p) => p.id === config.proteinId);
  const proteinDelta = protein ? protein.priceDelta : 0;
  if (protein && proteinDelta !== 0) {
    total += proteinDelta;
    breakdown.push({ label: `Protein: ${protein.name}`, amount: proteinDelta });
  }

  // Ingredients
  let ingredientsTotal = 0;
  config.ingredientIds.forEach((id) => {
    const ing = catalogs.ingredients.find((i) => i.id === id);
    if (ing && ing.available) {
      ingredientsTotal += ing.priceDelta;
      total += ing.priceDelta;
      breakdown.push({ label: `Add: ${ing.name}`, amount: ing.priceDelta });
    }
  });

  // Accompaniments
  let accompanimentsTotal = 0;
  config.accompanimentIds.forEach((id) => {
    const acc = catalogs.accompaniments.find((a) => a.id === id);
    if (acc) {
      accompanimentsTotal += acc.priceDelta;
      total += acc.priceDelta;
      breakdown.push({ label: `Side: ${acc.name}`, amount: acc.priceDelta });
    }
  });

  return {
    basePrice: config.basePrice,
    cookingStyleDelta: styleDelta,
    proteinDelta: proteinDelta,
    ingredientsDelta: ingredientsTotal,
    accompanimentsDelta: accompanimentsTotal,
    totalPrice: Math.max(0, total),
    itemizedBreakdown: breakdown,
  };
}
