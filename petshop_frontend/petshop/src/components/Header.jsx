import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import defaultProfileImage from "../assets/default_profile.png";

export default function Header({ username, role, userId }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (userId) {
      // Fetch profile image from the backend using userId
      fetchProfileImage(userId);
    }
  }, [userId]);

  const fetchProfileImage = async (id) => {
    try {
      const response = await fetch(`https://localhost:8080/auth/users/${id}/profile-image`);
      if (response.ok) {
        const profileImageUrl = await response.text();
        setProfileImage(profileImageUrl || defaultProfileImage); // Fallback to default if empty
      } else {
        setProfileImage(defaultProfileImage); // Use default if the request fails
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setProfileImage(defaultProfileImage); // Fallback to default on error
    }
  };

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
    navigate("/aboutus");
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
    localStorage.removeItem("profileImage");
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
          <Button sx={{ color: "black" }} onClick={handleProductsClick}>
            Products
          </Button>
          <Button sx={{ color: "black" }} onClick={handleAboutUsClick}>
            About Us
          </Button>
          {username ? (
            <>
              <Avatar
                src={profileImage}
                alt={username}
                sx={{
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  border: "2px solid black",
                }}
                onClick={handleMenuClick}
              />
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
                <MenuItem onClick={() => handleMenuOptionClick("/appointmentslist")}>
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
