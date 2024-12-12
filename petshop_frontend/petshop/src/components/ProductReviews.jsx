import React, { useRef, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import StarRating from "./StarRating";

function ProductReviews({ reviews }) {
  const reviewsContainerRef = useRef(null);

  useEffect(() => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTop = reviewsContainerRef.current.scrollHeight;
    }
  }, [reviews]);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 4,
        p: 2,
        maxHeight: 300,
        overflow: "auto",
      }}
      ref={reviewsContainerRef}
    >
      <Typography variant="h5" gutterBottom>
        Product Reviews
      </Typography>
      <List>
        {reviews.map((review, index) => (
          <ListItem key={index} divider={index !== reviews.length - 1}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {review.user.username}
                  </Typography>
                  <StarRating rating={review.ratings} onRatingChange={() => {}} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </React.Fragment>
              }
              secondary={review.comment}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ProductReviews;
