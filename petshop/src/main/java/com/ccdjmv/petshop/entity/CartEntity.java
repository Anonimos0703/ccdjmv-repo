package com.ccdjmv.petshop.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class CartEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cart_id;
	
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
	private List<CartItemEntity> cartItem;

	public CartEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartEntity(int cart_id, List<CartItemEntity> cartItems) {
		super();
		this.cart_id = cart_id;
		this.cartItem = cartItems;
	}

	public int getCart_id() {
		return cart_id;
	}

	public void setCart_id(int cart_id) {
		this.cart_id = cart_id;
	}

	public List<CartItemEntity> getCartItem() {
		return cartItem;
	}

	public void setCartItem(List<CartItemEntity> cartItem) {
		this.cartItem = cartItem;
	}
	
}
