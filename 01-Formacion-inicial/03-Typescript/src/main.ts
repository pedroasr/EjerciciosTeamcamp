/* import { printSquare } from "./01-Cuadrados";
import { printEvenOdd } from "./02-Pares_Impares";
import { printDays, translate } from "./03-Dias_Semana"; 
import { printMonthDays } from "./04-Dias_Mes";
import { printLeapYear } from "./05-Bisiesto";
import { printFileInfo } from "./06-Caracteres_Lineas"*/
import { User, UserDB } from "./UserDB"
function main(){

    /* printSquare();
    console.log('');
    printEvenOdd();
    console.log('');
    printDays();
    console.log('');
    translate();
    console.log(''); 
    printMonthDays();
    console.log('');
    printLeapYear();
    console.log('');
    printFileInfo();
    console.log('');*/

    const user = new User(10, "Pedro", 25);
    const userDB = new UserDB(); 
    userDB.addUser(user);
    userDB.removeUser(10)
    userDB.printUsers();
    userDB.addUser({id:10, name:"Pepe", age: 30})
}

main();