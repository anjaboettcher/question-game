import React, { useState, useEffect } from "react";

import originalQuestions from "../questions";

import shuffle from "../utils/shuffle";

import Answer from "./Answer";
import Button from "./Button";
import Question from "./Question";

const styles = {
  joker: {
    padding: "5px 20px"
  }
};

export function calculateResult(questions, answers) {
  const score = answers.filter((a, i) => a.answer === questions[i].answer)
    .length;
  const unanswered = answers.filter(a => a.answer === undefined).length;
  const incorrect = questions.length - score - unanswered;

  return {
    score,
    unanswered,
    incorrect
  };
}

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(15);
  const [extraTimeisClicked, setExtraTimeisClicked] = useState(false);
  const [fiftyFiftyIsClicked, setFiftyFiftyIsClicked] = useState(false);
  const [mutedOptions, setMutedOptions] = useState([]);

  const question = questions[answers.length];

  const { score, unanswered, incorrect } = calculateResult(questions, answers);

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

  useEffect(() => setQuestions(shuffle(originalQuestions)), []);

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
          <Question
            question={question}
            mutedOptions={mutedOptions}
            onOptionClick={option => checkAnswer(option)}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h3>Game Over!</h3>
        <h4>
          You answered {score} questions correctly, {incorrect} questions
          incorrectly and skipped {unanswered} questions
        </h4>
      </div>
      {questions.map((question, index) => (
        <Answer question={question} answer={answers[index]} />
      ))}

      <Button style={styles.button} onClick={restartGame}>
        New Game
      </Button>
    </>
  );
}

export default Quiz;
