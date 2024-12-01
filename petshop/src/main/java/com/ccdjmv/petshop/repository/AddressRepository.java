package com.ccdjmv.petshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ccdjmv.petshop.entity.AddressEntity;

public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {
    
    // Custom method to find addresses by userId
    List<AddressEntity> findByUserId(Long userId);
}
