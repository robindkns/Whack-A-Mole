import { useEffect, useState } from "react";
import '../../styles/ui/Countdown.sass'

export default function Countdown() {

    const [count, setCount] = useState<number | null>(4);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    useEffect(() => {
        if (count === null) return;

        if (count > 0) {
        const timer = setInterval(() => {
            setCount((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
        }, 1000);
        return () => clearInterval(timer);
        }

        setIsFinished(true);
    }, [count]);

    if (isFinished) return null;

    return (
        <div className="countdown">
            <h1>{count === null ? "Go!" : count === 4 ? "Ready?" : count}</h1>
        </div>
    );
}
