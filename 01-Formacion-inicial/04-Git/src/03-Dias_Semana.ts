import inquirer from "inquirer";

const daysES = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const daysEN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function printDays() : void {
    daysES.forEach((_, index) => {
        console.log(`El dia ${daysES[index]} se traduce como ${daysEN[index]}`)
    })
}

const cliQuestion = function() {
    return inquirer.prompt([{
        type: "input",
        name: "day",
        message: "Introduce un dia de la semana: "
    }]);
}

export async function translate () {
    const answer = await cliQuestion();
    const indexDay = daysES.indexOf(answer.day);
    console.log(`La traducción de ${daysES[indexDay]} es ${daysEN[indexDay]}.`);
}