import { ObjectType, Field } from 'type-graphql';
import { Customer, CustomerName, CustomerAddress } from '../../../model/Customer';
import { GQLProductType } from '../../product/model/GQLProductType';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { Product } from '../../../model/Product';

@ObjectType()
export class GQLCustomerNameType implements CustomerName {
    @Field(type => String)
    firstName: string;

    @Field(type => String)
    lastName: string;
}

@ObjectType()
export class GQLCustomerAddress implements CustomerAddress {
    @Field(type => String)
    city: string;

    @Field(type => String)
    country: string;

    @Field(type => String)
    street: string;

    @Field(type => String)
    zipCode: string;
}

@ObjectType()
export class GQLCustomerType implements Customer {
    @Field(type => String)
    id: string;

    @Field(type => GQLCustomerNameType)
    name: CustomerName;

    @Field(type => GQLCustomerAddress)
    address: CustomerAddress;

    @Field(type => [GQLProductType])
    products: Array<WithId<Product>>;
}