package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.CartEntity;
import com.ccdjmv.petshop.repository.CartRepository;

@Service
public class CartService {
	@Autowired
	CartRepository cartRepo;

	public CartService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//Create of CRUD
	public CartEntity postCartRecord(CartEntity cart) {
		return cartRepo.save(cart);
	}
	
	//Read of CRUD 
	public List<CartEntity>getAllCarts(){
		return cartRepo.findAll();
	}
	
	//Update of CRUD 
	//This function may have no use
	public CartEntity putCartDetails(Long cartId, CartEntity newCartDetails) {
	    try {
	        // Search for the cart by ID
	        CartEntity cart = cartRepo.findById(cartId).orElseThrow(() -> 
	            new NoSuchElementException("Cart " + cartId + " not found"));

	        // If ID found, set new values
	        //new values here

	        // Save the updated cart
	        return cartRepo.save(cart);
	    } catch (NoSuchElementException nex) {
	        throw nex; // Re-throw the exception
	        
	    }
	}
	
	//Delete of CRUD
	public String deleteCart(Long cartId) {
		String msg = "";
		if (cartRepo.findById(cartId).isPresent()) {
			cartRepo.deleteById(cartId);
			msg = "Cart Successfully deleted";
		}else {
			msg = cartId + " NOT found";
		}
		return msg;
	}
}
