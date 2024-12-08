import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import defaultProfileImage from "../assets/default_profile.png";

export default function Header({ username, role, userId }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    if (userId) {
      // Check localStorage first
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      } else {
        // Fetch from backend if not in localStorage
        fetchProfileImage(userId);
      }
    }
  }, [userId]);

  const fetchProfileImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/users/${id}/profile-image`);
      if (response.ok) {
        const profileImageUrl = await response.text();
        const imageUrl = profileImageUrl || defaultProfileImage;
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl); // Cache for future
      } else {
        console.error("Failed to fetch profile image.");
        setProfileImage(defaultProfileImage);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setProfileImage(defaultProfileImage);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOptionClick = (route) => {
    setDrawerOpen(false);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
    setDrawerOpen(false);
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
          <Button sx={{ color: "black" }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button sx={{ color: "black" }} onClick={() => navigate("/products")}>
            Products
          </Button>
          <Button sx={{ color: "black" }} onClick={() => navigate("/aboutus")}>
            About Us
          </Button>
          {username ? (
            <>
              <Avatar
                src={profileImage}
                alt={username}
                sx={{
                  cursor: "pointer",
                  width: 25,
                  height: 25,
                  border: "2px solid black",
                }}
                onClick={handleDrawerToggle}
              />
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{
                    width: 250,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    backgroundColor: "#FFFACD",
                  }}
                >
                  <List>
                    {role === "ADMIN" && (
                      <ListItem button onClick={() => handleMenuOptionClick("/inventory")}>
                        <ListItemText primary="Inventory" />
                      </ListItem>
                    )}
                    <ListItem button onClick={() => handleMenuOptionClick("/profile")}>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => handleMenuOptionClick("/cart")}>
                      <ListItemText primary="Cart" />
                    </ListItem>
                    <ListItem button onClick={() => handleMenuOptionClick("/MyPurchases")}>
                      <ListItemText primary="Cart" />
                    </ListItem>
                    <ListItem button onClick={() => handleMenuOptionClick("/appointmentslist")}>
                      <ListItemText primary="Appointments" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Log Out" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Button sx={{ color: "black" }} onClick={() => navigate("/auth")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }} />
    </>
  );
}
