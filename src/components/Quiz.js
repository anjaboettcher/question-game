import React, { useState, useEffect } from "react";
import originalQuestions from "./questions";
import shuffle from "../utils/shuffle";
import Button from "./Button";

const styles = {
  answer: {
    paddingBottom: 20
  },

  joker: {
    padding: "5px 20px"
  }
};

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(15);
  const [extraTimeisClicked, setExtraTimeisClicked] = useState(false);
  const [fiftyFiftyIsClicked, setFiftyFiftyIsClicked] = useState(false);
  const [mutedOptions, setMutedOptions] = useState([]);

  const question = questions[answers.length];
  const score = answers.filter((a, i) => a.answer === questions[i].answer)
    .length;
  const unanswered = answers.filter(a => a.answer === undefined).length;
  const incorrect = questions.length - score - unanswered;

  useEffect(() => setQuestions(shuffle(originalQuestions)), []);

  function checkAnswer(answer) {
    setAnswers([...answers, { answer, counter }]);
  }

  function restartGame() {
    setQuestions(shuffle(originalQuestions));
    setAnswers([]);
    setExtraTimeisClicked(false);
    setFiftyFiftyIsClicked(false);
    setMutedOptions([]);
  }

  useEffect(() => {
    if (answers.length === questions.length) {
      return;
    }

    setCounter(15);

    function tick() {
      setCounter(c => {
        if (c === 1) {
          setAnswers([...answers, { answer: undefined, counter: 0 }]);
        }

        return c - 1;
      });
    }

    var timerID = setInterval(tick, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [questions, answers]);

  function getAdditionalTime() {
    setCounter(c => {
      return c + 10;
    });
    setExtraTimeisClicked(true);
  }

  function removeWrongAnswers() {
    const excluded = Math.floor(Math.random() * 3);
    const muted = question.options
      .filter(option => option !== question.answer)
      .filter((option, i) => i !== excluded);
    setMutedOptions(muted);
    setFiftyFiftyIsClicked(true);
  }

  if (question) {
    return (
      <>
        <h1>Welcome to the quiz game!</h1>
        <div>
          <div>
            Joker:
            <Button
              disabled={fiftyFiftyIsClicked}
              onClick={removeWrongAnswers}
              style={styles.joker}
            >
              50/50
            </Button>
            <Button
              disabled={extraTimeisClicked}
              onClick={getAdditionalTime}
              style={styles.joker}
            >
              +10 sec
            </Button>
            {" | "}
            Score: <span>{score}</span>
            {" | "}
            Time remaining: <span>{counter}</span>
          </div>
          <div>
            <h3>{question.question}</h3>
            {question.options.map(option => {
              return (
                <div key={option}>
                  <Button
                    onClick={() => checkAnswer(option)}
                    disabled={mutedOptions.includes(option)}
                    style={styles.button}
                  >
                    {option}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h3>Game Over! You have {score} points </h3>
      {questions.map((item, index) => (
        <div key={index} style={styles.answer}>
          <div>
            <b>{item.question}</b>
          </div>
          <div>Correct answer: {item.answer}</div>
          <div>
            Your answer:{" "}
            <span
              style={{
                color: answers[index].answer === item.answer ? "green" : "red"
              }}
            >
              {answers[index].answer}
            </span>
          </div>
          <div>
            You answered within {16 - answers[index].counter} seconds.
          </div>
        </div>
      ))}

      <Button style={styles.button} onClick={restartGame}>
        New Game
      </Button>
    </>
  );
}

export default Quiz;
