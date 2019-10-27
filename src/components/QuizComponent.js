import React, { useState, useEffect } from "react";
import originalQuestions from "./questions";
import shuffle from '../utils/shuffle'

function QuizComponent() {
  const [questions, setQuestions] = useState([])
  const [position, setPosition] = useState(0)
  const [score, setScore] = useState(0)
  const [counter, setCounter] = useState(15);

  useEffect(() => setQuestions(shuffle(originalQuestions)), [])

  function checkAnswer(answer) {
    if (answer === questions[position].answer) {
      setScore(score + 1)
    }
    setPosition(position + 1)
  }

  function restartGame() {
    setQuestions(shuffle(originalQuestions))
    setPosition(0)
    setScore(0)
  }

  useEffect(() => {
    setCounter(15)

    function tick() {
      setCounter(c => {
        if (c === 1) {
          setPosition(p => p + 1)
        }
  
        return c - 1;
      })
    }

    var timerID = setInterval(tick, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [position]);

  if (position < questions.length) {
    const question = questions[position]

    return (
      <div>
        <h1>Welcome to the quiz game!</h1>
        <div className="container">
          <h3>{question.question}</h3>
          Score: <span>{score}</span>
          {" | "}
          Time remaining: <span>{counter}</span>
          <hr />
          {question.options.map(option => {
            return (
              <p
                key={option.id}
                className=""
                onClick={() => checkAnswer(option)}
              >
                {option}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="scoreboard">
      <h3>Game Over! You have {score} points </h3>
      <p>
        The correct answers for the questions were:
        <ul>
          {questions.map((item, index) => (
            <li className="" key={index}>
              {item.question}
              <br />
              {item.answer}
            </li>
          ))}
        </ul>
        <button onClick={restartGame}>New Game</button>
      </p>
    </div>
  );
}

export default QuizComponent;
