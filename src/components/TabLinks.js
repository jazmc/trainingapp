import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Customers from "./Customers";
import Trainings from "./Trainings";
import Calendar from "./Calendar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function TabLinks() {
  const [nav, setNav] = React.useState("trainings");

  const handleChange = (event, value) => {
    setNav(value);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Training app</Typography>
        </Toolbar>
        <Tabs
          value={nav}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab value="trainings" label="Trainings" />
          <Tab value="customers" label="Customers" />
          <Tab value="calendar" label="Calendar" />
        </Tabs>
      </AppBar>
      {nav === "trainings" && <Trainings />}
      {nav === "customers" && <Customers />}
      {nav === "calendar" && <Calendar />}
    </div>
  );
}
