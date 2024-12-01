package com.ccdjmv.petshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class CartItemEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cartItemId;
	
	private int quantity;
	
	//@ManyToOne with productEntity here
	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonBackReference("product-cartItem")
	private ProductEntity product;
	
	@ManyToOne
	@JoinColumn(name = "cart_id")
	@JsonBackReference("cart-cartItem")
	private CartEntity cart;

	public CartItemEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartItemEntity(int cartItemId, int quantity, CartEntity cart) {
		super();
		this.cartItemId = cartItemId;
		this.quantity = quantity;
		this.cart = cart;
	}

	public int getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(int cartItemId) {
		this.cartItemId = cartItemId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public CartEntity getCart() {
		return cart;
	}

	public void setCart(CartEntity cart) {
		this.cart = cart;
	}

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
		this.product = product;
	}
}
