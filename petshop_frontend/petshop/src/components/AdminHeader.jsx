import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundColor: "#FFFACD",
          boxShadow: "none",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Arial",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Admin Panel
          </Typography>
          <Button sx={{ color: "black" }} onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </Button>
          <Button sx={{ color: "black" }} onClick={() => navigate("/admin/inventory")}>
            Inventory
          </Button>
          <Button sx={{ color: "black" }} onClick={() => navigate("/admin/appointments")}>
            Appointments
          </Button>
          <Button
            sx={{
              color: "red",
              "&:hover": {
                backgroundColor: "error.dark",
                color: "white",
              },
              fontWeight: "bold",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }} />
    </>
  );
}
