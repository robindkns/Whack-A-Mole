import { RefObject } from 'react';

export interface EndGameProps {
    gameMusicRef: RefObject<HTMLAudioElement | null>
    openingMusicRef: RefObject<HTMLAudioElement | null>
    clickSoundRef: RefObject<HTMLAudioElement | null>
}
