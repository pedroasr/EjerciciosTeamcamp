export function linspace(start, stop, nvalues) {
    let arr = [];
    let step = (stop - start) / (nvalues - 1);
    for (let i = 0; i < nvalues; i++) {
      arr.push(start + (step * i));
    }
    return arr;
}

export function conway(num){
    num = num.toString().split('');
    var cont = 1;
    var line = '';
    for (let i = 0; i < num.length; i++) {
        if (num[i] == num[i+1]) 
            cont++;
        else {
            line = line + cont + num[i]; 
            cont = 1;
        }
    }
    return line;
}

export function factorial(num) {
    let total = 1;
    if (num === 0 || num === 1)
        return total;
    for (let i = 1; i <= num; i++)
        total *= i;
    return total;    
}

export function arrayFactorial(start, stop) {
    var arr = linspace(start, stop, (stop-start+1));
    var fact = [];
    for (let i = 0; i < arr.length; i++)
        fact.push(factorial(arr[i]));
    return fact;
}