package com.ccdjmv.petshop.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ccdjmv.petshop.entity.GroomingEntity;

@Repository
public interface GroomingRepository extends JpaRepository<GroomingEntity, Integer> {
}
