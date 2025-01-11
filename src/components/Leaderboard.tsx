import axios from "axios"
import '../styles/Leaderboard.sass'
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../redux/features/gameSlice";
import Countdown from "./Countdown";

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isStarted, setIsStarted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error when loading leaderboard datas.', error));
    }, []);

    function playAgain() {
        setIsStarted(true);
        setTimeout(() => {
            dispatch(resetGame());
        }, 4000);
    }
    return(
        <>
            {!isStarted ? <>
                <div className="leaderboard">
                    <h1>WHACK A MOLE !</h1>
                    <h3>Hall Of Fame</h3>
                    <div className="highscores-container">
                        {leaderboard.map((score, index) => (
                            <div className="score" key={index} style={index === 0 ? { color: "#c78c1d" } : { color: "#363434" }}>
                                <div className="score-header">
                                    <span>{index + 1}</span>
                                    <span>{score.name}</span>
                                </div>
                                <span>{score.score}</span>
                            </div>
                        ))}
                    </div> 
                    <button onClick={playAgain}>Play Again</button>
                </div>
                </> 
                : <Countdown />
            }
        </>
    )
};
