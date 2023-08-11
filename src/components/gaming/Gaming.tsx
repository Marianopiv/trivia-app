/* eslint-disable react-refresh/only-export-components */
import {
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Box,
  useMediaQuery,
} from "@mui/material";
import CircularProgressWithLabel from "../circularProgressWithLabel/CircularProgressWithLabel";
import { correctQuotes, findRightOne } from "../../helper";
import { Check, Close } from "@mui/icons-material";
import React, { useState } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import { useContext } from "react";
import { ThemeQuery } from "../../interface/interfaces";

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
  const { handleScore } = useContext(TriviaContext);

  const handleAnswer = (chosenAnswer: string, correct_answer: string) => {
    handleScore(chosenAnswer, correct_answer);
    setToogleAnswers(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const isLargeScreen = useMediaQuery((theme: ThemeQuery) =>
    theme.breakpoints.up("xl")
  );

  return (
    <>
      <Grid
        container
        sx={{
          color: "white",
          borderRadius: 3,
          width: "100vw",
          height: { xs: "80vh", xl: "75vh" },
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          paddingTop: { xs: 0, xl: 8 },
        }}
      >
        <Grid
          item
          sx={{
            border: 1,
            borderColor: "white",
            p: { xs: 1, xl: 4 },
            width: { xs: 370, md: 600, xl: 1200 },
            height: { xs: 200, xl: 400 },
            backgroundColor: "black",
          }}
        >
          <CircularProgressWithLabel handleNextQuestion={handleNextQuestion} />
          {isLargeScreen ? (
            <h1>{correctQuotes(question)}</h1>
          ) : (
            <h2>{correctQuotes(question)}</h2>
          )}
          {isLargeScreen ? (
            <h2>Question Number {nextQuestion + 1} of 10</h2>
          ) : (
            <p>Question Number {nextQuestion + 1} of 10</p>
          )}
        </Grid>

        <Grid item>
          <FormControl
            sx={{
              marginTop: 8,
              width: { xs: 370, md: 600, xl: 1200 },
              paddingLeft: 2,
            }}
          >
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
                width={{ xs: 370, md: 633, xl: 1240 }}
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
                        fontSize: 2,
                        maxHeight: 100,
                        backgroundColor: `${
                          findRightOne(correct_answer, answer) && toogleAnswers
                            ? "green"
                            : "black"
                        }`,
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
                            border: "2px solid green",
                            width:"24px"
                          }}
                        />
                      ) : (
                        <Close
                          sx={{
                            backgroundColor: "black",
                            borderRadius: 200,
                            border: "1px solid red",
                            width:"24px"
                          }}
                        />
                      ))}
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "lime",
          color: "black",
          width: 200,
          fontWeight: "bold",
          marginTop: { xs: 0, xl: 8 },
        }}
        onClick={handleNextQuestion}
      >
        Siguiente
      </Button>
    </>
  );
};

export default React.memo(Gaming);
