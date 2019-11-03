import React, { useState, useEffect } from "react";
import originalQuestions from "./questions";
import shuffle from '../utils/shuffle'

function QuizComponent() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [counter, setCounter] = useState(15);
  const [extraTimeisClicked, setExtraTimeisClicked] = useState(false)
  const [fiftyFiftyIsClicked, setFiftyFiftyIsClicked] = useState(false)
  const [mutedOptions, setMutedOptions] = useState([]);

  const question = questions[answers.length]
  const score = answers.filter((a, i) => a.answer === questions[i].answer).length

  useEffect(() => setQuestions(shuffle(originalQuestions)), [])

  function checkAnswer(answer) {
    setAnswers([ ...answers, { answer, counter } ])
  }

  function restartGame() {
    setQuestions(shuffle(originalQuestions))
    setAnswers([])
    setExtraTimeisClicked(false)
    setFiftyFiftyIsClicked(false)
    setMutedOptions([])
  }

  useEffect(() => {
    setCounter(15)

    function tick() {
      setCounter(c => {
        if (c === 1) {
          setAnswers([ ...answers, { answer: undefined, counter: 0 } ])
        }
  
        return c - 1;
      })
    }

    var timerID = setInterval(tick, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [answers]);

  function getAdditionalTime () {
    setCounter(c => { return c + 10 })
    setExtraTimeisClicked(true);
  }

  function removeWrongAnswers () {
    const excluded = Math.floor(Math.random() * 3)
    const muted = 
      question.options
        .filter(option => option !== question.answer)
        .filter((option, i) => i !== excluded)
    setMutedOptions(muted)
    setFiftyFiftyIsClicked(true);
  }

  if (question) {
    return (
      <div>
        <h1>Welcome to the quiz game!</h1>
        <div className="container">
          <h3>{question.question}</h3>
          Joker: 
          <button 
            disabled={fiftyFiftyIsClicked} 
            onClick={removeWrongAnswers}>
            50/50
          </button>
          <button 
            disabled={extraTimeisClicked} 
            onClick={getAdditionalTime}>
            +10 sek
          </button> 
          {" | "}
          Score: <span>{score}</span>
          {" | "}
          Time remaining: <span>{counter}</span>
          <hr />
          {question.options.map(option => {
            return  (
              <button
                key={option}
                className=""
                onClick={() => checkAnswer(option)}
                style={mutedOptions.includes(option) ? {
                  opacity:  0.33,
                  textDecoration: 'line-through'
                } : undefined}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="scoreboard">
      <h3>Game Over! You have {score} points </h3>
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
    </div>
  );
}

export default QuizComponent;
