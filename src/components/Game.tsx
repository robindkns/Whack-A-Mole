/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/Game.sass'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveMole, decrementTimer, resetGame } from '../redux/features/gameSlice';
import Board from './Board';

export default function Game() {

    // Get states from redux store
    const { activeMole,score,timeLeft,isGameOver } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    useEffect(() => {
        // Decrement timer
        const timer = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);

        // Stop timer when game is over
        if (isGameOver) {
            clearInterval(timer);
        }

        // Clean up timer
        return () => clearInterval(timer);

    }, [isGameOver, dispatch]);

    useEffect(() => {
        // Generate random mole
        if(!isGameOver){
            const interval = setInterval(() => {
                const randomMole = Math.floor(Math.random() * 12);
                dispatch(setActiveMole(randomMole));
            }, 1000)
            
            // Clean up interval
            return () => clearInterval(interval);
        }
        
    }, []);

    return(
        <>
            <div className='game'>
                {!isGameOver &&
                    <Board activeMole={activeMole} score={score} timeLeft={timeLeft} />
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
