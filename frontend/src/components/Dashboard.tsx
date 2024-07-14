import { useNavigate, Link } from "react-router-dom";

import { Typography } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const phoneNumber = localStorage.getItem("phoneNumber");
  console.log("phone number in localStorage: " + phoneNumber);

  if (!phoneNumber) {
    navigate("/login");
  }

  return (
    <div>
      <h1>DASHBOARD</h1>
      <Typography variant="h5">
        <Link to="/services">Services</Link>
      </Typography>
      <Typography variant="h5">
        <Link to="/profile">Profile</Link>
      </Typography>
      <Typography variant="h5">
        <Link to="/">Home</Link>
      </Typography>
    </div>
  );
}

export default Dashboard;
