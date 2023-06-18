import React from 'react';
import Header from '../components/Header';
import Chat from '../components/Chat';
import ReadyForQuiz from "../components/ReadyForQuiz";

const MainPage = () => {
  return (
    <div>
      <Header showLogout/>
      <Chat />
      <ReadyForQuiz />
    </div>
  )
}

export default MainPage;
