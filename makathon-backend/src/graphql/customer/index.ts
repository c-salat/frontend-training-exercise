import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { Customer } from '../../model/Customer';
import { GQLCustomerType } from './model/GQLCustomerType';
import { GQLCustomerInputType } from './model/GQLCustomerInputType';
import { GQLContext } from '..';

@Resolver()
export class GQLCustomerResolver {
    @Query(returns => [GQLCustomerType])
    customers(@Ctx() ctx: GQLContext): Array<WithId<Customer>> {
        return ctx.provider.customer.getAllCustomers();
    }

    @Query(returns => GQLCustomerType, { nullable: true })
    customer(@Arg('id') customerId: string, @Ctx() ctx: GQLContext): Customer | undefined {
        return ctx.provider.customer.getCustomer(customerId);
    }

    @Mutation(returns => GQLCustomerType)
    addCustomer(
        @Arg('customer') { products, firstName, lastName, ...address }: GQLCustomerInputType,
        @Ctx() ctx: GQLContext,
    ): Customer {
        return ctx.provider.customer.addCustomer({
            address,
            name: {
                firstName,
                lastName,
            },
            products,
        });
    }

    @Mutation(returns => Boolean)
    removeCustomer(@Arg('id') customerId: string, @Ctx() ctx: GQLContext): boolean {
        return ctx.provider.customer.removeCustomer(customerId);
    }

    @Mutation(returns => GQLCustomerType)
    addProductToCustomer(
        @Arg('customerId') customerId: string,
        @Arg('productId') productId: string,
        @Ctx() ctx: GQLContext,
    ): Customer {
        return ctx.provider.customer.addProductToCustomer(customerId, productId);
    }

    @Mutation(returns => GQLCustomerType)
    removeProductFromCustomer(
        @Arg('customerId') customerId: string,
        @Arg('productId') productId: string,
        @Ctx() ctx: GQLContext,
    ): Customer {
        return ctx.provider.customer.removeProductFromCustomer(customerId, productId);
    }
}
