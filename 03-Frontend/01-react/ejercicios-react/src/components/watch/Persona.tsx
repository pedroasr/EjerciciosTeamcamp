import * as React from 'react';

import './styles.css';

type PersonProps = {
    name: string;
    surname: string;
};
export function Person({ name, surname }: PersonProps) {
    return (
        <p className={'Person'}>
            {name}: {surname}
        </p>
    );
}

export default Person;