package com.ccdjmv.petshop.controller;

import java.util.List;	

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ccdjmv.petshop.entity.ProductEntity;
import com.ccdjmv.petshop.service.ProductService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/product")
public class ProductController {
	@Autowired
	ProductService pserv;
	
	@PostMapping("/postProduct")
	public ProductEntity postProductRecord(@RequestBody ProductEntity product) {
		System.out.println("Received product data: " + product);
		return pserv.postProductRecord(product);
	}
	
	@GetMapping("/getProduct")
	public List<ProductEntity>getAllProduct(){
		return pserv.getAllProduct();
	}
	
	@PutMapping("/putProduct/{id}")
	public ProductEntity updateProduct(@PathVariable int id, @RequestBody ProductEntity productRecord) {
		return pserv.updateProduct(id,productRecord);
	}
	
	
	@DeleteMapping("/deleteProduct/{id}")
	public String deleteProduct(@PathVariable int id) {
		return pserv.deleteProduct(id);
	}

}