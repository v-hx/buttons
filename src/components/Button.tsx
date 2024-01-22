import { useEffect, useRef, useState } from "react";

type ButtonProps = {
  onClickHandler: (n: number, countdownResetValueMs?: number) => void;
  n: number;
  disableDelayKoeffMs?: number;
  countdownResetValueMs?: number;
};

const Button = ({
  onClickHandler,
  n,
  countdownResetValueMs,
  disableDelayKoeffMs = 500,
}: ButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle the click and disable the button for `n * disableDelayMs`.
  const onClick = () => {
    setIsDisabled(true);
    onClickHandler(n, countdownResetValueMs);

    timerRef.current = setTimeout(
      setIsDisabled,
      n * disableDelayKoeffMs,
      false
    );
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
