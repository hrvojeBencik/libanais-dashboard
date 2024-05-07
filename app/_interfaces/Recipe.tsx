import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    imageUrl: string;
    date: Date;
}
