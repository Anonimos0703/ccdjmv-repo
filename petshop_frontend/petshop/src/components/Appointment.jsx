import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'

const Appointment = () => {
  const [formData, setFormData] = useState({
    email: '',
    contactNo: '',
    date: '',
    time: '',
    price: '',
    groomService: '',
    paymentMethod: '',    
    user: {
      id: parseInt(localStorage.getItem('id'), 10)  // Ensure user ID is set from localStorage
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('You need to log in to book an appointment.');
      navigate('/auth');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loggedInEmail = localStorage.getItem('email'); 
  
    if (formData.email !== loggedInEmail) {
      toast.error("You can only book an appointment using your registered email.");
      return; 
    }
  
    // Prepare appointment data with nested user object
    const appointmentData = {
      email: formData.email,
      contactNo: formData.contactNo,
      date: formData.date,
      time: formData.time,
      price: formData.price,
      groomService: formData.groomService,
      paymentMethod: formData.paymentMethod,
      user: {
        id: formData.user.id
      }
    };
  
    console.log('Appointment Data:', appointmentData);
    try {
      const response = await fetch(
        'http://localhost:8080/api/appointments/postAppointment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointmentData),
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        console.log('Appointment created:', result.appId);
        toast.success('Booking Successful! Appointment ID: ' + result.appId);
  
        // Reset form, keeping user ID
        setFormData({
          email: '',
          contactNo: '',
          date: '',
          time: '',
          price: '',
          groomService: '',
          paymentMethod: '',
          user: {
            id: formData.user.id
          }
        });
      } else {
        toast.error('Failed to Create Appointment');
        console.error('Failed to create appointment:', response.statusText);
      }
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error:', error);
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        width: '100vw',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      <Toaster richColors  />
      <Container
        maxWidth="sm"
        sx={{
          padding: '2rem',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 2,
            }}
          >
            Book an Appointment
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Schedule a service for your furry friend today!
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          {['email', 'contactNo'].map((field, index) => (
            <TextField
              key={index}
              label={
                field === 'email'
                  ? 'Email'
                  : 'Contact No.'
              }
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
          ))}

          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Price"
            select
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value={500}>₱500</MenuItem>
            <MenuItem value={1000}>₱1000</MenuItem>
          </TextField>

          <TextField
            label="Groom Service"
            select
            name="groomService"
            value={formData.groomService}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value="Basic Grooming">Grooming</MenuItem>
          </TextField>

          <TextField
            label="Payment Method"
            select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value="Counter">Over The Counter</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#ff9800',
              color: 'white',
              '&:hover': { backgroundColor: '#f57c00' },
              fontWeight: 'bold',
            }}
          >
            Book Now
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Appointment;