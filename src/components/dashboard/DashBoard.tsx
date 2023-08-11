/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Box, Button, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { PieChart } from "react-minimal-pie-chart";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import { checkResults, getPercentage, makeNameShorter } from "../../helper";
import fondo from "../../assets/fondo.jpg"
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
    <Grid container sx={{ marginTop: { xs: 2, xl: 4 },backgroundImage:isSmallViewport ?`url(${fondo})`:"", backgroundSize: "cover", // Optional, adjust the background size as needed
    backgroundRepeat: "no-repeat",display:"flex",justifyContent: "center"}
  }>
      <Grid
        item
        xs={8}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSmallViewport ? 0 : 4,
        }}
      >
        <Box
          sx={{
            border: 2,
            borderColor: "white",
            color: "white",
            fontSize: { xs: 30, xl: 40 },
          }}
        >
          <p>Total played</p>
          <p>{userResults.length}</p>
          <Button
            onClick={() => navigate("/ChooseCategory")}
            variant="contained"
            color="primary"
            sx={{ zindex: 100, width: { xs: 200, xl: 300 },m:1 }}
          >
            New Game
          </Button>
        </Box>
        <Box
          sx={{
            border: 2,
            borderColor: "white",
            color: "white",
            fontFamily: "Helvetica",
            fontSize: 30,
            p: 1,
            /* height: 200, */
            width: 200,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              fontFamily: "Bebas Neue",
              fontSize: 30,
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
          {averages?.slice(0, 5).map((item, index) => (
            <Box
              key={index}
              component="p"
              sx={{ textTransform: "capitalize", textAlign: "center",fontSize:12 }}
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
        xs={10}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="piChartContainer"
          component="div"
          sx={{
            width: isSmallViewport ? 300 : 350,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: { xs: 300, xl: 600 } ,
          }}
        >
          <Box component="h2" sx={{ fontSize: 40, color: "white" }}>
            Metrics
          </Box>
          <PieChart
            animate={true}
            animationEasing={"transition-timing-function: ease-in"}
            animationDuration={200}
            data={[
              {
                title: "One",
                value: getPercentage(userResults, "higher"),
                color: "#00ff00",
              },
              {
                title: "Two",
                value: getPercentage(userResults),
                color: "#FBFBFB",
              },
            ]}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            labelPosition={checkResults(userResults)?0:50}
            label={({ x, y, dx, dy, dataEntry }) => (
              <text
                x={x}
                y={y}
                dx={dx}
                dy={dy}
                style={{
                  dominantBaseline: "middle",
                  textAnchor: "middle",
                  color: "black",
                  fontSize: "10px",
                  fontFamily: "sans-serif",
                }}
              >
                {Math.round(dataEntry.percentage) > 0
                  ? Math.round(dataEntry.percentage).toString() + "%"
                  : ""}
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
          <p>Matches Won *6 points or less</p>
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
          <p>Matches Lost *5 points or less</p>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashBoard;
