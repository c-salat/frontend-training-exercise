import { ObjectType, Field, Int } from 'type-graphql';
import { Ingredient } from '../../../model/Ingredient';

@ObjectType()
export class GQLIngredientType implements Ingredient {
    @Field(type => String)
    id: string;

    @Field(type => String)
    name: string;

    @Field(type => String)
    imageURL: string;

    @Field(type => Int)
    price: number;
}
