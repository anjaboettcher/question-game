import React from "react";

import Button from "./Button";

function Question({ question, mutedOptions, onOptionClick }) {
  return (
    <div>
      <h3>{question.question}</h3>
      {question.options.map(option => {
        return (
          <div key={option}>
            <Button
              onClick={() => onOptionClick(option)}
              disabled={mutedOptions.includes(option)}
            >
              {option}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Question;