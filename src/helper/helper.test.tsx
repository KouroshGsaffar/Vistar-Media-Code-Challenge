import { randomBetween } from "./helper";

const randomSpy = jest.spyOn(Math, "random");

describe("Check functionality of randomFunction", () => {
  describe("when Math.random() returns 0", () => {
    beforeEach(() => {
      randomSpy.mockClear().mockReturnValue(0);
    });
    test("call the randomBetween with min=3 and max=5 and return 3", () => {
      expect(randomBetween(3, 5)).toBe(3);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });
  describe("when Math.random() returns 0", () => {
    beforeEach(() => {
      randomSpy.mockClear().mockReturnValue(0.5);
    });
    test("call the randomBetween with min=3 and max=5 and return 4", () => {
      expect(randomBetween(3, 5)).toBe(4);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });
  describe("when Math.random() returns 0", () => {
    beforeEach(() => {
      randomSpy.mockClear().mockReturnValue(0.99);
    });
    test("call the randomBetween with min=3 and max=5 and return 5", () => {
      expect(randomBetween(3, 5)).toBe(5);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });
});
