import React from 'react';
import './styles/App.sass';

import Game from './components/Game';
import OldMonitor from './components/OldMonitor';

function App() {
  return (
    <>
      <OldMonitor />
      <Game />
    </>
  );
}

export default App;
