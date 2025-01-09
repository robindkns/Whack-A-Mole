/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/Game.sass'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveMole, decrementTimer, resetGame } from '../redux/features/gameSlice';
import Mole from './Mole';

export default function Game() {

    const { activeMole,score,timeLeft,isGameOver } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);

        if (isGameOver) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);

    }, [isGameOver, dispatch]);

    useEffect(() => {
        if(!isGameOver){
            const interval = setInterval(() => {
                const randomMole = Math.floor(Math.random() * 12);
                dispatch(setActiveMole(randomMole));
            }, 1000)
            
            return () => clearInterval(interval);
        }
        
    }, []);

    return(
        <>
            <div className='game'>
                {!isGameOver &&
                <>
                    <h1 className='score'>Score : {score}</h1> 
                    <h1 className='timer'>Time Left : {timeLeft}</h1>
                    <div className="board">
                        {Array.from({length: 12}, (_, index) => (
                            <Mole key={index} id={index} isActive={activeMole === index} />
                        ))}
                    </div>
                </>
                }
                {isGameOver &&
                <>
                    <div className='gameover-container'>
                        <h1>Game Over</h1>
                        <button onClick={() => dispatch(resetGame())}>Play Again</button>
                    </div>
                </>
                }
            </div>
        </>
    )
};
