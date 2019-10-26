import React, { useState } from 'react'
import { questionData } from "./questionData";

function QuizComponent() {
  const [state, setState] = useState(false)

  var randomQuestion = questionData[Math.floor(Math.random()*questionData.length)];

  return (
    <div>
    <h1>Welcome to the quiz game</h1>
    <div className="well">
  
            <h3>{randomQuestion.question}</h3>
            <hr />
            <ul className="list-group">
              {
                randomQuestion.options.map(option => {
                  return (
                    <li className="list-group-item" key={option}>
                      {option} <input type="radio" value={option.id} /> 
                    </li>
                  )
                })
              }
            </ul>
          </div>
  </div>
  ) 
}

export default QuizComponent;