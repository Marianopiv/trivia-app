/* eslint-disable react-refresh/only-export-components */
import {
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Box,
} from "@mui/material";
import CircularProgressWithLabel from "../circularProgressWithLabel/CircularProgressWithLabel";
import { correctQuotes, findRightOne } from "../../helper";
import { Check, Close } from "@mui/icons-material";
import React, { useState } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import { useContext } from "react";

type Props = {
  correct_answer: string;
  question: string;
  handleNextQuestion: () => void;
  nextQuestion: number;
  shuffledAnswers: string[];
};

const Gaming = ({
  shuffledAnswers,
  question,
  correct_answer,
  nextQuestion,
  handleNextQuestion,
}: Props) => {
  const [toogleAnswers, setToogleAnswers] = useState(false);
  const { handleScore, isSmallViewport } = useContext(TriviaContext);

  const handleAnswer = (chosenAnswer: string, correct_answer: string) => {
    handleScore(chosenAnswer, correct_answer);
    setToogleAnswers(true);
  };

  return (
    <Grid
      container
      sx={{
        color: "white",
        borderRadius: 3,
        width: "100vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 100,
        background: `${isSmallViewport ? "#01d5bd" : ""}`,
        paddingTop: 8,
      }}
    >
      <Grid
        item
        sx={{
          border: 1,
          borderColor: "white",
          p: 4,
          width: 1200,
          height: 400,
          backgroundColor: "black",
        }}
      >
        <CircularProgressWithLabel handleNextQuestion={handleNextQuestion} />
        <h1>{correctQuotes(question)}</h1>
        <h2>Question Number {nextQuestion+1} of 10</h2>
      </Grid>

      <FormControl sx={{ marginTop: 8, width: 1200, paddingLeft: 2 }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            width={1200}
          >
            {toogleAnswers && (
              <Box
                component="div"
                sx={{
                  position: "absolute",
                  width: 1300,
                  height: 150,
                  color: "blue",
                  zIndex: 1000,
                }}
              ></Box>
            )}
            {shuffledAnswers.map((answer, index) => (
              <Grid
                onClick={() => handleAnswer(answer, correct_answer)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
                key={index}
                item
                xs={6}
              >
                <FormControlLabel
                  sx={{
                    border: 1,
                    borderColor: "white",
                    color: "white",
                    width: 590,
                    backgroundColor: `${findRightOne(correct_answer, answer)&&toogleAnswers?"green":"black"}`,
                  }}
                  value={correctQuotes(answer)}
                  control={<Radio color="secondary" />}
                  label={correctQuotes(answer)}
                />
                {toogleAnswers &&
                  (findRightOne(correct_answer, answer) ? (
                    <Check
                      sx={{
                        backgroundColor: "black",
                        borderRadius: 200,
                        border: "3px solid green",
                      }}
                    />
                  ) : (
                    <Close
                      sx={{
                        backgroundColor: "black",
                        borderRadius: 200,
                        border: "1px solid red",
                      }}
                    />
                  ))}
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "lime",
          color: "black",
          width: 200,
          fontWeight: "bold",
          marginTop: 8,
        }}
        onClick={handleNextQuestion}
      >
        Siguiente
      </Button>
    </Grid>
  );
};

export default React.memo(Gaming);
