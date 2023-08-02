import { useContext } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import { sumAnswers } from "../../helper";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  handleResetEnd:()=>void
};


const End = ({handleResetEnd}:Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { user, score } = useContext(TriviaContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const navigate = useNavigate();

  const handleFinished = () => {
    navigate("/chooseCategory");
    handleResetEnd()
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { displayName } = user;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  return (
    <div>
      <Box component={"h1"} color={"white"}>
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
