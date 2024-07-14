import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
      <Typography variant="h5">
        <Link to="/dashboard">Dashboard</Link>
      </Typography>
      <Typography variant="h5">
        <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
};

export default Home;
