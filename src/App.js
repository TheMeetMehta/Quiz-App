import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz/Quiz";
import Score from "./components/Score/Score";
import Timer from "./components/Timer/Timer";

const App = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [userName, setUserName] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        // Fetch user data
        fetch('http://localhost:3030/user')
            .then((response) => response.json())
            .then((data) => {
                setUserName(data?.name);
            })
            .catch((error) => console.error('Error fetching user:', error));
    }, []);

    const fetchQuestion = (questionId) => {
        fetch(`http://localhost:3030/questions/${questionId}`)
            .then((response) => response.json())
            .then((data) => setCurrentQuestion(data));
    };

    useEffect(() => {
        // Start the quiz by loading the first question
        fetch("http://localhost:3030/start")
            .then((response) => response.json())
            .then((startData) => fetchQuestion(startData.firstQuestionId));
    }, []);

    const handleAnswer = (selectedAnswer) => {
        fetch(`http://localhost:3030/answers/${currentQuestion.id}`)
            .then((response) => response.json())
            .then((answerData) => {
                const isCorrect = selectedAnswer === answerData.correctAnswer;
                if (isCorrect) setScore((prev) => prev + 1);
                if (questionIndex < 2) {
                    setQuestionIndex(prevIndex => prevIndex + 1);
                } else {
                    setCompleted(true);
                }
            });
    };

    const resetQuiz = () => {
        setScore(0);
        setCompleted(false);
        setQuestionIndex(0);  // Reset question index
        fetch("http://localhost:3030/start")
            .then((response) => response.json())
            .then((startData) => fetchQuestion(startData.firstQuestionId));
    };

    useEffect(() => {
        if (questionIndex < 3) {
            fetchQuestion(questionIndex + 1);
        }
    }, [questionIndex]);

    const handleTimeUp = () => {
        if (questionIndex < 2) {
            setQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setCompleted(true);
        }
    };

    const handleTimeLeftChange = (newTimeLeft) => {
        setTimeLeft(newTimeLeft);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                marginTop: "20px",
            }}
        >
            <h1>{userName}, Want to be a millionaire?</h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px",
                }}
            >
                <Timer onTimeUp={handleTimeUp} onTimeLeftChange={handleTimeLeftChange} />
                <div>
                    <p>Current Score: {score}</p>
                </div>
            </div>

            {completed ? (
                <Score score={score} total={3} onReset={resetQuiz} />
            ) : currentQuestion ? (
                <Quiz question={currentQuestion} onAnswer={handleAnswer} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default App;
