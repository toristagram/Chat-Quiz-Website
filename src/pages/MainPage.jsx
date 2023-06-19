import React from 'react';
import Header from '../components/Header';
import Chat from '../components/Chat';
import ReadyForQuiz from "../components/ReadyForQuiz";

const MainPage = () => {
  return (
    <div>
      <Header showLogout/>
      <div className="content-wrapper">
      <Chat />
      <ReadyForQuiz />
      </div>
    </div>
  )
}

export default MainPage;
