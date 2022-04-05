import inquirer from 'inquirer';
import fs from 'fs';
import { error } from 'console';

inquirer
    .prompt([
        {
            type: 'input',
            name: 'ruta',
            message: 'Introduce la ruta del archivo: '
        }
    ])
    .then(answer => {
        if (answer['ruta'].slice(-2) == '-l') {
            const path = answer['ruta'].slice(0, -3);
            const file = fs.readFileSync(path).toString();
            const characters = file.length;
            const rows = file.split('\n').length;
            console.log(`Número de filas en ${path}: ${rows}`);
            console.log(`Número de caracteres en ${path}: ${characters}`);
        } else {
            const file = fs.readFileSync(answer['ruta']);
            const characters = file.length;
            console.log(
                `Número de caracteres en ${answer['ruta']}: ${characters}`
            );
        }
    })
    .catch(error =>
        console.log('No se ha encontrado el archivo, compruebe la ruta.')
    );
