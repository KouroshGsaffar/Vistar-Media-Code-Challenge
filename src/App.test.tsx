import { render } from "@testing-library/react";
import React from "react";
import App from "./App";
import GameComponent from "./GameComponent/GameComponent";

describe("render Game without crashing", () => {
  test("rendering the App component without crashing", () => {
    render(<App />);
  });
  test("rendering the GameComponent without crashing", () => {
    render(<GameComponent />);
  });
});
