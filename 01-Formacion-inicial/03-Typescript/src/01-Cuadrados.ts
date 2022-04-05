import { linspace } from "./linspace";

function squares(start : number, 
                   stop : number,
                   nvalues : number) : number[] {

    const list = linspace(start, stop, nvalues);
    const square: number[] = [];
    for (let i = 0; i < list.length; i++)
    {
        square.push(list[i] ** 2);
    }
    return square;
}

export function printSquare(start : number = 1,
                            stop : number = 10,
                            nvalues : number = 10) : void{
    const array = squares(start, stop, nvalues);
    for (let i = 0; i < nvalues; i++){
        console.log(`El cuadrado de ${start+i} es ${array[i]}.`);
    }
}