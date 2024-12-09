import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Toaster, toast } from "sonner";

export default function CartItem(props) {
  const handleCheckboxChange = (event) => {
    props.onCheckChange(props.itemId, event.target.checked); // Notify parent about the checkbox change
  };

  const handleIncreaseQuantity = () => {
    if (props.quantity < props.availableStock) {
      props.onQuantityChange(props.itemId, props.quantity + 1);
    } else {
      toast.error(
        "You have reached the maximum available stock for this item."
      ); // Optional: Notify the user
    }
  };

  const handleDecreaseQuantity = () => {
    if (props.quantity > 1) {
      props.onQuantityChange(props.itemId, props.quantity - 1);
    }
  };

  const handleDelete = () => {
    props.onDelete(props.itemId);
  };

  return (
    <>
      <Grid item xs={12}>
        <Toaster position="top-center" duration={2500} />
        <Card
          variant="outlined"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Checkbox
            checked={props.isSelected} // This indicates whether the checkbox is selected
            onChange={handleCheckboxChange}
          />
          <CardMedia
            component="img"
            image={props.image}
            alt={props.title}
            style={{ width: 80, height: 80, marginLeft: "10px" }}
          />
          <CardContent style={{ flex: 1 }}>
            <Typography variant="body1">{props.title}</Typography>
            <Typography variant="h6" color="primary">
              ₱{props.price}
            </Typography>
          </CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleDecreaseQuantity}>
              <RemoveIcon />
            </IconButton>
            <TextField
              variant="outlined"
              size="small"
              value={props.quantity}
              inputProps={{ style: { textAlign: "center" } }}
              style={{ width: 100 }}
            />
            <IconButton onClick={handleIncreaseQuantity}>
              <AddIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Card>
      </Grid>
    </>
  );
}
