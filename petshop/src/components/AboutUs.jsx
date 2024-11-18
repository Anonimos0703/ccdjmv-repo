import React from "react";
import { Box, Typography, Avatar, Grid, Container } from "@mui/material";

import animationImage from "../assets/homeanimation.gif";
import dogcat from "../assets/dogcat.jpg";
import kyrie from "../assets/kyrie.jpg";
import jaredd from "../assets/jaredd.png";
import charles from "../assets/charles.png";

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "96vw",
        padding: "2rem",
      }}
    >
      {/* Welcome Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
          marginTop: -4,
          backgroundColor: "#f5f5dc",
          padding: "2rem",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={animationImage}
          alt="Welcome Animation"
          sx={{
            width: 430,
            height: 430,
            borderRadius: "50%",
            boxShadow: 3,
            marginRight: 3,
          }}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontFamily: "Comic Sans MS",
              color: "#333",
              fontSize: "3rem",
            }}
          >
            About Us!
          </Typography>
        </Box>
      </Box>

        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "40px 20px" }}>
        <Box
            sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5dc",
            padding: "20px",
            borderRadius: "8px",
            width: "80%",
            boxShadow: 3,
            }}
        >
            <Avatar
            src={dogcat}
            alt="Pet Image"
            sx={{
                width: 200,
                height: 200,
                marginRight: "20px",
            }}
            />
            <Typography
            variant="body1"
            sx={{
                color: "#333",
                fontSize: "1.2rem",
                lineHeight: "1.8",
                textAlign: "left",
            }}
            >
            At Tails & Whiskers, pets are family. Our mission is to provide top-quality products that make caring for your pets simple and joyful. From healthy food to toys and grooming essentials, we’ve got everything to keep your furry, feathered, or scaly friends happy.
            </Typography>
        </Box>
        </Container>


      <Container sx={{ padding: "40px 20px" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            color: "#000",
          }}
        >
          Behind Tails & Whiskers
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box sx={{ boxShadow: 3, padding: 2, textAlign: "center" }}>
              <Avatar
                src={charles}
                alt="Charles"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "10px", color: "#000" }}
              >
                charleswilliam.sevonial@cit.edu
              </Typography>
              <Typography variant="body2" sx={{color: "#000"}}>223-326-762</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box sx={{ boxShadow: 3, padding: 2, textAlign: "center" }}>
              <Avatar
                src={jaredd}
                alt="Jared"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "10px", color: "#000" }}
              >
                jaredchester.canasa@cit.edu
              </Typography>
              <Typography variant="body2" sx={{color: "#000"}}>456-988-7273</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box sx={{ boxShadow: 3, padding: 2, textAlign: "center" }}>
              <Avatar
                src={kyrie}
                alt="Kyrie"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "10px", color: "#000" }}
              >
                vincekyrie.seville@cit.edu
              </Typography>
              <Typography variant="body2" sx={{color: "#000"}}>332-4452-323</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box sx={{ boxShadow: 3, padding: 2, textAlign: "center" }}>
              <Avatar
                src={kyrie}
                alt="Kyrie"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "10px", color: "#000" }}
              >
                charlesdominic.hordista@cit.edu
              </Typography>
              <Typography variant="body2" sx={{color: "#000"}}>332-4452-323</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box sx={{ boxShadow: 3, padding: 2, textAlign: "center" }}>
              <Avatar
                src={kyrie}
                alt="Kyrie"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "10px", color: "#000" }}
              >
                dionealfred.cabigas@cit.edu
              </Typography>
              <Typography variant="body2" sx={{color: "#000"}}>332-4452-323</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box sx={{ boxShadow: 3, padding: 2, textAlign: "center" }}>
              <Avatar
                src={kyrie}
                alt="Kyrie"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "10px", color: "#000" }}
              >
                mattjudeaugustine.getigan@cit.edu
              </Typography>
              <Typography variant="body2" sx={{color: "#000"}}>332-4452-323</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
