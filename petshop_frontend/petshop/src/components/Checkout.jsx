import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
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
import axios from "axios";
import imagePlaceholder from "../assets/image.png";

const theme = createTheme({
  palette: {
    primary: { main: "#FFD700" },
    secondary: { main: "#000" },
    background: { default: "#FFF8E1" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    button: { textTransform: "none" },
  },
});

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedItems, orderSummary } = location.state || {
    selectedItems: [],
    orderSummary: {},
  };

  useEffect(() => {
    const userId = localStorage.getItem('id');

    axios
      .get(`http://localhost:8080/auth/user/findById/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('id');
    
    if (selectedItems.length === 0) {
      alert("No items to order. Please go back and add items to the cart.");
      return;
    }

    const orderItems = selectedItems.map((item) => ({
      orderItemName: item.product.productName,
      orderItemImage: item.product.productImage || imagePlaceholder,
      price: item.product.productPrice,
      quantity: item.quantity,
    }));

    const orderDate = new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});

    const orderData = {
      customerDetails: user,
      orderItems,
      orderSummary,
      orderDate,
      orderStatus: "To Receive",
      paymentMethod: "Cash on Delivery",
      totalPrice: orderSummary.total,
      user: user
    };

    try {
      const response = await axios.post("http://localhost:8080/api/order/postOrderRecord", orderData);

      if (response.status === 200) { 
        alert("Order successfully placed!");
        navigate("/MyPurchases", { state: { orders: response.data } });
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  if (!user) {
    return <Typography variant="h6">Loading user data...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100vw", minHeight: "100vh", backgroundColor: "background.default", padding: { xs: 2, md: 6 }, boxSizing: "border-box" }}>
        <Box maxWidth="lg" margin="0 auto">
          <Box display="flex" justifyContent="flex-start">
            <IconButton color="secondary" onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
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

                <List>
                  {selectedItems.map((item, index) => (
                    <ListItem key={index}>
                      <Box component="img" src={item.product.productImage || imagePlaceholder} alt={item.product.productName} sx={{ width: 56, height: 56, objectFit: "contain", marginRight: 2 }} />
                      <ListItemText primary={item.product.productName} secondary={`₱${item.product.productPrice} x ${item.quantity}`} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Subtotal</Typography>
                  <Typography variant="h6" color="secondary">₱{orderSummary.subtotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Shipping Fee</Typography>
                  <Typography variant="h6" color="secondary">₱{orderSummary.shippingFee}</Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="secondary">₱{orderSummary.total}</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* BILLING DETAILS */}
            <Grid item xs={12} md={5}>
              <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Billing & Shipping Details
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                  {/* NGAN SA TAG IYA SA ACCOUNT */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="secondary">
                        <strong>Full Name:</strong> {user.firstName} {user.lastName}
                      </Typography>
                    </Grid>

                    {/* EMAIL SA TAG IYA SA ACCOUNT */}
                    <Grid item xs={12}>
                      <Typography variant="body1" color="secondary">
                        <strong>Email:</strong> {user.email}
                      </Typography>
                    </Grid>
                    
                    {/* ADDRESS KUNG ASA SYA GAPUYO HALA STALKER */}
                    <Grid item xs={12}>
                      <Typography variant="body1" color="secondary">
                        <strong>Address:</strong> {user.address?.streetBuildingHouseNo} {user.address?.barangay}, {user.address?.city} City, Region {user.address?.region}, {user.address?.postalCode}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontSize: "1rem", padding: 1.5 }}>
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
