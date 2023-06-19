import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeScore } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

const Score = ({ authenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score } = useSelector((state) => state);
  const [otherScores, setOtherScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const scoresData = snapshot.docs.map((doc) => doc.data());
      setOtherScores(scoresData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("Other users' score:", otherScores);

  if (otherScores === null) {
    return null;
  }

  const handleBackHome = async () => {
    try {
      const userRef = doc(db, `users/{userId}`, authenticated);
      await updateDoc(userRef, {
        score: Number(score),
      });
      console.log("Score updated successfully");
    } catch (error) {
      console.error("Error updating score: ", error);
    }
    dispatch(handleChangeScore(0));
    navigate("/mainPage");
  };
  return (
    <Box mt={30} textAlign="center">
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score {score}
      </Typography>
      <Button
        onClick={handleBackHome}
        variant="outlined"
        style={{
          borderColor: "#2a346f !important",
          color: "#2a346f",
          fontSize: "16px",
        }}
      >
        back to home page
      </Button>
      {otherScores.length > 0 && (
        <Box mt={3}>
          <Typography variant="h5" mb={1}>
            Other Users' Scores:
          </Typography>
          <ul>
            {otherScores.map((otherScore, index) => (
              <li key={index}>
                User: {otherScore.username}, Score:{otherScore.score}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default Score;
