import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../redux/store';
import { addScore } from '../redux/features/leaderboardSlice';

const mock = new MockAdapter(axios);

// Answer for GET method 
mock.onGet('/api/leaderboard').reply((config) => {
    
    const leaderboard = store.getState().leaderboard.data;
    leaderboard.sort((a, b) => b.score - a.score);

    console.log('leaderboard from mock: ', leaderboard);
    
    return [200, leaderboard];

});

// Answer for POST method
mock.onPost('/api/leaderboard').reply((config) => {
    const { name, score } = JSON.parse(config.data);
    
    if (!/^[A-Z]{3}$/.test(name)) {
        return [400, { error: 'Username MUST contain ONLY 3 letters AND ONLY captital letters!' }];
    }

    const newEntry = {
        id: store.getState().leaderboard.data.length + 1,
        name,
        score,
    };

    store.dispatch(addScore(newEntry));

    console.log('Updated leaderboard in mock :', store.getState().leaderboard.data);

    return [201];
});

export default axios;
