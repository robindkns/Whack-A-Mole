/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/Game.sass'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveMole, decrementTimer } from '../redux/features/gameSlice';
import Board from './Board';
import HomeMenu from './HomeMenu';
import EndingMenu from './EndingMenu';
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";


export default function Game() {

    const [gameStarted, setGameStarted] = useState(false);
    const { activeMole,score,timeLeft,isGameOver } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    // Music related variables
    const urlClickSound : string = require('../assets/sounds/SelectSound.mp3');
    const urlTitleTheme: string = require('../assets/sounds/TitleTheme.mp3');
    const urlGameMusic: string = require('../assets/sounds/GameMusic.mp3');
    const [volume, setVolume] = useState(0);
    const openingMusicRef = useRef<HTMLAudioElement | null>(null);
    const gameMusicRef = useRef<HTMLAudioElement | null>(null);
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (openingMusicRef.current) {
            openingMusicRef.current.volume = volume
            openingMusicRef.current.play().catch((err) => console.error(err));
        }

        return () => {
            if (openingMusicRef.current) {
                openingMusicRef.current.pause();
            }
        };
    }, [volume]);

    useEffect(() => {
        if (openingMusicRef.current) {
            openingMusicRef.current.volume = volume;
        }
        if (gameMusicRef.current) {
            gameMusicRef.current.volume = volume;
        }
        if (clickSoundRef.current) {
            clickSoundRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        // Decrement timer
        const timer = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);
        // Stop timer when game is over
        if (isGameOver) {
            clearInterval(timer);

            if (gameMusicRef.current) {
                gameMusicRef.current.pause();
            }
            if (openingMusicRef.current) {
                openingMusicRef.current.play();
            }
        }
        // Clean up timer
        return () => clearInterval(timer);
    }, [isGameOver, dispatch]);

    useEffect(() => {
        // Generate random mole
        if(!isGameOver){
            const interval = setInterval(() => {
                const randomMole = Math.floor(Math.random() * 12);
                dispatch(setActiveMole(randomMole));
            }, 1000)
            // Clean up interval
            return () => clearInterval(interval);
        }
        
    }, [ gameStarted, isGameOver, dispatch]);

    return(
        <>
            <div className='game'>
                <audio ref={clickSoundRef} src={urlClickSound} />
                <audio ref={openingMusicRef} src={urlTitleTheme} loop />
                <audio ref={gameMusicRef} src={urlGameMusic} loop />

                {!gameStarted && 
                    <HomeMenu setGameStarted={setGameStarted} gameMusicRef={gameMusicRef} openingMusicRef={openingMusicRef} clickSoundRef={clickSoundRef} /> 
                }
                {!isGameOver && gameStarted &&
                    <Board activeMole={activeMole} score={score} timeLeft={timeLeft} />
                }
                {isGameOver && gameStarted &&
                <>
                    <EndingMenu gameMusicRef={gameMusicRef} openingMusicRef={openingMusicRef} clickSoundRef={clickSoundRef} />
                </>
                }
                <div className="volume-control">
                    <label htmlFor="volume-slider">{volume === 0 ? <FaVolumeXmark onClick={() => setVolume(0.10)} /> : <FaVolumeHigh onClick={() => setVolume(0)} />}</label>
                </div>
            </div>
        </>
    )
};
