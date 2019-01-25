import fs from 'fs';
import { InMemoryDataStore, DefaultCollection } from 'quick-n-dirty/lib/datastore';
import { Ingredient } from '../model/Ingredient';
import { ProductPO } from '../model/Product';
import { CustomerPO } from '../model/Customer';

export enum CollectionNames {
    INGREDIENTS = 'INGREDIENTS',
    PRODUCTS = 'PRODUCTS',
    CUSTOMERS = 'CUSTOMERS',
}

export class DatabaseProvider {
    private readonly store: InMemoryDataStore;
    public static readonly INSTANCE = new DatabaseProvider();
    public readonly ingredients = new DefaultCollection<Ingredient>();
    public readonly products = new DefaultCollection<ProductPO>();
    public readonly customers = new DefaultCollection<CustomerPO>();

    private constructor() {
        const collections = new Map<string, DefaultCollection<any>>();
        collections.set(CollectionNames.INGREDIENTS, this.ingredients);
        collections.set(CollectionNames.PRODUCTS, this.products);
        collections.set(CollectionNames.CUSTOMERS, this.customers);

        this.store = new InMemoryDataStore(collections);

        // apparently SIGINT catches control+c on linux
        // TODO: test on windoof
        process.on('SIGINT', () => {
            console.log('\npersisting to file');
            const data = this.store.getPersistenceRep();
            fs.writeFileSync('db.json', data);
            process.exit(0);
        });
    }
}
