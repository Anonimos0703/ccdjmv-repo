package com.ccdjmv.petshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Reviews")
public class ProductReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ReviewID;
    
    private int ratings;
    
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "productid")
    @JsonBackReference("product-productreview")
    private ProductEntity product;
    
    public ProductReviewEntity() {
    	
    }
    
    public ProductReviewEntity(int reviewID, int ratings) {
		super();
		ReviewID = reviewID;
		this.ratings = ratings;
	}

    public int getReviewID() {
        return ReviewID;
    }

    public void setReviewID(int reviewID) {
        ReviewID = reviewID;
    }

    public int getRatings() {
        return ratings;
    }

    public void setRatings(int ratings) {
        this.ratings = ratings;
    }
    
    public ProductEntity getProduct() {
    	return product;
    }
    
    public void setProduct(ProductEntity product) {
    	this.product  = product;
    }
    
}    
