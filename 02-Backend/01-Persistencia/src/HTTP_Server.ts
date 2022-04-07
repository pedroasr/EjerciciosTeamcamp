import http from 'http';
import fs from 'fs';

const hostname = 'localhost';
const port = 8090;
const server = http.createServer((req, res) => {
    if (!req.url){
        res.statusCode = 400;
        console.log(req.url)
        res.setHeader('Content-Type', 'text/html');
        res.end(console.log('Error. La peticion no ha sido correcta.'));
    }
    else{
        const path = req.url.split('/');
        if (path[1] == ''){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('index.html');
        }
        if (path[1].substr(-5, 5) != '.html'){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(console.log('Error. No se ha encontrado el archivo.'));
        }
        else{
            const files = fs.readdirSync('/');
            for (const file of files) {
                if (file == path[1]){
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(file);
                }
            }
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