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
  TextField,
} from '@mui/material';
import defaultProfileImage from '../assets/default_profile.png';

const Profile = ({ onProfileImageUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [address, setAddress] = useState({
    region: '',
    province: '',
    city: '',
    barangay: '',
    postalCode: '',
    buildingHouseNo: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);  // Add state for submission process

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

        // Load the address for this specific user from localStorage
        const storedAddress = localStorage.getItem(`userAddress_${id}`);
        if (storedAddress) {
          setAddress(JSON.parse(storedAddress)); // Populate the state with stored address
        } else {
          setAddress(response.data.address || {});
        }

        // Retrieve user-specific profile image from localStorage
        const storedImage = localStorage.getItem(`profileImage_${id}`);
        setProfileImage(storedImage || defaultProfileImage);

        if (onProfileImageUpdate) {
          onProfileImageUpdate(response.data.profileImage);
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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = {
      ...address,
      [name]: value,
    };
    setAddress(updatedAddress);

    const id = localStorage.getItem('id');
    // Store the updated address under the specific user's ID in localStorage
    localStorage.setItem(`userAddress_${id}`, JSON.stringify(updatedAddress));
  };

  const handleSaveAddress = async () => {
    setIsSubmitting(true);  // Set submitting state to true

    const id = localStorage.getItem('id');
    try {
      await axios.put(`http://localhost:8080/auth/users/${id}/address`, address);
      
      // Persist address to localStorage after saving to the backend
      localStorage.setItem(`userAddress_${id}`, JSON.stringify(address));
      
      setSnackbarMessage('Address updated successfully!');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Error updating address:', err.response || err);
      setSnackbarMessage('Error updating address. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);  // Reset submitting state after the process is complete
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleImageUpload = async () => {
    const id = localStorage.getItem('id');
    if (!imageFile) {
      setSnackbarMessage('No image selected. Please select a file first.');
      setOpenSnackbar(true);
      return;
    }
  
    const formData = new FormData();
    formData.append('profileImage', imageFile);
  
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/users/${id}/upload-profile-pic`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const updatedImage = `data:image/png;base64,${response.data.profileImage}`;
      if (response.data.profileImage) {
        // Save the updated image to localStorage with user ID as key
        const imageKey = `profileImage_${id}`;
        localStorage.setItem(imageKey, updatedImage);
  
        // Update the state to reflect the new image
        setProfileImage(updatedImage);
  
        // Pass the new image to the parent if necessary
        if (onProfileImageUpdate) {
          onProfileImageUpdate(updatedImage);
        }
      } else {
        throw new Error('Image not returned correctly');
      }
  
      setSnackbarMessage('Profile picture updated successfully!');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Error uploading profile picture:', err.response || err);
      setSnackbarMessage('Error uploading profile picture. Please try again.');
      setOpenSnackbar(true);
    }
  };
  

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

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
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              User Profile
            </Typography>
            {user && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
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
                      marginBottom: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 20,
                      marginBottom: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                    >
                      Select Image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleImageUpload}
                    >
                      Upload Picture
                    </Button>
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>Username:</Typography>
                <Typography variant="body1" gutterBottom>
                  {user.username}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>FirstName:</Typography>
                <Typography variant="body1" gutterBottom>
                  {user.firstName}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>LastName:</Typography>
                <Typography variant="body1" gutterBottom>
                  {user.lastName}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Email:</Typography>
                <Typography variant="body1" gutterBottom>
                  {user.email}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Address:
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Input fields for each part of the address */}
                  <TextField
                    name="region"
                    label="Region"
                    value={address.region || ''}
                    onChange={handleAddressChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    name="province"
                    label="Province"
                    value={address.province || ''}
                    onChange={handleAddressChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    name="city"
                    label="City"
                    value={address.city || ''}
                    onChange={handleAddressChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    name="barangay"
                    label="Barangay"
                    value={address.barangay || ''}
                    onChange={handleAddressChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    name="postalCode"
                    label="Postal Code"
                    value={address.postalCode || ''}
                    onChange={handleAddressChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    name="buildingHouseNo"
                    label="Building/House No."
                    value={address.buildingHouseNo || ''}
                    onChange={handleAddressChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                </Box>
                 <Box
                 sx={{
                  marginTop: 2,
              
    
                 }}> 
                  <Button
    
                    variant="contained"
                    onClick={handleSaveAddress}
                   
                  >
                    Submit
                  </Button>
                  </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarMessage.includes('Error') ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Profile;
