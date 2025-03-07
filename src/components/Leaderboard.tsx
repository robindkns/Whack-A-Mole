import axios from "axios"
import '../styles/game/Leaderboard.sass'
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../redux/features/gameSlice";
import Countdown from "./ui/Countdown";
import { EndGameProps } from "../typescript/EndGameProps";

export default function Leaderboard( {gameMusicRef,openingMusicRef,clickSoundRef,setGameMusicPlaying} : EndGameProps) {

    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isStarted, setIsStarted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
                // console.log(response.data);
            })
            .catch(error => console.error('Error when loading leaderboard datas.', error));
    }, []);

    function playAgain() {
        setIsStarted(true);
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        if (openingMusicRef.current) {
            openingMusicRef.current.pause();
        }
        if (gameMusicRef.current) {
            gameMusicRef.current.play();
            setGameMusicPlaying(true);
        }
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
                            <div className="highscore" key={index} style={index === 0 ? { color: "#c78c1d" } : { color: "#363434" }}>
                                <div className="highscore-header">
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
