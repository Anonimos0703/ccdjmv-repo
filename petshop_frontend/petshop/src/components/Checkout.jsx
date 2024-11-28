import React, { useState } from "react";
import { Box, Grid, TextField, Typography, Button, Paper, Divider, List, ListItem, ListItemText, IconButton, createTheme, ThemeProvider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };
    // TEMPORARY!! PLACEHOLDERS UNTIL PRODUCT BACKEND IS APPLIED
    const cartItems = [
        { name: "Wireless Headphones", price: 120 },
        { name: "Bluetooth Speaker", price: 80 },
        { name: "Smartwatch", price: 200 },
    ];
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

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
          {/* Back Button in the Top-Left Corner */}
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
                {/* ORDER SUMMARY | MISSING BACKEND */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>
                        Order Summary
                        </Typography>
                        {/* <List>
                        {cartItems.map((item, index) => (
                            <ListItem key={index}>
                            <ListItemText primary={item.name} />
                            <Typography color="secondary">
                                ${item.price.toFixed(2)}
                            </Typography>
                            </ListItem>
                        ))}
                        </List> */}

                        <CartItem
                            price={159}
                            title={"Cat Food Tuna Flavor 1kg"}
                            quantity={3}
                            img=""
                            />
                            <CartItem
                            price={200}
                            title={"Dog Food Beef Flavor 1kg"}
                            quantity={1}
                            />
                            <CartItem price={59} title={"Cat toy mouse"} quantity={1} />
                            <CartItem price={99} title={"Dog Rope Toy"} quantity={1} />
                            <CartItem
                            price={299}
                            title={"Pet Food bowl stainless"}
                            quantity={2}
                            />
                            <CartItem price={80} title={"Doggy collar green"} quantity={1} />

                        <Divider sx={{ marginY: 2 }} />
                        
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Subtotal (9 items)</Typography>
                            <Typography variant="h6" color="secondary">
                                ₱896.00
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Shipping Fee</Typography>
                            <Typography variant="h6" color="secondary">
                                ₱80.00
                            </Typography>
                        </Box>
                        <Divider/>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6" color="secondary">
                                {/* ${total.toFixed(2)} */}
                                ₱976.00
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