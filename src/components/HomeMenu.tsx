import { useDispatch } from 'react-redux';
import '../styles/HomeMenu.sass';
import { resetGame } from '../redux/features/gameSlice';
import { HomeMenuProps } from '../typescript/HomeMenuProps';
import { useState } from 'react';

export default function HomeMenu( {setGameStarted} : HomeMenuProps ) {

    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    function loading() {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsLoaded(true);
        }, 3000)
    }

    function startGame() {
        dispatch(resetGame());
        setGameStarted(true);
    }

    return(
        <>  
            <div className="home-menu">
                <h3>Welcome to</h3>
                <h1>WHACK A MOLE !</h1>
                <div className="select-mode-container">
                    <button id='normal-mode' onClick={loading}>NORMAL MODE</button>
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
            </div>
        </>
    )
};
