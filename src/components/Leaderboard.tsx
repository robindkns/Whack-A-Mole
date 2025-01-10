import axios from "axios"
import '../styles/Leaderboard.sass'
import { useState,useEffect } from "react";

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error when loading leaderboard datas.', error));
    }, []);

    const submitScore = async (name: string, score: number) => {
        try {
            const response = await axios.post('/api/leaderboard', { name, score });

            if (response.status === 201) {
                setLeaderboard(prevLeaderboard => [...prevLeaderboard, response.data].slice(0, 10));
            }
        } catch (error: any) {
            alert(error.response?.data?.error || 'Unknown error when submitting score.');
        }
    };

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
        </>
    )
};
