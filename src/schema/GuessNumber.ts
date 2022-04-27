export type BoundsType = {
  upperBound: number;
  lowerBound: number;
  guess?: number;
};

export type AnswerType = {
  upperBoundState: number;
  lowerBoundState: number;
  lastGuess?: number;
  answer?: number;
};

export interface stylesType {
  readonly [key: string]: string;
}
export type handleSetBound = (upperBound: number, lowerBound: number) => void;

export interface GameConfigPropsType {
  bound: BoundsType;
  handleReset: () => void;
  handleSetBound: handleSetBound;
  styles: stylesType;
}

export interface GamePlayPropsType {
  bound: BoundsType;
  text: AnswerType;
  styles: stylesType;
  handleSetGuess: (num: number) => void;
  handleMakeGuess: () => void;
}
