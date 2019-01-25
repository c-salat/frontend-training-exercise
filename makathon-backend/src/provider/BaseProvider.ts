import { DatabaseProvider } from "../persistence/Database";

export class BaseProvider {
    constructor(protected readonly database: DatabaseProvider) {}
}