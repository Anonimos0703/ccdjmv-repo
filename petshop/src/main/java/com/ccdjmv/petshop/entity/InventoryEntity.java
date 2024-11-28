package com.ccdjmv.petshop.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class InventoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;

    
    private LocalDate dateAdded;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productid")
    @JsonBackReference("product-inventory")
    private ProductEntity product;
    
 

    public InventoryEntity(LocalDate dateAdded) {
		super();
		this.dateAdded = dateAdded;
	}
    
    public InventoryEntity() {
    	
    }

	public Long getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Long inventoryId) {
        this.inventoryId = inventoryId;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }
    
    public ProductEntity getProduct() {
    	return product;
    }
    
    public void setProduct(ProductEntity product) {
    	this.product  = product;
    }
}
