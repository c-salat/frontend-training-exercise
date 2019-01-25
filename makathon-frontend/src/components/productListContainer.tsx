import { ProductList } from './productList';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import * as React from "react";

export const GetProductQuery = gql`
    query{
        products{
            id,
            name,
            ingredients{
                id,
                name,
                price
             }
         }
    }
`;

export const ProductListContainer: React.SFC = () => {
    return (
        <Query query={GetProductQuery}>
            {({ loading, error, data }) => {
                if (loading) {
                    return "Loading...";
                }
                if (error) {
                    return `Error! ${error.message}`;
                }
                return (
                    <div>
                        <ProductList products={data.products}/>
                    </div>
                )
            }}
        </Query>
    );
};
