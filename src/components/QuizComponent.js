import React, { useState } from 'react'
import { questionData } from "./questionData";

function QuizComponent() {
  const [state, setState] = useState({
    currentQuestion: 0,
    userAnswer: null,
    isGameOver: false,
    score: 0,
    unansweredQuestions: 0
  })

function nextQuestion () {
  const { userAnswer, answer, score } = state;
  if (userAnswer === answer) {
    setState({
      score: score + 1
    });
  }
    setState({
    currentQuestion: state.currentQuestion + 1
  });
}

function GameOver () {
    if (state.currentQuestion === questionData.length - 1) {
      setState({
        isGameOver: true
      });
    }
}

  var randomQuestion = questionData[Math.floor(Math.random()*questionData.length)];

    if (state.isGameOver) {
      return (
        <div className="scoreboard">
        <h3>Game Over! You have {state.score} points </h3>
        <p>
          The correct answers for the questions were: 
          <ul>
            {questionData.map((item, index) => (
              <li className="" key={index}>
                {item.question}
                <br/>
                {item.answer}
              </li>
            ))}
          </ul>
        </p>
      </div>
    );
  } else {
    return (
  <div>
    <h1>Welcome to the quiz game!</h1>
    <div className="container">
            <h3>{randomQuestion.question}</h3>
            Score: <span>{state.score}</span>{' | '}
            Time remaining: 
            <hr />
            <ul className="list-group">
              {
                randomQuestion.options.map(option => {
                  return (
                    <div>
                     
                    <li className="list-group-item" key={option}>
                      {option} <input type="radio" value={option.id} onClick={nextQuestion} /> 
                    </li>
                    </div>
                  )
                })
              }
            </ul>
          </div>
          {state.currentQuestion === questionData.length - 1 && (
            <button className="" onClick={GameOver}>
              Game Over! Go to Scoreboard! 
            </button>
          )}
      </div>
    ) 
  }
}

export default QuizComponent;