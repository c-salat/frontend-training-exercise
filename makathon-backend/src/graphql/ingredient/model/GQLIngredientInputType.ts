import { InputType, Field, Int } from 'type-graphql';
import { Ingredient } from '../../../model/Ingredient';

@InputType()
export class GQLIngredientInputType implements Ingredient {
    @Field(type => String)
    name: string;

    @Field(type => String)
    imageURL: string;

    @Field(type => Int)
    price: number;
}
