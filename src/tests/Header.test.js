import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";

test("Header component renders correctly", () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  expect(screen.getByAltText("logo")).toBeInTheDocument();
  expect(screen.getByText("DevQuiz&Chat")).toBeInTheDocument();
});

test("Header component with showLogout prop renders Logout component", () => {
  render(
    <Router>
      <Header showLogout={true} />
    </Router>
  );

  expect(screen.getByText("Log out")).toBeInTheDocument();
});

test("Header component without showLogout prop does not render Logout component", () => {
  render(
    <Router>
      <Header showLogout={false} />
    </Router>
  );

  expect(screen.queryByText("Log out")).toBeNull();
});