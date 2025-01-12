import { useDispatch, useSelector } from 'react-redux';
import '../styles/game/HomeMenu.sass';
import { resetGame } from '../redux/features/gameSlice';
import { HomeMenuProps } from '../typescript/HomeMenuProps';
import { useState } from 'react';
import Countdown from './ui/Countdown';
import { changeMode } from '../redux/features/difficultySlice';
import { RootState } from '../redux/store';
import AlertBox from './ui/AlertBox';

export default function HomeMenu( {setGameStarted,gameMusicRef,openingMusicRef,clickSoundRef,setGameMusicPlaying} : HomeMenuProps ) {

    // Redux States
    const dispatch = useDispatch();
    const difficultyMode = useSelector((state: RootState) => state.difficulty.mode);
    const unlocked  = useSelector((state: RootState) => state.difficulty.unlocked);

    // Local States
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [alertON, setAlertON] = useState(false);
    const [alertReason, setAlertReason] = useState('');

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
        if (openingMusicRef.current) { // Stop opening music
            openingMusicRef.current.pause();
        }
        if (gameMusicRef.current) { // Start game music
            gameMusicRef.current.play();
            setGameMusicPlaying(true);
        }
        setIsStarted(true);
        setTimeout(() => {
            setGameStarted(true);
            dispatch(resetGame());
        }, 4000)
    }

    function alertMessage(message: string) {
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        setAlertON(true);
        setAlertReason(message);
        setTimeout(() => {
            setAlertON(false);
            setAlertReason('');
        },5000)
    }

    return(
        <>  
            {alertON && <AlertBox message={alertReason} />}
            <div className="home-menu">
                {!isStarted ?
                <>
                    <h3>Welcome to</h3>
                    <h1>WHACK A MOLE !</h1>
                    <div className="select-mode-container">
                        <button className={difficultyMode === "normal" ? 'unlocked selected' : 'unlocked'} onClick={difficultyMode === 'normal' ? () => alertMessage('Difficulty mode already selected') : () => loading('normal') } disabled={isLoading}>NORMAL MODE</button>
                        <button className={!unlocked ? 'locked' : unlocked && difficultyMode === 'hard' ? 'unlocked selected' : 'unlocked'} style={difficultyMode === 'hard' ? {border: '2px solid #363434'} : {border: '2px solid #00000043'}}  onClick={difficultyMode === 'hard' ? () => alertMessage('Difficulty mode already selected') : () => loading('hard') } disabled={!unlocked || isLoading}>HARD MODE</button>
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
