import { InputType, Field } from 'type-graphql';

@InputType()
export class GQLProductInputType {
    @Field(type => String)
    name: string;
    @Field(type => [String])
    ingredients: string[];
}
