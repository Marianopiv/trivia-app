import { useContext, useEffect } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import { sumAnswers } from "../../helper";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  handleResetEnd: () => void;
};

const End = ({ handleResetEnd }: Props) => {
  const { user, score, isSmallViewport, getScores } = useContext(TriviaContext);
  const navigate = useNavigate();

  const handleFinished = () => {
    navigate("/dashboard");
    handleResetEnd();
  };
  const { displayName } = user;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getScores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Box component={`${isSmallViewport ? "h2" : "h1"}`} color={"white"}>
        {displayName}, tu puntaje es {sumAnswers(score)}
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "lime",
          color: "black",
          width: 200,
          fontWeight: "bold",
          marginTop: 8,
        }}
        onClick={handleFinished}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default End;
