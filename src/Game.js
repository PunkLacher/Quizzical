import React from 'react';
import './styles.css';
import he from 'he'
import Question from './Question'
import { nanoid } from 'nanoid'

function Game(props) {

    const [chosenAnswers, setChosenAnswers] = React.useState([]) //state to store and tally users answers to the questions
    const [questions, setQuestions] = React.useState([]) //state containing the question/answer array of objects from api call
    const [checkAnswer, setCheckAnswer] = React.useState(false) //check answer button state
    const [score, setScore] = React.useState(0) //keeps track of users correct answer score

    //Use React useEffect to make initial API call using async function defiend below.
    React.useEffect(() => { getQuestions() }, [])

    //answer option concat and randomize function for use in getQuestions async after API call, adds in answer ID and an isCorrect propertty
    const randomAnswerOptions = (correctAnswer, incorrectAnswers) => {
        const randomIndex = Math.floor(Math.random() * 3)
        const otherOptions = [...incorrectAnswers]
        otherOptions.splice(randomIndex, 0, correctAnswer)

        const returnOptions = otherOptions.map(option => {
            const id = nanoid()
            const optionText = he.decode(option)
            return option = {
                id: id,
                text: optionText,
                isCorrect: option === correctAnswer ? true : false
            }
        })
        return returnOptions
    }

    //use async funciton for API calls.  Assembly data into new array of question/answer objects using data.results, add question id and text, then use randomFormOptions function above to do  same for random answers
    async function getQuestions() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const data = await res.json()
        const questionData = data.results
        questionData.forEach(question => {

            question.id = nanoid()
            question.question = he.decode(question.question)
            question.options = randomAnswerOptions(question.correct_answer, question.incorrect_answers)
        }
        )
        setQuestions(questionData)
        setCheckAnswer(false)
        setScore(0)
    }

    function checkAnswers() {
        setCheckAnswer(!checkAnswer)
    }

    /*
    Explanation for clickAnswer function:
    ClickAnswer handles storing the answers the user has chosen in state and prevents the user from chosing more than one answer from each question.
    When answers are clicked the question component sends the question Id and answer Id as arguments to clickAnswer. clickAnswser then updates the chosenAnswers State by taking the previous state as argument to a callback function and
    then spreads it into a tempArray. The first if statment then checks if that tempArray is empty and if it is, pushes the question/answer ID object to it. However if it is not empty
    the 2nd if statment uses the "some" method to see if any elements in the array have the current quesiton Id . If the question Id exists in the array, it uses the findIndex method to 
    determine the index of the object in the array that already contains the current quesiton Id and then it updates that existing object with the quesiton/answer ID object that was passed to clickAnswer.
    If it doesn't find the quesitonId already in the array then it pushes the question/answer ID object to the end of temp array. Lastly, the callback returns tempArray to setChosenAnswer
    updating the state with the new quesiton/answer Id objects.
    Last part is to update score state variable with the number of correct chosen answers
    */

    function clickAnswer({ questionId, answerId, isCorrect }) {

        setChosenAnswers(prev => {
            const tempArray = [...prev]
            const obj = { question: questionId, answer: answerId, isCorrect: isCorrect }
            if (tempArray.length === 0) {
                tempArray.push(obj);
            } else {
                if (
                    tempArray.some(arrayObject => arrayObject.question === questionId)
                ) {
                    const dupIndex = tempArray.findIndex(arrayObject => arrayObject.question === questionId)
                    tempArray[dupIndex] = { question: questionId, answer: answerId, isCorrect: isCorrect }
                } else {
                    tempArray.push(obj)
                }
            }
            return tempArray
        })
        
        if (isCorrect) { setScore(score + 1) }
    }

    const questionsArray = questions.map((item) => (
        <Question
            key={item.id}
            questionId={item.id}
            questions={item.question}
            answers={item.options}
            checkAnswer={checkAnswer}
            clickAnswer={clickAnswer}
            chosenAnswers={chosenAnswers}

        />
    ))

    return (
        <div>
            <div className="game--container">
                {questionsArray}
            </div>
            <div className="button--container">
                <button className="new--questions" onClick={getQuestions}>New Questions</button>
                {!checkAnswer ?
                    <button className="check--answers" onClick={checkAnswers}>Check Answers</button> :
                    <div className="score">You scored {score}/5 correct!</div>}
            </div>
        </div>
    );
}

export default Game;