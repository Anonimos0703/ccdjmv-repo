package com.ccdjmv.petshop.entity;

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
	private int cartItem_id;
	
	private int quantity;
	
	@OneToOne
	private ProductEntity product; //to be continued
	
	@ManyToOne
	@JoinColumn(name = "cart_id")
	@JsonIgnore
	private CartEntity cart;

	public CartItemEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartItemEntity(int cartItem_id, int quantity, ProductEntity product, CartEntity cart) {
		super();
		this.cartItem_id = cartItem_id;
		this.quantity = quantity;
		this.product = product;
		this.cart = cart;
	}

	public int getCartItem_id() {
		return cartItem_id;
	}

	public void setCartItem_id(int cartItem_id) {
		this.cartItem_id = cartItem_id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
		this.product = product;
	}

	public CartEntity getCart() {
		return cart;
	}

	public void setCart(CartEntity cart) {
		this.cart = cart;
	}
	
}
