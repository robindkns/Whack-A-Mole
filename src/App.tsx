import React from 'react';
import './App.sass';

import Game from './components/Game';

function App() {
  return (
    <>
      <div id='border1'></div>
      <div id='border2'></div>
      <div id="border3"></div>
      <div id='border4'></div>
      <Game />
    </>
  );
}

export default App;
