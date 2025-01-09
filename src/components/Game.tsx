import '../styles/Game.sass'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveMole } from '../redux/features/gameSlice';
import Mole from './Mole';

export default function Game() {

    const activeMole = useSelector((state: RootState) => state.game.activeMole);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMole = Math.floor(Math.random() * 12);
            dispatch(setActiveMole(randomMole));
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
