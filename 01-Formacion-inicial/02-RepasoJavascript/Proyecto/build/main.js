"use strict";

//Función que crea un array con un vector espaciado
function linspace(start, stop, nvalues) {
  var arr = [];
  var step = (stop - start) / (nvalues - 1);

  for (var i = 0; i < nvalues; i++) {
    arr.push(start + step * i);
  }

  return arr;
}

var lista = linspace(1, 10, 1);
console.log(lista);