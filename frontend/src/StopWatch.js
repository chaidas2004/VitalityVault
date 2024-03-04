import React, { useState, useEffect } from 'react';
import './StopWatch.css'; 

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 10); 
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    setShowTimer(true); 
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    setShowTimer(false); 
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  return (
    <div className="stopwatch-block">
      <h2>Stopwatch</h2>
      {showTimer && (
        <div className="stopwatch-time fade-in">{formatTime(time)}</div>
      )}
      <div className="stopwatch-controls">
        {!isRunning ? (
          <button className="start-button" onClick={startStopwatch}>
            Start Workout
          </button>
        ) : (
          <button className="complete-button" onClick={stopStopwatch}>
            Complete
          </button>
        )}
        <button className="reset-button" onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
