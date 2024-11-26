package com.ccdjmv.petshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ccdjmv.petshop.entity.AppointmentEntity;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
	List<AppointmentEntity> findByEmail(String email);
}
