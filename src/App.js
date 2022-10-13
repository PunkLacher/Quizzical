import React from 'react';
import './styles.css';
import Start from "./Start"
import Game from "./Game"

function App() {

  const [gameState, setGameState] = React.useState(false) //state to change from splash page to game page

  //start game button, simply sets game state to true which conditionally renders the game component
  function startGame() {
    setGameState(true)
  }

  //assemble components for page display
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="yellow--blob"></div>
          <div className="blue--blob"></div>
          {gameState ?
            <Game /> :
            <Start startGame={startGame} />
          }
        </div>
      </header>
    </div>
  );
}

export default App;
