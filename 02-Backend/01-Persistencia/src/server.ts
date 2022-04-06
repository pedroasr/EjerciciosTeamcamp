import fastify, { FastifyInstance, FastifyRequest, FastifySchema } from 'fastify';
import type { Logger } from 'pino';
import { SQL_DB } from './databases/maria-db';
import { NOSQL_DB } from './databases/mongo-db';
import { User, UserDB } from './UserDB';

const UserSchema: FastifySchema = {
    body: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                age: { type: 'number' }
            }
    }
};

const idSchema: FastifySchema = {
    body: {
            type: 'number',
            properties: {
                id: { type: 'number' }
            }
    }
};

/* const getIdSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                nombre: { type: 'string' },
                edad: { type: 'number' }
            }
        }
    }
} */

export type ServerDeps = {
    logger: Logger;
    dbSql: SQL_DB;
    dbNoSql: NOSQL_DB;
};

export function buildServer(logger: Logger): FastifyInstance {
    const userDB = new UserDB;
    const server = fastify({ logger });
    
    server.get('/users', {}, (req, reply) => {
        reply
            .status(200)
            .headers({ 'content-type': 'application/json' })
            .send(userDB);
    });

    server.get('/user/:id', {}, (req : FastifyRequest<{Params: {id: string}}>, reply) => {
        const { id } = req.params;
        const newId = parseInt(id);
        const user = userDB.findUser(newId);
        if (user != null) 
            reply
                .status(200)
                .headers({ 'content-type': 'application/json' })
                .send(JSON.stringify(user[1]));
    });

     server.post<{ Body: User }>(
        '/user',
        { schema: UserSchema },
        (req, reply) => {
            const {body} = req;
            userDB.addUser(body);
            reply
                .status(200)
                .headers({ 'content-type': 'application/json' })
                .send({body});
        }
    );

    server.put<{ Body: User }>(
        '/user/:id',
        { schema: UserSchema},
        (req, reply) => {
            const {body} = req;
            userDB.modifyUser(body);
            reply
                .status(200)
                .headers({ 'content-type': 'application/json' })
                .send({body});
        }
    );

    server.delete<{ Body: number }>(
        '/user/:id',
        { schema: idSchema },
        (req, reply) => {
            const {id} = req;
            userDB.removeUser(id);
            reply
                .status(200)
                .headers({ 'content-type': 'application/json' })
                .send({userDB})
        }
    )
 
    return server;
}


