import { WithId } from 'quick-n-dirty/lib/datastore';
import { BaseProvider } from './BaseProvider';
import { CustomerPO, Customer } from '../model/Customer';
import { DatabaseProvider } from '../persistence/Database';
import { ProductProvider } from './ProductProvider';

export class CustomerProvider extends BaseProvider {
    private customers = this.database.customers;

    constructor(
        readonly database: DatabaseProvider,
        private readonly productProvider: ProductProvider,
    ) {
        super(database);
    }

    public addCustomer(newCustomer: CustomerPO) {
        const { id } = this.customers.insertOne(newCustomer);
        return this.getCustomer(id);
    }

    public removeCustomer(customerId: string): boolean {
        return this.customers.deleteOne(customerId);
    }

    public getCustomer(customerId: string): WithId<Customer> | undefined {
        const customerPo = this.getCustomerPo(customerId);
        return !!customerPo ? this.mapCustomerPoToCustomer(customerPo) : undefined;
    }

    public getAllCustomers(): Array<WithId<Customer>> {
        return this.customers.data.map(customer => this.mapCustomerPoToCustomer(customer));
    }

    public addProductToCustomer(customerId: string, productId: string): WithId<Customer> {
        const customerPo = this.getCustomerPo(customerId);
        const product = this.productProvider.getProduct(productId);

        if (!customerPo || !product) {
            throw new Error('Customer or Product does not exist');
        }

        const newProducts = this.reduceToUniqEntries([...customerPo.products, productId]);
        const { id } = this.customers.updateOne(customerId, { products: newProducts });
        return this.getCustomer(id);
    }

    public removeProductFromCustomer(customerId: string, productId: string): WithId<Customer> {
        const customerPo = this.getCustomerPo(customerId);

        if (!customerPo) {
            throw new Error('Customer does not exist');
        }

        const newProducts = customerPo.products.filter(product => product !== productId);
        const { id } = this.customers.updateOne(customerId, { products: newProducts });
        return this.getCustomer(id);
    }

    private getCustomerPo(customerId: string): WithId<CustomerPO> | undefined {
        return this.customers.data.find(customer => customer.id === customerId)
    }

    private mapCustomerPoToCustomer({ products, ...customerDetails }: WithId<CustomerPO>) {
        const fullProducts = products.map(productId => this.productProvider.getProduct(productId));

        return {
            ...customerDetails,
            products: fullProducts,
        };
    }

    private reduceToUniqEntries(productIds: string[]): string [] {
        return [...new Set(productIds)];
    }
}
