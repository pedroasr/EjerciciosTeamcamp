import { FastifyInstance } from 'fastify';
import { buildServer } from './server';
import { Logger } from 'pino';
import { SQL_DB } from './databases/maria-db';
import { NOSQL_DB } from './databases/mongo-db';

export type AppDeps = {
    logger: Logger;
    dbSql: SQL_DB;
    dbNoSql: NOSQL_DB;
};
export async function buildApp(deps: AppDeps) {
    const server = buildServer(deps);
    return {
        async close(): Promise<void> {
            await server.close();
        },
        getServer(): FastifyInstance {
            return server;
        }
    };
}

export type App = Awaited<ReturnType<typeof buildApp>>;