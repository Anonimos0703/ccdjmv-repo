import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, CircularProgress } from '@mui/material';
import { Toaster, toast } from 'sonner';

const UserAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const email = localStorage.getItem('email');
        console.log('Retrieved email from localStorage:', email);

        if (!email) {
          throw new Error('User not logged in or email not found.');
        }

        // Encode the email to handle special characters
        const encodedEmail = encodeURIComponent(email);
        console.log(`Sending request to API: http://localhost:8080/api/appointments/getAppointmentsByUser/${encodedEmail}`);

        const response = await fetch(`http://localhost:8080/api/appointments/getAppointmentsByUser/${encodedEmail}`);
        console.log('API response status:', response.status);

        if (!response.ok) {
          // Try to get more detailed error message from response
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
                    borderBottom: 'none'
                  }
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
                      <Typography variant="body2">
                        Service: {appointment.grooming?.groomService || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        Price: ₱{appointment.grooming?.price || 'N/A'}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Box>
  );
};

export default UserAppointmentList;