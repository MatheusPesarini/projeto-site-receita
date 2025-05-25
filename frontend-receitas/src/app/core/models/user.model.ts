export interface User {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  favoriteRecipes?: string[];
  createdRecipes?: string[];
  reviews?: Review[];
}

export interface Review {
  rating: number;
  comment: string;
}
