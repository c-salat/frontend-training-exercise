import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { GQLContext } from '..';
import { Ingredient } from '../../model/Ingredient';
import { GQLIngredientType } from './model/GQLIngredientType';
import { GQLIngredientInputType } from './model/GQLIngredientInputType';

@Resolver()
export class GQLIngredientResolver {
    @Query(returns => [GQLIngredientType])
    ingredients(@Ctx() ctx: GQLContext): Array<WithId<Ingredient>> {
        return ctx.provider.ingredient.getAllIngredients();
    }

    @Query(returns => GQLIngredientType, { nullable: true })
    ingredient(
        @Arg('id') ingredientId: string,
        @Ctx() ctx: GQLContext,
    ): WithId<Ingredient> | undefined {
        return ctx.provider.ingredient.getIngredient(ingredientId);
    }

    @Mutation(returns => GQLIngredientType)
    addIngredient(
        @Arg('ingredient') newIngredient: GQLIngredientInputType,
        @Ctx() ctx: GQLContext,
    ): WithId<Ingredient> {
        return ctx.provider.ingredient.addIngredient(newIngredient);
    }

    @Mutation(returns => Boolean)
    removeIngredient(@Arg('id') ingredientId: string, @Ctx() ctx: GQLContext): boolean {
        return ctx.provider.ingredient.removeIngredient(ingredientId);
    }
}
