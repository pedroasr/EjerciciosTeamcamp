import * as React from 'react';

import Watch, { Time } from './components/watch';
import Person from './components/watch/Persona';

import './styles.css';

function App() {
    return (
        
        <div className='App'>
            <h1 className={'Title'}>TeamCamp 2022</h1>
            <div className={'Body'}>
                <Watch currentTime={new Date()} timeZone={'Europe/London'} />
                <Watch currentTime={new Date()} timeZone={'Europe/Madrid'} />
                <Watch currentTime={new Date()} timeZone={'America/New_York'} />
                <Person name="Pedro" surname="Sánchez"></Person>
            </div>
            <div className={'Body'}>
                <Time time={'700 ZULU'} timeZone={'NoWhere'} />
            </div>
        </div>
    );
}

export default App;