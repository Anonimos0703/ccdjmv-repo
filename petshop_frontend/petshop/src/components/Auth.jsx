import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import signup from '../assets/signup.jpg';
import logo from '../assets/logo.png';
import animation from '../assets/animation.gif';

function Auth({ setUsername, setRole }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp
      ? 'http://localhost:8080/auth/signup'
      : 'http://localhost:8080/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });      

      let data;
      const text = await response.text(); // First, read the response as text

      try {
        data = JSON.parse(text); // Try parsing the response text as JSON
      } catch (error) {
        data = { message: text }; // If parsing fails, treat it as plain text
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (!isSignUp) {
        setUsername(data.username);
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data.id);

        if (data.role) {
          setRole(data.role); // Update state directly
          localStorage.setItem('role', data.role);
        }

        navigate('/');
      } else {
        setMessage(data.message || 'Registration successful! Please log in.');
      }
    } catch (error) {
      setMessage(error.message);
      console.error('Error during authentication:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#f5f5dc',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          padding: 6,
          backgroundColor: '#f5f5dc',
        }}
      >
        <img src={logo} alt="Tails and Whiskers Logo" style={{ width: '300px', height: 'auto' }} />
        <Box sx={{ display: 'flex', gap: 2, marginTop: '-230px' }}>
          <img src={animation} alt="Cat and Dog Animation 1" style={{ width: '300px', height: 'auto' }} />
          <img src={animation} alt="Cat and Dog Animation 2" style={{ width: '300px', height: 'auto' }} />
          <img src={animation} alt="Cat and Dog Animation 3" style={{ width: '300px', height: 'auto' }} />
        </Box>
      </Box>

      <Container
        component="main"
        maxWidth="sm"
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5dc',
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: 4,
            boxShadow: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backgroundImage: `url(${signup})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <IconButton onClick={() => navigate(-1)} sx={{ alignSelf: 'flex-start', mb: 1 }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
            {isSignUp ? 'Create Your Account!' : 'Log In'}
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {isSignUp && (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <TextField
              label="Email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            {isSignUp && (
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, bgcolor: 'green', color: 'white' }}>
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>
          </form>

          <Button 
            onClick={() => setIsSignUp(!isSignUp)} 
            fullWidth 
            sx={{ mt: 2, textTransform: 'none', fontSize: '0.875rem' }}
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Button>

          {message && (
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'green' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Auth;
