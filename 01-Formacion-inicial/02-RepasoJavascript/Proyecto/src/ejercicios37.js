import { arrayFactorial, conway } from './funciones.js'
import inquirer from 'inquirer';

console.log(arrayFactorial(1, 10));

const names = new Array('Juanjo', 'Pablo', 'Laura');
const cars = ['Renual', 'Peugeot', 'Audi'];
const drivers = [
    { name: 'Juanjo', car: 'Peugeot', age: 41 },
    { name: 'Laura', car: 'Audi', age: 36 },
    { name: 'Pablo', car: 'Volkswagen', age: 33 },
    { name: 'Sofia', car: 'Mercedes', age: 23 },
    { name: 'Leonardo', car: 'Volkswagen', age: 28 }
];
const mix = [...names, ...cars, ...drivers, 'Any'];

console.log(mix.filter(element => typeof(element) == 'object'))

inquirer
    .prompt([
        {
            type: 'number',
            name: 'numero',
            message: 'Introduce un número: '
        }
    ])
    .then(answer => console.log(conway(answer['numero'])));