import { Container } from "@mui/material";

const ScoreTable = () => {
  return (
    <Container
      component={"div"}
      sx={{
        border: 1,
        color: "white",
        borderRadius: 3,
        width: 300,
        height: 300,
        marginTop: 8,
      }}
      maxWidth="lg"
    >
      <h3>Muro de la Fama Top 5</h3>

      <p>Josecito 40</p>
      <p>Milei 20</p>
      <p>Rombai 10</p>
      <p>Pikachu 5</p>
      <p>Roberto 3</p>
      <p>Sabrina 1</p>
    </Container>
  );
};

export default ScoreTable;
