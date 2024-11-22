import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider,
  Box,
} from "@mui/material";
import CartItem from "./CartItem";
import axios from "axios";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";

// const products = [
//   { image: dog_food.jpg, name: 'Dog Food', price: '₱200.00' },
//   { image: cat_food, name: 'Cat Food', price: '₱180.00' },
//   { image: cat_treats, name: 'Cat Treats', price: '₱120.00' },
//   { image: dog_treats, name: 'Dog Treats', price: '₱140.00' },
// ];

function Cart() {
  const [cartItems, setCartItem] = useState([]);

  const getCartItems = () => {
    axios
      .get("http://localhost:8080/api/cartItem/getAllCartItems")
      .then((res) => {
        console.log(res.data);
        setCartItem(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const navigate = useNavigate()

  const handleCheckoutClick = () => {
    navigate('/Checkout');
  }

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "96vw",
        padding: "2rem",
      }}
    >
      {/* Centered Heading */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
      >
        <Typography variant="h4" component="h1">
          Your Shopping Cart
        </Typography>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={2}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* {cartItems.map((item, index) => (
              <CartItem
                key={index}
                price={item.price}
                title={item.productName}
                quantity={item.quantity}
              />
            ))} */}
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
          </Grid>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <Divider style={{ margin: "10px 0" }} />
              {/* <Typography variant="body2">
                Subtotal ({cartItems.length} items): ₱
                {cartItems
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </Typography> */}
              <Typography variant="body2">
                Subtotal (9 items): ₱896.00
              </Typography>
              <Typography variant="body2">Shipping Fee: ₱80.00</Typography>

              <Divider style={{ margin: "10px 0" }} />
              {/* <Typography variant="h6">
                Total: ₱
                {cartItems
                  .reduce((total, item) => total + item.price, 80)
                  .toFixed(2)}
              </Typography> */}
              <Typography variant="h6">Total: ₱976.00</Typography>
              <Typography variant="caption" color="text.secondary">
                VAT included, where applicable
              </Typography>

              <Button
                variant="contained"
                color="warning"
                fullWidth
                style={{ marginTop: "15px" }}
                onClick={handleCheckoutClick}
              >
                PROCEED TO CHECKOUT
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
