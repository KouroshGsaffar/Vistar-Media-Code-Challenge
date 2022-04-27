const handlePressEnter = (
  e: React.KeyboardEvent<HTMLInputElement>,
  cb: () => void
) => {
  if (e.key === "Enter" && !e.shiftKey) {
    cb();
    e.preventDefault();
    e.stopPropagation();
  }
};
export default handlePressEnter;

export const randomBetween = (num1: number, num2: number) =>
  Math.floor(Math.random() * (num2 + 1 - num1) + num1);
