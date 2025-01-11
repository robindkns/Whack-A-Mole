/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/EndingMenu.sass'
import { useDispatch, useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { RootState } from "../redux/store";
import { useEffect, useState } from 'react';
import axios from 'axios';
import NameInput from './InputName';
import { EndGameProps } from '../typescript/EndGameProps';
import AlertBox from './ui/AlertBox';
import { unlockingMode } from '../redux/features/difficultySlice';

export default function EndingMenu({ gameMusicRef,openingMusicRef,clickSoundRef } : EndGameProps) {

    const { score } = useSelector((state: RootState) => state.game);
    const [playerName, setPlayerName] = useState('');
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const hardModeUnlocked = useSelector((state: RootState) => state.difficulty.unlocked);
    const dispatch = useDispatch();

    const submitScore = async (name: string, score: number) => {
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        try {
            const response = await axios.post('/api/leaderboard', { name, score });
            if (response.status === 201) {
                setFadeOut(true);
                setTimeout(() => {
                    setShowLeaderboard(true);
                },500)
            }
        } catch (error: any) {
            alert(error.response?.data?.error || 'Unknown error when submitting score.');
        }
    };

    const handlePlayerNameChange = (name: string) => {
        setPlayerName(name)
    };

    useEffect(() => {
        if (!hardModeUnlocked){
            dispatch(unlockingMode());
        }
    }, [hardModeUnlocked]);

    return (
        <>
        {!showLeaderboard && 
            <>  
                {hardModeUnlocked && <AlertBox done={hardModeUnlocked} message="You have unlocked hard mode ! Go back to the title screen to try it !"/>}
                <div className="ending-container" style={ fadeOut ? {animation : "fade-out-left 0.5s ease-in-out forwards"} : {}}>
                    <h1 id='ending-title'>Congratulations !</h1>
                    <h3>Your score is {score} points !</h3>
                    <p>Please enter your name :</p>
                    <NameInput playerName={playerName} setPlayerName={handlePlayerNameChange} />
                    <button id='submit-button' onClick={() => submitScore(playerName, score)}>Submit</button>
                </div>
            </>
        }
        {showLeaderboard &&
            <Leaderboard gameMusicRef={gameMusicRef} openingMusicRef={openingMusicRef} clickSoundRef={clickSoundRef} />
        }
        </>
    );
}
