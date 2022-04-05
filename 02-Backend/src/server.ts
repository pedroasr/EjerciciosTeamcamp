import fastify, { FastifyInstance, FastifyRequest, FastifySchema } from 'fastify';
import type { Logger } from 'pino';
import { UserDB } from './UserDB';

const UserSchema: FastifySchema = {
    response: {
        '200': {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                age: { type: 'number' }
            }
        }
    }
};

/* const MessageSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            message: { type: 'string' },
            from: { type: 'string', require },
            to: { type: 'string' }
        }
    }
}; */

/* type MessageDTO = {
    message: string;
    from: string;
    to: string;
};
 */
const userDB = new UserDB;

export function buildServer(logger: Logger): FastifyInstance {
    const server = fastify({ logger });
    server.get('/users', { schema: UserSchema }, (req, reply) => {
        reply
            .status(200)
            .headers({ 'content-type': 'application/json' })
            .send(userDB);
    });

    server.get('/user/:id', {schema: UserSchema}, (req : FastifyRequest<{Params: {id: string}}>, reply) => {
        const { id } = req.params;
        const newId = parseInt(id);
        const user = userDB.findUser(newId);
        if (user != null) 
            reply
                .status(200)
                .headers({ 'content-type': 'application/json' })
                .send(JSON.stringify(user[1]));
        else
            reply
                .status(400)
                .headers({ 'content-type': 'application/json' })
                .send('No se ha encontrado el usuario.');
    });

/*     server.post<{ Body: User }>(
        '/message',
        { schema: MessageSchema },
        (req, reply) => {
            const { from } = req.body;
            server.log.info(
                `/message from ${from} ${JSON.stringify(req.body)}`
            );
            reply
                .status(200)
                .headers({ 'content-type': 'application/json' })
                .send({ version: '0.0.1' });
        }
    );
 */
    return server;
}


