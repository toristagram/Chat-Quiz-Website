import React from 'react';
import Header from '../components/Header';
import Chat from '../components/Chat';

const MainPage = () => {
  return (
    <div>
      <Header showLogout/>
      <Chat />
    </div>
  )
}

export default MainPage;
