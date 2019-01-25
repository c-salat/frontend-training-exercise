import Koa from 'koa';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-koa';
import { DatabaseProvider } from '../persistence/Database';
import { GQLContext } from '../graphql';
import { IngredientProvider } from '../provider/IngredientProvider';
import { ProductProvider } from '../provider/ProductProvider';
import { CustomerProvider } from '../provider/CustomerProvider';

export class WebServer {
    private readonly app = new Koa();
    private readonly apolloServer: ApolloServer;

    public constructor(schema: GraphQLSchema) {
        this.apolloServer = new ApolloServer({ schema, context: this.mapGQLCtx });
        this.apolloServer.applyMiddleware({ path: '/graphql', app: this.app });
    }

    public async start(port: number = 5000) {
        return new Promise((resolve, reject) => {
            try {
                this.app.listen(port, () => {
                    console.log(`GQL server is available at "http://localhost:${port}/graphql"`);
                    resolve();
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    private mapGQLCtx(originalCtx: { ctx: Koa.Context }): GQLContext {
        const productProvider = new ProductProvider(DatabaseProvider.INSTANCE);
        return {
            koaCtx: originalCtx.ctx,
            provider: {
                ingredient: new IngredientProvider(DatabaseProvider.INSTANCE),
                product: productProvider,
                customer: new CustomerProvider(DatabaseProvider.INSTANCE, productProvider),
            },
        };
    }
}
