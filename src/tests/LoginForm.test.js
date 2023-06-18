import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

test("LoginForm component renders correctly", () => {
  render(<LoginForm />);

  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
});

test("Entering correct username and password logs in the user and navigates to mainPage", () => {

  const mockGetItem = jest.fn(() => null);
  const mockSetItem = jest.fn();
  global.localStorage.getItem = mockGetItem;
  global.localStorage.setItem = mockSetItem;

  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  render(<LoginForm />);
  
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "user1" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "pass1" },
  });

  fireEvent.click(screen.getByText("Log In"));

  expect(mockSetItem).toHaveBeenCalledWith("authenticated", "user1");
  expect(mockNavigate).toHaveBeenCalledWith("/mainPage");
  expect(console.log).toHaveBeenCalledWith("log in success");
});

test("Entering incorrect username and password shows an error message", () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "wronguser" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "wrongpass" },
  });

  fireEvent.click(screen.getByText("Log In"));

  expect(screen.getByText("Wrong username or password")).toBeInTheDocument();
});