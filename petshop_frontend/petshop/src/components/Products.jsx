import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(16);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product/getProduct");
        console.log("Fetched products:", response.data);

        if (Array.isArray(response.data)) {
          const processedProducts = response.data.map((product) => ({
            productName: product.productName || "Unnamed Product",
            price: product.productPrice || 0,
            productImage: product.productImage || "",
            description: product.description || "No description available.",
            productType: product.productType || "Uncategorized",
          }));
          setProducts(processedProducts);
          setOriginalProducts(processedProducts);
        } else {
          console.warn("Unexpected response format:", response.data);
          setProducts([]);
          setOriginalProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    let filteredProducts = originalProducts;

    if (productTypeFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productType === productTypeFilter
      );
    }

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredProducts;
  };

  const handleProductTypeFilter = (event, newFilter) => {
    setProductTypeFilter(newFilter);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const filteredProducts = filterProducts();
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 4, fontWeight: 600 }}
      >
        Our Products
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: 600, mb: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ToggleButtonGroup
          value={productTypeFilter}
          exclusive
          onChange={handleProductTypeFilter}
          aria-label="product type filters"
        >
          <ToggleButton value="Toys" aria-label="Toys">
            Toys
          </ToggleButton>
          <ToggleButton value="Care Products" aria-label="Care Products">
            Care Products
          </ToggleButton>
          <ToggleButton value="Food" aria-label="Food">
            Food
          </ToggleButton>
          <ToggleButton value="Fur Clothing" aria-label="Fur Clothing">
            Fur Clothing
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={0} justifyContent="center" alignItems="stretch">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 10,
                position: "relative",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 280,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 100,
                    width: 100,
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                  image={product.productImage || "/placeholder-image.png"}
                  alt={product.productName}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: "center" }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 1 }}>
                    {product.productType}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ textAlign: "center", fontWeight: "bold" }}>
                    ₱{product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          position: "relative",
          zIndex: 10,
        }}
      >
        {displayedProducts.length < filteredProducts.length && (
          <Button variant="contained" color="secondary" size="large" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </Box>

      {selectedProduct && (
        <Dialog open={Boolean(selectedProduct)} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            {selectedProduct.productName}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <CardMedia
                component="img"
                src={selectedProduct.productImage || "/placeholder-image.png"}
                alt={selectedProduct.productName}
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                  mb: 3,
                }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", mb: 2 }}>
                {selectedProduct.productType}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
                ₱{selectedProduct.price.toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              Close
            </Button>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Products;
