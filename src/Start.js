
import './styles.css';

function Start(props) {
  return (
          <div className="main">
            <h1>Quizzical</h1>
            <p className="start--tagline">A trivia game made with React.js</p>
            <button className="start--button" onClick={props.startGame}>Start Quiz</button>
          </div>
  );
}

export default Start;