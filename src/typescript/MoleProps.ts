import { RefObject } from "react";

export interface MoleProps {
    id : number
    isActive: boolean
    hitSoundRef: RefObject<HTMLAudioElement | null>;
}