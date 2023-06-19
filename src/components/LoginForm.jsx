import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: black;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 35%;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const StyledError = styled.span`
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  margin-top: 0;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") || null
  );
  const [error, setError] = useState(false);

  const users = [
    { username: "user1", password: "pass1", score: 0 },
    { username: "user2", password: "pass2", score: 0 },
    { username: "user3", password: "pass3", score: 0 },
  ];

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      setAuthenticated(account.username);
      localStorage.setItem("authenticated", account.username);
      navigate("/mainPage");
      console.log("log in success");
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <AppContainer>
        <MainContainer>
          <WelcomeText>Welcome</WelcomeText>
          <InputContainer>
            <StyledInput
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {error && <StyledError>Wrong username or password</StyledError>}
            <StyledInput
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              onKeyDown={handleKeyDown}
            />
            {error && <StyledError>Wrong username or password</StyledError>}
          </InputContainer>
          <ButtonContainer>
            <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
              Log In
            </StyledButton>
          </ButtonContainer>
        </MainContainer>
      </AppContainer>
    </>
  );
};

export default LoginForm;
