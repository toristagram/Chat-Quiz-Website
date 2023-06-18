import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Logout from "../components/Logout";

test("Logout component renders correctly", () => {
  render(<Logout />);

  expect(screen.getByText("Log out")).toBeInTheDocument();
});

test("Clicking the logout button triggers the logOut function", () => {
  
  const mockRemoveItem = jest.fn();
  global.localStorage.removeItem = mockRemoveItem;

  render(<Logout />);
  
  const logoutButton = screen.getByText("Log out");
  fireEvent.click(logoutButton);

  expect(mockRemoveItem).toHaveBeenCalledWith("authenticated");

  expect(console.log).toHaveBeenCalledWith("logout success");
});