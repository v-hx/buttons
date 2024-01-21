import { useEffect, useRef, useState } from "react";

type ButtonProps = {
  onClickHandler: (n: number) => void;
  n: number;
  disableDelayMs?: number;
};

const Button = ({ onClickHandler, n, disableDelayMs = 500 }: ButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle the click and disable the button for `n * disableDelayMs`.
  const onClick = () => {
    setIsDisabled(true);
    onClickHandler(n);

    timerRef.current = setTimeout(setIsDisabled, n * disableDelayMs, false);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current as NodeJS.Timeout);
  }, []);

  return (
    <button
      disabled={isDisabled}
      className={isDisabled ? "button-disabled" : ""}
      onClick={onClick}
    >{`Add ${n}`}</button>
  );
};

export default Button;
