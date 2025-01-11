import { useDispatch, useSelector } from 'react-redux';
import '../styles/HomeMenu.sass';
import { resetGame } from '../redux/features/gameSlice';
import { HomeMenuProps } from '../typescript/HomeMenuProps';
import { useState } from 'react';
import Countdown from './Countdown';
import { changeMode } from '../redux/features/difficultySlice';
import { RootState } from '../redux/store';

export default function HomeMenu( {setGameStarted,gameMusicRef,openingMusicRef,clickSoundRef} : HomeMenuProps ) {

    const dispatch = useDispatch();
    const difficultyMode = useSelector((state: RootState) => state.difficulty.mode);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    function loading(mode: string) {
        setIsLoading(true);
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        setTimeout(() => {
            setIsLoading(false);
            dispatch(changeMode(mode));
            setIsLoaded(true);
        }, 3000)
    }

    function startGame() {
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        if (openingMusicRef.current) {
            openingMusicRef.current.pause();
        }
        if (gameMusicRef.current) {
            gameMusicRef.current.play();
        }
        setIsStarted(true);
        setTimeout(() => {
            setGameStarted(true);
            dispatch(resetGame());
        }, 4000)
    }

    return(
        <>  
            <div className="home-menu">
            {!isStarted ?
            <>
                <h3>Welcome to</h3>
                <h1>WHACK A MOLE !</h1>
                <div className="select-mode-container">
                    <button id='normal-mode' onClick={difficultyMode === 'normal' ? () => alert('Already selected') : () => loading('normal') }>NORMAL MODE</button>
                    <button id={isDisabled ? 'hard-mode-disabled' : 'normal-mode'} onClick={() => setIsDisabled(true)}>HARD MODE</button>
                </div>
                {isLoading && 
                <>
                    <div className='loader-container'>
                        <div className="loader">
                        <div></div>
                        </div>
                        <p>
                            Loading <span id='dots'>...</span>
                        </p>
                    </div>
                </>}
                {isLoaded && <button id='start-button' onClick={startGame}>START</button>}
                </>: <Countdown />}
            </div>
        </>
    )
};
