package com.ccdjmv.petshop.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
	@JsonManagedReference("product-order")
    private List<OrderEntity> order;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "product", cascade = CascadeType.ALL)
	@JsonManagedReference("product-inventory")
	private List<InventoryEntity> inventory;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product",cascade = CascadeType.ALL)
	@JsonManagedReference("product-productreview")
	private List<ProductReviewEntity> productreview;
	
	
	public ProductEntity(int productID, String description, double productPrice, String productName, String productType,
			int quantity) {
		super();
		ProductID = productID;
		this.description = description;
		this.productPrice = productPrice;
		this.productName = productName;
		this.productType = productType;
		this.quantity = quantity;
	}
	
	public ProductEntity() {
		
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
	
	    public List<InventoryEntity> getInventory(){
	    	return inventory;
	    }
	    
	    public void setInventory(List<InventoryEntity> inventory) {
	    	this.inventory = inventory;
	    }

	    public List<ProductReviewEntity> getProductReview(){
	    	return productreview;
	    }
	    
	    public void setProductReview(List<ProductReviewEntity>productreview) {
	    	this.productreview = productreview;
	    }

}
