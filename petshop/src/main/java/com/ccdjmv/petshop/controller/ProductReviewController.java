package com.ccdjmv.petshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ccdjmv.petshop.entity.ProductReviewEntity;
import com.ccdjmv.petshop.service.ProductReviewService;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "http:/localhost:5173") // Enable CORS for this controller
public class ProductReviewController {
	@Autowired
	ProductReviewService reviewserv;
			
	@CrossOrigin(origins = "http:/localhost:5173") // Enable CORS for this controller
	@PostMapping("/postReview")
	public ProductReviewEntity postProductReviewRecord(@RequestBody ProductReviewEntity review) {
		return reviewserv.postProductReviewRecord(review);
	}
	
	@GetMapping("/getReview")
	public List<ProductReviewEntity>getAllReview(){
		return reviewserv.getAllReview();
	}
	
	@GetMapping("/getReview/{id}")
	public ResponseEntity<ProductReviewEntity> getReviewById(@PathVariable int id) {
	    ProductReviewEntity review = reviewserv.getReviewById(id);
	    return ResponseEntity.ok(review);
	}

	
	@PutMapping("/putReview/{id}")
	public ProductReviewEntity updateReview(@PathVariable int id, @RequestBody ProductReviewEntity reviewRecord) {
		return reviewserv.updateReview(id,reviewRecord);
	}
	
	@DeleteMapping("/deleteReview/{id}")
	public String deleteProduct(@PathVariable int id) {
		return reviewserv.deleteReview(id);
	}
}