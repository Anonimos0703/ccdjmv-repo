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
import paw1 from "../assets/paw1.png";

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

  const pawPositions = [
    {
      top: "5%",
      left: "5%",
      width: "80px",
      opacity: 0.2,
      transform: "rotate(-20deg)",
    },
    {
      bottom: "5%",
      right: "10%",
      width: "100px",
      opacity: 0.2,
      transform: "rotate(15deg)",
    },
    {
      top: "25%",
      right: "20%",
      width: "60px",
      opacity: 0.2,
      transform: "rotate(-10deg)",
    },
    {
      top: "40%",
      left: "50%",
      width: "70px",
      opacity: 0.2,
      transform: "rotate(25deg)",
    },
    {
      bottom: "18%",
      left: "15%",
      width: "90px",
      opacity: 0.2,
      transform: "rotate(-15deg)",
    },
    {
      top: "55%",
      right: "5%",
      width: "50px",
      opacity: 0.2,
      transform: "rotate(30deg)",
    },
  ];

  const fetchProfileImage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/users/${id}/profile-image`
      );
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
    localStorage.clear();
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
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "comic sans ms",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Tails and Whiskers
          </Typography>

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
                      <ListItem
                        button
                        onClick={() => handleMenuOptionClick("/inventory")}
                      >
                        <ListItemText primary="Inventory" />
                      </ListItem>
                    )}

                    <ListItem
                      sx={{
                        color: "solid black",
                        fontWeight: "bold",
                        fontSize: "17px",
                        marginBottom: 3,
                      }}
                    >
                      <Avatar
                        src={profileImage}
                        alt={username}
                        sx={{
                          cursor: "pointer",
                          width: 17,
                          height: 17,
                          border: "2px solid black",
                          marginRight: 1,
                        }}
                      />
                      {username}
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Overview:"
                        primaryTypographyProps={{
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      />
                    </ListItem>

                    <ListItem sx={{ padding: 0, marginLeft: "13px" }}>
                      <Button
                        sx={{
                          color: "black",
                          textTransform: "none",
                          fontSize: "16px",
                        }}
                        onClick={() => navigate("/")}
                      >
                        Home
                      </Button>
                    </ListItem>
                    <ListItem sx={{ padding: 0, marginLeft: "15px" }}>
                      <Button
                        sx={{
                          color: "black",
                          textTransform: "none",
                          fontSize: "16px",
                        }}
                        onClick={() => navigate("/products")}
                      >
                        Products
                      </Button>
                    </ListItem>
                    <ListItem sx={{ padding: 0, marginLeft: "15px" }}>
                      <Button
                        sx={{
                          color: "black",
                          textTransform: "none",
                          fontSize: "16px",
                        }}
                        onClick={() => navigate("/aboutus")}
                      >
                        About Us
                      </Button>
                    </ListItem>

                    <ListItem>
                      <ListItemText
                        primary="Personal:"
                        primaryTypographyProps={{
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => handleMenuOptionClick("/profile")}
                      sx={{ marginLeft: "10px" }}
                    >
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => handleMenuOptionClick("/cart")}
                      sx={{ marginLeft: "10px" }}
                    >
                      <ListItemText primary="Cart" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => handleMenuOptionClick("/MyPurchases")}
                    >
                      <ListItemText primary="My Purchases" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => handleMenuOptionClick("/appointmentslist")}
                    >
                      <ListItemText primary="Appointments" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={handleLogout}
                      sx={{ marginLeft: "10px" }}
                    >
                      <ListItemText primary="Log Out" />
                    </ListItem>
                  </List>
                  {pawPositions.map((pos, index) => (
                    <img
                      key={index}
                      src={paw1}
                      alt="paw"
                      style={{
                        position: "absolute",
                        ...pos,
                        zIndex: 1,
                      }}
                    />
                  ))}
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Button
                sx={{ color: "black", textTransform: "none", fontSize: "16px" }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                sx={{ color: "black", textTransform: "none", fontSize: "16px" }}
                onClick={() => navigate("/products")}
              >
                Products
              </Button>
              <Button
                sx={{ color: "black", textTransform: "none", fontSize: "16px" }}
                onClick={() => navigate("/aboutus")}
              >
                About Us
              </Button>
              <Button
                sx={{ color: "black", textTransform: "none", fontSize: "16px" }}
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }} />
    </>
  );
}
