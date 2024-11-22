import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'

const Appointment = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    email: '',
    contactNo: '',
    date: '',
    time: '',
    grooming: {
      price: '',
      groomService: '',
    },
  });

  const navigate = useNavigate();

  // Check for authentication
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('You need to log in to book an appointment.');
      navigate('/auth');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'groomService') {
      setFormData((prevState) => ({
        ...prevState,
        grooming: {
          ...prevState.grooming,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      customerId: formData.customerId,
      date: formData.date,
      email: formData.email,
      contactNo: formData.contactNo,
      price: formData.grooming.price,
      groomService: formData.grooming.groomService,
    };

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
        console.log('Appointment created:', result);
        toast.success('Booking Successful!');

        setFormData({
          customerId: '',
          email: '',
          contactNo: '',
          date: '',
          time: '',
          grooming: {
            price: '',
            groomService: '',
          },
        });
      } else {
        toast.error('Failed To Create Appointment');
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
          {['customerId', 'email', 'contactNo'].map((field, index) => (
            <TextField
              key={index}
              label={
                field === 'customerId'
                  ? 'Customer ID'
                  : field === 'email'
                  ? 'Email'
                  : 'Contact No.'
              }
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={`Enter ${
                field === 'customerId' ? 'Customer ID' : field
              }`}
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
            value={formData.grooming.price}
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
            value={formData.grooming.groomService}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value="Basic Grooming">Grooming</MenuItem>
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
