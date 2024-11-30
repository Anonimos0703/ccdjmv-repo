package com.ccdjmv.petshop.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class CartEntity {
	@Id
	private Long cartId; //UserEntity PK is also cart PK
	
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
	private List<CartItemEntity> cartItem;
	
	@OneToOne
	@MapsId //For CartEntity to use same PK as user
	@JoinColumn(name = "user_id")
	private UserEntity user;

	public CartEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartEntity(Long cartId, List<CartItemEntity> cartItem, UserEntity user) {
		super();
		this.cartId = cartId;
		this.cartItem = cartItem;
		this.user = user;
	}

	public Long getCartId() {
		return cartId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public List<CartItemEntity> getCartItem() {
		return cartItem;
	}

	public void setCartItem(List<CartItemEntity> cartItem) {
		this.cartItem = cartItem;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}
	
}
