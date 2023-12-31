/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TriviaContext } from "../../context/TriviaProvider";
import { useContext } from "react";
import 'animate.css';

const Home = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useContext(TriviaContext);

  const handleClick = async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await signInWithGoogle();
      navigate("/dashboard");
  };
  return (
    <Box
      component="div"
      className="animate__animated animate__fadeIn"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component="h1"
        sx={{
          zIndex: 100,
          color: "white",
          position: "relative",
          fontSize:{xs:80,md:100},
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        Question{" "}
        <Box component={"p"} sx={{ color: "lime", fontSize: 110 }}>
          X
        </Box>
      </Box>
      <Button
        size="large"
        sx={{ position: "relative", zindex: 100, width: 280,backgroundColor:"lime",color:"black",font:"bold" }}
        variant="contained"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-assignment
        onClick={handleClick}
      >
        Login
      </Button>
    </Box>
  );
};

export default Home;
