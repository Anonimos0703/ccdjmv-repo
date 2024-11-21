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

import com.ccdjmv.petshop.entity.CartEntity;
import com.ccdjmv.petshop.service.CartService;

@RestController
@RequestMapping(method = RequestMethod.GET, path="/api/cart")
public class CartController {
	
	@Autowired
	CartService cserv;
	
	@GetMapping("/test")
    public String test() {
        return "Test endpoint is working!";
    }
	
	//Create of CRUD
	@PostMapping("/postCartRecord")
	public CartEntity postCartRecord(@RequestBody CartEntity cart) {
		return cserv.postCartRecord(cart);
	}
		
	//Read of CRUD
	@GetMapping("/getAllCarts")
	public List<CartEntity> getAllCarts(){
		return cserv.getAllCarts();
	}
	
	//Update of CRUD
	@PutMapping("/putCartDetails")
	public CartEntity putCartDetails(@RequestParam int cart_id, @RequestBody CartEntity newCartDetails) {
		return cserv.putCartDetails(cart_id, newCartDetails);
	}
	
	//Delete of CRUD
	@DeleteMapping("/deleteCartDetails/{id}")
	public String deleteCart(@PathVariable int id) {
		return cserv.deleteCart(id);
	}
}
