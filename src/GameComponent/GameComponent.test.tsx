import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { randomBetween } from "../helper/helper";
import GameComponent from "./GameComponent";

const randomSpy = jest.spyOn(Math, "random");

describe("render Game without crashing", () => {
  test("rendering the GamePlay without crashing", () => {
    const { getByTestId } = render(<GameComponent />);
    const header = getByTestId("header");
    const gameDescription = getByTestId("gameDescription");
    const lastGuess = getByTestId("lastGuess");
    const conditionalText = getByTestId("conditionalText");
    const guessBtn = getByTestId("guessBtn");
    const guessInput = getByTestId("guessInput");

    expect(header.textContent).toBe("Play!");
    expect(gameDescription.textContent).toBe(
      "Guess the number between 1 and 10"
    );
    expect(lastGuess.textContent).toBe("Last Guess: None");
    expect(conditionalText.textContent).toBe("");
    expect(guessBtn.textContent).toBe("Make Guess");
    expect(guessInput.textContent).toBe("");
  });

  test("rendering the GameConfig without crashing", () => {
    const { getByTestId } = render(<GameComponent />);
    const gameConfigHeader = getByTestId("gameConfigHeader");
    const lowerBoundInput = getByTestId("lowerBoundInput");
    const upperBoundInput = getByTestId("upperBoundInput");
    const resetBtn = getByTestId("resetBtn");

    expect(gameConfigHeader.textContent).toBe("Game Config");
    expect(resetBtn.textContent).toBe("Reset");
    expect((lowerBoundInput as HTMLInputElement).value).toBe("1");
    expect((upperBoundInput as HTMLInputElement).value).toBe("10");
  });
});

describe("Check the funtionality", () => {
  beforeEach(() => {
    randomSpy.mockClear().mockReturnValue(0.5);
  });

  test("Change value of inputs work correctly", () => {
    const { getByTestId } = render(<GameComponent />);
    const lowerBoundInput = getByTestId("lowerBoundInput");
    const upperBoundInput = getByTestId("upperBoundInput");
    const guessInput = getByTestId("guessInput");

    expect((lowerBoundInput as HTMLInputElement).value).toBe("1");
    fireEvent.change(lowerBoundInput, { target: { value: "123" } });
    expect((lowerBoundInput as HTMLInputElement).value).toBe("123");

    expect((upperBoundInput as HTMLInputElement).value).toBe("10");
    fireEvent.change(upperBoundInput, { target: { value: "123" } });
    expect((upperBoundInput as HTMLInputElement).value).toBe("123");

    expect((guessInput as HTMLInputElement).value).toBe("");
    fireEvent.change(guessInput, { target: { value: "123" } });
    expect((guessInput as HTMLInputElement).value).toBe("123");
  });

  test("Check the reset button functionality", () => {
    const { getByTestId } = render(<GameComponent />);
    const lowerBoundInput = getByTestId("lowerBoundInput");
    const upperBoundInput = getByTestId("upperBoundInput");
    const resetBtn = getByTestId("resetBtn");
    const gameDescription = getByTestId("gameDescription");

    fireEvent.change(lowerBoundInput, { target: { value: "3" } });
    fireEvent.change(upperBoundInput, { target: { value: "5" } });
    fireEvent.click(resetBtn);

    expect(gameDescription.textContent).toBe(
      "Guess the number between 3 and 5"
    );
  });

  test("Check the Guess button functionality", () => {
    const { getByTestId } = render(<GameComponent />);
    const lowerBoundInput = getByTestId("lowerBoundInput");
    const upperBoundInput = getByTestId("upperBoundInput");
    const resetBtn = getByTestId("resetBtn");
    const gameDescription = getByTestId("gameDescription");
    const conditionalText = getByTestId("conditionalText");
    const guessBtn = getByTestId("guessBtn");
    const guessInput = getByTestId("guessInput");

    fireEvent.change(lowerBoundInput, { target: { value: "3" } });
    fireEvent.change(upperBoundInput, { target: { value: "5" } });
    fireEvent.click(resetBtn);

    expect(conditionalText.textContent).toBe("");
    expect(randomBetween(3, 5)).toEqual(4);

    expect(gameDescription.textContent).toBe(
      "Guess the number between 3 and 5"
    );
    fireEvent.change(guessInput, { target: { value: "3" } });
    fireEvent.click(guessBtn);
    expect(conditionalText.textContent).toBe("Nope. Higher");

    fireEvent.change(guessInput, { target: { value: "5" } });
    fireEvent.click(guessBtn);
    expect(conditionalText.textContent).toBe("Nope. Lower");

    fireEvent.change(guessInput, { target: { value: "4" } });
    fireEvent.click(guessBtn);
    expect(conditionalText.textContent).toBe("You got it.");
  });
});
