import mariadb, { Connection } from 'mariadb';

const CREATE_TABLE_MESSAGES = `CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT NOT NULL,
    message VARCHAR(200),
    target VARCHAR(254),
    origin VARCHAR(254),
    PRIMARY KEY ( id )
);`;

export type MariaConfig = {
    host: string;
    port: number;
    root: string;
    user: string;
    password: string;
    database: string;
};
export function buildSQLDatabase({
    host,
    port,
    user,
    password,
    database
}: MariaConfig) {
    let pool: Connection;
    async function runQuery(query: string) {
        if (!pool) throw new Error('Database not initialized');
        return pool.query(query);
    }

    async function init(): Promise<void> {
        pool = await mariadb.createConnection({
            host,
            port,
            password,
            user
        });
        await pool.query(`USE ${database}`);
        await pool.query(CREATE_TABLE_MESSAGES);
    }

    async function close(): Promise<void> {
        if (!pool) return;
        await pool.end();
    }

    return {
        init,
        close,
        runQuery
    };
}

export type SQL_DB = ReturnType<typeof buildSQLDatabase>;
