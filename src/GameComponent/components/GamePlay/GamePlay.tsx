import { Button, Input, message } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { GamePlayPropsType } from "../../../schema/GuessNumber";
import handlePressEnter from "../../../helper/helper";

export default function GamePlay({
  text,
  bound,
  styles,
  handleSetGuess = () => null,
  handleMakeGuess = () => null
}: GamePlayPropsType): ReactElement {
  const [conditionalText, setCondtionalText] = useState<string>("");
  const { answer, lastGuess } = text;
  const gameDescription = `Guess the number between ${text.lowerBoundState} and ${text.upperBoundState}`;
  useEffect(() => {
    if (lastGuess === answer && lastGuess) {
      setCondtionalText("You got it.");
      message.success("Hooooray!🎉 you got the Answer 🥳 ");
    } else if ((lastGuess as number) > (answer as number)) {
      setCondtionalText("Nope. Lower");
    } else if ((lastGuess as number) < (answer as number)) {
      setCondtionalText("Nope. Higher");
    }
  }, [lastGuess, answer]);

  return (
    <>
      <h1 data-testid="header" className={styles.header}>
        Play!
      </h1>
      <div data-testid="gameDescription" className={styles.gameDescription}>
        {gameDescription}
      </div>
      <div data-testid="lastGuess">
        Last Guess: {lastGuess ? lastGuess : "None"}
      </div>
      <div data-testid="conditionalText">{conditionalText}</div>
      <div className={styles.guessWrapper}>
        Guess:
        <Input
          data-testid="guessInput"
          className={styles.guessInput}
          value={bound.guess}
          onChange={(e) => handleSetGuess(Number(e.target.value))}
          placeholder={gameDescription}
          onPressEnter={(e) => handlePressEnter(e, handleMakeGuess)}
        />
        <Button
          data-testid="guessBtn"
          className={styles.guessBtn}
          type="primary"
          onClick={handleMakeGuess}
          disabled={answer === undefined || lastGuess === answer}
        >
          Make Guess
        </Button>
      </div>
    </>
  );
}
