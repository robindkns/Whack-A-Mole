import { useState } from "react";
import "../../styles/ui/MonitorScreen.sass";

export default function MonitorScreen({ setIsGameON }: { setIsGameON: React.Dispatch<React.SetStateAction<boolean>> }) {
    
    const [animation, setAnimation] = useState("blinking");
    
    function turnOnGame() {
        setAnimation("disappear");
        setTimeout(() => {
            setIsGameON(true);
        }, 1000);
    }

    return (
        <>
            <div className={`arcade-screen`}>
                <button className={animation} onClick={turnOnGame}>INSERT COIN</button>
            </div>
        </>
    )
};
