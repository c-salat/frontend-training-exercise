import { BaseProvider } from './BaseProvider';
import { WithId } from 'quick-n-dirty/lib/datastore';
import { Product, ProductPO } from '../model/Product';

export class ProductProvider extends BaseProvider {
    private products = this.database.products;

    public addProduct(newProduct: ProductPO): WithId<Product> {
        const { id } = this.products.insertOne(newProduct);
        return this.getProduct(id);
    }

    public removeProduct(productId: string): boolean {
        return this.products.deleteOne(productId);
    }

    public getAllProducts(): Array<WithId<Product>> {
        return this.products.data.map(({ id, name, ingredients }) => ({
            id,
            name,
            ingredients: this.database.ingredients.data.filter(ingredient =>
                ingredients.includes(ingredient.id),
            ),
        }));
    }

    public getProduct(productId: string): WithId<Product> | undefined {
        return this.getAllProducts().find(({ id }) => id === productId);
    }
}
