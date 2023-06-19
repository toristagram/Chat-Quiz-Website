import React from "react";
import Header from "../components/Header";
import Score from "../components/Score";

const ScorePage = () => {
  const authenticated = localStorage.getItem("authenticated");
  return (
    <>
      <Header showLogout />
      <Score authenticated={authenticated} />
    </>
  );
};

export default ScorePage;
