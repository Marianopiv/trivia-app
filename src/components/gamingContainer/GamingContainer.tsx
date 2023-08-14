/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState, useEffect } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import Gaming from "../gaming/Gaming";
import End from "../end/End";
import { shuffleArray, sumAnswers } from "../../helper";
import { Box } from "@mui/material";
import fondo from "../../assets/fondo.jpg"

const GamingContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { questions, user, score,isSmallViewport, saveScore } = useContext(TriviaContext);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [, setCorrectAnswerIndex] = useState<number>(-1);
  const [endGame, setEndGame] = useState<boolean>(false);
  const { displayName, email } = user;
  const scoreAndUser = {
    name: displayName,
    email: email,
    score: sumAnswers(score),
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const handleNextQuestion = () => {
    setNextQuestion(nextQuestion + 1);
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  useEffect(() => {
    if (nextQuestion < questions.length - 1) {
      const currentQuestion = questions[nextQuestion];
      const { correct_answer, incorrect_answers } = currentQuestion;
      const allAnswers = [...incorrect_answers, correct_answer];
      const shuffled = shuffleArray(allAnswers);
      setShuffledAnswers(shuffled);
      setCorrectAnswerIndex(shuffled.indexOf(correct_answer));
    }
    if (!endGame && nextQuestion >= 9) {
      saveScore(scoreAndUser);
      setEndGame(true);
      setNextQuestion(0);
    }
  }, [nextQuestion, questions]);

  const handleResetEnd = () => setEndGame(false);

  if (endGame) {
    return <End handleResetEnd={handleResetEnd} />;
  }


  const currentQuestion =
    nextQuestion >= 10 ? questions[9] : questions[nextQuestion];
  return (
    <Box sx={{backgroundImage: isSmallViewport ? `url(${fondo})` : "",
    backgroundSize: "cover", // Optional, adjust the background size as needed
    backgroundRepeat: "no-repeat",height:"100vh"}}>
      <Gaming
        key={nextQuestion}
        nextQuestion={nextQuestion}
        correct_answer={currentQuestion?.correct_answer}
        shuffledAnswers={shuffledAnswers}
        question={currentQuestion?.question}
        handleNextQuestion={handleNextQuestion}
      />
    </Box>
  );
};

export default GamingContainer;
