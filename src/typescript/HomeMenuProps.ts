import { Dispatch, RefObject, SetStateAction } from 'react';

export interface HomeMenuProps {
    setGameStarted: Dispatch<SetStateAction<boolean>>;
    gameMusicRef: RefObject<HTMLAudioElement | null>
    openingMusicRef: RefObject<HTMLAudioElement | null>
}
