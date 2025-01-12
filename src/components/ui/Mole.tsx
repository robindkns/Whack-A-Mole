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
            // console.log(`Mole ${id} whacked!`);
            if (hitSoundRef.current) {
                hitSoundRef.current.currentTime = 0; // Reset audio to play to avoid waiting it to be done before the next one
                hitSoundRef.current.play();
            }
            dispatch(incrementScore());
            dispatch(setActiveMole(null));
            setMoleHit(true);
        }
    };

    // Handling mole hit's animation
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
