/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/Game.sass'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveMole, decrementTimer } from '../redux/features/gameSlice';
import Board from './Board';
import HomeMenu from './HomeMenu';
import EndingMenu from './EndingMenu';
import Leaderboard from './Leaderboard';

export default function Game() {

    const [gameStarted, setGameStarted] = useState(false);

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
        
    }, [gameStarted, isGameOver, dispatch]);

    return(
        <>
            <div className='game'>
                {/* {!gameStarted && 
                    <HomeMenu setGameStarted={setGameStarted} /> 
                }
                {!isGameOver && gameStarted &&
                    <Board activeMole={activeMole} score={score} timeLeft={timeLeft} />
                }
                {isGameOver && gameStarted &&
                <>
                    <EndingMenu />
                </>
                } */}
                <EndingMenu />
                {/* <Leaderboard /> */}
            </div>
        </>
    )
};
