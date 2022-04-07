import * as React from 'react';

import './styles.css'

export function IsEvenOrOdd (){
    const randonNumber = Math.floor(Math.random() * 10000);
    if (randonNumber % 2 === 0)
        return (
            <p className={'RandomNumber'}>
                El número {randonNumber} es par.
            </p>
        )
    else        
        return (
            <p className={'RandomNumber'}>
                El número {randonNumber} es impar.
            </p>
        )
}

export default IsEvenOrOdd;