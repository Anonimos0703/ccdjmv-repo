import React from "react";
import { Rating } from "@mui/material";

function StarRating({ rating, onRatingChange }) {
  return (
    <Rating
      name="product-rating"
      value={rating}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          onRatingChange(newValue);
        }
      }}
      size="large"
    />
  );
}

export default StarRating;
