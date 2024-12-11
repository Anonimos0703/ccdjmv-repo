import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import imagePlaceholder from "../assets/image.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700",
    },
    secondary: {
      main: "#000",
    },
    background: {
      default: "#FFF8E1",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    button: {
      textTransform: "none",
    },
  },
});
// TEMPORARY!! REMOVE ONCE BACKEND IS APPLIED
const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { selectedItems, orderSummary } = location.state || {
    selectedItems: [],
    orderSummary: {},
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: "background.default",
          padding: { xs: 2, md: 6 },
          boxSizing: "border-box",
        }}
      >
        <Box maxWidth="lg" margin="0 auto">
          <Box display="flex" justifyContent="flex-start">
            <IconButton
              color="secondary"
              onClick={() => navigate(-1)} // Navigate back
              sx={{ marginBottom: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

          <Typography variant="h4" gutterBottom color="secondary">
            Checkout
          </Typography>
          <Typography variant="h6" gutterBottom color="secondary">
            Complete your purchase by providing your payment details.
          </Typography>

          <Grid container spacing={4}>
            {/* ORDER SUMMARY */}
            <Grid item xs={12} md={7}>
              <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>

                {/* products list */}
                <List>
                  {selectedItems.map((item, index) => (
                    <ListItem key={index}>
                      {/* image */}
                      <Box
                        component="img"
                        src={item.product.productImage || imagePlaceholder}
                        alt={item.product.productName}
                        sx={{
                          width: 56,
                          height: 56,
                          objectFit: "contain",
                          marginRight: 2,
                        }}
                      />
                      {/* product name and price*/}
                      <ListItemText
                        primary={item.product.productName}
                        secondary={`₱${item.product.productPrice} x ${item.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Subtotal</Typography>
                  <Typography variant="h6" color="secondary">
                    ₱{orderSummary.subtotal}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Shipping Fee</Typography>
                  <Typography variant="h6" color="secondary">
                    ₱{orderSummary.shippingFee}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="secondary">
                    ₱{orderSummary.total}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* BILLING FORM */}
            <Grid item xs={12} md={5}>
              <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Billing & Shipping Details
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Full Name"
                        name="fullName"
                        fullWidth
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        fullWidth
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Payment Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Card Number"
                        name="cardNumber"
                        fullWidth
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Expiry Date (MM/YY)"
                        name="expiryDate"
                        fullWidth
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        name="cvv"
                        fullWidth
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontSize: "1rem", padding: 1.5 }}
                      >
                        Place Order
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutPage;
