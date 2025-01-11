import { RefObject } from 'react';

export interface MusicProps {
    gameMusicRef: RefObject<HTMLAudioElement | null>
    openingMusicRef: RefObject<HTMLAudioElement | null>
    clickSoundRef: RefObject<HTMLAudioElement | null>
}
