import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header({ getUsername }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/appointment');
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: '#FFFACD',
          boxShadow: 'none',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}
          >
            Tails and Whiskers
          </Typography>
          <Button sx={{ color: 'black' }} onClick={handleClick}>
            Home
          </Button>
          <Button sx={{ color: 'black' }}>Products</Button>
          <Button sx={{ color: 'black' }} onClick={handleClick}>Service</Button>
          <Button sx={{ color: 'black' }}>About Us</Button>
          {getUsername ? (
            <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
              {username}
            </Typography>
          ) : (
            <Button sx={{ color: 'black' }} onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }} />
    </>
  );
}