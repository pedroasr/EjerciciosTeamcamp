import http from 'http';
import { User, UserDB } from './UserDB';

const userDB = new UserDB;
const hostname = 'localhost';
const port = 8090;
const server = http.createServer((req, res) => {
    const url = req.url;
    if (!url)
        buildErrorResponse(res, 400);
    else{  
        const method = req.method;
        const info = checkPath(url);
        switch (method){
            case 'GET':
                if (typeof info == 'string' && info == 'users')
                    buildCorrectResponse(res, JSON.stringify(userDB));
                else if (info[0] == 'user' && typeof info[1] == 'number'){
                    const user = JSON.stringify(userDB.findUser(info[1]));
                    if (!user)
                        buildErrorResponse(res, 404);
                    else
                        buildCorrectResponse(res, user);
                }
                else
                    buildErrorResponse(res, 400);
                break;
            case 'POST':
                if (typeof info == 'string' && info == 'user'){
                    let requestBody = '';
                    req.on('data', (partialBody) => {
                        requestBody += partialBody;
                    });
                    let user : User | boolean; 
                    req.on('end', () => {
                        user = parseUser(requestBody);
                        if (typeof user == 'boolean') buildErrorResponse(res, 400);
                        else {
                            userDB.addUser(user);
                            buildCorrectResponse(res, JSON.stringify(user));
                        }
                    });
                }
                else
                    buildErrorResponse(res, 400);
                break;
            case 'PUT':
                if (info[0] == 'user' && typeof info[1] == 'number'){
                    let requestBody = '';
                    req.on('data', (partialBody) => {
                        requestBody += partialBody;
                    });
                    let user : User | boolean; 
                    req.on('end', () => {
                        user = parseUser(requestBody);
                        if (typeof user == 'boolean') buildErrorResponse(res, 400);
                        else {
                            userDB.modifyUser(user);
                            buildCorrectResponse(res, JSON.stringify(user));
                        }
                    })
                }
                else
                    buildErrorResponse(res, 400);
                break;
            case 'DELETE':
                if (info[0] == 'user' && typeof info[1] == 'number'){
                    userDB.removeUser(info[1]);
                    buildCorrectResponse(res, 'Se ha eliminado al usuario correctamente.');
                }
                else
                    buildErrorResponse(res, 400);
                break;  
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Servidor HTTP corriendo en ${hostname}:${port}`);
}); 

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Proceso terminado.');
    });
});

process.on('SIGINT', () => {
    console.log('Adiós!');
    process.kill(process.pid, 'SIGTERM');
});

function checkPath(path : string) : string | [string, number]{
    path = path.slice(1, -1);
    if (path == 'users')
        return path;
    if (path == 'user')
        return path;
    if (path.indexOf('?') == -1)
        throw new Error("Error. Ha introducito un path incorrecto");
    const newPath = path.split('?');
    const id = parseInt(newPath[1].slice(-1))
    if (newPath[1].slice(0,1) != 'id' || !!id)
        throw new Error("Error. Ha introducito un path incorrecto");
    return [newPath[0], id];
}       

function buildErrorResponse (res : http.ServerResponse, error : number) : void{
    res.statusCode = error;
    res.setHeader('Content-Type', 'text/html');
    res.end(console.log('Error. La peticion no ha sido correcta.'));
}

function buildCorrectResponse (res : http.ServerResponse, param : any) : void{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/html');
    res.end(param);
}

function parseUser(user : any) : User | boolean{
    if (!user) return false;
    if ("id" in user && "name" in user && "age" in user) return user;
    else return false;
}