import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Toaster, toast } from 'sonner';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log('Sending request to API: http://localhost:8080/api/appointments/getAppointment');

        const response = await fetch('http://localhost:8080/api/appointments/getAppointment');
        console.log('API response status:', response.status);

        if (!response.ok) {
          let errorMessage;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
          } catch {
            errorMessage = `HTTP error! status: ${response.status}`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Fetched appointments:', data);
        setAppointments(data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/appointments/cancel/${appId}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel the appointment.');
      }

      toast.success('Appointment canceled successfully.');

      // Update the local state to remove the canceled appointment
      setAppointments(prev => prev.filter(appointment => appointment.appId !== appId));
    } catch (err) {
      console.error('Error canceling appointment:', err);
      toast.error(err.message);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: '2rem',
      }}
    >
      <Toaster richColors />
      <Container
        maxWidth="md"
        sx={{
          padding: '2rem',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
          My Appointments
        </Typography>

        <TextField
          fullWidth
          label="Search by Email"
          variant="outlined"
          sx={{ mb: 3 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : filteredAppointments.length === 0 ? (
          <Typography align="center">No appointments found.</Typography>
        ) : (
          <List>
            {filteredAppointments.map((appointment) => (
              <ListItem
                key={appointment.appId}
                sx={{
                  borderBottom: '1px solid #ddd',
                  padding: '1rem 0',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                      {`Date: ${appointment.date}, Time: ${appointment.time}`}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">Email: {appointment.email}</Typography>
                      <Typography variant="body2">Contact: {appointment.contactNo}</Typography>
                      <Typography variant="body2">Service: {appointment.groomService}</Typography>
                      <Typography variant="body2">Price: ₱{appointment.price}</Typography>
                      <Typography variant="body2">Payment Method: {appointment.paymentMethod}</Typography>
                    </>
                  }
                />
                {appointment.canceled && (
                  <Typography color="error" sx={{ fontStyle: 'italic', marginTop: 1 }}>
                    This appointment has been canceled. 
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCancelAppointment(appointment.appId)}
                >
                   Cancel
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Box>
  );
};

export default AppointmentList;
