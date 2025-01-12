/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/game/EndingMenu.sass'
import { useDispatch, useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { RootState } from "../redux/store";
import { useEffect, useState } from 'react';
import axios from 'axios';
import NameInput from './ui/InputName';
import { EndGameProps } from '../typescript/EndGameProps';
import AlertBox from './ui/AlertBox';
import { unlockingMode } from '../redux/features/difficultySlice';

export default function EndingMenu({ gameMusicRef,openingMusicRef,clickSoundRef,setGameMusicPlaying } : EndGameProps) {

    // Redux States
    const { score } = useSelector((state: RootState) => state.game);
    const hardModeUnlocked = useSelector((state: RootState) => state.difficulty.unlocked);
    const dispatch = useDispatch();
    
    // Local States
    const [playerName, setPlayerName] = useState('');
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [alertON, setAlertON] = useState(false);
    const [alertReason, setAlertReason] = useState('');

    function alertMessage(message: string) {
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        setAlertON(true);
        setAlertReason(message);
        setTimeout(() => {
            setAlertON(false);
            setAlertReason('');
        },5000)
    }

    const submitScore = async (name: string, score: number) => {
        if (clickSoundRef.current) {
            clickSoundRef.current.play();
        }
        try {
            const response = await axios.post('/api/leaderboard', { name, score });
            if (response.status === 201) {
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(() => setShowLeaderboard(true), 500);
                }, 500); // Adding delay for Redux to update the leaderboard
            }
        } catch (error: any) {
            alertMessage(error.response?.data?.error || 'Unknown error when submitting score.');
        }
    };

    useEffect(() => {
        if (!hardModeUnlocked){
            dispatch(unlockingMode());
            alertMessage('You have unlocked Hard Mode ! Go back to the title screen to try it !');
        }
    }, []);


    return (
        <>
        {!showLeaderboard && 
            <>  
                {alertON && <AlertBox message={alertReason}/>}
                <div className="ending-container" style={ fadeOut ? {animation : "fade-out-left 0.5s ease-in-out forwards"} : {}}>
                    <h1 id='ending-title'>Congratulations !</h1>
                    <h3>Your score is {score} points !</h3>
                    <p>Please enter your name :</p>
                    <NameInput playerName={playerName} setPlayerName={setPlayerName} />
                    <button id='submit-button' onClick={() => submitScore(playerName, score)}>Submit</button>
                </div>
            </>
        }
        {showLeaderboard &&
            <Leaderboard gameMusicRef={gameMusicRef} openingMusicRef={openingMusicRef} clickSoundRef={clickSoundRef} setGameMusicPlaying={setGameMusicPlaying} />
        }
        </>
    );
}
