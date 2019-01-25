import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { Product } from '../../model/Product';
import { GQLContext } from '..';
import { GQLProductType } from './model/GQLProductType';
import { GQLProductInputType } from './model/GQLProductInputType';

@Resolver()
export class GQLProductResolver {
    @Query(type => [GQLProductType])
    products(@Ctx() ctx: GQLContext): Array<WithId<Product>> {
        return ctx.provider.product.getAllProducts();
    }

    @Query(type => GQLProductType, { nullable: true })
    product(@Arg('id') productId: string, @Ctx() ctx: GQLContext): WithId<Product> | undefined {
        return ctx.provider.product.getProduct(productId);
    }

    @Mutation(type => GQLProductType)
    addProduct(
        @Arg('product') newProduct: GQLProductInputType,
        @Ctx() ctx: GQLContext,
    ): WithId<Product> {
        return ctx.provider.product.addProduct(newProduct);
    }

    @Mutation(type => Boolean)
    removeProduct(@Arg('id') productId: string, @Ctx() ctx: GQLContext): boolean {
        return ctx.provider.product.removeProduct(productId);
    }
}
