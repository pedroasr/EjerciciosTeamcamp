import inquirer from 'inquirer';
import fs from 'fs';

console.log('Bienvenido al juego de las operaciones lógicas.');
console.log('Las operaciones disponibles son AND, OR, NOT, LSHIFT, RSHIFT.');
console.log(
    'Se usará el simbolo "->" dejando un espacio antes y después para asignar un valor a un registro.'
);
console.log(
    'Para imprimir el estado actual de los acumuladores, use el comando "mostrar".'
);
console.log(
    'Para guardar el estado actual de los acumuladores, use el comando "guardar".'
);
console.log(
    'Para cargar el estado de los acumuladores desde un archivo, use el comando "cargar".'
);
console.log('Para detener el juego, use el comando "stop".');

type acumulador = {
    name: string,
    value: number
}

var operationDB : acumulador[] = [];

const askQuestion = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'op',
                message: 'Introduzca una operación: '
            }
        ])
        .then(answer => {
            var input = answer.op.split(' '); //Crea un array con los datos separados por espacios
            if (input == 'stop')
                return console.log('Se ha terminado el juego.');
            else if (input == 'mostrar') {
                console.log(operationDB);
                askQuestion();
            } else if (input == 'guardar') {
                let operationDB_JSON = JSON.stringify(operationDB);
                fs.writeFile(
                    'operation.json',
                    operationDB_JSON,
                    'utf8',
                    err => {
                        if (err) throw err;
                        console.log('Archivo guardado correctamente.');
                    }
                );
                askQuestion();
            } else if (input == 'cargar') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'path',
                            message: 'Introduzca la ruta del archivo a cargar: '
                        }
                    ])
                    .then(ruta => {
                        let rawdata = fs.readFileSync(ruta.path);
                        operationDB = JSON.parse(rawdata.toString());
                        askQuestion();
                    })
                    .catch(error => {
                        console.log('La ruta introducida no es válida.', error);
                        return;
                    });
            } else {
                if (input.length == 3 && input[1] == '->') {
                    if (Number.isInteger(parseInt(input[2])))
                        throw Error(
                            'No se esta asignando el valor a un registro adecuado.'
                        );
                    let flag1 = !Number.isInteger(parseInt(input[0]))
                        ? true
                        : false; //Comprueba si el primer parámetro es un registro (true).
                    let flag2 = operationDB.find(
                        registro => registro.name == input[0]
                    )
                        ? true
                        : false; //Comprueba si existe el registro origen (true).
                    if (flag1 && flag2) {
                        //El registro origen existe
                        let index_registro1 = operationDB.findIndex(
                            registro => registro.name == input[0]
                        );
                        let valor_registro1 =
                            operationDB[index_registro1].value;
                        //Si el registro destino existe, sobreescribe el valor, sino crea una nueva entrada.
                        operationDB.find(registro => registro.name == input[2])
                            ? (operationDB[
                                  operationDB.findIndex(
                                      registro => registro.name == input[2]
                                  )
                              ].value = valor_registro1)
                            : operationDB.push({
                                  name: input[2],
                                  value: valor_registro1
                              });
                        askQuestion();
                    } else if (!flag1) {
                        //El primer elemento es un número.
                        //Si el registro destino existe, sobreescribe el valor, sino crea una nueva entrada.
                        operationDB.find(registro => registro.name == input[2])
                            ? (operationDB[
                                  operationDB.findIndex(
                                      registro => registro.name == input[2]
                                  )
                              ].value = parseInt(input[0]))
                            : operationDB.push({
                                  name: input[2],
                                  value: parseInt(input[0])
                              });
                        askQuestion();
                    } else throw Error('El registro origen no existe.');
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                else if (
                    input.length == 4 &&
                    input[2] == '->' &&
                    input[0] == 'NOT'
                ) {
                    if (Number.isInteger(parseInt(input[3])))
                        throw Error(
                            'No se esta asignando el valor a un registro adecuado.'
                        );
                    let flag1 = !Number.isInteger(parseInt(input[1]))
                        ? true
                        : false; //Comprueba si el primer parámetro es un registro (true).
                    let flag2 = operationDB.find(
                        registro => registro.name == input[1]
                    )
                        ? true
                        : false; //Comprueba si existe el registro origen (true).
                    let flag3 = operationDB.find(
                        registro => registro.name == input[3]
                    )
                        ? true
                        : false; //Comprueba si existe el registro origen (true).
                    if (flag1 && flag2) {
                        //El registro origen existe
                        let index_registro1 = operationDB.findIndex(
                            registro => registro.name == input[1]
                        );
                        var valor_registro1 =
                            operationDB[index_registro1].value;
                    } else if (!flag1)
                        //El primer elemento es un número.
                        var valor_registro1 = parseInt(input[1]);
                    else throw Error('El registro origen no existe.');
                    if (flag3) {
                        operationDB[
                            operationDB.findIndex(
                                registro => registro.name == input[3]
                            )
                        ].value = ~valor_registro1;
                        askQuestion();
                    } else {
                        operationDB.push({
                            name: input[4],
                            value: ~valor_registro1
                        });
                        askQuestion();
                    }
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                else if (input.length == 5 && input[3] == '->') {
                    if (Number.isInteger(parseInt(input[4])))
                        throw Error(
                            'No se esta asignando el valor a un registro adecuado.'
                        );
                    let flag1 = !Number.isInteger(parseInt(input[0]))
                        ? true
                        : false; //Comprueba si el primer parámetro es un registro (true).
                    let flag2 = operationDB.find(
                        registro => registro.name == input[0]
                    )
                        ? true
                        : false; //Comprueba si existe el registro origen (true).
                    let flag3 = !Number.isInteger(parseInt(input[2]))
                        ? true
                        : false; //Comprueba si el segundo parámetro es un registro (true).
                    let flag4 = operationDB.find(
                        registro => registro.name == input[2]
                    )
                        ? true
                        : false; //Comprueba si existe el segundo registro  (true).
                    let flag5 = operationDB.find(
                        registro => registro.name == input[4]
                    )
                        ? true
                        : false; //Comprueba si existe el segundo registro  (true).
                    if (flag1 && flag2) {
                        let index_registro1 = operationDB.findIndex(
                            registro => registro.name == input[0]
                        );
                        var valor_registro1 =
                            operationDB[index_registro1].value;
                    } else if (!flag1)
                        var valor_registro1 = parseInt(input[0]);
                    else throw Error('El registro origen no existe.');
                    if (flag3 && flag4) {
                        let index_registro2 = operationDB.findIndex(
                            registro => registro.name == input[2]
                        );
                        var valor_registro2 =
                            operationDB[index_registro2].value;
                    } else if (!flag3)
                        var valor_registro2 = parseInt(input[2]);
                    else throw Error('El registro secundario no existe.');
                    switch (input[1]) {
                        case 'AND':
                            if (flag5) {
                                operationDB[
                                    operationDB.findIndex(
                                        registro => registro.name == input[4]
                                    )
                                ].value = valor_registro1 & valor_registro2;
                                askQuestion();
                            } else {
                                operationDB.push({
                                    name: input[4],
                                    value: valor_registro1 & valor_registro2
                                });
                                askQuestion();
                            }
                            break;
                        case 'OR':
                            if (flag5) {
                                operationDB[
                                    operationDB.findIndex(
                                        registro => registro.name == input[4]
                                    )
                                ].value = valor_registro1 | valor_registro2;
                                askQuestion();
                            } else {
                                operationDB.push({
                                    name: input[4],
                                    value: valor_registro1 | valor_registro2
                                });
                                askQuestion();
                            }
                            break;
                        case 'LSHIFT':
                            if (flag5) {
                                operationDB[
                                    operationDB.findIndex(
                                        registro => registro.name == input[4]
                                    )
                                ].value = valor_registro1 << valor_registro2;

                                askQuestion();
                            } else {
                                operationDB.push({
                                    name: input[4],
                                    value: valor_registro1 << valor_registro2
                                });
                                askQuestion();
                            }
                            break;
                        case 'RSHIFT':
                            if (flag5) {
                                operationDB[
                                    operationDB.findIndex(
                                        registro => registro.name == input[4]
                                    )
                                ].value = valor_registro1 >> valor_registro2;
                                askQuestion();
                            } else {
                                operationDB.push({
                                    name: input[4],
                                    value: valor_registro1 >> valor_registro2
                                });
                                askQuestion();
                            }
                            break;
                        default:
                            throw Error(
                                'La operación introducida no es correcta.'
                            );
                    }
                } else throw Error('No ha introducido una operación valida.');
            }
        });
};

askQuestion();
