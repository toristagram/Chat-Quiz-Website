import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Chat from "../components/Chat";

jest.mock("../firebase", () => ({
  db: {},
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  onSnapshot: jest.fn(),
}));

test("Chat component renders correctly", () => {
  render(<Chat />);
  
  expect(screen.getByText("Welcome to the chat!")).toBeInTheDocument();
});

test("Sending a message adds it to the messages list", () => {
  render(<Chat />);
  
  const mockAddDoc = jest.fn();
  mockAddDoc.mockResolvedValue();
  jest.mock("../firebase", () => ({
    addDoc: mockAddDoc,
  }));

  const messageInput = screen.getByPlaceholderText("Type your message...");
  fireEvent.change(messageInput, { target: { value: "Hello!" } });

  const sendButton = screen.getByText("Send");
  fireEvent.click(sendButton);

  expect(mockAddDoc).toHaveBeenCalledWith(expect.anything(), {
    text: "Hello!",
    createdAt: expect.any(String),
    sender: expect.any(String),
  });

  expect(messageInput.value).toBe("");
});