import React from "react";
import "./Question.css";

const Question = ({ question, selectedAnswer, onSelectAnswer }) => {
    return (
        <div>
            <h2>{question?.title}</h2>
            <div className="answers-grid">
                {question?.answers?.map((answer, index) => (
                    <div key={index} className="answer-item">
                        <input
                            type="radio"
                            id={`answer-${index}`}
                            name="answer"
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => onSelectAnswer(index)}
                        />
                        <label htmlFor={`answer-${index}`}>{answer}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
