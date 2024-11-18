package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.CartEntity;
import com.ccdjmv.petshop.entity.CartItemEntity;
import com.ccdjmv.petshop.repository.CartItemRepository;
import com.ccdjmv.petshop.repository.CartRepository;

@Service
public class CartItemService {
	@Autowired
	CartItemRepository cirepo;
	
	@Autowired
	CartRepository crepo;

	public CartItemService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//Create cartItem Record without cart
		public CartItemEntity postCartItem(CartItemEntity cartItem) {
		return cirepo.save(cartItem);
	}
	
	//Create of CRUD
	//Create CartItem Record with Cart assigned
	public CartItemEntity postCartItemRecord(CartItemEntity cartItem) {
		
		// Fetch the Cart entity by ID from the CartItemEntity
		CartEntity cart = crepo.findById(cartItem.getCart().getCart_id()).orElseThrow(() -> 
		new NoSuchElementException("Cart with ID " + cartItem.getCart().getCart_id() + " not found"));
    
		// Assign the cart to the cartItem
		cartItem.setCart(cart);
    
		return cirepo.save(cartItem);
	}
	
	//Read of CRUD 
	public List<CartItemEntity> getAllCartItems(){
		return cirepo.findAll();
	}
	
	public CartItemEntity putCartItemDetails(int cartItem_id, CartItemEntity newCartItemDetails) {
	    try {
	        // Search for the cartItem by ID
	        CartItemEntity cartItem = cirepo.findById(cartItem_id).orElseThrow(() -> 
	            new NoSuchElementException("CartItem " + cartItem_id + " not found"));

	        // If ID found, set new values
	        cartItem.setQuantity(newCartItemDetails.getQuantity()); //KUWANG

	        // Save the updated cartItem
	        return cirepo.save(cartItem);
	    } catch (NoSuchElementException nex) {
	        throw nex; // Re-throw the exception
	        
	    }
	}


	//Delete of CRUD
	public String deleteCartItem(int id) {
		String msg = "";
		if (cirepo.findById(id).isPresent()) {
			cirepo.deleteById(id);
			msg = "CartItem Successfully deleted";
		}else {
			msg = id + " NOT found";
		}
		return msg;
	}
}
