export type MenuCategory = 
  | 'signature-heritage'
  | 'royal-starters'
  | 'dum-pukht-curries'
  | 'sigri-roasts'
  | 'artisanal-breads'
  | 'royal-desserts'
  | 'elixirs';

export interface DietaryTag {
  id: string;
  label: string;
  color?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  royalTitle: string;
  category: MenuCategory;
  price: number; // in cents/minor units or standard base units
  description: string;
  story: string;
  cookingMethod: string;
  tastingNotes: string[];
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  preparationTime: string;
  dietary: string[];
  image: string;
  videoPoster?: string;
  customizable: boolean;
  featured?: boolean;
  pairingWine?: string;
  calories?: string;
}
