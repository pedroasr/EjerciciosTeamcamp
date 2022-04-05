import { linspace } from "./linspace";

function isEven(num : number){
    return num % 2 == 0;
}

export function printEvenOdd(start : number = 1,
                             stop: number = 20,
                             nvalues : number = 20) {
    const list = linspace(start, stop, nvalues);
    for (let i = 0; i < nvalues; i++){
        if (isEven(list[i]))
            console.log(`El numero ${list[i]} es par.`);
        else
            console.log(`El numero ${start+i} es impar.`);
    }

}
