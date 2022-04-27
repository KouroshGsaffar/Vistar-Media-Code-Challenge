import { Button, Input } from "antd";
import React, { ReactElement } from "react";
import { GameConfigPropsType } from "../../../schema/GuessNumber";
import {
  defaultLowerBound,
  defaultUpperBound
} from "../../../constants/GuessGameConstant";
import handlePressEnter from "../../../helper/helper";

export default function GameConfig({
  bound,
  styles,
  handleReset = () => null,
  handleSetBound = () => null
}: GameConfigPropsType): ReactElement {
  const { lowerBound, upperBound } = bound;
  const disableResetBtnCondition =
    lowerBound > upperBound || isNaN(lowerBound) || isNaN(upperBound);
  return (
    <div>
      <h1 data-testid="gameConfigHeader">Game Config</h1>
      <div className={styles.gameConfigSetting}>
        Lower bound:
        <Input
          data-testid="lowerBoundInput"
          className={styles.input}
          value={lowerBound}
          defaultValue={defaultLowerBound}
          onChange={(e) => handleSetBound(upperBound, Number(e.target.value))}
          placeholder="Enter the Lower bound"
          onPressEnter={(e) => handlePressEnter(e, handleReset)}
        />
        Upper bound:
        <Input
          data-testid="upperBoundInput"
          className={styles.input}
          defaultValue={defaultUpperBound}
          value={upperBound}
          onChange={(e) => handleSetBound(Number(e.target.value), lowerBound)}
          placeholder="Enter the Upper bound"
          onPressEnter={(e) => handlePressEnter(e, handleReset)}
        />
      </div>
      <Button
        data-testid="resetBtn"
        type="primary"
        onClick={handleReset}
        className={styles.resetBtn}
        disabled={disableResetBtnCondition}
      >
        Reset
      </Button>
    </div>
  );
}
