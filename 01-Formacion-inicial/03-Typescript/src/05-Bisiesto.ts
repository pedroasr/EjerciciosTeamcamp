import inquirer from "inquirer";

const askQuestion = function(){
    return inquirer.prompt([{
        type: "input",
        name: "year",
        message: "Introduce un año:"
    }]);
}

function isLeapYear (year : number) : boolean{
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

export async function printLeapYear() {
    const year = await askQuestion();
    if(isLeapYear(parseInt(year.year)))
        console.log(`El año ${year.year} es bisiesto.`);
    else
        console.log(`El año ${year.year} es bisiesto.`);    
}
