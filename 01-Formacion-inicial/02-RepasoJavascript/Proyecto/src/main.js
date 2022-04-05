//Función que crea un array con un vector espaciado

function linspace(start, stop, nvalues) 
{
    let arr = [];
    let step = (stop - start) / (nvalues - 1);
    for (let i = 0; i < nvalues; i++) {
      arr.push(start + (step * i));
    }
    return arr;
}

// Eleva al cuadrado los 10 primeros números

var list = linspace(1, 10, 10);
var square = [];
for (let i = 0; i < list.length; i++)
{
    square[i] = list[i] ** 2;
}
console.log(square);

//Indica si son pares o impares los 20 primeros números

var list2 = linspace(1, 20, 20);
for (let number of list2)
{
    if (number % 2 == 0)
        console.log(`El número ${number} es par.`);
    else
        console.log(`El número ${number} es impar.`);
}

//Días de la semana en español e inglés

var esDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
console.log('Días de la semana en español: ' + esDays);
var enDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
console.log('Días de la semana en inglés: ' + enDays);

//Pedir por CLI una día de la semana y devolver su traducción

const inquirer = require('inquirer');
  
var question = [
    {
        type: 'input',
        name: 'day',
        message: "Introduce un día de la semana: "
    }
];

inquirer.prompt(question).then(answers => {
    var indexDay = esDays.indexOf(answers['day']);
    console.log(enDays[indexDay]);
});  

//Pedir por CLI un mes y devolver el número de días

var months = [
    {name: 'Enero', days: 31},
    {name: 'Febrero', days:28}, 
    {name: 'Marzo', days: 31},
    {name: 'Abril', days: 30},
    {name: 'Mayo', days: 31},
    {name: 'Junio', days: 30},
    {name: 'Julio', days: 31},
    {name: 'Agosto', days: 31},
    {name: 'Septiembre', days: 30},
    {name: 'Octubre', days: 31},
    {name: 'Noviembre', days: 30},
    {name: 'Diciembre', days: 31}
    ];

var question = [
    {
        type: 'input',
        name: 'month',
        message: "Introduce un mes:  "
    }
];

inquirer.prompt(question).then(answers => {
    var indexMonth = months.find(month => month.name === answers['month']);
    console.log(indexMonth.days)
});  

//Pedir un año y comprobar si es bisiesto

var question = [
    {
        type: 'number',
        name: 'year',
        message: "Introduce un año:  "
    }
];

inquirer.prompt(question).then(answers => {
    if (((answers['year'] % 4 == 0) && (answers['year'] % 100 != 0)) || (answers['year'] % 400 == 0))
        console.log(answers['year'] + ' es un año bisiesto.');
    else
        console.log(answers['year'] + ' no es un año bisiesto.');        
}); 