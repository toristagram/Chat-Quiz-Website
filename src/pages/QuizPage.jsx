import React from "react";
import Header from "../components/Header";
import Questions from "../components/Questions";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

const QuizPage = () => {
  return (
    <>
      <Header showLogout />
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Questions />
        </Box>
      </Container>
    </>
  );
};

export default QuizPage;
