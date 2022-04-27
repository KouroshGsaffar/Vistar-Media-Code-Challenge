import React, { ReactElement, useEffect, useState } from "react";
import {
  defaultLowerBound,
  defaultUpperBound
} from "../constants/GuessGameConstant";
import GameConfig from "./components/GameConfig/GameConfig";
import GamePlay from "./components/GamePlay/GamePlay";
import { BoundsType, AnswerType, handleSetBound } from "../schema/GuessNumber";
import styles from "./GameComponent.module.scss";
import { randomBetween } from "../helper/helper";
import { message } from "antd";

export default function GameComponent(): ReactElement {
  const [bound, setBound] = useState<BoundsType>({
    lowerBound: defaultLowerBound,
    upperBound: defaultUpperBound
  });
  const [text, setText] = useState<AnswerType>({
    lowerBoundState: defaultLowerBound,
    upperBoundState: defaultUpperBound
  });
  useEffect(() => {
    if (bound.lowerBound > bound.upperBound)
      message.error("The lower bound must be less than upper bound");
    if (isNaN(bound.lowerBound) || isNaN(bound.upperBound)) {
      message.warning("Please enter a number as an Input!");
    }
  }, [bound.lowerBound, bound.upperBound]);

  const handleSetBound: handleSetBound = (upperBound, lowerBound) => {
    setBound({ ...bound, upperBound, lowerBound });
  };

  const handleReset = () => {
    setBound({ ...bound, guess: undefined });
    setText({
      lowerBoundState: bound.lowerBound,
      upperBoundState: bound.upperBound,
      answer: randomBetween(bound.lowerBound, bound.upperBound)
    });
  };
  const handleSetGuess = (num: number) => setBound({ ...bound, guess: num });
  const handleMakeGuess = () => setText({ ...text, lastGuess: bound.guess });

  const gamePlay = (
    <GamePlay
      bound={bound}
      text={text}
      handleMakeGuess={handleMakeGuess}
      handleSetGuess={handleSetGuess}
      styles={styles}
    />
  );
  const gameConfig = (
    <GameConfig
      styles={styles}
      bound={bound}
      handleReset={handleReset}
      handleSetBound={handleSetBound}
    />
  );
  return (
    <div className={styles.wrapper}>
      {gamePlay}
      {gameConfig}
    </div>
  );
}
