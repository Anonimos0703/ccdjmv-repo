import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, CircularProgress } from '@mui/material';
import { Toaster, toast } from 'sonner';

const UserAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroomingAppointments = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('User not logged in or email not found.');
        }

        const response = await fetch('http://localhost:8080/api/grooming/getGrooming');
        if (!response.ok) {
          throw new Error('Failed to fetch grooming appointments');
        }

        const data = await response.json();

        // Filter appointments for this user
        const filteredAppointments = data.flatMap((grooming) =>
          grooming.appointments?.filter((appointment) => appointment.email === email) || []
        );

        setAppointments(filteredAppointments);
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
          Your Appointments
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : appointments.length === 0 ? (
          <Typography align="center">No appointments found.</Typography>
        ) : (
          <List>
  {appointments.map((appointment) => (
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
          </>
        }
      />
      {/* Conditionally display the cancellation message below the appointment */}
      {appointment.canceled && (
        <Typography color="error" sx={{ fontStyle: 'italic', mt: 1 }}>
          This appointment has been canceled by the admin.
        </Typography>
      )}
    </ListItem>
  ))}
</List>

        )}
      </Container>
    </Box>
  );
};

export default UserAppointmentList;
