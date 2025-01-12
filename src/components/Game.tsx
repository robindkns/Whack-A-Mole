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
import { FaArrowLeft } from "react-icons/fa";
import { changeMode } from '../redux/features/difficultySlice';

export default function Game() {

    const [gameStarted, setGameStarted] = useState(false);
    const { activeMole,score,timeLeft,isGameOver } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    // Mode related variables
    const nbMoles = useSelector((state: RootState) => state.difficulty.moles);
    const timeBetween = useSelector((state: RootState) => state.difficulty.timeBetween);

    // Music related variables
    const [gameMusicPlaying, setGameMusicPlaying] = useState(false);
    const urlClickSound : string = require('../assets/sounds/SelectSound.mp3');
    const urlTitleTheme: string = require('../assets/sounds/TitleTheme.mp3');
    const urlGameMusic: string = require('../assets/sounds/GameMusic.mp3');
    const urlHitSound: string = require('../assets/sounds/Hit.mp3');
    const [volume, setVolume] = useState(0);
    const openingMusicRef = useRef<HTMLAudioElement | null>(null);
    const gameMusicRef = useRef<HTMLAudioElement | null>(null);
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);
    const hitSoundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (openingMusicRef.current && !gameMusicPlaying) {
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
        if (hitSoundRef.current) {
            hitSoundRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        // Decrement timer
        const timer = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);
        // Stop timer when game is over and play opening music
        if (isGameOver) {
            clearInterval(timer);
            if (gameMusicRef.current) {
                gameMusicRef.current.pause();
                setGameMusicPlaying(false);
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
                const randomMole = Math.floor(Math.random() * nbMoles);
                dispatch(setActiveMole(randomMole));
            }, timeBetween);
            // Clean up interval
            return () => clearInterval(interval);
        }
        
    }, [ gameStarted, isGameOver, dispatch]);

    function backToHome() {
        setGameStarted(false);
        setGameMusicPlaying(false);
        dispatch(changeMode(''))
    }
    return(
        <>
            <div className='game'>
                <audio ref={clickSoundRef} src={urlClickSound} />
                <audio ref={openingMusicRef} src={urlTitleTheme} loop />
                <audio ref={gameMusicRef} src={urlGameMusic} loop />
                <audio ref={hitSoundRef} src={urlHitSound} />

                {/* {!gameStarted && 
                    <HomeMenu setGameStarted={setGameStarted} gameMusicRef={gameMusicRef} openingMusicRef={openingMusicRef} clickSoundRef={clickSoundRef} setGameMusicPlaying={setGameMusicPlaying} /> 
                }
                {!isGameOver && gameStarted &&
                    <Board activeMole={activeMole} score={score} timeLeft={timeLeft} hitSoundRef={hitSoundRef} />
                }
                {isGameOver && gameStarted &&
                <>
                    <EndingMenu gameMusicRef={gameMusicRef} openingMusicRef={openingMusicRef} clickSoundRef={clickSoundRef} setGameMusicPlaying={setGameMusicPlaying} />
                </>
                }
                {gameStarted &&
                    <div className="back-button">
                        <FaArrowLeft onClick={backToHome} />
                    </div>
                } */}
                <Board activeMole={activeMole} score={score} timeLeft={timeLeft} hitSoundRef={hitSoundRef} />
                <div className="volume-control">
                    <label htmlFor="volume-slider">{volume === 0 ? <FaVolumeXmark onClick={() => setVolume(0.10)} /> : <FaVolumeHigh onClick={() => setVolume(0)} />}</label>
                </div>
            </div>
        </>
    )
};
