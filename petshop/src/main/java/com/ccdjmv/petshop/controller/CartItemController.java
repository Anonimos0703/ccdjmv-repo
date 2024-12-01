package com.ccdjmv.petshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ccdjmv.petshop.entity.CartItemEntity;
import com.ccdjmv.petshop.service.CartItemService;


@RestController
@RequestMapping(method = RequestMethod.GET, path="/api/cartItem")
public class CartItemController {
	
	@Autowired
	CartItemService cartItemServ;
	
	@GetMapping("/test")
    public String test() {
        return "Test endpoint is working!";
    }
	
	//Create CartItem 
	@PostMapping("/postCartItem")
	public CartItemEntity postCartItem(@RequestBody CartItemEntity cartItem) {
		return cartItemServ.postCartItem(cartItem);
	}
		
	//Read of CRUD
	@GetMapping("/getAllCartItems")
	public List<CartItemEntity> getAllCartItems(){
		return cartItemServ.getAllCartItems();
	}
	
	//Update of CRUD
	@PutMapping("/putCartItemDetails")
	public CartItemEntity putCartItemDetails(@RequestParam int cartItemId, @RequestBody CartItemEntity newCartItemDetails) {
		return cartItemServ.putCartItemDetails(cartItemId, newCartItemDetails);
	}
	
	//Delete of CRUD
	@DeleteMapping("/deleteCartItem/{cartItemId}")
	public String deleteCartItem(@PathVariable int cartItemId) {
		return cartItemServ.deleteCartItem(cartItemId);
	}
}