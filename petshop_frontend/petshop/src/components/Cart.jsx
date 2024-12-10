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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CartItem from "./CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Cart() {
  const [cartItems, setCartItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); //track selected items by ID
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [itemToDelete, setItemToDelete] = useState(null); // Item ID to delete

  const getCartItems = (cartId) => {
    axios
      .get(`http://localhost:8080/api/cart/getCartById/${cartId}`)
      .then((res) => {
        const updatedCartItems = res.data.cartItems.map((item) => {
          // If cart item quantity is greater than available stock
          if (item.quantity > item.product.quantity) {
            axios
              .put(
                `http://localhost:8080/api/cartItem/systemUpdateCartItem/${item.cartItemId}`,
                {
                  quantity: item.product.quantity,
                }
              )
              .catch((err) => console.error("Error updating quantity:", err));

            // Update the cart item quantity locally
            return {
              ...item,
              quantity: item.product.quantity,
            };
          }
          return item; // No change needed
        });

        // Sort cart items by lastUpdated in descending order (most recent first)
        const sortedCartItems = updatedCartItems.sort((a, b) => {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });

        setCartItem(sortedCartItems); // Update the state
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  };

  useEffect(() => {
    const cartId = localStorage.getItem("id");

    // //necessary for up to date cart items quantities. Updates every 15 seconds so no need to reload page
    // const fetchAndScheduleNext = () => {
    //   getCartItems(cartId); // Fetch cart items
    //   setTimeout(fetchAndScheduleNext, 15000); // Schedule next fetch
    // };
    // fetchAndScheduleNext(); // Start the recursive fetching

    // return () => clearTimeout(fetchAndScheduleNext); // Cleanup

    getCartItems(cartId);
  }, []);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/Checkout");
  };

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
        quantity: newQuantity,
      })
      .then(() => {
        setCartItem((prevItems) =>
          prevItems.map((item) =>
            item.cartItemId === itemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating quantity:", err);
        toast.error("Error updating quantity.");
      });
  };

  const handleDeleteItem = (itemId) => {
    setItemToDelete(itemId);
    setOpenDialog(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      axios
        .delete(
          `http://localhost:8080/api/cartItem/deleteCartItem/${itemToDelete}`
        )
        .then(() => {
          setCartItem((prevItems) =>
            prevItems.filter((item) => item.cartItemId !== itemToDelete)
          );
          setOpenDialog(false); // Close the dialog after deletion
          toast.success("Item removed from cart");
        })
        .catch((err) => {
          console.error("Error deleting item:", err);
          setOpenDialog(false); // Close the dialog on error
          toast.error("Failed to delete item from cart");
        });
    }
  };

  //functions for calculations
  const getSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.cartItemId))
      .reduce(
        (total, item) => total + item.product.productPrice * item.quantity,
        0
      )
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
      <Toaster position="top-center" duration={2500} />
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
                availableStock={item.product?.quantity} // Pass stock quantity
              />
            ))}
          </Grid>
        </Grid>

        {/* Order Summary */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            position: "sticky",
            top: "140px",
            zIndex: 2,
            backgroundColor: "#fff", // Ensure it has a background to stand out
            padding: "10px", // Add padding to make the content look better
            height: "fit-content", // Ensures the card doesn't take up unnecessary space
            borderRadius: "16px",
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Summary</Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body2">
                Subtotal ({selectedItems.size} item/s): ₱{getSubtotal()}
              </Typography>
              <Typography variant="body2">Shipping Fee: ₱30.00</Typography>

              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="h6">Total: ₱{getTotal()}</Typography>
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

      {/* Confirmation dialog for Delete Cart Item */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this item from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Cart;
