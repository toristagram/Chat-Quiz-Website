import React, { useState } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const QuizContainer = styled.div`
flex: 1;
  text-align: center;
  max-width: 40%;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  display: flex;
  position: relative;
  margin-top: 12%;
  
  h2 {
    color: #212121;
    font-family: Poppins, sans-serif;
    font-size: 52px;
    font-weight: 600;
  }
`;

const BtnContainer = styled.div`
  flex-wrap: wrap;
  flex: 1;
  align-content: center;
  align-self: center;
  margin-top: 32px;
  display: flex;
  grid-column-gap: 16px;
  justify-content: center;
  align-items: center;

  .blue-btn {
    border-radius: 4px;
    background-color: #2a346f;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    padding: 20px;
    width: 150px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;

      &:after {
        content: "\\00bb";
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
      }
    }

    &:hover {
      span {
        padding-right: 25px;

        &:after {
          opacity: 1;
          right: 0;
        }
      }
    }
  }

  .grey-btn {
    border-radius: 4px;
    background-color: #9d9d9d;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    padding: 20px;
    width: 150px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;

      &:after {
        content: "\\2716";
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
      }
    }

    &:hover {
      span {
        padding-right: 25px;

        &:after {
          opacity: 1;
          right: 0;
        }
      }
    }
  }
`;

const ReadyForQuiz = () => {
  const [userReadiness, setUserReadiness] = useState(false);
  const authenticatedUser = localStorage.getItem("authenticated");

  const updateUserReadinessInFirestore = async (readiness) => {
    try {
      const userDocRef = doc(db, "users", authenticatedUser);
      await updateDoc(userDocRef, {
        userReadiness: readiness,
      });
      console.log("User readiness updated in Firestore");
    } catch (error) {
      console.error("Error updating user readiness in Firestore:", error);
    }
  };

  const updateUserReadinessInStore = (readiness) => {
    try {
      setUserReadiness(readiness);
      console.log("User readiness updated in local store");
    } catch (error) {
      console.error("Error updating user readiness in local store:", error);
    }
  };

  const handleStart = () => {
    updateUserReadinessInFirestore(true);
    updateUserReadinessInStore(true);
    console.log("quiz started");
  };

  const handleCancel = () => {
    updateUserReadinessInFirestore(false);
    updateUserReadinessInStore(false);
    console.log("quiz canceled");
  };
  return (
    <QuizContainer>
      <h2>Ready for the Quiz?</h2>
      <BtnContainer>
        <Link to="/quizPage">
        <button onClick={handleStart} className="blue-btn">
          <span>START</span>
        </button>
        </Link>
        <button onClick={handleCancel} className="grey-btn">
          <span>CANCEL</span>
        </button>
      </BtnContainer>
    </QuizContainer>
  );
};

export default ReadyForQuiz;
