import { useCallback, useEffect, useRef, useState } from "react";
import logo from "./button.svg";
import Button from "./Button";
import "./App.css";

type AppProps = {
  waitIntervalMs?: number;
  decrementIntervalMs?: number;
  counterDecrementStep?: number;
};

function App({
  decrementIntervalMs = 1000,
  waitIntervalMs = 10000,
  counterDecrementStep = 1,
}: AppProps) {
  const [counter, setCounter] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState(waitIntervalMs);

  let decrementTimerRef = useRef<NodeJS.Timeout | null>(null);
  let countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Decrement counter with a rate of `counterDecrementStep` per `decrementIntervalMs` until it reaches 0.
  const decrementCounter = useCallback(() => {
    if (counter > 0) {
      setCounter((currentState) => currentState - counterDecrementStep);
    }
  }, [counter, counterDecrementStep]);

  // Start decrement counter if `waitIntervalMs` has passed without any button clicks.
  useEffect(() => {
    if (countdownInterval === 0) {
      decrementTimerRef.current = setInterval(
        decrementCounter,
        decrementIntervalMs
      );
    }
    return () => clearInterval(decrementTimerRef.current as NodeJS.Timeout);
  }, [countdownInterval, decrementIntervalMs, decrementCounter]);

  // Countdown timer from `waitIntervalMs` to 0 every 1 second. The timer is tight to regular time, hence hardcoded interval here.
  useEffect(() => {
    countdownTimerRef.current = setTimeout(() => {
      if (countdownInterval > 0) {
        setCountdownInterval((currentState) => currentState - 1000);
      }
    }, 1000);

    return () => clearTimeout(countdownTimerRef.current as NodeJS.Timeout);
  });

  // Button click handler: add `n` to the counter and reset the countdown timer by setting to defautl value, wait for `waitIntervalMs` again.
  const onClickHandler = (n: number) => {
    setCounter((currentState) => currentState + n);
    setCountdownInterval(waitIntervalMs);
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
