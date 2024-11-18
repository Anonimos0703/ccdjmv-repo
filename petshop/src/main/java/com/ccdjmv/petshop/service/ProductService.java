package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.ProductEntity;
import com.ccdjmv.petshop.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	
	ProductRepository prepo;
	
	public ProductService() {
		super();
	}
	
	

	public ProductEntity postProductRecord(ProductEntity product) {
		// TODO Auto-generated method stub
		return prepo.save(product);
	}

	public List<ProductEntity> getAllProduct() {
		// TODO Auto-generated method stub
		return prepo.findAll();
	}

	public ProductEntity updateProduct(int id, ProductEntity productRecord) {
		
		ProductEntity existingProduct = prepo.findById(id)
				.orElseThrow(() -> new NoSuchElementException ("Product with id "+id+" not found."));
		
		existingProduct.setProductName(productRecord.getProductName());
		existingProduct.setProductPrice(productRecord.getProductPrice());
		existingProduct.setDescription(productRecord.getDescription());
		existingProduct.setProductType(productRecord.getProductType());
		existingProduct.setQuantity(productRecord.getQuantity());
			
		
		return prepo.save(existingProduct);
	}

	public String deleteProduct(int id) {
		  String msg;

	        if (prepo.existsById(id)) {
	            prepo.deleteById(id); // Correctly delete the entity by ID
	            msg = "Product record successfully deleted.";
	        } else {
	            msg = "Product with id " + id + " not found.";
	        }

	        return msg;
	    }
	}


