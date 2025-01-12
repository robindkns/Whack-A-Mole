import { RefObject } from "react";

export interface BoardProps {
    activeMole : number | null;
    score : number;
    timeLeft : number;
    hitSoundRef: RefObject<HTMLAudioElement | null>;
}