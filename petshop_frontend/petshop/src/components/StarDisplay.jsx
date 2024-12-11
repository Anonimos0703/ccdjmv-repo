import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarDisplay = ({ rating }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ? (
          <StarIcon key={star} color="primary" />
        ) : (
          <StarBorderIcon key={star} color="primary" />
        )
      ))}
    </Box>
  );
};

export default StarDisplay;
