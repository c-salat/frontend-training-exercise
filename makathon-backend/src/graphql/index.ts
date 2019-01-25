import * as Koa from 'koa';
import { buildSchemaSync } from 'type-graphql';
import { GQLIngredientResolver } from './ingredient';
import { GQLProductResolver } from './product';
import { IngredientProvider } from '../provider/IngredientProvider';
import { ProductProvider } from '../provider/ProductProvider';
import { CustomerProvider } from '../provider/CustomerProvider';
import { GQLCustomerResolver } from './customer';

export interface GQLContext {
    provider: {
        ingredient: IngredientProvider;
        product: ProductProvider;
        customer: CustomerProvider;
    };
    koaCtx: Koa.Context;
}

export const schema = buildSchemaSync({
    resolvers: [GQLIngredientResolver, GQLProductResolver, GQLCustomerResolver],
});
