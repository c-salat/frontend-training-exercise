import { ObjectType, Field } from 'type-graphql';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { Product } from '../../../model/Product';
import { GQLIngredientType } from '../../ingredient/model/GQLIngredientType';
import { Ingredient } from '../../../model/Ingredient';

@ObjectType()
export class GQLProductType implements WithId<Product> {
    @Field(type => String)
    id: string;
    @Field(type => String)
    name: string;
    @Field(type => [GQLIngredientType])
    ingredients: Array<WithId<Ingredient>>;
}
