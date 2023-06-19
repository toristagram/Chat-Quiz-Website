import React from "react";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { collection } from "firebase/firestore";
import Score from "../components/Score";
import { handleChangeScore } from "../redux/actions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe("Score component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({ score: 10 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the final score", () => {
    render(<Score />);

    expect(screen.getByText("Final Score 10")).toBeInTheDocument();
  });

  it("should dispatch handleChangeScore action and navigate on back button click", () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    const navigateMock = jest.fn();

    render(<Score navigate={navigateMock} />);

    const backButton = screen.getByText("back to home page");
    backButton.click();

    expect(dispatchMock).toHaveBeenCalledWith(handleChangeScore(0));
    expect(navigateMock).toHaveBeenCalledWith("/mainPage");
  });

  it("should render other users scores if available", () => {
    const otherScores = [
      { username: "User1", score: 15 },
      { username: "User2", score: 8 },
    ];
    const snapshotMock = {
      docs: otherScores.map((score) => ({ data: () => score })),
    };
    const onSnapshotMock = jest.fn((collectionRef, callback) => {
      callback(snapshotMock);
      return jest.fn();
    });
    collection.mockReturnValue({ onSnapshot: onSnapshotMock });

    render(<Score />);

    expect(screen.getByText("Other Users' Scores:")).toBeInTheDocument();
    expect(screen.getByText("User:User1, Score:15")).toBeInTheDocument();
    expect(screen.getByText("User:User2, Score:8")).toBeInTheDocument();
  });

  it("should not render other users scores if not available", () => {
    const snapshotMock = { docs: [] };
    const onSnapshotMock = jest.fn((collectionRef, callback) => {
      callback(snapshotMock);
      return jest.fn();
    });
    collection.mockReturnValue({ onSnapshot: onSnapshotMock });

    render(<Score />);

    expect(screen.queryByText("Other Users' Scores:")).toBeNull();
  });
});
