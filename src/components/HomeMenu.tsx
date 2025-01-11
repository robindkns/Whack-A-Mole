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
    const unlocked  = useSelector((state: RootState) => state.difficulty.unlocked);
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

    console.log("unlocked: ", unlocked);

    return(
        <>  
            <div className="home-menu">
            {!isStarted ?
            <>
                <h3>Welcome to</h3>
                <h1>WHACK A MOLE !</h1>
                <div className="select-mode-container">
                    <button className='unlocked' style={difficultyMode === 'normal' ? {border: '2px solid #363434'} : {border: '2px solid #00000043'}} onClick={difficultyMode === 'normal' ? () => alert('Already selected') : () => loading('normal') }>NORMAL MODE</button>
                    <button className={!unlocked ? 'locked' : 'unlocked'} style={difficultyMode === 'hard' ? {border: '2px solid #363434'} : {border: '2px solid #00000043'}}  onClick={difficultyMode === 'hard' ? () => alert('Already selected') : () => loading('hard') }>HARD MODE</button>
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
                {isLoaded && !isLoading && <button id='start-button' onClick={startGame}>START</button>}
                </>: <Countdown />}
            </div>
        </>
    )
};
