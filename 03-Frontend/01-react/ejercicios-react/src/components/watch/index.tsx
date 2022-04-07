import * as React from 'react';

import './styles.css';

type TimeProps = {
    time: string;
    timeZone: string;
};
export function Time({ time, timeZone }: TimeProps) {
    return (
        <p className={'Time'}>
            Time in {timeZone}: {time}
        </p>
    );
}
type WatchProps = {
    currentTime: Date;
    timeZone: 'America/New_York' | 'Europe/Madrid' | 'Europe/London';
};
export function Watch({ currentTime, timeZone }: WatchProps) {
    const timeInCountry = new Date(
        currentTime.toLocaleString(undefined, { timeZone })
    );
    const time = `${timeInCountry.getHours()}:${timeInCountry.getMinutes()}:${timeInCountry.getSeconds()}`;
    return (
        <div className='Watcher'>
            <Time time={time} timeZone={timeZone} />
        </div>
    );
}

export default Watch;