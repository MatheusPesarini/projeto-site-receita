export interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: number;
  servings: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  category?: string;
  imageUrl?: string;
  authorId: string;
  rating?: number;
  reviews?: number;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}
