import React from "react";

const styles = {
  answer: {
    paddingBottom: 20
  }
};

function Answer({ question, answer }) {
  return (
    <div style={styles.answer}>
      <div>
        <b>{question.question}</b>
      </div>
      <div>Correct answer: {question.answer}</div>
      <div>
        Your answer:{" "}
        <span
          style={{
            color: answer.answer === question.answer ? "green" : "red"
          }}
        >
          {answer.answer}
        </span>
      </div>
      <div>You answered within {16 - answer.counter} seconds.</div>
    </div>
  );
}

export default Answer;
