import React from 'react';
import { Box, Typography, Grid, Container, Paper, Card, CardContent } from '@mui/material';
import { useAdminAuth } from './AdminAuthProvider';

const AdminDashboard = () => {
  const { admin } = useAdminAuth();

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome, {admin?.user}!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This is a protected page only accessible to logged-in admins.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Analytics Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Add charts, data, or insights here to give an overview of key metrics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recent Activities
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Display a list of recent actions, system updates, or important notifications.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                System Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Access or configure various administrative settings from this section.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
