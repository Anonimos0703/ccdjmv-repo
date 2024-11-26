import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, Alert, Card, CardContent, Divider } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem('id');
      console.log('User ID from localStorage:', id);
      

      if (!id) {
        console.error('User ID is missing in localStorage');
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/auth/users/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err.response || err);
        setError(err.response?.data?.message || 'Error fetching user data.');
        
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
  maxWidth="lg"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Ensure it spans the full viewport height
    padding: 2, // Add padding for spacing
  }}
>
      <Card sx={{ width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            User Profile
          </Typography>
          {user && (
            <Box>
              <Typography variant="h6" gutterBottom>Username:</Typography>
              <Typography variant="body1" gutterBottom>{user.username}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>First Name:</Typography>
              <Typography variant="body1" gutterBottom>{user.firstName}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Last Name:</Typography>
              <Typography variant="body1" gutterBottom>{user.lastName}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Email:</Typography>
              <Typography variant="body1" gutterBottom>{user.email}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Role:</Typography>
              <Typography variant="body1" gutterBottom>{user.role}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
