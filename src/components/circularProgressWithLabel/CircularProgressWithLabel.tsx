import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type HandleNextQuestionFunction = () => void;

function CircularProgressWithLabel(
  props: CircularProgressProps & {
    value: number;
  }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({
  handleNextQuestion,
}: {
  handleNextQuestion: HandleNextQuestionFunction;
}) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    // Realizar la verificación de progreso dentro del efecto
    if (progress >= 100) {
      handleNextQuestion();
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [progress, handleNextQuestion]);

  return <CircularProgressWithLabel sx={{ color: "lime" }} value={progress} />;
}
