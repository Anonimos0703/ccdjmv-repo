package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.CartEntity;
import com.ccdjmv.petshop.entity.CartItemEntity;
import com.ccdjmv.petshop.repository.CartItemRepository;

@Service
public class CartItemService {
	@Autowired
	CartItemRepository cartItemRepo;

	public CartItemService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//Create of CRUD
	//Create cartItem Record 
		public CartItemEntity postCartItem(CartItemEntity cartItem) {
		return cartItemRepo.save(cartItem);
	}
	
	//Read of CRUD 
	public List<CartItemEntity> getAllCartItems(){
		return cartItemRepo.findAll();
	}
	
	//Update of CRUD
	public CartItemEntity putCartItemDetails(int cartItemId, CartItemEntity newCartItemDetails) {
	    try {
	        // Search for the cartItem by ID
	        CartItemEntity cartItem = cartItemRepo.findById(cartItemId).orElseThrow(() -> 
	            new NoSuchElementException("CartItem " + cartItemId + " not found"));

	        // If ID found, set new values
	        cartItem.setQuantity(newCartItemDetails.getQuantity());

	        // Save the updated cartItem
	        return cartItemRepo.save(cartItem);
	    } catch (NoSuchElementException nex) {
	        throw nex; // Re-throw the exception
	        
	    }
	}

	//Delete of CRUD
	public String deleteCartItem(int cartItemId) {
		String msg = "";
		if (cartItemRepo.findById(cartItemId).isPresent()) {
			cartItemRepo.deleteById(cartItemId);
			msg = "CartItem Successfully deleted";
		}else {
			msg = cartItemId + " NOT found";
		}
		return msg;
	}
}
