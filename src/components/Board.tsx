import '../styles/Board.sass';
import Mole from "./Mole";
import { BoardProps } from "../typescript/BoardProps";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Board( {activeMole,score,timeLeft,hitSoundRef}:BoardProps ) {
    
    const nbMoles = useSelector((state: RootState) => state.difficulty.moles);
    const mode = useSelector((state: RootState) => state.difficulty.mode);

    //Formatting Timer in minutes and seconds
    function formatTime(timeLeft: number) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return (
        <>
            <div className="board-container">
                <h1 className="score">Score : {score}</h1>
                <h1 className="timer">Time Left : {formatTime(timeLeft)}</h1>
                <div className={mode === "normal" ? "board" : "board-hard"}>
                    {Array.from({ length: nbMoles }, (_, index) => (
                        <Mole key={index} id={index} isActive={activeMole === index} hitSoundRef={hitSoundRef} />
                    ))}
                </div>
            </div>
        </>
    );
}
