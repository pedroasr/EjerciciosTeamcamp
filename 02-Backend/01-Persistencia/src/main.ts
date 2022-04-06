import { buildConfig } from './config';
import gracefulShutdown from './graceful-shutdown';
import 'make-promises-safe';
import { buildApp } from './app';
import { buildLogger } from './logger';
import { buildSQLDatabase, SQL_DB } from './databases/maria-db';
import { buildMongoDatabase, NOSQL_DB } from './databases/mongo-db';

const config = buildConfig();
const logger = buildLogger(config.log);

let dbSql: SQL_DB;
let dbNoSql: NOSQL_DB;

async function main() {
    logger.info(`Starting ${config.projectName}`);
    const { http, maria, mongo } = config;

    dbSql = buildSQLDatabase(maria);
    dbNoSql = buildMongoDatabase(mongo);

    await dbSql.init();
    await dbNoSql.init();

    const app = await buildApp({ logger, dbSql, dbNoSql });

    await app.getServer().listen(http.port, http.host);
    process.on('SIGTERM', gracefulShutdown(app, logger, dbSql, dbNoSql));
    process.on('SIGINT', gracefulShutdown(app, logger, dbSql, dbNoSql));
}

main().catch(error => {
    logger.error(
        `Error while starting up ${config.projectName}. ${error.message}`
    );
    process.exit(1);
});
