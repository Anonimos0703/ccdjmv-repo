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

export default function CartItem(props) {
  return (
    <>
      <Grid item xs={12}>
        <Card
          variant="outlined"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Checkbox />
          <CardMedia
            component="img"
            image="https://via.placeholder.com/80"
            alt="Product Image"
            style={{ width: 80, height: 80, marginLeft: "10px" }}
          />
          <CardContent style={{ flex: 1 }}>
            <Typography variant="body1">{props.title}</Typography>
            <Typography variant="h6" color="primary">
              ₱{props.price}
            </Typography>
          </CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <RemoveIcon />
            </IconButton>
            <TextField
              variant="outlined"
              size="small"
              value={props.quantity}
              inputProps={{ style: { textAlign: "center" } }}
              style={{ width: 50 }}
            />
            <IconButton>
              <AddIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </Card>
      </Grid>
    </>
  );
}
