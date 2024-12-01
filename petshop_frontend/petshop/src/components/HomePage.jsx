import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import animationImage from '../assets/homeanimation.gif';
import grooming from '../assets/grooming.png';

const services = [{ image: grooming, name: 'Pet Grooming' }];

const CustomNextArrow = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: '-35px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      backgroundColor: '#ccc',
      borderRadius: '50%',
      minWidth: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      '&:hover': {
        backgroundColor: '#aaa',
      },
    }}
  >
    &gt;
  </Button>
);

const CustomPrevArrow = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: '-35px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      backgroundColor: '#ccc',
      borderRadius: '50%',
      minWidth: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      '&:hover': {
        backgroundColor: '#aaa',
      },
    }}
  >
    &lt;
  </Button>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product/getProduct');
        if (Array.isArray(response.data)) {
          const processedProducts = response.data.map((product) => ({
            productName: product.productName || 'Unnamed Product',
            price: product.productPrice || 0,
            productImage: product.productImage || '/placeholder-image.png',
            description: product.description || 'No description available.',
            productType: product.productType || 'Uncategorized',
          }));
          setProducts(processedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleBookNow = () => {
    navigate('/appointments');
  };

  const handleGoToProducts = () => {
    navigate('/products');
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '96vw',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
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
        }}
      >
        <Box
          component="img"
          src={animationImage}
          alt="Welcome Animation"
          sx={{
            width: 430,
            height: 430,
            borderRadius: '50%',
            boxShadow: 3,
            marginRight: 3,
          }}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Comic Sans MS',
              color: '#333',
              fontSize: '3rem',
            }}
          >
            Welcome Furry Friends!
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 3,
            color: '#000000',
            marginTop: 7,
          }}
        >
          Products
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ position: 'relative', marginBottom: '2rem' }}>
  <Slider {...sliderSettings}>
    {products.map((product, index) => (
      <Box 
        key={index} 
        sx={{ 
          padding: '0 15px', // Increased padding for more spacing
        }}
      >
        <Card 
          sx={{ 
            boxShadow: 3, 
            textAlign: 'center', 
            borderRadius: 2,
            margin: '10px 0', // Added margin to create vertical spacing
          }}
        >
          <CardMedia
            component="img"
            image={product.productImage}
            alt={product.productName}
            sx={{
              height: 120,
              width: 'auto',
              margin: '0 auto',
              marginTop: 2,
            }}
          />
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {product.productName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              {product.productType}
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
              ₱{product.price.toFixed(2)}
            </Typography>
            <Button
              sx={{
                backgroundColor: '#ff9800',
                color: 'black',
                '&:hover': { backgroundColor: '#f57c00' },
              }}
              onClick={handleGoToProducts}
            >
              Go to Products
            </Button>
          </CardContent>
        </Card>
      </Box>
    ))}
  </Slider>
</Box>


        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 3,
            color: '#000000',
            marginTop: 20,
          }}
        >
          We Offer Services
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={5} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: 3,
                color: '#000000',
              }}
            >
              A happy pet is always clean and well-cared for! Your furry friends
              deserve top-notch grooming and a safe place to stay.
            </Typography>
          </Grid>

          {services.map((service, index) => (
            <Grid item xs={12} sm={5} md={4} key={index}>
              <Card sx={{ boxShadow: 3, textAlign: 'center', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.name}
                  sx={{
                    height: 120,
                    width: 'auto',
                    margin: '0 auto',
                    marginTop: 2,
                  }}
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
                    onClick={handleBookNow}
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
