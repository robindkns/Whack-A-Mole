import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

let leaderboard: { id: number; name: string; score: number }[] = [
    { name: "AUD", score: 117, id: 1 },
    { name: "DKS", score: 97, id: 2 },
    { name: "POL", score: 54, id: 3 },
    { name: "LEO", score: 75, id: 4 },
    { name: "JEA", score: 105, id: 5 },
    { name: "PAU", score: 100, id: 6 },
    { name: "MAX", score: 112, id: 7 },
    { name: "SEB", score: 34, id: 8 },
    { name: "GIL", score: 101, id: 9 },
    { name: "PIE", score: 68, id: 10 }
]; 

leaderboard.sort((a, b) => b.score - a.score);

// Answer for GET method 
mock.onGet('/api/leaderboard').reply(200, leaderboard);

// Answer for POST method
mock.onPost('/api/leaderboard').reply((config) => {
    const { name, score } = JSON.parse(config.data);
    
    if (!/^[A-Z]{3}$/.test(name)) {
        return [400, { error: 'Username MUST contain ONLY 3 letters AND ONLY captital letters!' }];
    }

    const newEntry = {
        id: leaderboard.length + 1,
        name,
        score,
    };

    leaderboard = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score) // Sort by score
        .slice(0, 10); // Keep only the top 10

    console.log('Updated leaderboard:', leaderboard);

    return [201, newEntry];
});

export default axios;
