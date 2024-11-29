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
} from '@mui/material';
import { Toaster, toast } from 'sonner';

const GroomingAppointmentList = () => {
  const [groomingAppointments, setGroomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroomingAppointments = async () => {
      try {
        console.log('Sending request to API: http://localhost:8080/api/grooming/getGrooming');

        const response = await fetch('http://localhost:8080/api/grooming/getGrooming');
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
        console.log('Fetched grooming appointments:', data);
        setGroomingAppointments(data);
      } catch (err) {
        console.error('Error fetching grooming appointments:', err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroomingAppointments();
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

      // Update the local state to reflect the change
      setGroomingAppointments((prev) =>
        prev.map((grooming) => ({
          ...grooming,
          appointments: grooming.appointments.filter(
            (appointment) => appointment.appId !== appId
          ),
        }))
      );
    } catch (err) {
      console.error('Error canceling appointment:', err);
      toast.error(err.message);
    }
  };

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
        maxWidth="sm"
        sx={{
          padding: '2rem',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
          Grooming Appointments
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : groomingAppointments.length === 0 ? (
          <Typography align="center">No grooming appointments found.</Typography>
        ) : (
          <List>
  {groomingAppointments.map((grooming) =>
    grooming.appointments?.map((appointment) => (
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
              {/* Additional grooming service details can be here */}
            </>
          }
        />
        
        {/* Conditionally render cancellation message if the appointment is canceled */}
        {appointment.canceled && (
          <Typography color="error" sx={{ fontStyle: 'italic', marginTop: 1 }}>
            This appointment has been canceled by the admin.
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
    ))
  )}
</List>

        )}
      </Container>
    </Box>
  );
};

export default GroomingAppointmentList;