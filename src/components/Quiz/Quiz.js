import React, { useState, useEffect } from "react";
import Question from "../Questions/Question";
import "./Quiz.css";

const Quiz = ({ question, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [question]);

    const handleSubmit = () => {
        onAnswer(selectedAnswer !== null ? selectedAnswer : -1);
    };

    return (
        <div className="quiz-container">
            <Question
                question={question}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={setSelectedAnswer}
            />
            <div>
                <button
                    onClick={handleSubmit}
                    className="submit-button"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Quiz;
