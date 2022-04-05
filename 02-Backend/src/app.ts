import { FastifyInstance } from 'fastify';
import { buildServer } from './server';
import { Logger } from 'pino';

export async function buildApp(logger: Logger) {
    const server = buildServer(logger);
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
