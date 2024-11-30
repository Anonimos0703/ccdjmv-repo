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
	public CartEntity putCartDetails(Long cart_id, CartEntity newCartDetails) {
	    try {
	        // Search for the cart by ID
	        CartEntity cart = cartRepo.findById(cart_id).orElseThrow(() -> 
	            new NoSuchElementException("Cart " + cart_id + " not found"));

	        // If ID found, set new values
//	        cart.setUser(newCartDetails.getUser()); //NOT DONE, EDIT THIS

	        // Save the updated cart
	        return cartRepo.save(cart);
	    } catch (NoSuchElementException nex) {
	        throw nex; // Re-throw the exception
	        
	    }
	}
	
	//Delete of CRUD
	public String deleteCart(Long id) {
		String msg = "";
		if (cartRepo.findById(id).isPresent()) {
			cartRepo.deleteById(id);
			msg = "Cart Successfully deleted";
		}else {
			msg = id + " NOT found";
		}
		return msg;
	}
}
