import inquirer from "inquirer";

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const askQuestion = function(){
    return inquirer.prompt([{
        type: "input",
        name: "month",
        message: "Introduce un mes: "
    }]);
}

export async function printMonthDays(){
    const month = await askQuestion();
    const index = months.indexOf(month.month);
    console.log(`El mes ${months[index]} tiene ${daysMonths[index]} días.`)
}
