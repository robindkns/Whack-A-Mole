import '../styles/EndingMenu.sass'
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { RootState } from "../redux/store";
import { useState } from 'react';
import axios from 'axios';

export default function EndingMenu() {

    const { score } = useSelector((state: RootState) => state.game);
    const [playerName, setPlayerName] = useState("");
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const submitScore = async (name: string, score: number) => {
        try {
            const response = await axios.post('/api/leaderboard', { name, score });

            if (response.status === 201) {
                setShowLeaderboard(true);
            }
        } catch (error: any) {
            alert(error.response?.data?.error || 'Unknown error when submitting score.');
        }
    };

    return (
        <>
        <div className="ending-container">
            {!showLeaderboard && 
                <>
                    <h1>Congratulations !</h1>
                    <h2>Your score is {score} points !</h2>
                    <div>
                        <span>Name : </span>
                        <input type="text" onChange={(e) => setPlayerName(e.target.value)} />
                    </div>
                    <button onClick={() => submitScore(playerName, score)}>Submit</button>
                </>
            }
            {showLeaderboard &&
                <Leaderboard />
            }
        </div>
        </>
    );
}
