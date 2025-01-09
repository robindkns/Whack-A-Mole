import '../styles/Game.sass'
import { useEffect, useState } from 'react';

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
                    {Array.from({length: 12}, (_, i) => <div key={i} className="hole" style={activeMole === i ? { backgroundColor: 'green' } : { backgroundColor: 'red'}}></div>)}
                </div>
            </div>
        </>
    )
};
