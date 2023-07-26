import ResponsiveAppBar from "../components/responsiveAppBar/ResponsiveAppBar";
import { Outlet } from "react-router-dom";

const WithNavBar = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet/>
    </div>
  );
};

export default WithNavBar;
