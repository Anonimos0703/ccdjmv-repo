package com.ccdjmv.petshop.entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name="tblproduct")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ProductID;
    
    private String description;
    private double productPrice;
    private String productName;
    private String productType;
    private int quantity;
    
    @Column(columnDefinition = "LONGTEXT")
    private String productImage;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference("product-order")
    private List<OrderEntity> order;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference("product-productreview")
    private List<ProductReviewEntity> productreview;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference("product-cartItem")
    private List<CartItemEntity> cartItems;
    
    // Constructors
    public ProductEntity() {}
    
    public ProductEntity(int productID, String description, double productPrice, 
                         String productName, String productType, int quantity, String productImage) {
        this.ProductID = productID;
        this.description = description;
        this.productPrice = productPrice;
        this.productName = productName;
        this.productType = productType;
        this.quantity = quantity;
        this.productImage = productImage;
    }
	
	public int getProductID() {
		return ProductID;
	}
	public void setProductID(int productID) {
		ProductID = productID;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	 
	 public List<OrderEntity> getOrder() {
	        return order;
	    }

	    public void setOrder(List<OrderEntity> order) {
	        this.order = order;
	    }

	    public List<ProductReviewEntity> getProductReview(){
	    	return productreview;
	    }
	    
	    public void setProductReview(List<ProductReviewEntity>productreview) {
	    	this.productreview = productreview;
	    }
	    
	    public String getProductImage() {
	        return productImage;
	    }
	    
	    public void setProductImage(String productImage) {
	        this.productImage = productImage;
	    }

		public List<CartItemEntity> getCartItems() {
			return cartItems;
		}

		public void setCartItems(List<CartItemEntity> cartItems) {
			this.cartItems = cartItems;
		}
}
