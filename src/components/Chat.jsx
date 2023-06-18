import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export const MainLayout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ChatContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 45%;
  height: 80%;
  overflow: hidden;
`;

const Navbar = styled.div`
  height: 60px;
  background-color: #9db0d4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: white;
  font-weight: bold;
  font-size: large;
  width: 100%;

  h2 {
    text-align: center;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: aliceblue;
  overflow: scroll;
`;
const MessagesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  height: calc(100% - 150px);

  align-items: flex-end;
`;
const Message = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    background-color: #fff;
    padding: 13px 20px;
    border-radius: 10px 0px 10px 10px;
    max-width: max-content;
  }
`;

css`
  .message-right {
    text-align: right;
  }

  .message-left {
    text-align: left;
  }
`;

const InputContainer = styled.div`
  display: flex;
  height: 90px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 18px;
  color: #141436;

  &::placeholder {
    color: lightgray;
  }
`;

const SendButton = styled.button`
  height: 50px;
  border: none;
  font-size: 18px;
  padding: 10px 15px;
  color: #fff;
  background-color: #a3c1ff;
  cursor: pointer;

  &:hover {
    background-color: #5a74ab;
  }
`;

function Chat() {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const authenticatedUser = localStorage.getItem("authenticated");


  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    await addDoc(messagesRef, {
      text: inputValue,
      createdAt: new Date(),
      sender: authenticatedUser
    });

    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
      setInputValue("");
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      updatedMessages.sort((a, b) => a.createdAt - b.createdAt);
      updatedMessages.reverse();

      setMessages(updatedMessages);

      if (
        chatContainer.scrollTop + chatContainer.clientHeight >=
        chatContainer.scrollHeight
      ) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });

    const unsubscribeNewMessage = onSnapshot(messagesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newMessage = {
            id: change.doc.id,
            ...change.doc.data(),
          };
          setMessages((prevMessages) => {
            const existingMessage = prevMessages.find(
              (message) => message.id === newMessage.id
            );
            if (!existingMessage) {
              return [newMessage, ...prevMessages];
            }
            return prevMessages;
          });
        }
      });
    });

    return () => {
      unsubscribe();
      unsubscribeNewMessage();
    };
  }, [q, messagesRef]);

  return (
    <MainLayout>
      <ChatContainer>
        <Navbar>
          <h2>Welcome to the chat!</h2>
        </Navbar>
        <MessageContainer id="chat-container">
          <MessagesStyled>
            {messages &&
              messages
                .slice()
                .reverse()
                .map((message) => (
                  <Message
                    key={message.id}
                    className={
                      message.sender === authenticatedUser ? "message-left" : "message-right"
                    }
                  >
                    <p>{message.text}</p>
                  </Message>
                ))}
          </MessagesStyled>
        </MessageContainer>
        <InputContainer>
          <MessageInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputContainer>
      </ChatContainer>
    </MainLayout>
  );
}

export default Chat;
