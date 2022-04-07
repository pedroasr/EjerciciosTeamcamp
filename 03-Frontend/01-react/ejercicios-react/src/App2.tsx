import * as React from 'react';
import {IsEvenOrOdd} from './components/watch/numeros'

import './styles.css';

function App2() {
    return (
        
        <div className='App'>
            <h1 className={'Title'}>TeamCamp 2022</h1>
            <div className={'Body'}>
                <IsEvenOrOdd></IsEvenOrOdd>
            </div>
        </div>
    );
}

export default App2;