import '../styles/Board.sass';
import Mole from "./Mole";
import { BoardProps } from "../typescript/BoardProps";

export default function Board( {activeMole,score,timeLeft}:BoardProps ) {
    
    function formatTime(timeLeft: number) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return (
        <>
            <h1 className="score">Score : {score}</h1>
            <h1 className="timer">Time Left : {formatTime(timeLeft)}</h1>
            <div className="board">
                {Array.from({ length: 12 }, (_, index) => (
                    <Mole key={index} id={index} isActive={activeMole === index} />
                ))}
            </div>
        </>
    );
}
