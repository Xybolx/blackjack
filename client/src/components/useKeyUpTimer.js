import { useEffect, useState } from 'react';
import listeners from './listeners';

const KeyUpTimer = () => {

    const [keyUpTimer, setKeyUpTimer] = useState(600);

    useEffect(() => {
        const keyUpInterval = setInterval(() => {
            setKeyUpTimer(keyUpTimer - 1)
        }, 1000);
        return () => clearInterval(keyUpInterval);
    }, [keyUpTimer]);
    
    listeners.useKeyUp(ev => console.log(`typing!`));

    return (
        null
    );
};

export default KeyUpTimer;
