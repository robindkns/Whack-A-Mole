import axios from "axios"
import '../styles/Leaderboard.sass'
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../redux/features/gameSlice";

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error when loading leaderboard datas.', error));
    }, []);

    return(
        <>
            <h1>Leaderboard</h1>
            <div className="leaderboard">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => dispatch(resetGame())}>Play Again</button>
        </>
    )
};
