import { useCallback, useEffect, useRef, useState } from "react";
import logo from "./button.svg";
import Button from "./Button";
import "./App.css";

type AppProps = {
  counterCountdownIntervalMs?: number;
  counterDecrementIntervalMs?: number;
  counterDecrementStep?: number;
};

function App({
  counterDecrementIntervalMs = 1000,
  counterCountdownIntervalMs = 10000,
  counterDecrementStep = 1,
}: AppProps) {
  const [counter, setCounter] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState(
    counterCountdownIntervalMs
  );

  let decrementTimerRef = useRef<NodeJS.Timeout | null>(null);
  let countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Decrement counter with a rate of `counterDecrementStep` per `counterDecrementIntervalMs` until it reaches 0.
  const decrementCounter = useCallback(() => {
    if (counter > 0) {
      setCounter((currentState) => currentState - counterDecrementStep);
    }
  }, [counter, counterDecrementStep]);

  // Start decrement counter if `counterCountdownIntervalMs` has passed without any button clicks.
  useEffect(() => {
    if (countdownInterval === 0) {
      decrementTimerRef.current = setInterval(
        decrementCounter,
        counterDecrementIntervalMs
      );
    }
    return () => clearInterval(decrementTimerRef.current as NodeJS.Timeout);
  }, [countdownInterval, counterDecrementIntervalMs, decrementCounter]);

  // Countdown timer from `counterCountdownIntervalMs` to 0 every 1 second. The timer is tight to regular time, hence hardcoded interval here.
  useEffect(() => {
    countdownTimerRef.current = setTimeout(() => {
      if (countdownInterval > 0) {
        setCountdownInterval((currentState) => currentState - 1000);
      }
    }, 1000);

    return () => clearTimeout(countdownTimerRef.current as NodeJS.Timeout);
  });

  // Button click handler: add `n` to the counter and reset the countdown timer.
  // Each button can reset the timer to an individual value, default is the original start value of `counterCountdownIntervalMs`.
  const onClickHandler = (
    n: number,
    countdownResetValueMs: number = counterCountdownIntervalMs
  ) => {
    setCounter((currentState) => currentState + n);
    setCountdownInterval(countdownResetValueMs);
  };

  return (
    <div className="app">
      <header className="header">
        <p>Buttons demo</p>
        <img src={logo} className="logo" alt="logo" />
      </header>
      <main className="body">
        <p className="counter">{`Counter: ${counter}`}</p>
        <div className="buttons-wrapper">
          <Button onClickHandler={onClickHandler} n={1} />
          <Button onClickHandler={onClickHandler} n={2} />
          <Button onClickHandler={onClickHandler} n={3} />
        </div>
      </main>
    </div>
  );
}

export default App;
