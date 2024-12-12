import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
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
import EmptyCart from "./EmptyCart";

function Cart() {
  const [cartItems, setCartItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); //track selected items by ID
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [openNoAddressDialog, setNoAddressDialog] = useState(false); // Dialog state
  const [itemToDelete, setItemToDelete] = useState(null); // Item ID to delete
  const [userId, setUserId] = useState(localStorage.getItem("id"));

  const getCartItems = () => {
    axios
      .get(`http://localhost:8080/api/cart/getCartById/${userId}`)
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
        console.error("Error fetching cart items", err);
        toast.error("Error fetching cart items");
      });
  };

  // USE EFFECT
  useEffect(() => {
    getCartItems();
  }, []);

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
    setNoAddressDialog(false);
  };

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    //fetch user address to check if user has an address saved in the db
    if (selectedItems.size === 0) {
      toast.error("Please select items to checkout");
      return;
    }

    axios
      .get(`http://localhost:8080/auth/user/findById/${userId}`)
      .then((res) => {
        const userAddress = res.data?.address ?? null;

        if (userAddress === null) {
          setNoAddressDialog(true);
          return;
        }

        // Calculate the subtotal and selected items
        const selectedItemsDetails = cartItems.filter((item) =>
          selectedItems.has(item.cartItemId)
        );

        const orderSummary = {
          subtotal: getSubtotal(),
          shippingFee: getShippingFee(),
          total: getTotal(),
        };

        // Pass selected items and order summary to Checkout page via `state`
        navigate("/checkout", {
          state: { selectedItems: selectedItemsDetails, orderSummary },
        });
      })
      .catch((err) => {
        console.error("Cart: error fetching address", err);
        toast.error("Unexpected error occured. Please try again later");
      });
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

  const handleConfirmCreateAddress = () => {
    navigate("/profile");
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
    if (subtotal == 0) {
      return "0.00";
    }
    return (subtotal + 30).toFixed(2); //shipping fee 30 pesos
  };

  const getShippingFee = () => {
    const subtotal = parseFloat(getSubtotal());
    if (subtotal == 0) {
      return "0.00";
    }
    return "30.00";
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
        height: "100vh",
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
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Grid container spacing={2} justifyContent="center">
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
            md={3}
            sx={{
              position: "sticky",
              top: "140px",
              zIndex: 2, // Ensure it has a background to stand out
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
                <Typography variant="body2">
                  Shipping Fee: ₱{getShippingFee()}
                </Typography>

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
                  disabled={selectedItems.size === 0}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

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

      {/* Confirmation dialog for Missing Address */}
      <Dialog open={openNoAddressDialog} onClose={handleDialogClose}>
        <DialogTitle>No Address Yet</DialogTitle>
        <DialogContent>
          <Typography>Add address to your profile?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCreateAddress} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Cart;
