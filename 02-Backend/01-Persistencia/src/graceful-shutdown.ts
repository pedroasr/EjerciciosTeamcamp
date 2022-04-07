import { App } from './app';
import { buildConfig } from './config';
import { Logger } from 'pino';
import { SQL_DB } from './databases/maria-db';
import { NOSQL_DB } from './databases/mongo-db';

export default function gracefulShutdown(
    app: App,
    logger: Logger,
    sqlDB: SQL_DB,
    noslqDB: NOSQL_DB
): () => Promise<void> {
    const config = buildConfig();
    return async (): Promise<void> => {
        try {
            logger.info(`Shutting down ${config.projectName}.`);
            await app.close();
            await sqlDB.close();
            await noslqDB.close();
            logger.info('Shutdown complete. Exit now.');
            process.exit(0);
        } catch (error) {
            logger.error('error while shutting down.', error);
            process.exit(1);
        }
    };
}
