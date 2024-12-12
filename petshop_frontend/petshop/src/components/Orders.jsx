import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // To make HTTP requests
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    axios
      .get(`http://localhost:8080/api/order/getAllOrdersByUserId`, {
        params: { userId },
      })
      .then((response) => {
        console.log("Orders fetched from backend:", response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
}, []);

  const calculateTotal = (items) => {
    const shippingFee = 30; 
    let itemsTotal = 0;

    if (items) {
      items.forEach((item) => {
        // Log item details to verify if they're correct
        console.log("Item details in calculateTotal:", item);  // Log the entire item object
        if (item.price && item.quantity) {
          itemsTotal += item.price * item.quantity;
          console.log("Item price:", item.price);   // Log item price
          console.log("Item quantity:", item.quantity); // Log item quantity
        }
      });
    }

    return itemsTotal + shippingFee;
  };

  return (
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        width: "50%",
        margin: "auto",
        minHeight: "100vh",
      }}
    >
      <Box mt={2}>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
            <Typography mt={2}>Loading orders...</Typography>
          </Box>
        ) : orders.length === 0 ? (
          <Typography textAlign="center">No orders available.</Typography>
        ) : (
          orders.map((order) => {
            console.log("Order data:", order); // Log the whole order object
            const total = calculateTotal(order.orderItems || []);

            return (
              <Card
                key={order.orderID}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                {/* Header: Date and Status */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="text.primary">
                    {order.orderDate}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color:
                        order.status === "DELIVERED"
                          ? "green"
                          : order.status === "SHIPPED"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {order.orderStatus}
                  </Typography>
                </Box>

                {/* Order Items */}
                <CardContent>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item, index) => {
                      console.log("Order Item details:", item); // Log each item
                      return (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            mb: 1,
                            pb: 1,
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={item.orderItemImage}
                            alt={item.orderItemName}
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 1,
                              mr: 2,
                            }}
                          />
                          <Box flex={1} ml={2}>
                            <Typography color="text.primary" style={{ fontWeight: 'bold' }}>
                              {item.orderItemName}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              style={{ fontWeight: 'bold', fontSize: '14px' }}
                            >
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                          <Typography
                            fontWeight="bold"
                            color="text.primary"
                          >
                            ₱{item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      );
                    })
                  ) : (
                    <Typography>No items available for this order.</Typography>
                  )}
                </CardContent>

                {/* Shipping Fee */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Typography color="text.secondary">Shipping Fee</Typography>
                  <Typography fontWeight="bold">₱30.00</Typography>
                </Box>

                {/* Total */}
                <Divider sx={{ my: 1 }} />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Typography fontWeight="bold">Total</Typography>
                  <Typography
                    fontWeight="bold"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    ₱{total.toFixed(2)}
                  </Typography>
                </Box>

                {/* View Order Button */}
                <Box textAlign="right" mt={2}>
                  <Link
                    to={`/MyPurchases/${order.orderID}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#faf2a7",
                        color: "#000",
                        '&:hover': {
                          backgroundColor: "#fff27d",
                        },
                        textTransform: "none",
                        height: "60px",
                        width: "130px",
                        fontSize: "16px"
                      }}
                    >
                      View Order
                    </Button>
                  </Link>
                </Box>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
}

export default OrderList;
