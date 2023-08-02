import { Box, Button, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { PieChart } from "react-minimal-pie-chart";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import { getPercentage, makeNameShorter } from "../../helper";
import Loader from "../../loader/Loader";
const DashBoard = () => {
  const navigate = useNavigate();
  const { getScores, userResults, averages, user, isSmallViewport, loader } =
    useContext(TriviaContext);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!user.email) {
      navigate("/");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-floating-promises
    getScores();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <Grid container sx={{ marginTop: 4 }}>
      <Grid
        item
        xs={8}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSmallViewport ? 0 : 4,
          paddingLeft: isSmallViewport ? 20 : 0,
        }}
      >
        <Box
          sx={{
            border: 2,
            borderColor: "white",
            color: "white",
            fontSize: 40,
            p: 3,
          }}
        >
          <p>Total partidas</p>
          <p>{userResults.length}</p>
          <Button
            onClick={() => navigate("/ChooseCategory")}
            variant="contained"
            color="primary"
            sx={{ zindex: 100, width: 300 }}
          >
            New Game
          </Button>
        </Box>
        <Box
          sx={{
            border: 2,
            borderColor: "white",
            color: "white",
            fontSize: 20,
            fontFamily: "Helvetica",
            p: 3,
            maxHeight: 350,
            width: 300,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              fontFamily: "Bebas Neue",
              fontSize: 40,
              height: 60,
            }}
          >
            <p>TOP 5</p>
            <StarIcon
              sx={{ marginBottom: 1 }}
              color="primary"
              fontSize="large"
            />
          </Box>
          {averages?.slice(0,4).map((item, index) => (
            <Box
              key={index}
              component="p"
              sx={{ textTransform: "capitalize", textAlign: "center" }}
            >
              {makeNameShorter(item.name)} {item.averageScore.toFixed(2)}{" "}
              (matches:
              {item.matches})
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        xs={9}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: isSmallViewport ? 14 : 0,
        }}
      >
        <Box
          component="div"
          sx={{
            width: isSmallViewport ? 300 : 600,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: 600,
          }}
        >
          <Box component="h2" sx={{ fontSize: 40, color: "white" }}>
            Metrics
          </Box>
          <PieChart
            data={[
              {
                title: "One",
                value: getPercentage(userResults, "higher"),
                color: "#00ff00",
              },
              {
                title: "Three",
                value: getPercentage(userResults),
                color: "#FBFBFB",
              },
            ]}
            label={({ x, y, dx, dy, dataEntry }) => (
              <text
                x={x}
                y={y}
                dx={dx}
                dy={dy}
                dominant-baseline="central"
                text-anchor="middle"
                style={{
                  fontSize: "10px",
                  fontFamily: "sans-serif",
                }}
              >
                {Math.round(dataEntry.percentage).toString() + "%"}
              </text>
            )}
          />
        </Box>
        <Box
          component="div"
          sx={{
            fontSize: 20,
            color: "white",
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <CircleIcon sx={{ color: "lime" }} />
          <p>Partidas Ganadas *6 puntos o mas</p>
        </Box>
        <Box
          component="div"
          sx={{
            fontSize: 20,
            color: "white",
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <CircleIcon />
          <p>Partidas Perdidas *5 puntos o menos</p>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashBoard;
