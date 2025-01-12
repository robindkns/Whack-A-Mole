import { Dispatch, RefObject, SetStateAction } from 'react';

export interface HomeMenuProps {
    setGameStarted: Dispatch<SetStateAction<boolean>>
    gameMusicRef: RefObject<HTMLAudioElement | null>
    openingMusicRef: RefObject<HTMLAudioElement | null>
    clickSoundRef: RefObject<HTMLAudioElement | null>
    setGameMusicPlaying: Dispatch<SetStateAction<boolean>>
}
