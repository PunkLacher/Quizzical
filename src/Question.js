import React from 'react';
import './styles.css';
import he from 'he'
import { nanoid } from 'nanoid'

function Question(props) {

    //map over the answers array that was passed down as props form the Game component to create answer button elements for each answer in the array
    //include an onclick event that calls the clickanswer callback function passed down through propos to send the answer back to Question component to be stored in chosenAnswer state
    const answersArray = props.answers.map((answer) => (
        <button disabled={props.checkAnswer}
            key={answer.id}
            onClick={() => props.clickAnswer({ questionId: props.questionId, answerId: answer.id, isCorrect: answer.isCorrect })}
            style={
                props.chosenAnswers.some(el => el.answer === answer.id) && !props.checkAnswer //answer is a chosen answer AND checkAnswer is false
                    ? {
                        backgroundColor: '#D6DBF5',
                        border: '0px'
                    }
                    : props.checkAnswer && answer.isCorrect //checkAnswer is true AND answer is correct
                        ? { backgroundColor: '#94D7A2', border: '0px', opacity: '1' }
                        : props.chosenAnswers.some(el => el.answer === answer.id) && props.checkAnswer && !answer.isCorrect //answer is a chosen answer AND checkAnswer is false AND answer is not correct
                            ? { backgroundColor: '#F8BCBC', border: '0px' }
                            : { border: "0.771045px solid #4D5B9E" }}
            className="answer--button">
            {answer.text}
        </button>
    ))

    return (
        <div className="question">
            <h2>{he.decode(props.questions)}</h2>
            <div className="answer--container">
                {answersArray}
            </div>
            <hr></hr>
        </div>
    );
}

export default Question;



