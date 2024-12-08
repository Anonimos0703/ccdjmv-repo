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
import { toast } from "sonner";

function Cart() {
  const [cartItems, setCartItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); //track selected items by ID


  const getCartItems = (cartId) => {
    axios
      .get(`http://localhost:8080/api/cart/getCartById/${cartId}`)
      .then((res) => {
        console.log(res.data.cartItems);
        setCartItem(res.data.cartItems);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  };

  useEffect(() => {
    const cartId = localStorage.getItem("id");
    getCartItems(cartId);
  }, []);

  const navigate = useNavigate()

  const handleCheckoutClick = () => {
    navigate('/Checkout');
  }

  const handleCheckChange = (itemId, isChecked) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (isChecked) {
      updatedSelectedItems.add(itemId); //add item to selected set
    } else {
      updatedSelectedItems.delete(itemId); //ma remove ang item from selected set
    }
    setSelectedItems(updatedSelectedItems); //update state 
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    axios
      .put(`http://localhost:8080/api/cartItem/updateCartItem/${itemId}`, {
        quantity: newQuantity
      })
      .then(() => {
        setCartItem((prevItems) =>
          prevItems.map((item) =>
            item.cartItemId === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const handleDeleteItem = (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
    if(confirmDelete){
      axios
      .delete(`http://localhost:8080/api/cartItem/deleteCartItem/${itemId}`)
      .then(() => {
        setCartItem((prevItems) =>
          prevItems.filter((item) => item.cartItemId !== itemId)
        );
      })
      .catch((err) => console.error("Error deleting item:", err));
    }
    
  };

  //functions for calculations
  const getSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.cartItemId))
      .reduce((total, item) => total + item.product.productPrice * item.quantity, 0)
      .toFixed(2);
  };

  const getTotal = () => {
    const subtotal = parseFloat(getSubtotal());
    return (subtotal + 30).toFixed(2); //shipping fee 30 pesos
  };

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
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                price={item.product?.productPrice}
                title={item.product?.productName}
                quantity={item.quantity}
                image={item.product?.productImage}
                itemId={item.cartItemId}
                isSelected={selectedItems.has(item.cartItemId)}
                onCheckChange={handleCheckChange}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDeleteItem}
              />
            ))}
          </Grid>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4} 
        sx={{
          position: "sticky",
            top: "140px",
            zIndex: 2,
            backgroundColor: "#fff", // Ensure it has a background to stand out
            padding: "10px", // Add padding to make the content look better
            height: "fit-content", // Ensures the card doesn't take up unnecessary space
            borderRadius: "16px"
            
          }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Summary</Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body2">
                  Subtotal ({selectedItems.size} item/s): ₱{getSubtotal()}
              </Typography>
              <Typography variant="body2">Shipping Fee: ₱30.00</Typography>

              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="h6">
                  Total: ₱{getTotal()}
              </Typography>
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
