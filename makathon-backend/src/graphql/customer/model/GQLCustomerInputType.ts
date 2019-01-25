import { InputType, Field } from 'type-graphql';
import { CustomerAddress, CustomerName } from '../../../model/Customer';

@InputType()
export class GQLCustomerInputType implements CustomerAddress, CustomerName {
    @Field(type => String)
    firstName: string;

    @Field(type => String)
    lastName: string;

    @Field(type => String)
    city: string;

    @Field(type => String)
    street: string;

    @Field(type => String)
    country: string;

    @Field(type => String)
    zipCode: string;

    @Field(type => [String])
    products: string[];
}
