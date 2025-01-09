import '../styles/Mole.sass';
import { MoleProps } from "../typescript/MoleProps";
import { useDispatch } from 'react-redux';
import { incrementScore, setActiveMole } from '../redux/features/gameSlice';

export default function Mole({id,isActive}: MoleProps) {

    const dispatch = useDispatch();

    const handleWhack = () => {
        if(isActive){
            //Incrementing score when mole is whacked and setting active mole to null
            console.log(`Mole ${id} whacked!`);
            dispatch(incrementScore());
            dispatch(setActiveMole(null));
        }
    }
    
    return (
        <>
            <div className={isActive ? "mole" : "hole"} onClick={handleWhack}></div>
        </>
    )
};
