package com.ccdjmv.petshop.repository;

import com.ccdjmv.petshop.entity.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {
}
	
