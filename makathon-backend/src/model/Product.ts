import { Ingredient } from "./Ingredient";

export interface Product {
    name: string;
    ingredients: Ingredient[];
}

export interface ProductPO {
    name: string;
    ingredients: string[];
}