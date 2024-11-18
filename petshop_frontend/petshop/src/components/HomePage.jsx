import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import animationImage from '../assets/homeanimation.gif';
import dog_food from '../assets/dog_food.jpg';
import cat_food from '../assets/cat_food.jpg';
import cat_treats from '../assets/cat_treats.png';
import dog_treats from '../assets/dog_treats.jpg';
import grooming from '../assets/grooming.png';

const products = [
  { image: dog_food, name: 'Dog Food', price: '₱200.00' },
  { image: cat_food, name: 'Cat Food', price: '₱180.00' },
  { image: cat_treats, name: 'Cat Treats', price: '₱120.00' },
  { image: dog_treats, name: 'Dog Treats', price: '₱140.00' },
];

const services = [
  { image: grooming, name: 'Pet Grooming' },
];

const HomePage = () => {
  const navigate = useNavigate(); // Declare navigate using useNavigate

  // Handle the navigation when "Book Now" button is clicked
  const handleBookNow = () => {
    navigate('/appointments');
  };

  return (
    <Box sx={{ 
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '96vw',
      padding: '2rem',
    }}>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: -4,
        backgroundColor: '#f5f5dc',
        padding: '2rem',
        borderRadius: 2,
        boxShadow: 3,
        width: '100%',
      }}>
        <Box
          component="img"
          src={animationImage}
          alt="Welcome Animation"
          sx={{ 
            width: 430, 
            height: 430, 
            borderRadius: '50%', 
            boxShadow: 3, 
            marginRight: 3 
          }}
        />
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Comic Sans MS', 
            color: '#333',
            fontSize: '3rem',
          }}>
            Welcome Furry Friends!
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          marginBottom: 3, 
          color: '#000000',
          marginTop: 7,
        }}>
          Products
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={3} justifyContent="center">
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card sx={{ 
                boxShadow: 3, 
                textAlign: 'center', 
                borderRadius: 2 
              }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 120, width: 'auto', margin: '0 auto', marginTop: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold' 
                  }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                  <Button sx={{ 
                    backgroundColor: '#ff9800', 
                    color: 'black', 
                    '&:hover': { backgroundColor: '#f57c00' } 
                  }}>
                    Check Product Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          marginBottom: 3, 
          color: '#000000',
          marginTop: 20,
        }}>
          We Offer Services
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={5} md={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              marginBottom: 3, 
              color: '#000000'
            }}>
              A happy pet is always clean and well-cared for! Your furry friends deserve top-notch grooming and a safe place to stay. At Tails & Whiskers, we offer both pet grooming and boarding to ensure they get the best care.
            </Typography>
          </Grid>

          {services.map((service, index) => (
            <Grid item xs={12} sm={5} md={4} key={index}>
              <Card sx={{ 
                boxShadow: 3, 
                textAlign: 'center', 
                borderRadius: 2 
              }}>
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.name}
                  sx={{ height: 120, width: 'auto', margin: '0 auto', marginTop: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {service.name}
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: '#ff9800',
                      color: 'black',
                      '&:hover': { backgroundColor: '#f57c00' },
                    }}
                    onClick={handleBookNow} // Call the handleBookNow function on click
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
