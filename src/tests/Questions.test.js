import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Questions from "../components/Questions";
import { handleChangeScore } from "../redux/actions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("./actions", () => ({
  handleChangeScore: jest.fn(),
}));

describe("Questions component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({ score: 0 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the question and options", () => {
    const response = {
      results: [
        {
          question: "Question 1",
          correct_answer: "Correct Answer",
          incorrect_answers: ["Incorrect Answer 1", "Incorrect Answer 2"],
        },
      ],
    };

    useSelector.mockReturnValueOnce({ score: 0 });
    render(<Questions />, {
      initialState: { response, loading: false },
    });

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Correct Answer")).toBeInTheDocument();
    expect(screen.getByText("Incorrect Answer 1")).toBeInTheDocument();
    expect(screen.getByText("Incorrect Answer 2")).toBeInTheDocument();
  });

  it("should dispatch handleChangeScore action on clicking the correct answer", () => {
    const response = {
      results: [
        {
          question: "Question 1",
          correct_answer: "Correct Answer",
          incorrect_answers: ["Incorrect Answer 1", "Incorrect Answer 2"],
        },
      ],
    };

    useSelector.mockReturnValueOnce({ score: 0 });
    render(<Questions />, {
      initialState: { response, loading: false },
    });

    fireEvent.click(screen.getByText("Correct Answer"));

    expect(handleChangeScore).toHaveBeenCalledWith(1);
  });

  it('should navigate to "/scorePage" when all questions are answered', () => {
    const response = {
      results: [
        {
          question: "Question 1",
          correct_answer: "Correct Answer",
          incorrect_answers: ["Incorrect Answer 1", "Incorrect Answer 2"],
        },
      ],
    };

    useSelector.mockReturnValueOnce({ score: 0 });
    const navigateMock = jest.fn();
    render(<Questions navigate={navigateMock} />, {
      initialState: { response, loading: false },
    });

    fireEvent.click(screen.getByText("Correct Answer"));

    expect(navigateMock).toHaveBeenCalledWith("/scorePage");
  });
});
