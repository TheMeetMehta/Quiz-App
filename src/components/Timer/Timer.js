import React, { useState, useEffect } from "react";

const Timer = ({ onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        setTimeLeft(60);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeUp], timeLeft);

    return <p>Time Left: {timeLeft}s</p>;
};

export default Timer;
