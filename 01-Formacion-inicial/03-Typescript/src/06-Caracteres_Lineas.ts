import inquirer from "inquirer";
import fs from "fs";

const askQuestion = function() {
    return inquirer.prompt([{
        type: "input",
        name: "path",
        message: "Introduce la ruta del archivo: "
    }]);
}

export async function printFileInfo() {
    const path = await askQuestion();
    const truePath = getPath(path.path);
    const file = loadFile(truePath);
    if (checkPath(path.path))
        printLinesNumber(file);
    printCharactersNumber(file);
}

function checkPath (path : string) : boolean {
    const inputPath = path.split(' ');
    return (inputPath.length > 1 && inputPath[1] == '-l');
}

function getPath (path : string) : string {
    const inputPath = path.split(' ');
    return inputPath[0];
}

function printCharactersNumber (file : string) : void{
    const characters = file.length;
    console.log(`El archivo tiene ${characters} caracteres.`);
}

function printLinesNumber (file : string) : void{
    const rows = file.split('\n').length;
    console.log(`El archivo tiene ${rows} lineas.`);
}

function loadFile (path : string) : string {
    const file = fs.readFileSync(path).toString();
    return file;
}