import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const OrderDetails = () => {
  const { orderID } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderID) {
      axios
        .get(`http://localhost:8080/api/order/getOrderDetails/${orderID}`)
        .then((response) => {
          setOrderDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [orderID]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!orderDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="error">
          Order not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={3} maxWidth="lg" mx="auto" sx={{ backgroundColor: "#f9f9f9", borderRadius: 2 , minHeight: "80vh"}}>
      
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Order Details
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 2, boxShadow: 1 }}>
        
        <Card sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Order ID:
                </Typography>
                <Typography>{orderDetails.orderID}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Order Date:
                </Typography>
                <Typography>{orderDetails.orderDate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="success.main"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2,
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    padding: "8px",
                    borderRadius: 1,
                  }}
                >
                  <LocalShippingIcon />
                  Status: {orderDetails.orderStatus}
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Delivery Address
                </Typography>
                <Typography variant="body2"><strong>Name:</strong> {orderDetails.user.firstName} {orderDetails.user.lastName}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {orderDetails.user.email}</Typography>
                <Typography variant="body2"><strong>Address:</strong> {orderDetails.user.address.streetBuildingHouseNo} {orderDetails.user.address.barangay}, {orderDetails.user.address.city} City, {orderDetails.user.address.province}, Region {orderDetails.user.address.region}, {orderDetails.user.address.postalCode}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Order Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {orderDetails.orderItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
              sx={{ backgroundColor: "#FFFFFF", padding: 1, borderRadius: 1 }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <img 
                  src={item.orderItemImage} 
                  alt={item.orderItemName} 
                  style={{ width: 50, height: 50, borderRadius: 5, objectFit: "cover" }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.orderItemName}
                  </Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                </Box>
              </Box>
              <Typography variant="body1" fontWeight="bold">
                ₱{item.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Shipping Fee</Typography>
              <Typography>₱30</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" fontWeight="bold">
              <Typography variant="body1">Total</Typography>
              <Typography variant="body1" fontWeight="bold">₱{orderDetails.totalPrice.toFixed(2)}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default OrderDetails;
