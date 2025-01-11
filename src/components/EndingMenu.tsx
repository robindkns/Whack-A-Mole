import '../styles/EndingMenu.sass'
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { RootState } from "../redux/store";
import { useState } from 'react';
import axios from 'axios';
import NameInput from './InputName';

export default function EndingMenu() {

    const { score } = useSelector((state: RootState) => state.game);
    const [playerName, setPlayerName] = useState('');
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    console.log("actual name : " + playerName);

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

    const handlePlayerNameChange = (name: string) => {
        setPlayerName(name); // Mettez à jour le nom du joueur à chaque changement
    };

    return (
        <>
        <div className="ending-container">
            {!showLeaderboard && 
                <>
                    <h1>Congratulations !</h1>
                    <h3>Your score is {score} points !</h3>
                    <p>Please enter your name :</p>
                    <NameInput playerName={playerName} setPlayerName={handlePlayerNameChange} />
                    <button id='submit-button' onClick={() => submitScore(playerName, score)}>Submit</button>
                </>
            }
            {showLeaderboard &&
                <Leaderboard />
            }
        </div>
        </>
    );
}
