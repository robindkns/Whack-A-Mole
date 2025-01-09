import { useState } from 'react';
import '../styles/Mole.sass';
import { MoleProps } from "../typescript/MoleType";

export default function Mole({id,isActive}: MoleProps) {

    const [isWhacked, setIsWhacked] = useState(false);

    const handleWhack = () => {
        if(isActive){
            console.log(`Mole ${id} whacked!`);
            setIsWhacked(true);
        }
    }

    return (
        <>
            <div className={isActive ? "mole" : "hole"} onClick={handleWhack}></div>
        </>
    )
};
