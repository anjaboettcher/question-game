import React, { useState, useEffect } from "react";
import originalQuestions from "./questions";
import shuffle from '../utils/shuffle'

function QuizComponent() {
  const [questions, setQuestions] = useState([])
  const [position, setPosition] = useState(0)
  const [score, setScore] = useState(0)
  const [counter, setCounter] = useState(15);
  const [extraTimeisClicked, setExtraTimeisClicked] = useState(false)
  const [fiftyFiftyIsClicked, setFiftyFiftyIsClicked] = useState(false)
  const [mutedOptions, setMutedOptions] = useState([]);

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
    setExtraTimeisClicked(false)
    setFiftyFiftyIsClicked(false)
    setMutedOptions([])
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

  function toggleExtraTime() {
    extraTimeisClicked ? setExtraTimeisClicked(false) : setExtraTimeisClicked(true);
  }

  function getAdditionalTime () {
    setCounter(c => { return c + 10})
    toggleExtraTime()
  }

  function toggleFiftyFifty() {
    fiftyFiftyIsClicked ? setFiftyFiftyIsClicked(false) : setFiftyFiftyIsClicked(true);
  }

  function removeWrongAnswers () {
    const excluded = Math.floor(Math.random() * 3)
    const muted = 
      questions[position].options
        .filter(option => option !== questions[position].answer)
        .filter((option, i) => i !== excluded)
    setMutedOptions(muted)
    toggleFiftyFifty()
  }

  if (position < questions.length) {
    const question = questions[position]

    return (
      <div>
        <h1>Welcome to the quiz game!</h1>
        <div className="container">
          <h3>{question.question}</h3>
          Joker: <span onClick={() => removeWrongAnswers()}>{fiftyFiftyIsClicked ? <button disabled>50/50</button> : <button>50/50</button>}</span>
          <span onClick={() => getAdditionalTime()}>{extraTimeisClicked ? <button disabled>+10 sek</button> : <button>+10 sek</button>}</span> {" | "}
          Score: <span>{score}</span>
          {" | "}
          Time remaining: <span>{counter}</span>
          <hr />
          {question.options.map(option => {
            return mutedOptions.includes(option) ? null : (
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
