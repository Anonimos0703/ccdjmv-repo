import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    email: '',
    contactNo: '',
    date: '',
    time: '',
    grooming: {
      price: '',
      groomService: ''  // Changed from service to groomService
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'groomService') {  // Updated condition
      setFormData(prevState => ({
        ...prevState,
        grooming: {
          ...prevState.grooming,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
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
      groomService: formData.grooming.groomService,  // Updated to match backend
    };

    try {
      const response = await fetch('http://localhost:8080/api/appointments/postAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Appointment created:', result);
        alert('Booking successful! Your appointment has been created.');

        setFormData({
          customerId: '',
          email: '',
          contactNo: '',
          date: '',
          time: '',
          grooming: {
            price: '',
            groomService: '',  // Updated here too
          },
        });
      } else {
        alert('Failed to create appointment: ' + response.statusText);
        console.error('Failed to create appointment:', response.statusText);
      }
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 15, mb: 8 }}>
      <Box sx={{ p: 5, boxShadow: 3, borderRadius: 2, position: 'relative' }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
          Book an Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          {['customerId', 'email', 'contactNo'].map((field, index) => (
            <TextField
              key={index}
              label={field === 'customerId' ? 'Customer ID' : field === 'email' ? 'Email' : 'Contact No.'}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={`Enter ${field === 'customerId' ? 'Customer ID' : field}`}
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
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
          </TextField>

          <TextField
            label="Groom Service"
            select
            name="groomService"  // Updated name
            value={formData.grooming.groomService}  // Updated value path
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value="Grooming">Grooming</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Book Now
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AppointmentForm;