
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Avatar,
  Button,
  Snackbar,
} from '@mui/material';
import defaultProfileImage from '../assets/default_profile.png';

const Profile = ({ onProfileImageUpdate }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [imageFile, setImageFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem('id');
      if (!id) {
        console.error('User ID is missing in localStorage');
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8080/auth/users/${id}`);
        setUser(response.data);
  
        // Determine profile image
        const userImage = response.data.profileImage 
          ? `data:image/png;base64,${response.data.profileImage}` 
          : defaultProfileImage;
  
        setProfileImage(userImage);
  
        // Notify parent component
        if (onProfileImageUpdate) {
          onProfileImageUpdate(userImage);
        }
      } catch (err) {
        console.error('Error fetching user:', err.response || err);
        setError('Error fetching user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [onProfileImageUpdate]);
  

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a JPEG, PNG, or GIF.');
        return;
      }

      if (file.size > maxSize) {
        setError('File is too large. Maximum size is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("Please select an image to upload.");
      return;
    }
  
    const id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("image", imageFile);
  
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/users/${id}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const newProfileImage = response.data.profileImage;
      setProfileImage(newProfileImage);
  
      if (onProfileImageUpdate) {
        onProfileImageUpdate(newProfileImage);
      }
  
      setSnackbarMessage("Profile image uploaded successfully!");
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error uploading image:", err.response || err);
      setError("Error uploading image. Please try again.");
    }
  };
  
  

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Loading state
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

  // Error state
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
        height: '100vh',
        padding: 2,
      }}
    >
      <Card sx={{ width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            User Profile
          </Typography>
          {user && (
            <Box>
              {/* Profile Image */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Avatar
                  src={profileImage}
                  alt={user.username}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '2px solid black',
                  }}
                />
              </Box>
              
              {/* User Details */}
              <Typography variant="h6" gutterBottom>Username:</Typography>
              <Typography variant="body1" gutterBottom>
                {user.username}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>First Name:</Typography>
              <Typography variant="body1" gutterBottom>
                {user.firstName}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>Last Name:</Typography>
              <Typography variant="body1" gutterBottom>
                {user.lastName}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>Email:</Typography>
              <Typography variant="body1" gutterBottom>
                {user.email}
              </Typography>
              
              <Divider sx={{ my: 2 }} />

              {/* Image Upload Section */}
              <Box sx={{ marginTop: 2 }}>
                <input
                  accept="image/*"
                  id="upload-image"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    sx={{ width: '200px' }}
                  >
                    Upload New Image
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginLeft: 2 }}
                  onClick={handleImageUpload}
                >
                  Save Image
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Profile;