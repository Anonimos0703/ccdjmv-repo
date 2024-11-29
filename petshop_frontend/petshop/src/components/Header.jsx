import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header({ username, role }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleProductsClick = () => {
    navigate("/products");
  };

  const handleAboutUsClick = () => {
    navigate('/aboutus');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (route) => {
    setAnchorEl(null);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setAnchorEl(null);
    navigate("/auth");
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
            Tails and Whiskers
          </Typography>
          <Button sx={{ color: "black" }} onClick={handleHomeClick}>
            Home
          </Button>
          <Button sx={{ color: 'black' }} onClick={handleProductsClick}>
            Products
            </Button>
          <Button sx={{ color: 'black' }} onClick={handleAboutUsClick}>
            About Us
          </Button>
          {username ? (
            <>
              <Button
                sx={{ color: "black", fontWeight: "bold" }}
                onClick={handleMenuClick}
              >
                {username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    marginTop: "40px",
                  },
                }}
              >
                {role === "ADMIN" && (
                  <MenuItem onClick={() => handleMenuOptionClick("/inventory")}>
                    Inventory
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleMenuOptionClick("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleMenuOptionClick("/cart")}>
                  Cart
                </MenuItem>
                <MenuItem onClick={() => handleMenuOptionClick('/appointmentslist')}>
                  Appointments
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button sx={{ color: "black" }} onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }} />
    </>
  );
}
