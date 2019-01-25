import { BaseProvider } from './BaseProvider';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { Ingredient } from '../model/Ingredient';

export class IngredientProvider extends BaseProvider {
    private ingredients = this.database.ingredients;
    
    public getAllIngredients(): Array<WithId<Ingredient>> {
        return this.ingredients.data;
    }

    public getIngredient(id: string): WithId<Ingredient> | undefined {
        return this.ingredients.data.find(ingredient => ingredient.id === id);
    }

    public addIngredient(ingredient: Ingredient): WithId<Ingredient> {
        return this.ingredients.insertOne(ingredient);
    }

    public removeIngredient(ingredientId: string): boolean {
        return this.ingredients.deleteOne(ingredientId);
    }
}
