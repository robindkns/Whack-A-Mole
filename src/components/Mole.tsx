import '../styles/Mole.sass';
import { MoleProps } from "../typescript/MoleType";
import { useDispatch } from 'react-redux';
import { incrementScore, setActiveMole } from '../redux/features/gameSlice';

export default function Mole({id,isActive}: MoleProps) {

    // const [isWhacked, setIsWhacked] = useState(false);
    const dispatch = useDispatch();

    const handleWhack = () => {
        if(isActive){
            console.log(`Mole ${id} whacked!`);
            // setIsWhacked(true);
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
