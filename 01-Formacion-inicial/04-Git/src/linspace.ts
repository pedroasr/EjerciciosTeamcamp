export function linspace(start: number,
                         stop: number,
                         nvalues: number) : number[] {
    let arr: number[] = [];
    let step = (stop - start) / (nvalues - 1);
    for (let i = 0; i < nvalues; i++) {
        arr.push(start + (step * i));
    }
    return arr;
}