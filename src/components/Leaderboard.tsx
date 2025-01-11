import axios from "axios"
import '../styles/Leaderboard.sass'
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../redux/features/gameSlice";
import Countdown from "./Countdown";
import { MusicProps } from "../typescript/MusicProps";

export default function Leaderboard( {gameMusicRef,openingMusicRef} : MusicProps) {

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
        // Arrêter la musique d'ouverture
        if (openingMusicRef.current) {
            openingMusicRef.current.pause();
        }
        // Jouer la musique du jeu
        if (gameMusicRef.current) {
            gameMusicRef.current.play();
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
