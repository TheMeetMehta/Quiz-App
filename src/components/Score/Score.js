import React from "react";

const Score = ({ score, total, onReset }) => {
    const percentage = (score / total) * 100;
    let message = "";

    if (percentage < 50) message = "Try Again and improve.";
    else if (percentage < 90) message = "Nice attempt but try again.";
    else message = "Way to go Champ!!";

    return (
        <div>
            <h2>Quiz Completed!</h2>
            <p>
                Your Score: {score} / {total} ({percentage.toFixed(2)}%)
            </p>
            <h3>{message}</h3>
            <button onClick={onReset}>Start Over</button>
        </div>
    );
};

export default Score;
