import '../../styles/ui/Mole.sass';
import { MoleProps } from "../../typescript/MoleProps";
import { useDispatch } from 'react-redux';
import { incrementScore, setActiveMole } from '../../redux/features/gameSlice';
import { useEffect, useState } from 'react';

export default function Mole({id,isActive,hitSoundRef}: MoleProps) {

    const dispatch = useDispatch();
    const [moleHit, setMoleHit] = useState(false);

    const handleWhack = () => {
        if (isActive && !moleHit) {
            console.log(`Mole ${id} whacked!`);
            if (hitSoundRef.current) {
                hitSoundRef.current.currentTime = 0; // Remettre la lecture à zéro
                hitSoundRef.current.play();         // Jouer le son
            }
            dispatch(incrementScore());
            dispatch(setActiveMole(null));
            setMoleHit(true);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (moleHit) {
            timeout = setTimeout(() => {
                setMoleHit(false);
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [moleHit]);

    return (
        <>
            <div className={moleHit ? "mole-hit" : isActive ? "mole" : "hole"} onClick={handleWhack}></div>
        </>
    )
};
