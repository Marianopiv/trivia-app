import "./App.css";
import { CardMedia } from "@mui/material";
import Rutas from "./routes/Rutas";
import fondo from "../src/assets/fondo.jpg";
import TriviaProvider from "./context/TriviaProvider";

function App() {

  return (
    <>
      <TriviaProvider>
        <CardMedia
          component="img"
          width="100%"
          sx={{ position: "absolute", top: 0, left: 0, zIndex: -100,height:{ xs: "100%", md: "140%" }}}
          image={fondo}
          alt="bg"
        />
        <Rutas />{" "}
      </TriviaProvider>
    </>
  );
}

export default App;
