/* eslint-disable @typescript-eslint/no-misused-promises */
import { Container, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { arrayObjetos } from "../../config/config";
import Category from "../../UI/Category";
import { useContext, useEffect } from "react";
import { TriviaContext } from "../../context/TriviaProvider";

const ChooseCategory = () => {
  const navigate = useNavigate();
  const { selectCategory, resetScore } = useContext(TriviaContext);

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
    console.log("score reseteado")
  }, []);

  return (
    <Container
      component={"div"}
      sx={{ color: "white", width: "100vw" }}
      maxWidth="lg"
    >
      <Box
        sx={{
          paddingLeft: 10,
          paddingTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            backgroundColor: "lime",
            color: "black",
            width: 150,
            fontWeight: "bold",
          }}
        >
          Volver
        </Button>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", gap: 2, justifyContent: "center" }}
        >
          {arrayObjetos.map(({ titulo, Icon, number }, index) => (
            <Grid
              /* onClick={() =>navigate("/gaming")} */
              onClick={() => handleSelect(number)}
              key={index}
              sx={{
                border: 1,
                borderColor: "white",
                width: 100,
                height: 100,
                "&:hover": {
                  color: "lime",
                  cursor: "pointer",
                  borderColor: "lime",
                },
              }}
              item
              xs={6}
              sm={2}
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
