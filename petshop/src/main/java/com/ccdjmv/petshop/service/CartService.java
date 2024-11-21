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
	CartRepository crepo;

	public CartService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//Create of CRUD
	public CartEntity postCartRecord(CartEntity cart) {
		return crepo.save(cart);
	}
	
	//Read of CRUD 
	public List<CartEntity>getAllCarts(){
		return crepo.findAll();
	}
	
	//Update of CRUD
	public CartEntity putCartDetails(int cart_id, CartEntity newCartDetails) {
	    try {
	        // Search for the cart by ID
	        CartEntity cart = crepo.findById(cart_id).orElseThrow(() -> 
	            new NoSuchElementException("Cart " + cart_id + " not found"));

	        // If ID found, set new values
	        cart.setCustomer(newCartDetails.getCustomer()); //NOT DONE, EDIT THIS

	        // Save the updated cart
	        return crepo.save(cart);
	    } catch (NoSuchElementException nex) {
	        throw nex; // Re-throw the exception
	        
	    }
	}
	
	//Delete of CRUD
	public String deleteCart(int id) {
		String msg = "";
		if (crepo.findById(id).isPresent()) {
			crepo.deleteById(id);
			msg = "Cart Successfully deleted";
		}else {
			msg = id + " NOT found";
		}
		return msg;
	}
}
