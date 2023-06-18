import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReadyForQuiz from "../components/ReadyForQuiz";

test("ReadyForQuiz component renders correctly", () => {
  render(<ReadyForQuiz />);

  expect(screen.getByText("Ready for the Quiz?")).toBeInTheDocument();
  expect(screen.getByText("START")).toBeInTheDocument();
  expect(screen.getByText("CANCEL")).toBeInTheDocument();
});

test("Clicking the START button calls the handleStart function", () => {
  const handleStart = jest.fn();
  render(<ReadyForQuiz />);
  
  const startButton = screen.getByText("START");
  fireEvent.click(startButton);

  expect(handleStart).toHaveBeenCalled();
});

test("Clicking the CANCEL button calls the handleCancel function", () => {
  const handleCancel = jest.fn();
  render(<ReadyForQuiz />);
  
  const cancelButton = screen.getByText("CANCEL");
  fireEvent.click(cancelButton);

  expect(handleCancel).toHaveBeenCalled();
});