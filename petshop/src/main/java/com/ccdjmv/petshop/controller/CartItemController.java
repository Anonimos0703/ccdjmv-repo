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
	CartItemService ciserv;
	
	@GetMapping("/test")
    public String test() {
        return "Test endpoint is working!";
    }
	
	//Create CartItem without Instructor
	@PostMapping("/postCartItem")
	public CartItemEntity postCartItem(@RequestBody CartItemEntity cartItem) {
		return ciserv.postCartItem(cartItem);
	}
	
	//Create of CRUD
	@PostMapping("/postCartItemRecord")
	public CartItemEntity postCartItemRecord(@RequestBody CartItemEntity cartItem) {
		return ciserv.postCartItemRecord(cartItem);
	}
		
	//Read of CRUD
	@GetMapping("/getAllCartItems")
	public List<CartItemEntity> getAllCartItems(){
		return ciserv.getAllCartItems();
	}
	
	//Update of CRUD
	@PutMapping("/putCartItemDetails")
	public CartItemEntity putCartItemDetails(@RequestParam int cartItem_id, @RequestBody CartItemEntity newCartItemDetails) {
		return ciserv.putCartItemDetails(cartItem_id, newCartItemDetails);
	}
	
	//Delete of CRUD
	@DeleteMapping("/deleteCartItemDetails/{id}")
	public String deleteCartItem(@PathVariable int id) {
		return ciserv.deleteCartItem(id);
	}
}
