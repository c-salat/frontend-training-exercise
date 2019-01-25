import 'reflect-metadata';
import { WebServer } from './webserver';
import { schema } from './graphql';

(async () => {
    const webServer = new WebServer(schema);
    await webServer.start();
})();
