import React, { useState } from 'react';
import './styles/App.sass';

import Game from './components/Game';
import OldMonitor from './components/OldMonitor';
import MonitorScreen from './components/MonitorScreen';

function App() {

  const [isGameON, setIsGameON] = useState(false);

  return (
    <>
      <OldMonitor />
      {isGameON ? <Game /> : <MonitorScreen setIsGameON={setIsGameON} />}
    </>
  );
}

export default App;
