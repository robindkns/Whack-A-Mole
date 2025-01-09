import '../styles/Game.sass'
import { useEffect, useState } from 'react';
import Mole from './Mole';

export default function Game() {

    const [activeMole, setActiveMole] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMole = Math.floor(Math.random() * 12);
            setActiveMole(randomMole);
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div className='game'>
                <div className="board">
                    {Array.from({length: 12}, (_, index) => (
                        <Mole key={index} id={index} isActive={activeMole === index} />
                    ))}
                </div>
            </div>
        </>
    )
};
