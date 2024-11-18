package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.ProductReviewEntity;
import com.ccdjmv.petshop.repository.ProductReviewRepository;

@Service
public class ProductReviewService {
	
	@Autowired
	ProductReviewRepository productReviewRepo;
	
	public ProductReviewService() {
		super();
	}

	public ProductReviewEntity postProductReviewRecord(ProductReviewEntity review) {
		// TODO Auto-generated method stub
		return productReviewRepo.save(review);
	}

	public List<ProductReviewEntity> getAllReview() {
		// TODO Auto-generated method stub
		return productReviewRepo.findAll();
	}
	
	public ProductReviewEntity getReviewById(int id) {
	    return productReviewRepo.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Review with id " + id + " not found."));
	}


	public ProductReviewEntity updateReview(int id, ProductReviewEntity productReviewRecord) {
		// TODO Auto-generated method stub
		ProductReviewEntity existingReview = productReviewRepo.findById(id)
				.orElseThrow(() -> new NoSuchElementException ("Review with id "+id+"not found."));
		
		existingReview.setRatings(productReviewRecord.getRatings());
		return productReviewRepo.save(existingReview);
	}

	public String deleteReview(int id) {
		// TODO Auto-generated method stub
		String msg;
	
			if(productReviewRepo.existsById(id)) {
				productReviewRepo.deleteById(id);
				msg = "Review record successfully deleted.";
			}else {
				msg = "Review with id " + id + " not found.";
			}
		return msg;
	}
}
