import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import ChooseCategory from "../components/chooseCategory/ChooseCategory";
import WithNavBar from "./WithNavBar";
import DashBoard from "../components/dashboard/DashBoard";
import GamingContainer from "../components/gamingContainer/GamingContainer";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<WithNavBar />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/chooseCategory" element={<ChooseCategory />} />
        <Route path="/gaming" element={<GamingContainer />} /></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
