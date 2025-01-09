import '../styles/Board.sass';
import Mole from "./Mole";
import { BoardProps } from "../typescript/BoardProps";

export default function Board( {activeMole,score,timeLeft}:BoardProps ) {
    return (
        <>
            <h1 className="score">Score : {score}</h1>
            <h1 className="timer">Time Left : {timeLeft}</h1>
            <div className="board">
                {Array.from({ length: 12 }, (_, index) => (
                    <Mole key={index} id={index} isActive={activeMole === index} />
                ))}
            </div>
        </>
    );
}
