/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Container, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { arrayObjetos } from "../../config/config";
import Category from "../../UI/Category";
import { useContext, useEffect } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import 'animate.css'; 
import fondo from "../../assets/fondo.jpg"

const ChooseCategory = () => {
  const navigate = useNavigate();
  const { selectCategory, resetScore,isSmallViewport } = useContext(TriviaContext);

  const handleSelect = async (categoryNumber: number) => {
    try {
      await selectCategory(categoryNumber);
      navigate("/gaming");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resetScore();
  }, []);

  return (
    <Container
      component={"div"}
      sx={{ color: "white", width: "100vw",display:"flex",justifyContent: "center",backgroundImage:isSmallViewport ?`url(${fondo})`:"", backgroundSize: "cover", // Optional, adjust the background size as needed
      backgroundRepeat: "no-repeat"}}
      maxWidth="lg"
      
    >
      <Box
        sx={{
          paddingTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <Button
          onClick={() => navigate("/dashboard")}
          variant="contained"
          sx={{
            backgroundColor: "lime",
            color: "black",
            width: 150,
            fontWeight: "bold",
          }}
        >
          Back
        </Button>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", gap: 2, justifyContent: "center" }}
        >
          {arrayObjetos.map(({ titulo, Icon, number }) => (
            <Grid
              onClick={() => handleSelect(number)}
              key={number}
              sx={{
                border: 1,
                borderColor: "white",
                width: 100,
                height: 100,
                "&:hover": {
                  color: "lime",
                  cursor: "pointer",
                  borderColor: "lime",
                  className:"animate__animated animate__heartBeat"
                },
              }}
              item
              xs={6}
              sm={4}
              md={2}
            >
              <Category text={titulo} Icon={<Icon />} action={() => ""} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChooseCategory;
