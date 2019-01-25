import { Product } from "./Product";

export interface Customer {
    name: CustomerName;
    address: CustomerAddress;
    products: Product[];
}

export interface CustomerName {
    firstName: string;
    lastName: string;
}

export interface CustomerAddress {
    street: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface CustomerPO extends Pick<Customer, 'name' | 'address'> {
    products: string[];
}