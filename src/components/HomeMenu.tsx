import { useDispatch } from 'react-redux';
import '../styles/HomeMenu.sass';
import { resetGame } from '../redux/features/gameSlice';
import { HomeMenuProps } from '../typescript/HomeMenuProps';

export default function HomeMenu( {setGameStarted} : HomeMenuProps ) {

    const dispatch = useDispatch();

    function startGame() {
        dispatch(resetGame());
        setGameStarted(true);
    }

    return(
        <>  
            <div className="home-menu">
                <h1>WHACK A MOLE !</h1>
                <button onClick={startGame}>Start Playing !</button>
            </div>
        </>
    )
};
