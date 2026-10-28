export interface IngredientOption {
  id: string;
  name: string;
  category: 'base' | 'spice' | 'finish' | 'luxury';
  priceDelta: number; // in cents/currency units
  available: boolean;
  color: string;
  description: string;
}

export interface CookingStyle {
  id: string;
  name: string;
  tagline: string;
  priceDelta: number;
  heatLevel: number;
  description: string;
  iconName: string;
}

export interface ProteinOption {
  id: string;
  name: string;
  source: string;
  priceDelta: number;
  dietary: 'meat' | 'seafood' | 'poultry' | 'vegetarian';
  caloriesEstimate: string;
  color: string;
}

export interface AccompanimentOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
}

export interface DishConfiguration {
  dishId: string;
  dishName: string;
  basePrice: number;
  cookingStyleId: string;
  proteinId: string;
  ingredientIds: string[];
  spiceLevel: 'Gentle Royalty' | 'Aromatic Warmth' | 'Royal Zest' | 'Imperial Fire';
  accompanimentIds: string[];
  customNotes?: string;
}

export interface CalculatedDishPrice {
  basePrice: number;
  cookingStyleDelta: number;
  proteinDelta: number;
  ingredientsDelta: number;
  accompanimentsDelta: number;
  totalPrice: number;
  itemizedBreakdown: {
    label: string;
    amount: number;
  }[];
}
